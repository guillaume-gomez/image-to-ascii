import { useState } from "react";
import { clampDimensions, convertToGrayScales, makeImageData, quantize } from "./pipeline";

export interface ConfigurationInterface {
  maxWidth: number;
  maxHeight: number;
  autoScale: boolean;
  colorizeImage: boolean;
  colorizeAscii: boolean;
  colors: number;
  backgroundColorAscii: string;
}

interface useDataImageInterface {
  configuration: ConfigurationInterface;
  setConfigurationParam: (param: keyof ConfigurationInterface, value: string | number | boolean) => void;
  image : ImageData | null;
  processing: boolean;
  readFile: (file: File) => void;
  hasFile: boolean;
  submit: () => void;
}

interface initialStateInterface {
  file: File | null;
}

const initialState : initialStateInterface = {
  file: null
}

function useImageData(state : initialStateInterface = initialState) {
  const [file, setFile] = useState<File| null>(state.file);
  const [processing, setProcessing] = useState<boolean>(false)
  const [image, setImage] = useState< ImageData | null>(null);
  const [configuration, setConfiguration ] = useState<ConfigurationInterface>({
    maxWidth: 80,
    maxHeight: 80,
    autoScale: true,
    colorizeImage: true,
    colorizeAscii: true,
    colors: 12,
    backgroundColorAscii: "#1D2A49"
  });

  function readFile(file: File) {
    setFile(file);
  }

  function submit() {
    if(!file) {
      return;
    }
    setProcessing(true);
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
        let imageDataModified = null;
        if(configuration.colorizeImage) {
          imageDataModified = quantize(iData, configuration);
        } else {
          imageDataModified = convertToGrayScales(quantize(iData, configuration), configuration);
        }
        setImage(imageDataModified);
        setProcessing(false);
      }
      if(reader.result) {
        // call image onload event
        image.src = reader.result as string;
      }
    };
    // close the reader
    reader.readAsDataURL(file);
  }

  function setConfigurationParam(param: string, value: string | number) {
    setConfiguration({...configuration, [param]: value });
  }

  return { image, processing, hasFile: (file !== null), readFile, configuration, setConfigurationParam, submit } as useDataImageInterface;
}

export default useImageData;