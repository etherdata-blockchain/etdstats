import Editor from "@monaco-editor/react";
import React from "react";

interface Props {
  source: string;
}

export default function SourceDisplay({ source }: Props) {
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
