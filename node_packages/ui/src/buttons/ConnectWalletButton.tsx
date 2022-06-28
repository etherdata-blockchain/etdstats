import React, { useCallback } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  Box,
  Fade,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Tooltip,
  Typography,
  List,
  ListItemButton,
  Card,
  Divider,
} from "@mui/material";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  chainId: string;
  rpc: string;
}

export function ConnectWalletButton({ chainId, rpc }: Props) {
  const { status, connect, addChain, account } = useMetaMask();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onClick = useCallback(
    async (e: any) => {
      if (status === "connected") {
        setAnchorEl(e.currentTarget);
        return;
      }
      let getUrl = window.location;
      let baseUrl =
        getUrl.protocol +
        "//" +
        getUrl.host +
        "/" +
        getUrl.pathname.split("/")[1];

      await connect();
      await addChain({
        chainId: chainId,
        chainName: "Etherdata Network",
        rpcUrls: [rpc],
        nativeCurrency: {
          name: "ETD",
          symbol: "ETD",
          decimals: 18,
        },
        blockExplorerUrls: [baseUrl],
      });
    },
    [status]
  );

  return (
    <>
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
      <Menu
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MenuItem
          onClick={async () => {
            await router.push(`/tx/${account}`);
            setAnchorEl(null);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem>Settings</MenuItem>
      </Menu>
    </>
  );
}
