import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { green } from "../lib/utils/colors";
import Image from "next/image";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Box mt={10}>
      <Grid container>
        <Grid md={8}>
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
                    Etherdata Domain Name Service
                  </Typography>
                  <Typography variant="body2" maxWidth={"70%"}>
                    Etherdata Domain Name Service can be used to register and
                    manage domain names on the Etherdata blockchain.
                  </Typography>
                  <Box>
                    <Button
                      variant="contained"
                      onClick={() => router.push("/ens")}
                    >
                      Register your domain now!
                    </Button>
                  </Box>
                </Stack>
                <Box>
                  <Image src={"/IntroIcon.webp"} height={200} width={200} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
