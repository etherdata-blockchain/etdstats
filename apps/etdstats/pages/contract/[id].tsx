import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { GetServerSideProps, NextPage } from "next";
import { ListItemButton } from "ui";
import Image from "next/image";
import { Contract, ContractService } from "openapi_client";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import ABIDisplay from "../../lib/components/display/contract/ABIDisplay";
import SourceDisplay from "../../lib/components/display/contract/SourceDisplay";
import EventDisplay from "../../lib/components/display/contract/EventDisplay";

interface Props {
  contract: Contract;
}

const Index: NextPage<Props> = ({ contract }) => {
  const [value, setValue] = useState("events");

  const router = useRouter();
  const navTo = useCallback(async (id: string) => {
    await router.push(`/tx/${id}`);
  }, []);

  return (
    <Stack mt={10} spacing={5}>
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
                src="/contract.webp"
                alt="Block Logo"
                width={80}
                height={80}
              />
              <Typography
                variant="caption"
                textTransform={"uppercase"}
                fontWeight={800}
              >
                Info
              </Typography>
            </Stack>
            <Stack alignItems={"flex-end"} spacing={1}>
              <Box>
                <Chip label={"Contract Hash"} />
              </Box>
              <Typography
                sx={{
                  width: { sm: 300, xs: 100 },
                  wordWrap: "break-word",
                }}
                fontWeight="bold"
              >
                {contract.address}
              </Typography>
            </Stack>
          </Stack>
          <Grid container mt={4} spacing={3}>
            <Grid item xs={12} md={6}>
              <ListItemButton title="Name" subtitle={contract.name} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListItemButton title="Creator" subtitle={contract.creator} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListItemButton
                title="Last scanned block"
                subtitle={`${contract.lastScannedBlock}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListItemButton
                data-testid="block-hash"
                title="Block Hash"
                subtitle={contract.blockHash}
                onClick={() => navTo(contract.blockHash)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <Tabs
          sx={{ backgroundColor: "rgb(244, 246, 248)" }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Tab label="Events" value={"events"}></Tab>
          <Tab label="Source" value={"source"}></Tab>
          <Tab label="ABI" value={"abi"}></Tab>
        </Tabs>
        <CardContent>
          {value === "events" && <EventDisplay />}
          {value === "source" && <SourceDisplay source={contract.source} />}
          {value === "abi" && <ABIDisplay abi={contract.abi} />}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const service = new ContractService({
    baseUrl: process.env.NEXT_PUBLIC_CONTRACT_API_ENDPOINT!,
    client: axios,
  });

  const contract = await service.getContract(context.params?.id as string);

  return {
    props: {
      contract: JSON.parse(JSON.stringify(contract)),
    },
  };
};
