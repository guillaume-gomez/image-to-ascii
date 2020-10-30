import React, { useState } from "react";
import CanvasImage from "./CanvasImage";

interface ImageConverterToAsciiInterface {
}

function ImageConverterToAscii({}: ImageConverterToAsciiInterface): React.ReactElement {
  const [file, setFile] = useState<File | null>(null);

  function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    // get files
    const files = event.target.files as FileList;
    const file = files[0];
    setFile(file);
  }

  return (
    <>
      <p>
        <input type="file" onChange={onChangeFile} />
      </p>
      <CanvasImage file={file} width={500} height={500}/>
    </>
  );
}

export default ImageConverterToAscii;
