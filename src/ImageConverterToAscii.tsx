import React, { useState } from "react";
import useImageData from "./useImageData";
import CanvasImage from "./CanvasImage";
import AsciiImage from "./AsciiImage";
import Form from "./Form";


interface ImageConverterToAsciiInterface {
}

function ImageConverterToAscii({}: ImageConverterToAsciiInterface): React.ReactElement {
  const { image, readFile, computeState, configuration, setConfigurationParam } = useImageData();

  function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    // get files
    const files = event.target.files as FileList;
    const file = files[0];
    readFile(file);
  }

  return (
    <>
      <Form configuration={configuration} setConfigurationParam={setConfigurationParam} />
      <hr />
      {
        computeState ? <span>Processing</span> : null
      }
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
