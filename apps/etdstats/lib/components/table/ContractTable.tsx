import {
  Card,
  CardContent,
  Link,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { StyledDataGrid } from "ui";

interface Props {
  contracts: any[];
  isLoading: boolean;
  page: number;
  total: number;
  setPage: (page: number) => void;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "address",
    headerName: "Contract",
    flex: 4,
    renderCell: (value) => (
      <Link href={value.value ? `/contract/${value.value}` : undefined}>
        {value.row.name && value.row.name?.length > 0
          ? value.row.name
          : value.value}
      </Link>
    ),
  },
  {
    field: "creator",
    headerName: "Creator",
    flex: 4,
    renderCell: (value) => (
      <Link href={value.value ? `/tx/${value.value}` : undefined}>
        {value.value}
      </Link>
    ),
  },
  {
    field: "blockNumber",
    headerName: "Block Number",
    flex: 2,
    renderCell: (value) => (
      <Link href={value.value ? `/tx/${value.row.blockHash}` : undefined}>
        {Number(value.value)}
      </Link>
    ),
  },
  {
    field: "blockTime",
    headerName: "Block Time",
    flex: 2,
    renderCell: (value) => (
      <Typography>
        {dayjs(value.value * 1000).format("YYYY-MM-DD HH:mm:ss")}
      </Typography>
    ),
  },
  {
    field: "transactionHash",
    headerName: "Transaction Hash",
    flex: 4,
    renderCell: (value) => (
      <Link href={value.value ? `/tx/${value.value}` : undefined}>
        {value.value}
      </Link>
    ),
  },
];

export default function ContractTable({
  contracts,
  total,
  setPage,
  page,
}: Props) {
  return (
    <Card>
      <Tabs sx={{ backgroundColor: "rgb(244, 246, 248)" }} value="deployed">
        <Tab label="Deployed" value={"deployed"}></Tab>
      </Tabs>
      <CardContent>
        <Stack>
          <StyledDataGrid
            rows={contracts.map((contract, index) => ({
              ...contract,
              id: index + 1,
            }))}
            isRowSelectable={() => false}
            columns={columns as any}
            hideFooterPagination={true}
            autoHeight
            columnBuffer={columns.length}
            rowBuffer={20}
          />
          <Stack direction={"row"} justifyContent="flex-end">
            <Pagination
              count={total}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
