import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Contract } from "openapi_client";
import { useCallback, useEffect, useState } from "react";
import useCbor from "./useCbor";
import { useContract } from "./useContract";

export default function useContractCreate() {
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
  const router = useRouter();

  useEffect(() => {
    const defaultContractAddress = router.query.contract as string;
    if (defaultContractAddress) {
      (async () => {
        console.log("defaultContractAddress", defaultContractAddress);
        try {
          setLoading(true);
          const contractDetail = await getContract(
            defaultContractAddress ?? ""
          );

          formik.setFieldValue("address", defaultContractAddress);
          formik.setFieldValue(
            "abi",
            JSON.stringify(contractDetail.abi, undefined, 4)
          );
          formik.setFieldValue("source", contractDetail.source);
          formik.setFieldValue("name", contractDetail.name);
          formik.setFieldValue("bytecode", contractDetail.bytecode);
          formik.setFieldValue("compiler", contractDetail.compiler);
          setContracts((v) => {
            let foundIndex = v.findIndex(
              (c) => c.address === contractDetail.address
            );
            if (foundIndex === -1) {
              return [contractDetail, ...v];
            } else {
              return v;
            }
          });
          setContract(contractDetail);
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
      })();
    }
  }, [router.query]);

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
    formik.setFieldValue("address", value.address);
    await router.push(`/contract/create?contract=${value.address}`);
  }, []);

  return {
    formik,
    contracts,
    contract,
    hasCompiled,
    compiling,
    compilingError,
    decodedBytecode,
    onCompile,
    onSelectContract,
    setContract,
    setContracts,
    setHasCompiled,
  };
}
