import React, { useCallback } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Fade, IconButton, Tooltip } from "@mui/material";
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
    <Fade in={status !== "unavailable"}>
      <Tooltip title={status}>
        <IconButton
          color={status === "connected" ? "success" : "default"}
          onClick={onClick}
        >
          <AccountBalanceWalletIcon />
        </IconButton>
      </Tooltip>
    </Fade>
  );
}
