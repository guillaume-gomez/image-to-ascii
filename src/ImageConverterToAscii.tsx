import React from "react";
import useImageData from "./useImageData";
import CanvasImage from "./CanvasImage";
import AsciiImage from "./AsciiImage";
import Form from "./Form";
import RenderOptionForm from "./RenderOptionForm";

import "./ImageConverterToAscii.css";

function ImageConverterToAscii(): React.ReactElement {
  const { image, readFile, processing, configuration, setConfigurationParam } = useImageData();

  function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    // get files
    const files = event.target.files as FileList;
    const file = files[0];
    if(file) {
      readFile(file);
    }
  }

  return (
    <>
      <div id="Forms">
        <div className="Form-Item">
          <Form configuration={configuration} setConfigurationParam={setConfigurationParam} />
          <p>
            <input type="file" onChange={onChangeFile} />
          </p>
        </div>
        <div className="Form-Item">
          <RenderOptionForm configuration={configuration} setConfigurationParam={setConfigurationParam} />
          <div id="Canvas-Container">
            <CanvasImage imageData={image}/>
          </div>
        </div>
      </div>
      <hr/>
      <AsciiImage imageData={image} colorize={configuration.colorizeAscii} processing={processing}/>
    </>
  );
}

export default ImageConverterToAscii;
