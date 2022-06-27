import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { blue, green as muiGreen } from "@mui/material/colors";
import Image from "next/image";
import { PieChart, StyledDataGrid } from "ui";
import DataCard from "../../lib/components/card/DataCard";
import GeneralBlockTable from "../../lib/components/table/GeneralBlockTable";
import GeneralTransactionTable from "../../lib/components/table/GeneralTransactionTable";
import { useAnalytics } from "../../lib/hooks/useAnalytics";
import { useBlockInfo } from "../../lib/hooks/useBlockInfo";
import { green } from "../../lib/utils/colors";

interface Props {}

export default function Index(props: Props) {
  const analyticsResult = useAnalytics();
  const { blockInfoResult, blocksResult, transactionsResult } = useBlockInfo({
    blockPage: 1,
    transactionPage: 1,
  });

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
            number={blockInfoResult.data?.numBlocks}
            icon={
              <Image src="/BlockIcon2.webp" width={"100%"} height={"100%"} />
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DataCard
            title="Total Transactions"
            number={blockInfoResult.data?.numTransactions}
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
            number={analyticsResult.data?.total}
            icon={<Image src="/UserIcon.webp" width={"100%"} height={"100%"} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card style={{ height: "100%" }}>
            <Box p={3}>
              <Typography fontWeight={800} fontSize={20}>
                Vistors statistics
              </Typography>
              <Box minHeight="500px">
                <PieChart
                  data={[
                    { name: "Mobile", value: analyticsResult.data?.mobile },
                    { name: "Desktop", value: analyticsResult.data?.desktop },
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
              <Box minHeight="500px">
                <GeneralBlockTable
                  data={blocksResult.data?.items ?? []}
                  isLoading={blocksResult.status === "loading"}
                />
              </Box>
              <Stack direction={"row"} justifyContent="flex-end" p={2}>
                <Box>
                  <Button>View All Blocks</Button>
                </Box>
              </Stack>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <Box p={3}>
              <Typography fontWeight={800} fontSize={20}>
                Latest Transactions
              </Typography>
              <Box minHeight="500px">
                <GeneralTransactionTable
                  data={transactionsResult.data?.items ?? []}
                  isLoading={transactionsResult.status === "loading"}
                />
              </Box>
              <Stack direction={"row"} justifyContent="flex-end" p={2}>
                <Box>
                  <Button>View All Transactions</Button>
                </Box>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
