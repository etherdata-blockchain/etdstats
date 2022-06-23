import { ShareRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

interface Props {
  data?: any;
}

export function ShareDataButton({ data }: Props) {
  return (
    <Tooltip title="Share">
      <IconButton disabled={data === undefined}>
        <ShareRounded />
      </IconButton>
    </Tooltip>
  );
}
