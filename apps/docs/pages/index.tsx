import {
  AppBar,
  Box,
  CircularProgress,
  Fade,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as spec from "openapi_specs";
import { useEffect, useMemo, useState } from "react";
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

  return (
    <div>
      <AppBar color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display={"flex"}>
            <Typography variant={"h5"}>Docs</Typography>
            {Object.keys(spec).map((k) => (
              <MenuItem
                key={k}
                selected={true}
                onClick={() => router.push(`?doc=${k}`)}
                style={{ color: k === router.query.doc ? "purple" : "black" }}
              >
                {k}
              </MenuItem>
            ))}
          </Box>
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
