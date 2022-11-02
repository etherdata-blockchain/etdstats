import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function PendingView() {
  return (
    <Stack justifyContent="center" alignContent={"center"} alignItems="center">
      <Image alt="pending" src={"/PendingIcon.webp"} width={200} height={200} />
      <Typography fontWeight={800}>Comming soon!</Typography>
    </Stack>
  );
}
