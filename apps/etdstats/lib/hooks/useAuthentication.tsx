import { useContext } from "react";
import { AuthenticationContext } from "../models/AuthenticationContext";

export default function useAuthentication() {
  const { signIn, isSignedIn, accessToken, signOut } = useContext(
    AuthenticationContext
  );

  return {
    signIn,
    isSignedIn,
    accessToken,
    signOut,
  };
}
