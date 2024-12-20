import http from "@/core/config/axios/http";
import { kit } from "@/wallet/walletKit";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { signTransaction } from "@stellar/freighter-api";
import axios from "axios";

interface EscrowPayload {
  contractId: string;
  engagementId: string;
  signer: string;
}

export const refundRemainingFunds = async (payload: EscrowPayload) => {
  try {
    const response = await http.post("/escrow/refund-remaining-funds", payload);

    const { unsignedTransaction } = response.data;
    const { address } = await kit.getAddress();

    const { signedTxXdr } = await signTransaction(unsignedTransaction, {
      address,
      networkPassphrase: WalletNetwork.TESTNET,
    });

    const tx = await http.post("/helper/send-transaction", {
      signedXdr: signedTxXdr,
    });

    const { data } = tx;

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Error refunding remaining funds",
      );
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
};
