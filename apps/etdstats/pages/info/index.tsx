import {
  Card,
  Grid,
  CardContent,
  Box,
  Stack,
  Typography,
  Button,
  Fab,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { PieChart, StyledDataGrid } from "ui";
import DataCard from "../../lib/components/card/DataCard";
import { deepGreen, green, deepOrange } from "../../lib/utils/colors";
import { green as muiGreen, blue } from "@mui/material/colors";
import GeneralTransactionTable from "../../lib/components/table/GeneralTransactionTable";

export default function Index() {
  return (
    <Box mt={10} p={2}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
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
                    Welcome back!
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    ETDStats Info
                  </Typography>
                  <Typography variant="body2" maxWidth={"70%"}>
                    ETDStats is a decentralized application that tracks the ETD
                    Blockchain Network
                  </Typography>
                  <Box>
                    <Button variant="contained">Check Network Stats</Button>
                  </Box>
                </Stack>
                <Box>
                  <Image src={"/IntroIcon.webp"} height={200} width={200} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card style={{ height: "100%" }}>
            <CardContent>
              <Stack justifyContent={"center"} alignItems="center">
                <Image src="/DocumentIcon.png" width={150} height={150} />
                <Button>Check Out the API Documentation</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <DataCard
            title="Total Blocks"
            number={2000000}
            icon={
              <Image src="/BlockIcon2.webp" width={"100%"} height={"100%"} />
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DataCard
            title="Total Transactions"
            number={2000000}
            icon={
              <Image
                src="/TransactionIcon2.webp"
                width={"100%"}
                height={"100%"}
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DataCard
            title="Total Visitors"
            number={2000000}
            icon={<Image src="/UserIcon.webp" width={"100%"} height={"100%"} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <Box p={3}>
              <Typography fontWeight={800} fontSize={20}>
                Vistors statistics
              </Typography>
              <Box height="500px">
                <PieChart
                  data={[
                    { name: "Mobile", value: 400 },
                    { name: "Desktop", value: 300 },
                  ]}
                  colors={[muiGreen[700], blue[600]]}
                  selectedFillColor={green}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <Box p={3}>
              <Typography fontWeight={800} fontSize={20}>
                Latest Block
              </Typography>
              <Box height="500px">
                <StyledDataGrid
                  rows={[]}
                  columns={[]}
                  hideFooterPagination={true}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <Box p={3}>
              <Typography fontWeight={800} fontSize={20}>
                Latest Transactions
              </Typography>
              <Box height="500px">
                <GeneralTransactionTable data={[]} />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
