import React from "react";
import { ConfigurationInterface } from "./useImageData";

interface FormInterface {
  configuration: ConfigurationInterface;
  setConfigurationParam: (param: string, value: string | number | boolean) => void;
}

function Form({ configuration, setConfigurationParam }: FormInterface): React.ReactElement {
  const { maxWidth, maxHeight, colors, colorizeImage, autoScale } = configuration;
  return (
    <div id="form">
        <div className="slidecontainer">
          Max Width : {maxWidth}
          <input type="range" min={80} max={100} value={maxWidth} className="slider" onChange={e => setConfigurationParam("maxWidth", parseInt(e.target.value))} />
        </div>
        Max Height : {maxHeight}
        <div className="slidecontainer">
          <input type="range" min={80} max={100} value={maxHeight} className="slider" onChange={e => setConfigurationParam("maxHeight", parseInt(e.target.value))} />
        </div>
        <div>
           <label htmlFor="autoscale">Autoscale</label><br/>
           <input type="checkbox" name="autoscale" id="autoscale" checked={autoScale} onChange={e => setConfigurationParam("autoScale", !!e.target.checked)}/>
        </div>
        <div>
           <label htmlFor="Colorize">Colorize Image</label><br/>
           <input type="checkbox" name="Colorize" id="Colorize" checked={colorizeImage} onChange={e => setConfigurationParam("colorizeImage", !!e.target.checked)}/>
        </div>
        <div className="slidecontainer">
          Colors : {colors}
          <input type="range" min={2} max={68} value={colors} className="slider" onChange={e => setConfigurationParam("colors", parseInt(e.target.value))} />
        </div>
    </div>
  );
}

export default Form;

