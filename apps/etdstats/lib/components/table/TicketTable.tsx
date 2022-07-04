import { Card, CardContent, Link, Tab, Tabs, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Chip, StyledDataGrid } from "ui";
import useTicket, { Status, Ticket } from "../../hooks/useTicket";

interface Props {
  tickets: Ticket[];
  selection: Status;
  onChange: (selection: Status) => void;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "title",
    headerName: "Title",
    flex: 2,
  },
  {
    field: "relatedHash",
    headerName: "Related Hash",
    flex: 4,
    renderCell: (value) => (
      <Link href={value.value ? `/tx/${value.value}` : undefined}>
        {value.value ?? "None"}
      </Link>
    ),
  },
  {
    field: "author",
    headerName: "Author",
    flex: 4,
    renderCell: (value) => (
      <Link href={`/tx/${value.value}`}>{value.value}</Link>
    ),
  },
  {
    field: "time",
    headerName: "Time",
    flex: 2,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 2,
    renderCell: (value) => {
      const textColors: any = {
        open: "#1890ff",
        solved: "#007b55",
        closed: "#f4f6f8",
        failed: "#ff4842",
      };
      const backgroundColors: any = {
        open: "#d0f2ff",
        solved: "#c8facd",
        closed: "#919eab",
        failed: "#ffe7d9",
      };

      return (
        <Chip
          label={value.value}
          textColor={textColors[value.value]}
          backgroundColor={backgroundColors[value.value]}
        />
      );
    },
  },
];

export default function TicketTable({ selection, tickets, onChange }: Props) {
  const rows = useMemo(() => {
    return tickets.map((ticket, index) => ({
      id: index,
      ...ticket,
      time: dayjs((ticket.time as any).toDate()).format("YYYY-MM-DD"),
    }));
  }, [tickets]);

  return (
    <Card>
      <Tabs
        sx={{ backgroundColor: "rgb(244, 246, 248)" }}
        onChange={(e, value) => onChange(value as Status)}
        value={selection}
      >
        <Tab label="Open" value={"open"}></Tab>
        <Tab label="Solved" value={"solved"}></Tab>
        <Tab label="Closed" value={"closed"}></Tab>
        <Tab label="Failed" value={"failed"}></Tab>
      </Tabs>
      <CardContent>
        <Box>
          <StyledDataGrid
            rows={rows ?? []}
            isRowSelectable={() => false}
            columns={columns as any}
            hideFooterPagination={true}
            autoHeight
            columnBuffer={columns.length}
            rowBuffer={20}
          />
          <Typography>
            Rencently {selection} 20 tickets will be displayed here
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
