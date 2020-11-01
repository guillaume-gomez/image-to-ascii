import React from "react";
import { ConfigurationInterface } from "./useImageData";

import "./Form.css"

interface FormInterface {
  configuration: ConfigurationInterface;
  setConfigurationParam: (param: keyof ConfigurationInterface, value: string | number | boolean) => void;
}

function Form({ configuration, setConfigurationParam }: FormInterface): React.ReactElement {
  const { maxWidth, maxHeight, colors, colorizeImage, autoScale } = configuration;
  return (
    <div id="Form-content">
        <h2 className="H2-title">Setup</h2>
        <div className="Slide-container">
          <div className="Slide-container-label">
            Max Width : {maxWidth}
          </div>
          <div className="Slide-container-input">
            <input type="range" min={80} max={100} value={maxWidth} className="slider" onChange={e => setConfigurationParam("maxWidth", parseInt(e.target.value))} />
          </div>
        </div>
        <div className="Slide-container">
          <div className="Slide-container-label">
            Max Height : {maxHeight}
          </div>
          <div className="Slide-container-input">
            <input type="range" min={80} max={100} value={maxHeight} className="slider" onChange={e => setConfigurationParam("maxHeight", parseInt(e.target.value))} />
          </div>
        </div>
        <div className="Checkbox-container">
           <label htmlFor="autoscale">Autoscale</label>
           <input type="checkbox" name="autoscale" id="autoscale" checked={autoScale} onChange={e => setConfigurationParam("autoScale", !!e.target.checked)}/>
        </div>
        <div className="Checkbox-container">
           <label htmlFor="Colorize">Colorize Image</label>
           <input type="checkbox" name="Colorize" id="Colorize" checked={colorizeImage} onChange={e => setConfigurationParam("colorizeImage", !!e.target.checked)}/>
        </div>
        <div className="Slide-container">
          <div className="Slide-container-label">
            Colors : {colors}
          </div>
          <div className="Slide-container-input">
            <input type="range" min={2} max={68} value={colors} className="slider" onChange={e => setConfigurationParam("colors", parseInt(e.target.value))} />
          </div>
        </div>
    </div>
  );
}

export default Form;

