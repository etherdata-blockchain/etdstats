import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { TransactionResult } from "openapi_client";
import React, { useCallback } from "react";
import { Chip, ListItemButton } from "ui";
import { toETD, toWei } from "../../../utils/toETD";

interface Props {
  data: TransactionResult;
}

export default function TransactionDisplay({ data }: Props) {
  const router = useRouter();
  const status = React.useMemo(() => {
    if (data.data.blockHash === undefined) {
      return "pending";
    }
    return "confirmed";
  }, [data]);

  const navTo = useCallback(async (id: string) => {
    console.log("navTo", id);
    await router.push(`/tx/${id}`);
  }, []);

  return (
    <Card>
      <CardContent>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent={"space-between"}
          spacing={2}
        >
          <Stack direction={"row"} justifyItems="center" alignItems={"center"}>
            <Image
              src="/TransactionIcon.webp"
              alt="Transaction Logo"
              width={80}
              height={80}
            />
          </Stack>
          <Stack alignItems={"flex-end"} spacing={1}>
            <Box>
              <Chip label={status} />
            </Box>
            <Typography
              sx={{
                width: { sm: 300, xs: 100 },
                wordWrap: "break-word",
              }}
              fontWeight="bold"
            >
              {data.data.hash}
            </Typography>
          </Stack>
        </Stack>
        <Grid container mt={4} spacing={3}>
          <Grid item xs={12} md={6}>
            <ListItemButton
              data-testid="transaction-from"
              title="Transaction From"
              subtitle={data.data.fromUserInfo?.username ?? data.data.from}
              tooltip={
                data.data.fromUserInfo?.username ? data.data.from : undefined
              }
              onClick={() => navTo(data.data.from)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ListItemButton
              data-testid="transaction-to"
              title="Transaction To"
              subtitle={data.data.toUserInfo?.username ?? data.data.to}
              tooltip={
                data.data.toUserInfo?.username ? data.data.to : undefined
              }
              onClick={() => navTo(data.data.to)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ListItemButton
              title="Block"
              subtitle={data.data.blockHash}
              onClick={async () => navTo(data.data.blockHash)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ListItemButton title="Timestamp" subtitle={data.data.timestamp} />
          </Grid>
        </Grid>
        <Box p={2}>
          <Card variant="outlined" sx={{ boxShadow: "none" }}>
            <CardContent>
              <Stack>
                <Typography
                  textTransform={"uppercase"}
                  variant="caption"
                  color={"rgb(145, 158, 171)"}
                  fontWeight={"700"}
                >
                  Input
                </Typography>
                <Typography width="70%" style={{ wordWrap: "break-word" }}>
                  {data.data.input}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Stack spacing={3} alignItems={"flex-end"}>
          <Stack>
            <Typography
              variant="body1"
              fontSize={"1rem"}
              lineHeight={1.5}
              fontWeight={400}
            >
              Gas Fee: {toWei(data.data.gas as any)} Wei
            </Typography>
            <Typography
              variant="body1"
              fontSize={"1rem"}
              lineHeight={1.5}
              fontWeight={400}
            >
              Gas Price: {toWei(data.data.gasPrice)} Wei
            </Typography>
            <Typography
              variant="body1"
              fontSize={"1rem"}
              lineHeight={1.5}
              fontWeight={800}
            >
              Value: {toETD(data.data.value)} ETD
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
