import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { MenuSubHeader } from "ui";
import { useMetaMask } from "metamask-react";

const selectedColor = "rgb(0, 171, 85)";

export default function Menu() {
  const { account } = useMetaMask();

  return (
    <List>
      <Box mb={2} p={2}>
        <Card
          sx={{
            boxShadow: "none",
            backgroundColor: "rgba(191, 191, 191, 0.1)",
          }}
        >
          <CardContent>
            <Stack direction={"row"}>
              <Typography noWrap>
                {account ?? "No Account Connected"}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <MenuSubHeader title="General" />
      <ListItemButton
        sx={{
          borderRadius: "10px",
          padding: "12px",
          margin: "12px",
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <Link href="/info">
        <ListItemButton
          selected
          sx={{
            color: selectedColor,
            borderRadius: "10px",
            padding: "12px",
            margin: "12px",
          }}
        >
          <ListItemIcon>
            <InfoIcon style={{ color: selectedColor }} />
          </ListItemIcon>
          <ListItemText primary="Info" />
        </ListItemButton>
      </Link>
    </List>
  );
}
