import { AppBar, Box, Drawer, IconButton, Stack, Toolbar } from "@mui/material";
import { useRouter } from "next/router";

import React from "react";
import { ConnectWalletButton, UniversalSearchButton } from "ui";
import { DrawerWidth } from "./settings/ui";

export default function Layout(props: {
  children: React.ReactNode;
  menu: React.ReactNode;
}) {
  const router = useRouter();

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
            />
          </Stack>
          <Stack direction={"row"}>
            <ConnectWalletButton />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component={"nav"}>
        <Drawer
          variant="temporary"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
        {props.children}
      </Box>
    </Box>
  );
}
