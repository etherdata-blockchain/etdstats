import { AppBar, Box, Drawer, Stack, Toolbar } from "@mui/material";
import { useRouter } from "next/router";

import React, { useCallback } from "react";
import {
  ConnectWalletButton,
  NextCirculatProgressBar,
  UniversalSearchButton,
} from "ui";
import { useBlockInfo } from "./hooks/useBlockInfo";
import { db } from "./models/SearchModel";
import { DrawerWidth } from "./settings/ui";

export default function Layout(props: {
  children: React.ReactNode;
  menu: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { blockInfoResult } = useBlockInfo({});

  const search = useCallback(async (value: string) => {
    const result = await db.searchResults
      .where("id")
      .startsWithAnyOfIgnoreCase(value)
      .limit(10)
      .toArray();

    return result.map((r) => ({
      title: r.id,
      subtitle: r.result.type,
    }));
  }, []);

  return (
    <Box>
      <AppBar
        sx={{
          width: { md: `calc(100% - ${DrawerWidth}px )` },
          ml: { md: `${DrawerWidth}px` },
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <UniversalSearchButton
              drawerWidth={DrawerWidth}
              onSearch={async (v) => {
                await router.push(`/tx/${v}`);
              }}
              onType={search}
            />
          </Stack>
          <Stack direction={"row"} alignItems="center" spacing={2}>
            <NextCirculatProgressBar size={20} />
            {blockInfoResult.data && (
              <ConnectWalletButton
                chainId={blockInfoResult.data!.chainId}
                rpc={blockInfoResult.data!.rpc}
              />
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component={"nav"}>
        <Drawer
          variant="temporary"
          open={false}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DrawerWidth,
            },
          }}
        >
          {props.menu}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { sm: "none", md: "block", xs: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DrawerWidth,
            },
          }}
          open
        >
          {props.menu}
        </Drawer>
      </Box>
      <Box
        mt={5}
        component="main"
        sx={{
          width: { md: `calc(100% - ${DrawerWidth}px )` },
          pl: { md: `${DrawerWidth}px` },
        }}
      >
        <Box sx={{ paddingX: { lg: 25, sm: 3, xs: 3 } }}>{props.children}</Box>
      </Box>
    </Box>
  );
}
