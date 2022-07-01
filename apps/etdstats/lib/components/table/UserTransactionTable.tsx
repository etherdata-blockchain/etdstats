import { Transaction } from "openapi_client";
import React, { useMemo } from "react";
import { Chip, StyledDataGrid } from "ui";
import { deepOrange, orange } from "../../utils/colors";
import { GridColDef } from "@mui/x-data-grid";
import { Link } from "@mui/material";
import { toETD } from "../../utils/toETD";

interface Props {
  address: string;
  transactions: Transaction[];
  isLoading: boolean;
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
      <Link href={`/tx/${rowData.value}`} noWrap>
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

export default function UserTransactionTable({
  transactions,
  isLoading,
  address,
}: Props) {
  const rowData: Row[] = useMemo(() => {
    return transactions.map((transaction, index) => {
      const isSent: any =
        transaction.from.toLowerCase() === address.toLowerCase();
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
  }, [transactions, address]);

  return (
    <StyledDataGrid
      columnBuffer={columns.length}
      loading={isLoading}
      columns={columns}
      autoHeight
      rows={rowData}
      hideFooter={true}
      hideFooterPagination={true}
      disableColumnFilter={true}
      disableColumnSelector={true}
    />
  );
}
