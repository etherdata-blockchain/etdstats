import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";
import React from "react";
import ContractTable from "../../lib/components/table/ContractTable";
import { green } from "../../lib/utils/colors";
import Image from "next/image";
import { useContract } from "../../lib/hooks/useContract";

const Index: NextPage = () => {
  const [page, setPage] = React.useState(1);
  const { contracts } = useContract({ page: page });

  return (
    <Container>
      <Stack mt={10}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card sx={{ backgroundColor: green }}>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems="center"
                  p={2}
                >
                  <Stack spacing={2}>
                    <Typography variant="h5" fontWeight={600}>
                      Contracts
                    </Typography>

                    <Typography variant="body2" maxWidth={"70%"}>
                      You can view all the contracts on the ETD Blockchain
                      Network here. You can also check how to upload your own
                      contracts by clicking the button below.
                    </Typography>
                    <Box>
                      <Button variant="contained">Check how to deploy</Button>
                    </Box>
                  </Stack>
                  <Box>
                    <Image
                      alt=""
                      src={"/contract.webp"}
                      height={200}
                      width={200}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <Stack justifyContent={"center"} alignItems="center">
                  <Typography fontWeight={"bold"}>
                    Total number of contracts
                  </Typography>
                  <Image
                    alt="total"
                    src="/total.webp"
                    width={150}
                    height={150}
                  />
                  <Typography variant="h3">
                    {contracts.data?.metadata.total}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={5}>
          <ContractTable
            contracts={contracts.data?.items ?? []}
            isLoading={contracts.isLoading}
            page={page}
            setPage={(page) => setPage(page)}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default Index;
