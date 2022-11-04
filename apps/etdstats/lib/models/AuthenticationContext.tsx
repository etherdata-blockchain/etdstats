import axios from "axios";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect } from "react";

interface MetaMaskContextInterface {
  isSignedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  accessToken?: string;
}

//@ts-ignore
export const AuthenticationContext =
  //@ts-ignore
  React.createContext<MetaMaskContextInterface>();

export function AuthenticationProvider({ children }: any) {
  const [signedIn, setSignedIn] = React.useState(false);
  const [previousAccount, setPreviousAccount] = React.useState("");
  const [accessToken, setAccessToken] = React.useState<string>();
  const { ethereum, account } = useMetaMask();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const previousAccount = sessionStorage.getItem("account");
    if (token) {
      setAccessToken(token);
      setSignedIn(true);
      setPreviousAccount(previousAccount || "");
    }
  }, []);

  useEffect(() => {
    console.log("previousAccount", previousAccount);
    console.log("account", account);

    if (account === null) {
      return;
    }

    if (previousAccount.length === 0) {
      return;
    }

    if (account.toLowerCase() !== previousAccount.toLowerCase()) {
      console.log("account changed", account, previousAccount);
      enqueueSnackbar("MetaMask account changed, Login is required!", {
        variant: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      signOut();
    }
  }, [account, previousAccount]);

  const signOut = useCallback(async () => {
    setSignedIn(false);
    setAccessToken(undefined);
    setPreviousAccount("");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("previousAccount");
  }, []);

  const signIn = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const message = await signer.signMessage("signIn");

      const data = {
        message: "signIn",
        signature: message,
        address: await signer.getAddress(),
      };

      const result = await axios.post(
        "https://functions.video2.trade/api/metamask/signIn",
        data
      );
      const token = result.data.accessToken;
      setSignedIn(true);
      setAccessToken(token);
      setPreviousAccount(account || "");
      sessionStorage.setItem("account", await signer.getAddress());
      sessionStorage.setItem("accessToken", token);
    } catch (e) {
      console.log("signIn error", e);
    }
  }, [ethereum, account]);

  const values: MetaMaskContextInterface = {
    isSignedIn: signedIn,
    signIn,
    signOut,
    accessToken,
  };

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
}
