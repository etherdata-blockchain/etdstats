import axios from "axios";
import { ContractService } from "openapi_client";
import { useCallback } from "react";
import { useQuery } from "react-query";
import useAuthentication from "./useAuthentication";

export function useContract({ page }: { page: number }) {
  const { accessToken } = useAuthentication();

  const result = useQuery(["contracts", page], async () => {
    const analyticsService = new ContractService({
      client: axios,
      baseUrl: process.env.NEXT_PUBLIC_CONTRACT_API_ENDPOINT!,
    });
    const response = await analyticsService.listContracts(page);
    return response;
  });

  const search = useCallback(
    async (keyword: string) => {
      const analyticsService = new ContractService({
        client: axios,
        baseUrl: process.env.NEXT_PUBLIC_CONTRACT_API_ENDPOINT!,
      });

      const response = await analyticsService.searchContracts(
        keyword,
        accessToken ?? ""
      );
      return response;
    },
    [accessToken]
  );

  const update = useCallback(
    async (value: any) => {
      if (!accessToken) {
        console.log(accessToken);
        throw new Error("login is required");
      }
      const analyticsService = new ContractService({
        client: axios,
        baseUrl: process.env.NEXT_PUBLIC_CONTRACT_API_ENDPOINT!,
      });
      await analyticsService.updateContract(
        {
          ...value,
          abi: JSON.parse(value.abi),
        },
        accessToken
      );
    },
    [accessToken]
  );

  const getContract = useCallback(
    async (address: string) => {
      const analyticsService = new ContractService({
        client: axios,
        baseUrl: process.env.NEXT_PUBLIC_CONTRACT_API_ENDPOINT!,
      });
      const response = await analyticsService.getContract(address);
      return response;
    },
    [accessToken]
  );

  return {
    contracts: result,
    search,
    update,
    getContract,
  };
}
