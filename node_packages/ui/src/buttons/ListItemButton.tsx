import React from "react";
import {
  Box,
  CircularProgress,
  ListItemButton as Button,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
  tooltip?: string;
  onClick?: () => void;
}

export function ListItemButton({ subtitle, title, onClick, tooltip }: Props) {
  const [loading, setLoading] = React.useState(false);

  const button = (
    <Button
      onClick={async () => {
        if (onClick) {
          setLoading(true);
          await onClick();
          setLoading(false);
        }
      }}
    >
      <Stack spacing={2}>
        <Typography
          textTransform={"uppercase"}
          variant="caption"
          color={"rgb(145, 158, 171)"}
          fontWeight={"700"}
        >
          {title}
        </Typography>
        <Stack>
          <Typography
            width={300}
            style={{ wordWrap: "break-word" }}
            variant="body2"
          >
            {subtitle}
          </Typography>
          <Typography
            width={300}
            style={{ wordWrap: "break-word" }}
            variant="body2"
            color="gray"
          >
            {tooltip}
          </Typography>
        </Stack>

        <Box>{loading && <CircularProgress size={20} />}</Box>
      </Stack>
    </Button>
  );

  return button;
}
