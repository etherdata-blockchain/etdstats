import { Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

export default function NotFound() {
  return (
    <Stack
      mt={10}
      height={`calc(100vh - ${100}px)`}
      justifyItems={"center"}
      alignItems="center"
      justifyContent={"center"}
    >
      <Typography variant="h6" fontWeight={800}>
        Sorry, Page not found!
      </Typography>
      <Typography width={500} textAlign="center">
        We cannot fine the content you are looking for. Perhaps you have
        mistyped your URL?
      </Typography>
      <Image src="/NotFoundIcon.webp" alt="404" width={300} height={300} />
    </Stack>
  );
}
