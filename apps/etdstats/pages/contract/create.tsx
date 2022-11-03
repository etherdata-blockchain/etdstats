import Editor from "@monaco-editor/react";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Autocomplete,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Fade,
  Grid,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { Contract } from "openapi_client";
import { useState } from "react";
import { useContract } from "../../lib/hooks/useContract";

const Index: NextPage = () => {
  const { search, update, getContract } = useContract({ page: 1 });
  const { enqueueSnackbar } = useSnackbar();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [contract, setContract] = useState<Contract>();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      source: "",
      abi: "",
      compiler: "",
      address: "",
    },
    onSubmit: async (values) => {
      if (
        values.name === "" ||
        values.source === "" ||
        values.abi === "" ||
        values.address === ""
      ) {
        console.log(values);
        alert("Please fill all the fields");
        return;
      }

      try {
        console.log(values);
        await update(values);
        enqueueSnackbar("Contract created successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      } catch (error) {
        enqueueSnackbar("Error creating contract", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={5} mt={10}>
        <Grid item xs={12} md={5} lg={4}>
          <Card>
            <CardContent>
              <Stack justifyContent={"center"} alignItems="center" spacing={3}>
                <Stack
                  justifyContent={"flex-end"}
                  direction="row"
                  alignItems={"flex-end"}
                  justifyItems="flex-end"
                  width={"100%"}
                >
                  <Chip label="Info" />
                </Stack>
                <Box
                  style={{
                    padding: 10,
                  }}
                >
                  <Image
                    src="/bond.png"
                    height={200}
                    width={200}
                    alt="contract"
                  />
                </Box>
                <ListItem>
                  <ListItemText secondary="Search an existing contract and upload its abi and source code here!" />
                </ListItem>
                <Autocomplete
                  options={contracts}
                  style={{ width: "100%" }}
                  getOptionLabel={(option) => option.address ?? ""}
                  onChange={async (event, value) => {
                    try {
                      setLoading(true);
                      const contractDetail = await getContract(
                        value?.address ?? ""
                      );
                      formik.setFieldValue("address", value?.address);
                      formik.setFieldValue(
                        "abi",
                        JSON.stringify(contractDetail.abi, undefined, 4)
                      );
                      formik.setFieldValue("source", contractDetail.source);
                      formik.setFieldValue("name", contractDetail.name);
                    } catch (error) {
                      enqueueSnackbar("Error getting contract", {
                        variant: "error",
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: "right",
                        },
                      });
                    } finally {
                      setLoading(false);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="address"
                      label="Contract Address"
                      fullWidth
                      variant="outlined"
                      value={formik.values.address}
                      onChange={async (e: any) => {
                        const results = await search(e.target.value);
                        setContracts(results);
                      }}
                    />
                  )}
                />

                <TextField
                  name="name"
                  label="Contract Name"
                  fullWidth
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={7} lg={8} xs={12}>
          <Card>
            <Fade
              in={Object.keys(formik.errors).length > 0}
              mountOnEnter
              unmountOnExit
            >
              <Alert severity="error" sx={{ marginBottom: 3 }}>
                Submission error: {JSON.stringify(formik.errors)}
              </Alert>
            </Fade>
            <CardContent>
              <Stack spacing={4} alignItems="flex-start">
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  width={"100%"}
                >
                  <Typography fontWeight={"bold"}>Source Code</Typography>
                  {loading && <CircularProgress size={30} />}
                </Stack>
                <Box display={"flex"} width="100%">
                  <Card
                    variant="outlined"
                    sx={{ width: "100%", boxShadow: "none" }}
                  >
                    <CardContent>
                      <Editor
                        height={300}
                        language="sol"
                        value={formik.values.source}
                        onChange={(code) => {
                          formik.setFieldValue("source", code);
                        }}
                        options={{
                          minimap: {
                            enabled: false,
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Box>
                <Typography fontWeight={"bold"}>ABI</Typography>
                <Box display={"flex"} width="100%">
                  <Card
                    variant="outlined"
                    sx={{ width: "100%", boxShadow: "none" }}
                  >
                    <CardContent>
                      <Editor
                        height={300}
                        language="json"
                        value={formik.values.abi}
                        onChange={(code) => {
                          formik.setFieldValue("abi", code);
                        }}
                        options={{
                          minimap: {
                            enabled: false,
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Box>
                <Box display={"flex"} alignItems="flex-start" width={"100%"}>
                  <Typography variant="body2" color={"gray"} maxWidth={"70%"}>
                    Changes may take up to 10 minutes to take effect. This
                    functionality is currently in beta and data stored on the
                    blockchain may be lost.
                  </Typography>
                </Box>
                <Stack width="100%" alignItems="flex-end">
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    disabled={formik.isSubmitting}
                    loading={formik.isSubmitting}
                  >
                    Save Change
                  </LoadingButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default Index;
