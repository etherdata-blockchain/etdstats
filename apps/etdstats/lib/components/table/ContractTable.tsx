import { Card, CardContent, Link, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { Chip, StyledDataGrid } from "ui";

interface Props {
  contracts: any[];
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "address",
    headerName: "Contract address",
    flex: 4,
    renderCell: (value) => (
      <Link href={value.value ? `/contract/${value.value}` : undefined}>
        {value.value ?? "None"}
      </Link>
    ),
  },
];

export default function ContractTable({ contracts }: Props) {
  return (
    <Card>
      <Tabs sx={{ backgroundColor: "rgb(244, 246, 248)" }} value="deployed">
        <Tab label="Deployed" value={"deployed"}></Tab>
      </Tabs>
      <CardContent>
        <Box>
          <StyledDataGrid
            rows={contracts}
            isRowSelectable={() => false}
            columns={columns as any}
            hideFooterPagination={true}
            autoHeight
            columnBuffer={columns.length}
            rowBuffer={20}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
