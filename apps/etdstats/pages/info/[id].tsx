import { GetServerSideProps } from "next";
import {
  TransactionResponse,
  TransactionResult,
  TransactionService,
} from "openapi_client";
import {
  Breadcrumbs,
  DownloadDataButton,
  SaveToFavoriteButton,
  ShareDataButton,
} from "ui";
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
import BlockDisplay from "../../lib/components/display/BlockDisplay";

interface Props {
  data: TransactionResponse;
}

export default function Details({ data }: Props) {
  const menus = [
    {
      title: "Home",
    },
    {
      title: "Info",
    },
    {
      title: data.type,
    },
  ];

  return (
    <Box p={5}>
      <Typography variant="h5" fontWeight={"bold"}>
        {capitalize(data.type)} Details
      </Typography>
      <Box mt={2}>
        <Breadcrumbs menus={menus} />
      </Box>
      <Stack
        alignItems={"center"}
        mt={2}
        mb={3}
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
      {data.type === "transaction" && <TransactionDisplay data={data} />}
      {data.type === "block" && <BlockDisplay data={data} />}
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

  try {
    const data = await service.fetchDetailsById(id as string);
    return {
      props: {
        data,
      },
    };
  } catch (err: any) {
    let status = err.response.status;
    console.log(status);
  }

  return {
    notFound: true,
  };
};
