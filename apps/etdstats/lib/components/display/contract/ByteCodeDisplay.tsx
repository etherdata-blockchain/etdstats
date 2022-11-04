import { Card, CardContent, Stack, Typography } from "@mui/material";

interface Props {
  bytecode: string;
}

export default function ByteCodeDisplay({ bytecode }: Props) {
  return (
    <Stack>
      <Card variant="outlined" sx={{ boxShadow: "none" }}>
        <CardContent>
          <Typography sx={{ wordWrap: "break-word" }}>{bytecode}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
