import React from "react";
import { useQuery } from "react-query";
import { BlockInfoService, BlockInfoResponse } from "openapi_client";
import axios from "axios";
interface Props {
  blockPage?: number;
  transactionPage?: number;
}

export function useBlockInfo(props: Props) {
  const blockInfoService = new BlockInfoService({
    client: axios,
    baseUrl: process.env.NEXT_PUBLIC_BLOCK_INFO_API_ENDPOINT!,
  });

  const blockInfoResult = useQuery(
    "blockInfo",
    async () => {
      const response = await blockInfoService.info();
      return response;
    },
    { refetchInterval: 10000 }
  );

  const blocksResult = useQuery(
    ["blocks", props.blockPage],
    async () => {
      const response = await blockInfoService.blocks({ page: props.blockPage });
      return response;
    },
    { refetchInterval: 10000 }
  );

  const transactionsResult = useQuery(
    ["transactions", props.transactionPage],
    async () => {
      const response = await blockInfoService.transactions({
        page: props.transactionPage,
      });
      return response;
    },
    { refetchInterval: 10000 }
  );

  return { blockInfoResult, transactionsResult, blocksResult };
}
