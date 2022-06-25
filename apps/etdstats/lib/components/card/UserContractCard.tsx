import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import PendingView from "../view/PendingView";

interface Props {
  walletAddress: string;
}

export default function UserContractCard(props: Props) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography fontWeight={800}>Contacts</Typography>
          <Typography variant="body2" color={"gray"}>
            Recently sent transactions to this address
          </Typography>
          <PendingView />
        </Stack>
      </CardContent>
    </Card>
  );
}
