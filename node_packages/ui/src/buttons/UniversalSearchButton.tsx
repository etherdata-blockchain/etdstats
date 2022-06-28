import {
  AppBar,
  Box,
  Card,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  InputBase,
  List,
  ListItemText,
  Paper,
  Slide,
  Stack,
  Toolbar,
  Typography,
  ListItemButton,
  ListItem,
  Fade,
} from "@mui/material";
import React, { useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Close } from "@mui/icons-material";
import useAutocomplete from "@mui/material/useAutocomplete";

interface SearchResult {
  title: string;
  subtitle: string;
}
interface Props {
  drawerWidth: number;
  onType?: (value: string) => Promise<SearchResult[]>;
  onClick?: (result: SearchResult) => Promise<void>;
  onSearch(value: string): Promise<void>;
}

export function UniversalSearchButton(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [autoCompleteResults, setAutoCompleteResults] =
    React.useState<SearchResult[]>();
  const [showResults, setShowResults] = React.useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setValue("");
    setAutoCompleteResults([]);
    setShowResults(false);
  }, []);

  return (
    <>
      <IconButton
        onClick={async (e) => {
          setOpen(true);
          if (props.onType) {
            setIsSearching(true);
            const results = await props.onType("");
            setAutoCompleteResults(results);
            setIsSearching(false);
          }
        }}
      >
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
                  onFocus={() => setShowResults(true)}
                  onBlur={() => setShowResults(false)}
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
                  onChange={async (e) => {
                    setValue(e.target.value);
                    if (props.onType) {
                      setIsSearching(true);
                      const results = await props.onType(e.target.value);
                      setAutoCompleteResults(results);
                      setIsSearching(false);
                    }
                  }}
                />
                <Fade
                  in={showResults && autoCompleteResults !== undefined}
                  mountOnEnter
                  unmountOnExit
                >
                  <Paper
                    sx={{
                      position: "absolute",
                      width: "85%",
                      top: 64,
                      boxShadow: "rgb(145 158 171 / 16%) 0px 20px 16px 0px",
                      maxHeight: 400,
                      overflowY: "auto",
                    }}
                  >
                    <List>
                      {autoCompleteResults?.map((result, index) => (
                        <ListItemButton
                          key={`${index}-list`}
                          onClick={async () => {
                            setValue(result.title);
                            setAutoCompleteResults(undefined);
                            setShowResults(false);
                          }}
                        >
                          <ListItemText
                            primary={result.title}
                            secondary={result.subtitle}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Paper>
                </Fade>
              </Box>
              <Box>
                <IconButton onClick={close}>
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
