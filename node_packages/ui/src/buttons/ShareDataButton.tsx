import { ShareRounded } from "@mui/icons-material";
import { Box, IconButton, Paper, Popover, Tooltip } from "@mui/material";
import React from "react";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
  bindPopover,
} from "material-ui-popup-state/hooks";
import { QRCodeCanvas } from "qrcode.react";

interface Props {
  data?: any;
}

export function ShareDataButton({ data }: Props) {
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  return (
    <>
      <Tooltip title="Share">
        <IconButton disabled={data === undefined} {...bindTrigger(popupState)}>
          <ShareRounded />
        </IconButton>
      </Tooltip>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Paper>
          <Box p={2}>
            <QRCodeCanvas value={JSON.stringify(data)} />,
          </Box>
        </Paper>
      </Popover>
    </>
  );
}
