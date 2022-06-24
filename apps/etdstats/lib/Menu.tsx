import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  ListSubheader,
  ListItemIcon,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import React from "react";
import { MenuSubHeader } from "ui";
import InfoIcon from "@mui/icons-material/Info";
import Image from "next/image";

const selectedColor = "rgb(0, 171, 85)";

export default function Menu() {
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
              <Typography>No wallet connected</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <MenuSubHeader title="General" />
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
