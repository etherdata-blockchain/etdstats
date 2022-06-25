import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import PendingView from "../view/PendingView";

interface Props {
  toWalletAddress: string;
}

export default function TransferMoneyCard(props: Props) {
  return (
    <Card sx={{ backgroundColor: "rgb(244, 246, 248)" }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography fontWeight={800}>Quick Transfer</Typography>
          <Typography
            textTransform={"uppercase"}
            variant="caption"
            color={"rgb(99, 115, 129)"}
            fontWeight={700}
          >
            Insert Amount
          </Typography>
          <PendingView />
          <Button variant="contained">Transfer</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
