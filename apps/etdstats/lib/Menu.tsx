import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  ListSubheader,
  ListItemIcon,
} from "@mui/material";
import React from "react";
import { MenuSubHeader } from "ui";
import InfoIcon from "@mui/icons-material/Info";

const selectedColor = "rgb(0, 171, 85)";

export default function Menu() {
  return (
    <List>
      <Box height={100}></Box>
      <MenuSubHeader title="Info" />
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
    </List>
  );
}
