import React, { useState } from "react";
import useImageData from "./useImageData";
import CanvasImage from "./CanvasImage";
import AsciiImage from "./AsciiImage";


interface ImageConverterToAsciiInterface {
}

function ImageConverterToAscii({}: ImageConverterToAsciiInterface): React.ReactElement {
  const { imageData, width, height, readFile } = useImageData();

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
      <CanvasImage imageData={imageData} width={width} height={height}/>
      <hr/>
      <AsciiImage imageData={imageData} width={width} />
    </>
  );
}

export default ImageConverterToAscii;
