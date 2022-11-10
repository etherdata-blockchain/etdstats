import Editor from "@monaco-editor/react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  address: string;
  source: string;
}

export default function SourceDisplay({ source, address }: Props) {
  const router = useRouter();

  if (!source) {
    return (
      <div>
        No source available, You can{" "}
        <Button
          onClick={() => router.push(`/contract/create?contract=${address}`)}
        >
          upload source
        </Button>
      </div>
    );
  }

  return (
    <Editor
      value={source}
      language="sol"
      height={500}
      options={{
        readOnly: true,
      }}
    />
  );
}
