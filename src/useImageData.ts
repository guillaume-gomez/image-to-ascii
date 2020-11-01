import { useState } from "react";
import { clampDimensions, convertToGrayScales, makeImageData, quantize } from "./pipeline";

interface initialStateInterface {
  file: File | null;
}

const initialState : initialStateInterface = {
  file: null
}

function useImageData(state : initialStateInterface = initialState) {
  const [file, setFile] = useState<File| null>(state.file);
  const [image, setImage] = useState< ImageData | null>(null);
  
  function readFile(file: File) {
    const reader : FileReader = new FileReader();
    reader.onload = (event: Event) => {
      const image : HTMLImageElement = new Image();
      image.onload = () => {
        const { width, height } : ImageData = clampDimensions({ data: new Uint8ClampedArray(), width: image.width, height: image.height });
        const iData : ImageData = makeImageData(image, width, height);
        const imageDataModified = quantize(iData);
        setImage(imageDataModified);
      }
      if(reader.result) {
        // call image onload event
        image.src = reader.result as string;
      }
    };
    // close the reader
    reader.readAsDataURL(file);
    setFile(file);
  }

  return { image, readFile };
}

export default useImageData;