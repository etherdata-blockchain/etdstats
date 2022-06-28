import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import {
  Box,
  Card,
  CardContent,
  Fab,
  Grid,
  Link,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserResult } from "openapi_client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Chip, StyledDataGrid } from "ui";
import { toETD } from "../../utils/toETD";
import StatisticsCard from "../card/StatisticsCard";
import TransferMoneyCard from "../card/TransferMoneyCard";
import UserContractCard from "../card/UserContractCard";
import {
  orange,
  deepBlue,
  deepGreen,
  deepOrange,
  blue,
  green,
} from "../../utils/colors";

interface Props {
  data: UserResult;
  id: string;
  currentPage: number;
}

interface Row {
  id: number;
  hash: string;
  type: "Sent" | "Received";
  value: string;
}

const columns: GridColDef[] = [
  {
    headerName: "#",
    field: "id",
    flex: 1,
    sortable: false,
  },
  {
    field: "hash",
    headerName: "Hash",
    flex: 4,
    sortable: false,
    renderCell: (rowData) => (
      <Link href={`/info/${rowData.value}`} noWrap>
        {rowData.value}
      </Link>
    ),
  },
  {
    field: "value",
    headerName: "Value",
    flex: 2,
    sortable: false,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 2,
    sortable: false,
    renderCell: (rowData) => {
      return (
        <Chip
          label={rowData.value}
          textColor={rowData.value === "Sent" ? deepOrange : undefined}
          backgroundColor={rowData.value === "Sent" ? orange : undefined}
        />
      );
    },
  },
];

export default function TransactionDisplay({ data, id, currentPage }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const statisticsData = useMemo(() => {
    return [
      {
        name: "Received",
        value: data.data.totalTransactionsReceived,
      },
      {
        name: "Sent",
        value: data.data.totalTransactionsSent,
      },
      {
        name: "Total",
        value: data.data.totalTransactions,
      },
    ];
  }, [data]);

  const rowData: Row[] = useMemo(() => {
    return data.data.transactions.map((transaction, index) => {
      const isSent: any = transaction.from === id;
      const type: any = isSent ? "Sent" : "Received";
      const value = !isSent
        ? toETD(transaction.value).toFixed(2)
        : "-" + toETD(transaction.value).toFixed(2);
      return {
        id: index,
        hash: transaction.hash,
        type,
        value: `${value} ETD`,
      };
    });
  }, [data, id]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(data.data.totalTransactions / data.data.itemsPerPage);
  }, [data]);

  const onPageChange = useCallback(
    async (page: number) => {
      setLoading(true);
      await router.push(`/info/${id}?page=${page}`, undefined, {
        scroll: false,
      });
      setPage(page);
      setLoading(false);
    },
    [data]
  );

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={4}>
        <Card sx={{ boxShadow: "none", backgroundColor: green }}>
          <CardContent>
            <Stack direction={"row"} justifyContent="space-between">
              <Box>
                <Typography color={deepGreen}>Received Count</Typography>
                <Typography variant="h5" fontWeight={"bold"} color={deepGreen}>
                  {data.data.totalTransactionsReceived}
                </Typography>
              </Box>
              <Box>
                <Fab
                  sx={{
                    boxShadow: "none",
                    backgroundColor: deepGreen,
                    color: green,
                    width: 48,
                    height: 48,
                  }}
                >
                  <CallReceivedIcon />
                </Fab>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ boxShadow: "none", backgroundColor: orange }}>
          <CardContent>
            <Stack direction={"row"} justifyContent="space-between">
              <Box>
                <Typography color={deepOrange}>Sent Count</Typography>
                <Typography variant="h5" fontWeight={"bold"} color={deepOrange}>
                  {data.data.totalTransactionsSent}
                </Typography>
              </Box>
              <Box>
                <Fab
                  sx={{
                    boxShadow: "none",
                    backgroundColor: deepOrange,
                    color: orange,
                    width: 48,
                    height: 48,
                  }}
                >
                  <CallMadeIcon />
                </Fab>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ boxShadow: "none", backgroundColor: blue }}>
          <CardContent>
            <Stack direction={"row"} justifyContent="space-between">
              <Box>
                <Typography color={deepBlue}>Balance</Typography>
                <Typography variant="h5" fontWeight={"bold"} color={deepBlue}>
                  {toETD(data.data.balance).toFixed(2)} ETD
                </Typography>
              </Box>
              <Box>
                <Fab
                  sx={{
                    boxShadow: "none",
                    backgroundColor: deepBlue,
                    color: blue,
                    width: 48,
                    height: 48,
                  }}
                >
                  <AccountBalanceWalletIcon />
                </Fab>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      {/* Left column */}
      <Grid item xs={12} md={8}>
        <Stack>
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
                <Pagination
                  count={Number.isNaN(pageCount) ? 0 : pageCount}
                  page={page}
                  onChange={async (e, page) => {
                    await onPageChange(page);
                  }}
                />
              </Stack>
              <StyledDataGrid
                loading={loading}
                columns={columns}
                autoHeight
                rows={rowData}
                hideFooter={true}
                hideFooterPagination={true}
                disableColumnFilter={true}
                disableColumnSelector={true}
              />
            </CardContent>
          </Card>
        </Stack>
      </Grid>
      {/* Right column */}
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <TransferMoneyCard toWalletAddress={id} />
          <StatisticsCard statisticsData={statisticsData} />
          <UserContractCard walletAddress={id} />
        </Stack>
      </Grid>
    </Grid>
  );
}
