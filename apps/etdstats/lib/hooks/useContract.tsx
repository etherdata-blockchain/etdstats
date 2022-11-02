import axios from "axios";
import { ContractService } from "openapi_client";
import { useQuery } from "react-query";

export function useContract({ page }: { page: number }) {
  const result = useQuery(["contracts", page], async () => {
    const analyticsService = new ContractService({
      client: axios,
      baseUrl: process.env.NEXT_PUBLIC_CONTRACT_API_ENDPOINT!,
    });
    const response = await analyticsService.listContracts(page);
    return response;
  });

  return {
    contracts: result,
  };
}
