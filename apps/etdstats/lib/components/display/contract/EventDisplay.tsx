import {
  Card,
  CardContent,
  Link,
  Pagination,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { StyledDataGrid } from "ui";

interface Props {}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "event",
    headerName: "Event",
    flex: 4,
    renderCell: (value) => (
      <Link href={value.value ? `/contract/${value.value}` : undefined}>
        {value.row.name !== undefined && value.row.name.length > 0
          ? value.row.name
          : value.value}
      </Link>
    ),
  },
  {
    field: "value",
    headerName: "Value",
    flex: 4,
    renderCell: (value) => (
      <Link href={value.value ? `/tx/${value.value}` : undefined}>
        {value.value}
      </Link>
    ),
  },
  {
    field: "blockTimestamp",
    headerName: "Timestamp",
    flex: 4,
    renderCell: (value) => (
      <Link href={value.value ? `/tx/${value.value}` : undefined}>
        {value.value}
      </Link>
    ),
  },
  {
    field: "transaction",
    headerName: "From",
    flex: 4,
    renderCell: (value) => (
      <Link href={value.value ? `/tx/${value.value}` : undefined}>
        {value.value}
      </Link>
    ),
  },
];

export default function EventDisplay({}: Props) {
  return (
    <StyledDataGrid
      rows={[]}
      isRowSelectable={() => false}
      columns={columns as any}
      hideFooterPagination={true}
      autoHeight
      columnBuffer={columns.length}
      rowBuffer={20}
    />
  );
}
