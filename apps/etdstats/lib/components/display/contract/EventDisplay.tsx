import {
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Paper,
  Popover,
  Popper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Event } from "openapi_client";
import { Chip, StyledDataGrid } from "ui";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
  bindPopper,
} from "material-ui-popup-state/hooks";
import { bindPopover } from "material-ui-popup-state";

interface Props {
  events: Event[];
  total: number;
  page: number;
  onPageChange: (page: number) => void;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "event",
    headerName: "Event",
    flex: 4,
    renderCell: (value) => <Chip label={value.value} />,
  },
  {
    field: "blockTimestamp",
    headerName: "Timestamp",
    flex: 4,
    renderCell: (value) => (
      <Typography>
        {dayjs(Number(value.value) * 1000).format("YYYY-MM-DD:HH:mm:ss")}
      </Typography>
    ),
  },
  {
    field: "blockNumber",
    headerName: "Block Number",
    flex: 4,
    renderCell: (value) => (
      <Link href={`/tx/${value.value}`}>{Number(value.value)}</Link>
    ),
  },
  {
    field: "data",
    headerName: "Data",
    flex: 4,
    renderCell: (value) => <EventDataList items={value.value} id={value.id} />,
  },

  // {
  //   field: "transaction",
  //   headerName: "From",
  //   flex: 4,
  //   renderCell: (value) => (
  //     <Link href={value.value ? `/tx/${value.value}` : undefined}>
  //       {value.value}
  //     </Link>
  //   ),
  // },
];

export default function EventDisplay({
  total,
  events,
  page,
  onPageChange,
}: Props) {
  return (
    <Stack>
      <StyledDataGrid
        rows={events.map((e, i) => ({
          ...e,
          id: i + 1,
        }))}
        isRowSelectable={() => false}
        columns={columns as any}
        hideFooterPagination={true}
        autoHeight
        columnBuffer={columns.length}
        rowBuffer={20}
      />
      <Pagination
        count={total}
        page={page}
        onChange={(e, page) => onPageChange(page)}
      />
    </Stack>
  );
}

export function EventDataList({ items, id }: any) {
  const popupState = usePopupState({
    variant: "popover",
    popupId: `event-data-${id}`,
  });
  return (
    <>
      <Button onClick={(e) => popupState.open(e)}>Show Data</Button>
      <Popover {...bindPopover(popupState)}>
        <List>
          {items.map((item: any) => (
            <EventDataField
              name={item.name}
              value={item.value}
              type={item.type}
            />
          ))}
        </List>
      </Popover>
    </>
  );
}

export function EventDataField({
  name,
  value,
  type,
}: {
  name: string;
  value: string;
  type: string;
}) {
  return (
    <ListItem>
      <ListItemText
        primary={
          <Stack direction={"row"} spacing={2}>
            <Typography>{name}</Typography>
            <Chip label={type} />
          </Stack>
        }
        secondary={value}
      />
    </ListItem>
  );
}
