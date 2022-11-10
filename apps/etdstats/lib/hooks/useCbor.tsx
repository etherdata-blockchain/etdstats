import React from "react";
import cbor from "cbor";

function getMetadataBytes(bytecode: string) {
  // get last 4 bytes of bytecode
  const metadataLength = bytecode.slice(-4);
  // convert to decimal
  const metadataLengthDecimal = parseInt(metadataLength, 16);
  // get metadata bytes
  const metadataBytes = bytecode.slice(-metadataLengthDecimal * 2 - 4, -4);
  return metadataBytes;
}

function parseMetadata(metadataBytes: string) {
  const metadata = cbor.decode(Buffer.from(metadataBytes, "hex"));
  return metadata;
}

function covertBufferObjectToHexObject(object: any) {
  const hexObject: any = {};
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key];
      if (Buffer.isBuffer(element)) {
        hexObject[key] = element.toString("hex");
      } else {
        hexObject[key] = element;
      }
    }
  }
  return hexObject;
}

export default function useCbor(bytecode: string) {
  const [decodedData, setDecodedData] = React.useState<any | undefined>();

  React.useEffect(() => {
    if (bytecode) {
      const metadataBytes = getMetadataBytes(bytecode);
      const metadata = parseMetadata(metadataBytes);
      const hexObject = covertBufferObjectToHexObject(metadata);
      setDecodedData(hexObject);
    }
  }, [bytecode]);

  return decodedData;
}
