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
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { Contract } from "openapi_client";
import { useCallback, useState } from "react";
import { useContract } from "../../lib/hooks/useContract";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import useCbor from "../../lib/hooks/useCbor";

const Index: NextPage = () => {
  const { search, update, getContract, compile, solidityVersions } =
    useContract({ page: 1 });
  const { enqueueSnackbar } = useSnackbar();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [contract, setContract] = useState<Contract>();
  const [loading, setLoading] = useState(false);
  const [hasCompiled, setHasCompiled] = useState(false);
  const [compiling, setCompiling] = useState(false);
  const [compilingError, setCompilingError] = useState<string | undefined>(
    undefined
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      source: "",
      abi: "",
      compiler: "",
      address: "",
      bytecode: "",
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
        await update(values);
        enqueueSnackbar("Contract created successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      } catch (error) {
        enqueueSnackbar(`Error creating contract: ${error}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  const decodedBytecode = useCbor(formik.values.bytecode);

  const onCompile = useCallback(async () => {
    setCompiling(true);
    try {
      enqueueSnackbar(`Compiling contract using ${formik.values.compiler}`, {
        variant: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      const result = await compile(
        formik.values.source,
        formik.values.compiler,
        formik.values.name
      );
      formik.setFieldValue("abi", JSON.stringify(result.abi, null, 4));
      formik.setFieldValue("bytecode", result.bytecode);
      setHasCompiled(true);
      setCompilingError(undefined);
    } catch (error) {
      let errorMsg: any = error;
      if (errorMsg.response?.data?.errors) {
        errorMsg = errorMsg.response.data.errors;
      }

      enqueueSnackbar(`${errorMsg}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      setCompilingError(`${errorMsg}`);
      setHasCompiled(false);
    }
    setCompiling(false);
  }, [hasCompiled, formik]);

  const onSelectContract = useCallback(async (value: Contract | null) => {
    if (value === null) {
      formik.setFieldValue("source", "");
      formik.setFieldValue("abi", "");
      formik.setFieldValue("compiler", "");
      formik.setFieldValue("address", "");
      formik.setFieldValue("bytecode", "");
      return;
    }

    try {
      setLoading(true);
      const contractDetail = await getContract(value?.address ?? "");
      formik.setFieldValue("address", value?.address);
      formik.setFieldValue(
        "abi",
        JSON.stringify(contractDetail.abi, undefined, 4)
      );
      formik.setFieldValue("source", contractDetail.source);
      formik.setFieldValue("name", contractDetail.name);
      formik.setFieldValue("bytecode", contractDetail.bytecode);
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
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={5} mt={10}>
        <Grid item xs={12} md={5} lg={4}>
          <Card sx={{ position: "sticky", top: "62px" }}>
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
                    await onSelectContract(value);
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
                  helperText="This should be the same as the name of the contract in the source code"
                  fullWidth
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Solidity Compiler
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.compiler}
                    label="Compiler"
                    name="compiler"
                    onChange={formik.handleChange}
                  >
                    {solidityVersions.data?.builds
                      .filter((v) => !v.longVersion.includes("night"))
                      .map((version) => (
                        <MenuItem value={version.longVersion}>
                          {version.longVersion}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={7} lg={8} xs={12}>
          <Card>
            <CardContent>
              <Stack spacing={4} alignItems="flex-start">
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  width={"100%"}
                >
                  <Stack direction={"row"} spacing={2} alignItems="center">
                    <Typography fontWeight={"bold"}>Source code</Typography>
                    {hasCompiled && (
                      <Tooltip title="This code is compiled without problem">
                        <CheckCircleIcon color="success" />
                      </Tooltip>
                    )}
                    {compilingError && (
                      <Tooltip title={compilingError}>
                        <ErrorIcon color="error" />
                      </Tooltip>
                    )}
                    {compiling && <CircularProgress size={30} />}
                  </Stack>
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
                          setHasCompiled(false);
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
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Typography fontWeight={"bold"}>Compiled ABI</Typography>
                  {hasCompiled && (
                    <Tooltip title="This code is compiled without problem">
                      <CheckCircleIcon color="success" />
                    </Tooltip>
                  )}
                  {compilingError && (
                    <Tooltip title={compilingError}>
                      <ErrorIcon color="error" />
                    </Tooltip>
                  )}
                  {compiling && <CircularProgress size={30} />}
                </Stack>
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
                        options={{
                          readOnly: true,
                          minimap: {
                            enabled: false,
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Box>
                <Stack direction={"row"} spacing={2} alignItems="center">
                  <Typography fontWeight={"bold"}>Bytecode</Typography>
                  {hasCompiled && (
                    <Tooltip title="This code is compiled without problem">
                      <CheckCircleIcon color="success" />
                    </Tooltip>
                  )}
                  {compilingError && (
                    <Tooltip title={compilingError}>
                      <ErrorIcon color="error" />
                    </Tooltip>
                  )}
                  {compiling && <CircularProgress size={30} />}
                </Stack>
                <Box display={"flex"} width="100%">
                  <Card
                    variant="outlined"
                    sx={{ width: "100%", boxShadow: "none" }}
                  >
                    <CardContent sx={{ overflowY: "scroll", maxHeight: 300 }}>
                      <Typography sx={{ wordWrap: "break-word" }}>
                        {formik.values.bytecode}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                <Stack direction={"row"} spacing={2} alignItems="center">
                  <Typography fontWeight={"bold"}>MetaData</Typography>
                  {hasCompiled && (
                    <Tooltip title="This code is compiled without problem">
                      <CheckCircleIcon color="success" />
                    </Tooltip>
                  )}
                  {compilingError && (
                    <Tooltip title={compilingError}>
                      <ErrorIcon color="error" />
                    </Tooltip>
                  )}
                  {compiling && <CircularProgress size={30} />}
                </Stack>
                <Box display={"flex"} width="100%">
                  <Card
                    variant="outlined"
                    sx={{ width: "100%", boxShadow: "none" }}
                  >
                    <CardContent sx={{ overflowY: "scroll", maxHeight: 300 }}>
                      <pre>{JSON.stringify(decodedBytecode, null, 4)}</pre>
                    </CardContent>
                  </Card>
                </Box>
                <Box display={"flex"} alignItems="flex-start" width={"75%"}>
                  <Typography variant="body2" color={"gray"} maxWidth={"70%"}>
                    The ABI is a JSON array of objects that describe the Smart
                    Contract. We need this value in order to run the events
                    fetcher. You need to first compile your contract and then
                    save change.
                  </Typography>
                </Box>
                <Stack
                  width="100%"
                  alignItems="flex-end"
                  direction={"row"}
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Tooltip title="You need to compile source code first then save the change">
                    <LoadingButton
                      variant="contained"
                      disabled={formik.isSubmitting || compiling}
                      loading={compiling}
                      sx={{ background: "#03a1fc" }}
                      onClick={onCompile}
                    >
                      Compile Source
                    </LoadingButton>
                  </Tooltip>

                  <LoadingButton
                    variant="contained"
                    type="submit"
                    disabled={formik.isSubmitting || !hasCompiled}
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
