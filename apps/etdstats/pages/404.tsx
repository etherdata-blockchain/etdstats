import { Button, Stack, Typography } from "@mui/material";
import { useMetaMask } from "metamask-react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NotFound() {
  const { account } = useMetaMask();
  const router = useRouter();

  return (
    <Stack
      mt={10}
      height={`calc(100vh - ${100}px)`}
      justifyItems={"center"}
      alignItems="center"
      justifyContent={"center"}
    >
      <Typography variant="h6" fontWeight={800}>
        Sorry, Page not found!
      </Typography>
      <Typography width={500} textAlign="center">
        We cannot fine the content you are looking for. Perhaps you have
        mistyped your URL?
      </Typography>
      <Image src="/NotFoundIcon.webp" alt="404" width={300} height={300} />
      {account && (
        <Button
          variant="contained"
          onClick={async () => await router.push("/issues/create")}
        >
          Want help? Create a ticket
        </Button>
      )}
    </Stack>
  );
}
