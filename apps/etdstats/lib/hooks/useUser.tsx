import { useMetaMask } from "metamask-react";
import { UserInfo } from "openapi_client";
import React, { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import UserABI from "./user.abi.json";

export function useUser() {
  const { ethereum, status, account } = useMetaMask();
  const isAvailable = useMemo(() => {
    return status === "connected";
  }, [status]);

  const userInfo = useQuery<UserInfo>([`user-info`, account], async () => {
    if (!account) {
      return undefined;
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      UserABI.abi,
      signer
    );
    const user = await contract.getUser(account);
    return user
      ? JSON.parse(user)
      : { username: "", avatar: "", description: "" };
  });

  const updateUser = useCallback(
    async (data: UserInfo) => {
      if (!account) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        UserABI.abi,
        signer
      );
      const result = await contract.updateUser(JSON.stringify(data));
      await result.wait();
    },
    [account, ethereum]
  );

  return { isAvailable, userInfo, updateUser };
}
