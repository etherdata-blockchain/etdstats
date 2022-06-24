import { GetServerSideProps } from "next";
import {
  TransactionResponse,
  TransactionResult,
  TransactionService,
} from "openapi_client";
import { DownloadDataButton, SaveToFavoriteButton, ShareDataButton } from "ui";
import React from "react";
import Image from "next/image";
import axios from "axios";
import {
  Box,
  capitalize,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import TransactionDisplay from "../../lib/components/display/TransactionDisplay";

interface Props {
  data: TransactionResponse;
}

export default function Details({ data }: Props) {
  return (
    <Box p={5}>
      <Typography variant="h5" fontWeight={"bold"}>
        {capitalize(data.type)} Details
      </Typography>
      <Stack
        alignItems={"center"}
        p={3}
        direction="row"
        justifyContent={"space-between"}
        justifyItems={"center"}
      >
        <Box>
          <DownloadDataButton />
          <ShareDataButton />
        </Box>
        <Box>
          <SaveToFavoriteButton />
        </Box>
      </Stack>
      <TransactionDisplay data={data as TransactionResult} />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.params?.id!;
  const { page, per } = context.query;
  const service = new TransactionService({
    client: axios,
    baseUrl: process.env.API_ENDPOINT!,
  });
  const data = await service.fetchDetailsById(id as string);

  return {
    props: {
      data,
    },
  };
};
