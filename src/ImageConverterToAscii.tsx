import React, { useState } from "react";
import useImageData from "./useImageData";
import CanvasImage from "./CanvasImage";
import AsciiImage from "./AsciiImage";


interface ImageConverterToAsciiInterface {
}

function ImageConverterToAscii({}: ImageConverterToAsciiInterface): React.ReactElement {
  const { image, readFile } = useImageData();

  function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    // get files
    const files = event.target.files as FileList;
    const file = files[0];
    readFile(file);
  }

  return (
    <>
      <p>
        <input type="file" onChange={onChangeFile} />
      </p>
      <CanvasImage imageData={image}/>
      <hr/>
      <AsciiImage imageData={image} />
    </>
  );
}

export default ImageConverterToAscii;
