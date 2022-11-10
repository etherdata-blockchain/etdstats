import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function useContractNames(source: string) {
  const names = useQuery(["contractNames", source], async () => {
    if (source === null || source === "") {
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_CONTRACT_NAMES_ENDPOINT;
    const result = await axios.post<{ names: string[] }>(`${endpoint}`, {
      source,
    });

    return result.data.names;
  });

  return names;
}
