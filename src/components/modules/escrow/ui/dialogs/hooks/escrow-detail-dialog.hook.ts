import { Escrow } from "@/@types/escrow.entity";
import { statusMap, statusOptions } from "@/constants/escrow/StatusOptions";
import { getUserRoleInEscrow } from "../../../server/escrow-firebase";
import { useGlobalAuthenticationStore } from "@/core/store/data";
import { useEffect, useState } from "react";

interface useEscrowDetailDialogProps {
  setIsDialogOpen: (value: boolean) => void;
  setSelectedEscrow: (selectedEscrow?: Escrow) => void;
  selectedEscrow: Escrow | null;
}

const useEscrowDetailDialog = ({
  setIsDialogOpen,
  setSelectedEscrow,
  selectedEscrow,
}: useEscrowDetailDialogProps) => {
  const [role, setRole] = useState<string | undefined>(undefined);
  const address = useGlobalAuthenticationStore((state) => state.address);

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedEscrow(undefined);
  };

  const areAllMilestonesCompleted =
    selectedEscrow?.milestones
      ?.map((milestone) => milestone.status)
      .every((status) => status === "completed") ?? false;

  const areAllMilestonesCompletedAndFlag =
    selectedEscrow?.milestones
      ?.map((milestone) => milestone.flag)
      .every((flag) => flag === true) ?? false;

  const getFilteredStatusOptions = (currentStatus: string | undefined) => {
    const nextStatuses = statusMap[currentStatus || ""] || [];
    return statusOptions.filter((option) =>
      nextStatuses.includes(option.value),
    );
  };

  const userRoleInEscrow = async () => {
    const { contractId } = selectedEscrow || {};
    const data = await getUserRoleInEscrow({ contractId, address });

    return data;
  };

  useEffect(() => {
    const fetchRole = async () => {
      if (selectedEscrow) {
        const roleData = await userRoleInEscrow();

        setRole(roleData?.role);
      }
    };

    fetchRole();
  }, [selectedEscrow, userRoleInEscrow]);

  return {
    handleClose,
    areAllMilestonesCompleted,
    areAllMilestonesCompletedAndFlag,
    getFilteredStatusOptions,
    userRoleInEscrow,
    role,
  };
};

export default useEscrowDetailDialog;
