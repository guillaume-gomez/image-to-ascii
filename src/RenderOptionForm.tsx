import React from "react";
import { ConfigurationInterface } from "./useImageData";

import "./RenderOptionForm.css";

interface FormInterface {
  configuration: ConfigurationInterface;
  setConfigurationParam: (param: string, value: string | number | boolean) => void;
}

function RenderOptionForm({ configuration, setConfigurationParam }: FormInterface): React.ReactElement {
  const { colorizeAscii } = configuration;
  return (
    <div id="Option">
      <h2 className="H2-title">Options</h2>
        <div className="Checkbox-container-color">
           <label htmlFor="Colorize">Colorize Ascii</label><br/>
           <input type="checkbox" name="Colorize" id="Colorize" checked={colorizeAscii} onChange={e => setConfigurationParam("colorizeAscii", !!e.target.checked)}/>
        </div>
        <p id="hint">Toggle this option can takes time to rerender. Please be patient :) </p>
    </div>
  );
}

export default RenderOptionForm;

