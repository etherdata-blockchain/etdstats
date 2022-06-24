import { Breadcrumbs as Bread, Link, Typography } from "@mui/material";
import React from "react";

interface Menu {
  title: string;
  link?: string;
}

export function Breadcrumbs(props: { menus: Menu[] }) {
  return (
    <Bread>
      {props.menus.map((m, i) => {
        if (m.link) {
          return (
            <Link href={m.link} key={m.title}>
              {m.title}
            </Link>
          );
        }
        return <Typography key={m.title}>{m.title}</Typography>;
      })}
    </Bread>
  );
}
