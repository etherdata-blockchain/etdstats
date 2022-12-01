import {
  AppBar,
  Box,
  CircularProgress,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as spec from "openapi_specs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RedocStandalone } from "redoc";

const Home: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
  }, [router.query.doc]);
  const selectedDoc = useMemo(() => {
    if (!Boolean(router.query.doc)) {
      return spec.health_service_schema;
    }
    const foundValue = Object.entries(spec).find(
      ([key, value], index) => key === router.query.doc
    );

    if (!foundValue) {
      return undefined;
    }

    return foundValue[1];
  }, [router.query.doc]);

  const onClick = useCallback((name: string) => {
    router.push(`?doc=${name}`);
  }, []);

  return (
    <div>
      <AppBar color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack display={"flex"} direction="row" spacing={5}>
            <Typography variant={"h5"}>Docs</Typography>
            <FormControl fullWidth variant="standard">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={router.query.doc ?? "health_service_schema"}
                label="Age"
              >
                {Object.entries(spec).map(([key, value], index) => (
                  <MenuItem
                    key={index}
                    value={key}
                    onClick={() => onClick(key)}
                  >
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Fade in={isLoading} mountOnEnter unmountOnExit>
            <CircularProgress color={"secondary"} size={30} />
          </Fade>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: 70 }}>
        {selectedDoc && (
          <RedocStandalone
            spec={selectedDoc}
            onLoaded={() => {
              setIsLoading(false);
            }}
            options={{
              theme: {
                sidebar: { width: "0px" },
                rightPanel: { width: "40%" },
              },
              scrollYOffset: 0,
              hideLoading: true,
              nativeScrollbars: false,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
