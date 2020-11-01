import { useState } from "react";
import { clampDimensions, convertToGrayScales, makeImageData, quantize } from "./pipeline";

export interface ConfigurationInterface {
  maxWidth: number;
  maxHeight: number;
  autoScale: boolean;
  colorize: boolean;
  colors: number;
}

interface useDataImageInterface {
  configuration: ConfigurationInterface;
  setConfigurationParam: (param: string, value: string | number | boolean) => void;
  image : ImageData | null;
  computeState: boolean;
  readFile: (file: File) => void;
}

interface initialStateInterface {
  file: File | null;
}

const initialState : initialStateInterface = {
  file: null
}

function useImageData(state : initialStateInterface = initialState) {
  const [file, setFile] = useState<File| null>(state.file);
  const [computeState, setComputeState] = useState<boolean>(false)
  const [image, setImage] = useState< ImageData | null>(null);
  const [configuration, setConfiguration ] = useState<ConfigurationInterface>({
    maxWidth: 80,
    maxHeight: 80,
    autoScale: true,
    colorize: false,
    colors: 12,
  });
  
  function readFile(file: File) {
    const reader : FileReader = new FileReader();
    reader.onload = (event: Event) => {
      const image : HTMLImageElement = new Image();
      image.onload = () => {
        const { width, height } : ImageData = clampDimensions({
          data: new Uint8ClampedArray(),
          width: image.width,
          height: image.height
        }, configuration);

        const iData : ImageData = makeImageData(image, width, height);
        const imageDataModified = quantize(iData, configuration);
        setImage(imageDataModified);
        setComputeState(false);
      }
      if(reader.result) {
        // call image onload event
        image.src = reader.result as string;
        setComputeState(true);
      }
    };
    // close the reader
    reader.readAsDataURL(file);
    setFile(file);
  }

  function setConfigurationParam(param: string, value: string | number) {
    setConfiguration({...configuration, [param]: value });
  }

  return { image, computeState, readFile, configuration, setConfigurationParam } as useDataImageInterface;
}

export default useImageData;