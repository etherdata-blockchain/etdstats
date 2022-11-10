import Editor from "@monaco-editor/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
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
import { NextPage } from "next";
import Image from "next/image";
import { useContract } from "../../lib/hooks/useContract";
import useContractCreate from "../../lib/hooks/useContractCreate";
import useContractNames from "../../lib/hooks/useContractNames";

const Index: NextPage = () => {
  const { search, solidityVersions } = useContract({ page: 1 });
  const {
    formik,
    onCompile,
    onSelectContract,
    setContracts,
    setHasCompiled,
    hasCompiled,
    compiling,
    compilingError,
    contract,
    contracts,
    decodedBytecode,
  } = useContractCreate();
  const names = useContractNames(formik.values.source, formik.values.name);

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
                  value={contract ?? null}
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
                      onChange={async (e: any) => {
                        const results = await search(e.target.value);
                        setContracts(results);
                      }}
                    />
                  )}
                />
                <FormControl fullWidth>
                  <InputLabel>Contract Name</InputLabel>
                  <Select
                    value={formik.values.name}
                    label="Name"
                    name="name"
                    onChange={formik.handleChange}
                  >
                    {names.data?.map((name) => (
                      <MenuItem value={name} key={name}>
                        {name}
                      </MenuItem>
                    ))}
                    {names.data?.length === 0 && (
                      <MenuItem value={""} key={""}>
                        No contract name found
                      </MenuItem>
                    )}
                    {names.isLoading && (
                      <MenuItem value="">
                        <CircularProgress size={20} />
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>

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
                        <MenuItem
                          value={version.longVersion}
                          key={version.build}
                        >
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
