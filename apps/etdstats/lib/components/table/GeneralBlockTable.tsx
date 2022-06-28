import { Link } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Block } from "openapi_client";
import { useMemo } from "react";
//@ts-ignore
import { format } from "friendly-numbers";
import { StyledDataGrid } from "ui";
import { toETD } from "../../utils/toETD";

interface Props {
  data: Block[];
  isLoading: boolean;
}

const columns: GridColDef[] = [
  {
    headerName: "#",
    field: "id",
    flex: 4,
  },
  {
    field: "hash",
    headerName: "Hash",
    flex: 10,
    renderCell: (rowData) => (
      <Link href={`/tx/${rowData.value}`}>{rowData.value}</Link>
    ),
  },
  {
    headerName: "time",
    field: "timestamp",
    flex: 5,
  },
];

export default function GeneralBlockTable({ data, isLoading }: Props) {
  const rows = useMemo(() => {
    return data.map((block, index) => {
      return {
        id: block.numberInBase10,
        hash: block.hash,
        timestamp: block.timestamp,
      };
    });
  }, [data]);

  return (
    <StyledDataGrid
      loading={isLoading}
      columns={columns}
      autoHeight
      rows={rows}
      hideFooter={true}
      hideFooterPagination={true}
    />
  );
}
