import React, { useState } from "react";
import useImageData from "./ImageDataReducer";
import CanvasImage from "./CanvasImage";
import AsciiImage from "./AsciiImage";


interface ImageConverterToAsciiInterface {
}

function ImageConverterToAscii({}: ImageConverterToAsciiInterface): React.ReactElement {
  const { pixels, imageData, width, height, readFile } = useImageData();

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
      <AsciiImage pixels={pixels} width={width} />
    </>
  );
}

export default ImageConverterToAscii;
