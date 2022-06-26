import React, { useCallback } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { IconButton, Tooltip } from "@mui/material";
import { useMetaMask } from "metamask-react";

export function ConnectWalletButton() {
  const { status, connect } = useMetaMask();

  const onClick = useCallback(() => {
    if (status === "connected") {
      return;
    }

    connect();
  }, [status]);

  return (
    <Tooltip title={status}>
      <IconButton
        color={status === "connected" ? "success" : "default"}
        onClick={onClick}
      >
        <AccountBalanceWalletIcon />
      </IconButton>
    </Tooltip>
  );
}
