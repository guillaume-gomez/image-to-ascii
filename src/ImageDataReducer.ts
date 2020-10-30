import { useState } from "react";
import { convertToGrayScales } from "./tools";

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
    console.log("coucou")
    let canvas = document.createElement("canvas");
    console.log("bite")
    let context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const reader : FileReader = new FileReader();
    reader.onload = (event: Event) => {
      console.log("image")
      const image : HTMLImageElement = new Image();
      image.onload = () => {
        console.log("teub")
        setWidth(image.width);
        setHeight(image.height);
        console.log(image.width);
        console.log(image.height);
        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);
        console.log(image)
        const iData : ImageData = context.getImageData(0, 0, image.width, image.height);
        
        const [pixels, imageDataModified] = convertToGrayScales(iData);
        setPixels(pixels);
        setImageData(imageDataModified);
      }
      if(reader.result) {
            image.src = reader.result as string;
          }
    };
    reader.readAsDataURL(file);
    setFile(file);
  }

  return { pixels, imageData, readFile, width, height };
}

export default useImageData;