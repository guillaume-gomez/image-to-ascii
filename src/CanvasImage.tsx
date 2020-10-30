import React, { useRef, useEffect, useState } from "react";
import { convertToGrayScales } from "./tools";

interface CanvasImageInterface {
  file: File | null;
  width: number;
  height: number;
}

function CanvasImage({ file, width, height }: CanvasImageInterface): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(file) {
      const canvas = canvasRef.current;
      if(!canvas) {
        return;
      }
      const context = canvas.getContext('2d')  as CanvasRenderingContext2D;
      const reader : FileReader = new FileReader();

      reader.onload = (event: Event) => {
        const image : HTMLImageElement = new Image();
        image.onload = () => {
          //canvas.width = image.width;
          //canvas.height = image.height;
          context.drawImage(image, 0, 0);
          // disable to not puth the image in grey scale
          convertToGrayScales(context, canvas.width, canvas.height);
        }
        if(reader.result) {
          image.src = reader.result as string;
        }
      };
      reader.readAsDataURL(file);

    }
  }, [file]);


  return (
    <canvas width={width} height={height} ref={canvasRef}></canvas>
  );
}

export default CanvasImage;
