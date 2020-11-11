import React from "react";
import { ConfigurationInterface } from "./useImageData";

import "./RenderOptionForm.css";

interface FormInterface {
  configuration: ConfigurationInterface;
  setConfigurationParam: (param: keyof ConfigurationInterface, value: string | number | boolean) => void;
  saveAsImageCallback: () => void;
  hasFile: boolean
}

function RenderOptionForm({ configuration, setConfigurationParam, saveAsImageCallback, hasFile }: FormInterface): React.ReactElement {
  const { colorizeAscii, backgroundColorAscii } = configuration;
  return (
    <div id="Option">
      <h2 className="H2-title">Options</h2>
        <div className="Checkbox-container-color">
           <label htmlFor="Colorize">Colorize Ascii</label><br/>
           <input type="checkbox" name="Colorize" id="Colorize" checked={colorizeAscii} onChange={e => setConfigurationParam("colorizeAscii", !!e.target.checked)}/>
        </div>
        <div className="ColorPalette">
          <label htmlFor="background-color-ascii">Background color ascii</label>
          <div id="Color-input-container">
            <input type="color" id="background-color-ascii" name="background-color-ascii" value={backgroundColorAscii} onChange={e => setConfigurationParam("backgroundColorAscii", e.target.value)} />
          </div>
        </div>
        <div id="Convert">
          <button disabled={!hasFile} onClick={saveAsImageCallback}>Save as image</button>
        </div>
    </div>
  );
}

export default RenderOptionForm;

