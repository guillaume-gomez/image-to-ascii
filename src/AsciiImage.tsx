import React, { useState } from "react";
import { toGrayScale } from "./tools";

import './AsciiImage.css';


const grayRamp : string = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
const rampLength : number = grayRamp.length;

interface AsciiImageInterface {
  imageData: ImageData | null;
  width: number;
}

function AsciiImage({imageData, width}: AsciiImageInterface): React.ReactElement {

  function getCharacterForGrayScale(grayScale: number) {
    return grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];
  }

  function convertImageDataToGreyPixels(imageData: ImageData) : number[] {
    let pixels = [];
    for (let i = 0 ; i < imageData.data.length ; i += 4) {
      const red = imageData.data[i];
      const green = imageData.data[i + 1];
      const blue = imageData.data[i + 2];
      const grayScale = toGrayScale(red, green, blue);
     
      pixels.push(grayScale);
    }
    return pixels;
  }


  function drawAscii(imageData : ImageData | null, width: number) : string {
    if(!imageData) {
      return "";
    }

    const grayScales : number [] = convertImageDataToGreyPixels(imageData);

    return grayScales.reduce((asciiImage : string, grayScale : number, index : number) => {
      let nextChars = getCharacterForGrayScale(grayScale);

      if ((index + 1) % width === 0) {
          nextChars += '\n';
      }

      return asciiImage + nextChars;
    }, '');
  }

  return (
    <pre className="Ascii-content">
      {drawAscii(imageData, width)}
    </pre>
  );
}

export default AsciiImage;
