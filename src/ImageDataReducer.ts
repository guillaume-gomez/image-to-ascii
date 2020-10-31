import { useState } from "react";
import { convertToGrayScales, clampDimensions } from "./tools";

interface initialStateInterface {
  pixels: number[];
  file: File | null;
}

const initialState : initialStateInterface = {
  pixels: [],
  file: null
}

function useImageData(state : initialStateInterface = initialState) {
  const [file, setFile] = useState<File| null>(state.file);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [pixels, setPixels] = useState<number[]>(state.pixels);
  const [imageData, setImageData] = useState<ImageData|null>(null);
  
  function readFile(file: File) {
    //create temporary canvas
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const reader : FileReader = new FileReader();
    reader.onload = (event: Event) => {
      const image : HTMLImageElement = new Image();
      image.onload = () => {
        const [widthMax, heightMax] = clampDimensions(image.width, image.height);
        
        canvas.height = heightMax;
        canvas.width = widthMax;
        context.drawImage(image, 0, 0, widthMax, heightMax);

        const iData : ImageData = context.getImageData(0, 0, widthMax, heightMax);
        const [pixels, imageDataModified] = convertToGrayScales(iData);
        
        setWidth(widthMax);
        setHeight(heightMax);
        setPixels(pixels);
        setImageData(imageDataModified);
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

  return { pixels, imageData, readFile, width, height };
}

export default useImageData;