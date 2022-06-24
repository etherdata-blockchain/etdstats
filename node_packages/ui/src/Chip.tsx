import { Box } from "@mui/material";
import React from "react";

interface Props {
  label: string;
}

export function Chip({ label }: Props) {
  return (
    <Box
      color="rgb(34,154,22)"
      fontFamily={"Public Sans, sans-serif"}
      bgcolor={"rgba(84,214,44,0.16)"}
      padding={"2px 12px"}
      fontSize="0.75rem"
      fontWeight={"700"}
      textTransform={"uppercase"}
      borderRadius={"6px"}
      minWidth="22px"
      height="22px"
      justifyContent={"center"}
      alignItems={"center"}
      display="flex"
    >
      {label}
    </Box>
  );
}
