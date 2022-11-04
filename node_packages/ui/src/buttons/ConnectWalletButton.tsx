import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  CircularProgress,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  chainId: string;
  rpc: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isSignedIn: boolean;
}

export function ConnectWalletButton({
  chainId,
  rpc,
  signIn,
  signOut,
  isSignedIn,
}: Props) {
  const { status, connect, addChain, account } = useMetaMask();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onClick = useCallback(
    async (e: any) => {
      if (isSignedIn) {
        setAnchorEl(e.currentTarget);
        return;
      }
      setLoading(true);
      try {
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
        await signIn();
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    },
    [status, isSignedIn]
  );

  return (
    <>
      <Fade in={status !== "unavailable"}>
        <Tooltip title={status}>
          <LoadingButton loading={loading}>
            <IconButton
              color={isSignedIn ? "success" : "default"}
              onClick={onClick}
            >
              <AccountBalanceWalletIcon />
            </IconButton>
          </LoadingButton>
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
          My Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/contract/create");
            setAnchorEl(null);
          }}
        >
          Upload a contract
        </MenuItem>
        {/* <MenuItem
          onClick={async () => {
            await router.push(`/user`);
            setAnchorEl(null);
          }}
        >
          Settings
        </MenuItem> */}
        <MenuItem
          onClick={async () => {
            await signOut();
            setAnchorEl(null);
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}
