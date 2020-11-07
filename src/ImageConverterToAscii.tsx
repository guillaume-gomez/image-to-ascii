import React, { useRef } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from 'file-saver';

import useImageData from "./useImageData";
import CanvasImage from "./CanvasImage";
import AsciiImage from "./AsciiImage";
import Form from "./Form";
import RenderOptionForm from "./RenderOptionForm";

import "./ImageConverterToAscii.css";

function ImageConverterToAscii(): React.ReactElement {
  const { image, hasFile, readFile, processing, configuration, setConfigurationParam, submit } = useImageData();
  const refImg = useRef(null);

  function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    // get files
    const files = event.target.files as FileList;
    const file = files[0];
    if(file) {
      readFile(file);
    }
  }

  function runConvert() {
    if(refImg && refImg.current) {
      const node : HTMLElement = (refImg.current! as HTMLElement);
      const clonedNode  = node.cloneNode(true);
      document.body.appendChild(clonedNode);
      // truncate the image
      (clonedNode  as HTMLElement).style.width = `${node.children[0].clientWidth}px`;
      (clonedNode  as HTMLElement).style.height = `${node.children[0].clientHeight}px`;
      (clonedNode  as HTMLElement).style.margin = "0";
      (clonedNode  as HTMLElement).style.color =  "white";

      domtoimage.toBlob(clonedNode)
        .then(function (blob) {
           saveAs(blob, 'my-export.png');
            document.body.removeChild(clonedNode);
        })
        .catch(function (error) {
            console.log(error)
            alert('oops, something went wrong!');
        });
    }
  }


  return (
    <>
      <div id="Forms">
        <div className="Form-Item">
          <Form configuration={configuration} setConfigurationParam={setConfigurationParam} readFile={readFile} hasFile={hasFile} submitCallback={submit}/>
        </div>
        <div className="Form-Item">
          <RenderOptionForm configuration={configuration} setConfigurationParam={setConfigurationParam} saveAsImageCallback={runConvert} hasFile={true}/>
          <div id="Canvas-Container">
            <CanvasImage imageData={image}/>
          </div>
        </div>
      </div>
      <hr/>
      <div ref={refImg} id="Ascii-container" style={{ backgroundColor: configuration.backgroundColorAscii }}>
        <AsciiImage imageData={image} colorize={configuration.colorizeAscii} processing={processing}/>
      </div>
    </>
  );
}

export default ImageConverterToAscii;
