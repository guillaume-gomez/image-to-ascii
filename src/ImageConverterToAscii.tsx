import React from "react";
import useImageData from "./useImageData";
import CanvasImage from "./CanvasImage";
import AsciiImage from "./AsciiImage";
import Form from "./Form";
import RenderOptionForm from "./RenderOptionForm";

import "./ImageConverterToAscii.css";

function ImageConverterToAscii(): React.ReactElement {
  const { image, hasFile, readFile, processing, configuration, setConfigurationParam, submit } = useImageData();
  return (
    <>
      <div id="Forms">
        <div className="Form-Item">
          <Form configuration={configuration} setConfigurationParam={setConfigurationParam} readFile={readFile} hasFile={hasFile} submitCallback={submit}/>
        </div>
        <div className="Form-Item">
          <RenderOptionForm configuration={configuration} setConfigurationParam={setConfigurationParam} />
          <div id="Canvas-Container">
            <CanvasImage imageData={image}/>
          </div>
        </div>
      </div>
      <hr/>
      <div id="Ascii-container" style={{ backgroundColor: configuration.backgroundColorAscii }}>
        <AsciiImage imageData={image} colorize={configuration.colorizeAscii} processing={processing}/>
      </div>
    </>
  );
}

export default ImageConverterToAscii;
