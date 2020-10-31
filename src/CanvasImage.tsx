import React, { useRef, useEffect, useState } from "react";
import { convertToGrayScales } from "./pipeline";

interface CanvasImageInterface {
  imageData: ImageData | null;
}

function CanvasImage({ imageData }: CanvasImageInterface): React.ReactElement {
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

  if(!imageData) {
    return <></>;
  }

  return (
    <canvas width={imageData.width} height={imageData.height} ref={canvasRef}></canvas>
  );
}

export default CanvasImage;
