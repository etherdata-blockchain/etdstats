import { Transaction } from "openapi_client";
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
import React, { useMemo } from "react";
//@ts-ignore
import { format } from "friendly-numbers";
import { toETD } from "../../utils/toETD";
import { StyledDataGrid } from "ui";

interface Props {
  data: Transaction[];
  isLoading: boolean;
}

const columns: GridColDef[] = [
  {
    headerName: "#",
    field: "id",
    flex: 1,
  },
  {
    field: "hash",
    headerName: "Hash",
    flex: 10,
    renderCell: (rowData) => (
      <Link
        data-testid="general-transaction-link"
        href={`/tx/${rowData.value}`}
      >
        {rowData.value}
      </Link>
    ),
  },
  {
    headerName: "time",
    field: "timestamp",
    flex: 5,
  },
  {
    field: "value",
    headerName: "Value",
    flex: 2,
    valueFormatter: (params) => {
      return format(toETD(params.value), {
        precision: 2,
        format: "short",
      });
    },
  },
];

export default function GeneralTransactionTable({ data, isLoading }: Props) {
  const rows = useMemo(() => {
    return data.map((transaction, index) => {
      return {
        id: index,
        hash: transaction.hash,
        value: toETD(transaction.value),
        timestamp: transaction.timestamp,
      };
    });
  }, [data]);

  return (
    <StyledDataGrid
      data-testid="general-transaction-table"
      loading={isLoading}
      columns={columns as any}
      autoHeight
      rows={rows}
      hideFooter={true}
      hideFooterPagination={true}
    />
  );
}
