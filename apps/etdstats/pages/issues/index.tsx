import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { useState } from "react";
import TicketTable from "../../lib/components/table/TicketTable";
import useTicket, { Status } from "../../lib/hooks/useTicket";

export default function index() {
  const [value, setValue] = useState<Status>("open");

  const router = useRouter();
  const { account } = useMetaMask();
  const { tickets } = useTicket({ filter: value });

  return (
    <Stack mt={10}>
      <Stack direction={"row"} justifyContent="space-between">
        <Typography variant="h6" sx={{ mb: 5 }} fontWeight="bold">
          Tickets
        </Typography>
        <Box>
          {account && (
            <Button
              onClick={() => router.push("/issues/create")}
              variant="contained"
            >
              Create a ticket
            </Button>
          )}
        </Box>
      </Stack>
      <TicketTable
        tickets={tickets.data ?? []}
        selection={value}
        onChange={(value) => setValue(value)}
      />
    </Stack>
  );
}
