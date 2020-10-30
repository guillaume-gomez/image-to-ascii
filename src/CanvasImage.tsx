import React, { useRef, useEffect, useState } from "react";
import { convertToGrayScales } from "./tools";

interface CanvasImageInterface {
  imageData: ImageData | null;
  width: number;
  height: number;
}

function CanvasImage({ imageData, width, height }: CanvasImageInterface): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(imageData) {
      const canvas = canvasRef.current;
      if(!canvas) {
        return;
      }
      const context = canvas.getContext('2d')  as CanvasRenderingContext2D;
      context.putImageData(imageData, 0, 0);
    }
  }, [imageData]);

  return (
    <canvas width={width} height={height} ref={canvasRef}></canvas>
  );
}

export default CanvasImage;
