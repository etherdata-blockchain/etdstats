import { IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface Props {
  id: string;
  data?: any;
}

function download(filename: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function DownloadDataButton({ id, data }: Props) {
  return (
    <Tooltip title="Download">
      <IconButton
        disabled={data === undefined}
        onClick={() => download(`${id}.json`, JSON.stringify(data))}
      >
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
}
