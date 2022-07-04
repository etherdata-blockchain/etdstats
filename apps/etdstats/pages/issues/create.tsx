import { Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import TicketDisplay from "../../lib/components/display/TicketInfoDisplay";

interface Props {
  relatedHashId?: string;
}

export default function index(props: Props) {
  return (
    <Stack mt={10}>
      <Typography variant="h6" sx={{ mb: 5 }} fontWeight="bold">
        Create a ticket
      </Typography>
      <TicketDisplay relatedHashId={props.relatedHashId} />
    </Stack>
  );
}
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { relatedHashId } = ctx.query;

  const data: Props = {
    relatedHashId: relatedHashId as string,
  };

  return {
    props: JSON.parse(JSON.stringify(data)),
  };
};
