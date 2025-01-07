import { Escrow, EscrowPayload } from "@/@types/escrow.entity";

export interface EscrowGlobalStore {
  escrows: Escrow[];
  totalEscrows: number;
  loadingEscrows: boolean;
  selectedEscrow: Escrow | null;
  escrowsToDelete: string[];

  setEscrows: (escrows: Escrow[]) => void;
  setSelectedEscrow: (selectedEscrow?: Escrow) => void;
  // setEscrowsToDelete: (escrows: string[]) => void;
  fetchAllEscrows: (params: { address: string; type: string }) => void;
  addEscrow: (
    payload: EscrowPayload,
    address: string,
    contractId: string,
  ) => Promise<Escrow | undefined>;
  // updateEscrow: (
  //   escrowId: string,
  //   escrow: Escrow,
  // ) => Promise<Escrow | undefined>;
  // deleteProduct: (escrowId: string) => void;
}