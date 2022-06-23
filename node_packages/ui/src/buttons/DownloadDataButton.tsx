import { IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface Props {
  data?: any;
}

export function DownloadDataButton({ data }: Props) {
  return (
    <Tooltip title="Download">
      <IconButton disabled={data === undefined}>
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
}
