import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { BlockResult } from "openapi_client";
import React from "react";
import { Chip, ListItemButton, StyledDataGrid } from "ui";
import dayjs from "dayjs";
import { toETD, toWei } from "../../utils/toETD";
//@ts-ignore
import { format } from "friendly-numbers";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  data: BlockResult;
}

const columns: GridColDef[] = [
  {
    headerName: "#",
    field: "id",
    flex: 1,
  },
  {
    field: "Hash",
    headerName: "Hash",
    flex: 5,
  },
  {
    field: "Value",
    headerName: "Value",
    flex: 4,
    valueFormatter: (params) => {
      return format(toETD(params.value), {
        precision: 2,
        format: "short",
      });
    },
  },
];

export default function TransactionDisplay({ data }: Props) {
  return (
    <Stack spacing={5}>
      <Card>
        <CardContent>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
            spacing={2}
          >
            <Stack
              direction={"row"}
              justifyItems="center"
              alignItems={"center"}
            >
              <Image
                src="/BlockIcon.webp"
                alt="Block Logo"
                width={80}
                height={80}
              />
              <Typography
                variant="caption"
                textTransform={"uppercase"}
                fontWeight={800}
              >
                Info
              </Typography>
            </Stack>
            <Stack alignItems={"flex-end"} spacing={1}>
              <Box>
                <Chip label={"Block Hash"} />
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
                title="Block Number"
                subtitle={data.data.number}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListItemButton
                title="Timestamp"
                subtitle={dayjs(data.data.timestamp).format(
                  "YYYY MMM DD, hh:mm:ss a"
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListItemButton
                title="Parent Block"
                subtitle={data.data.parentHash}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListItemButton title="Miner" subtitle={data.data.miner} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
            spacing={2}
          >
            <Stack
              direction={"row"}
              justifyItems="center"
              alignItems={"center"}
            >
              <Image
                src="/EstimateIcon.webp"
                alt="Estimate Logo"
                width={80}
                height={80}
              />
              <Typography
                variant="caption"
                textTransform={"uppercase"}
                fontWeight={800}
              >
                Stats
              </Typography>
            </Stack>
          </Stack>
          <Grid container mt={4} spacing={3}>
            <Grid item xs={12} md={6}>
              <ListItemButton
                title="Difficulty"
                subtitle={format(data.data.totalDifficulty)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListItemButton
                title="Gas Used"
                subtitle={`${toWei(data.data.gasUsed)} wei`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListItemButton
                title="Gas Limit"
                subtitle={`${toWei(data.data.gasLimit)} wei`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListItemButton title="Size" subtitle={format(data.data.size)} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
            spacing={2}
          >
            <Stack
              direction={"row"}
              justifyItems="center"
              alignItems={"center"}
            >
              <Image
                src="/SpreadsheetIcon.webp"
                alt="Estimate Logo"
                width={80}
                height={80}
              />
              <Typography
                variant="caption"
                textTransform={"uppercase"}
                fontWeight={800}
              >
                Transactions
              </Typography>
            </Stack>
          </Stack>
          <StyledDataGrid
            columns={columns}
            autoHeight
            rows={[]}
            hideFooter={true}
            hideFooterPagination={true}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
