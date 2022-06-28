import { Box, capitalize, Stack, Typography } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { TransactionResponse, TransactionService } from "openapi_client";
import { useEffect } from "react";
import {
  Breadcrumbs,
  DownloadDataButton,
  SaveToFavoriteButton,
  ShareDataButton,
} from "ui";
import BlockDisplay from "../../lib/components/display/BlockDisplay";
import TransactionDisplay from "../../lib/components/display/TransactionDisplay";
import UserDisplay from "../../lib/components/display/UserDisplay";
import { db } from "../../lib/models/SearchModel";

interface Props {
  data: TransactionResponse;
  id: string;
  currentPage: number;
}

export default function Details({ data, id, currentPage }: Props) {
  useEffect(() => {
    (async () => {
      if ((await db.searchResults.where("id").equals(id).count()) === 0) {
        await db.searchResults.add({ id, result: data });
      }
    })();
  }, [id]);

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
    <Box mt={10}>
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
          <DownloadDataButton id={id} data={data} />
          <ShareDataButton data={data} />
        </Box>
        <Box>
          <SaveToFavoriteButton />
        </Box>
      </Stack>
      {data.type === "transaction" && <TransactionDisplay data={data} />}
      {data.type === "block" && <BlockDisplay data={data} />}
      {data.type === "user" && (
        <UserDisplay data={data} id={id} currentPage={currentPage} />
      )}
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
    baseUrl: process.env.TRANSACTION_API_ENDPOINT ?? process.env.API_ENDPOINT!,
  });

  const param = {
    page: parseInt(page as string),
    per: parseInt(per as string),
  };

  try {
    const data = await service.fetchDetailsById(id as string, param);
    return {
      props: {
        data,
        id: id as string,
        currentPage: Number.isNaN(param.page) ? 0 : param.page,
      },
    };
  } catch (err: any) {
    console.error(err.response?.data);
  }

  return {
    notFound: true,
  };
};
