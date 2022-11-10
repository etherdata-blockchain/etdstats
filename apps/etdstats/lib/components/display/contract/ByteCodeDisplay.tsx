import { Card, CardContent, Stack, Typography } from "@mui/material";
import useCbor from "../../../hooks/useCbor";

interface Props {
  bytecode: string;
}

export default function ByteCodeDisplay({ bytecode }: Props) {
  const decodedData = useCbor(bytecode);

  return (
    <Stack spacing={2}>
      <Typography fontWeight={"bold"}>Metadata</Typography>
      <Card variant="outlined" sx={{ boxShadow: "none" }}>
        <CardContent>
          <pre>{JSON.stringify(decodedData, null, 4)}</pre>
        </CardContent>
      </Card>
      <Typography fontWeight={"bold"}>ByteCode</Typography>
      <Card variant="outlined" sx={{ boxShadow: "none" }}>
        <CardContent>
          <Typography sx={{ wordWrap: "break-word" }}>{bytecode}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
