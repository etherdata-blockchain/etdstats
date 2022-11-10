import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function useContractNames(source: string, name: string) {
  const names = useQuery(["contractNames", source], async () => {
    if (source === null || source === "") {
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_CONTRACT_NAMES_ENDPOINT;
    const result = await axios.post<{ names: string[] }>(`${endpoint}`, {
      source,
    });

    let names = result.data.names;
    let found = names.find((n) => n === name);
    if (!found) {
      names = [name, ...names];
    }
    return names;
  });

  return names;
}
