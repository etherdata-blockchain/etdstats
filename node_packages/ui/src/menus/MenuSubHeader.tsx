import { ListSubheader, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
}

export function MenuSubHeader(props: Props) {
  return (
    <ListSubheader>
      <Typography
        textTransform={"uppercase"}
        color="rgb(33, 43, 54)"
        fontSize={"0.75rem"}
        fontWeight={"700"}
      >
        {props.title}
      </Typography>
    </ListSubheader>
  );
}
