import React from "react";
import { ConfigurationInterface } from "./useImageData";

interface FormInterface {
  configuration: ConfigurationInterface;
  setConfigurationParam: (param: string, value: string | number | boolean) => void;
}

function RenderOptionForm({ configuration, setConfigurationParam }: FormInterface): React.ReactElement {
  const { colorizeAscii } = configuration;
  return (
    <div id="option">
        <div>
           <label htmlFor="Colorize">Colorize Ascii</label><br/>
           <input type="checkbox" name="Colorize" id="Colorize" checked={colorizeAscii} onChange={e => setConfigurationParam("colorizeAscii", !!e.target.checked)}/>
           <p>Toggle this option can takes time to rerender. Please be patient :) </p>
        </div>
    </div>
  );
}

export default RenderOptionForm;

