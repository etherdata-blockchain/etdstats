import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Layout from "../lib/Layout";
import Menu from "../lib/Menu";
import { MetaMaskProvider } from "metamask-react";
import { NextLinearProgressBar } from "ui";
import { deepGreen } from "../lib/utils/colors";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme({
  palette: {
    primary: {
      main: deepGreen,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "rgb(255, 255, 255, 0.8)",
          boxShadow: "none",
          height: 64,
          transition:
            "width 200ms cubic-beizer(0.4, 0, 0.2, 1) 0ms, height 200ms cubic-beizer(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow:
            "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "rgba(84,214,44,0.10)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "rgb(0, 171, 85)",
          boxShadow: "rgb(0 171 85 /24%) 0px 8px 16px 0px",
          borderRadius: "8px",
        },
      },
    },
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MetaMaskProvider>
        <ThemeProvider theme={theme}>
          <NextLinearProgressBar
            style={{
              zIndex: 10000,
              position: "fixed",
              top: 0,
              width: "100vw",
            }}
          />
          <Layout menu={<Menu />}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </MetaMaskProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
