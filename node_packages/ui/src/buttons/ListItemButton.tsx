import React from "react";
import { ListItemButton as Button, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export function ListItemButton({ subtitle, title }: Props) {
  return (
    <Button>
      <Stack>
        <Typography
          textTransform={"uppercase"}
          variant="caption"
          color={"rgb(145, 158, 171)"}
          fontWeight={"700"}
        >
          {title}
        </Typography>
        <Typography width={300} style={{ wordWrap: "break-word" }}>
          {subtitle}
        </Typography>
      </Stack>
    </Button>
  );
}
