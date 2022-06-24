import {
  AppBar,
  ClickAwayListener,
  IconButton,
  InputBase,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Close } from "@mui/icons-material";

interface Props {
  drawerWidth: number;
  onSearch(value: string): void;
}

export function UniversalSearchButton(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <>
      <IconButton>
        <SearchIcon onClick={() => setOpen(true)} />
      </IconButton>
      <Slide mountOnEnter in={open}>
        <AppBar
          sx={{
            backgroundColor: "rgb(255, 255, 255, 0.8)",
            height: 64,
            zIndex: 1001,
            width: { sm: `calc(100% - ${props.drawerWidth}px )` },
            ml: { sm: `${props.drawerWidth}px` },
            boxShadow: "rgb(145 158 171 / 16%) 0px 8px 16px 0px",
            backdropFilter: "blur(10px)",
          }}
          position="fixed"
        >
          <Toolbar>
            <SearchIcon style={{ color: "gray" }} />
            <InputBase
              fullWidth
              placeholder="Search..."
              value={value}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  props.onSearch(value);
                  setOpen(false);
                  setValue("");
                }
              }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <IconButton
              onClick={() => {
                setOpen(false);
                setValue("");
              }}
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>
    </>
  );
}
