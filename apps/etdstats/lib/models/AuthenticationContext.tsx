import axios from "axios";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
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
  const [accessToken, setAccessToken] = React.useState<string>();
  const { ethereum } = useMetaMask();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      setSignedIn(true);
    }
  }, []);

  const signOut = useCallback(async () => {
    setSignedIn(false);
    setAccessToken(undefined);
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
      sessionStorage.setItem("accessToken", token);
    } catch (e) {
      console.log("signIn error", e);
    }
  }, [ethereum]);

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
