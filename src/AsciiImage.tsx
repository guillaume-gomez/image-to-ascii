import React, { useState } from "react";
import './AsciiImage.css';


const grayRamp : string = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
const rampLength : number = grayRamp.length;

interface AsciiImageInterface {
  pixels: number[] | null;
  width: number;
}

function AsciiImage({pixels, width}: AsciiImageInterface): React.ReactElement {

  function getCharacterForGrayScale(grayScale: number) {
    return grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];
  }

  function drawAscii(grayScales : number[] | null, width: number) : string {
    if(!grayScales) {
      return "";
    }
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
      {drawAscii(pixels, width)}
    </pre>
  );
}

export default AsciiImage;
