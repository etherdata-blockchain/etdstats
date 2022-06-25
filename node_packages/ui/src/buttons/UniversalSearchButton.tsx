import {
  AppBar,
  Box,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  InputBase,
  Slide,
  Stack,
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
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <SearchIcon />
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
            <Stack
              direction={"row"}
              spacing={1}
              justifyContent="center"
              alignItems={"center"}
              width="100%"
            >
              <Box flex={1}>
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <SearchIcon style={{ color: "gray" }} />
                )}
              </Box>
              <Box flex={20}>
                <InputBase
                  fullWidth
                  placeholder="Search..."
                  value={value}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      setLoading(true);
                      await props.onSearch(value);
                      setOpen(false);
                      setValue("");
                      setLoading(false);
                    }

                    if (e.key === "Escape") {
                      setOpen(false);
                      setValue("");
                    }
                  }}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </Box>
              <Box>
                <IconButton
                  onClick={() => {
                    setOpen(false);
                    setValue("");
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>
      </Slide>
    </>
  );
}
