import { AppBar, Box, Drawer, Stack, Toolbar } from "@mui/material";
import { useRouter } from "next/router";

import React, { useCallback } from "react";
import {
  ConnectWalletButton,
  NextCirculatProgressBar,
  UniversalSearchButton,
} from "ui";
import { db } from "./models/SearchModel";
import { DrawerWidth } from "./settings/ui";

export default function Layout(props: {
  children: React.ReactNode;
  menu: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

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
          width: { sm: `calc(100% - ${DrawerWidth}px )` },
          ml: { sm: `${DrawerWidth}px` },
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
                await router.push(`/info/${v}`);
              }}
              onType={search}
            />
          </Stack>
          <Stack direction={"row"} alignItems="center" spacing={2}>
            <NextCirculatProgressBar size={20} />
            <ConnectWalletButton />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component={"nav"}>
        <Drawer
          variant="temporary"
          open={open}
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
            display: { xs: "none", sm: "block" },
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
          width: { sm: `calc(100% - ${DrawerWidth}px )` },
          pl: { sm: `${DrawerWidth}px` },
        }}
      >
        <Box sx={{ paddingX: { md: 25, sm: 3, xs: 3 } }}>{props.children}</Box>
      </Box>
    </Box>
  );
}
