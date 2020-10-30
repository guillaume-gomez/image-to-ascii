import React, { useState } from "react";

const grayRamp : string = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
const rampLength : number = grayRamp.length;

interface AsciiImageInterface {
}

function AsciiImage({}: AsciiImageInterface): React.ReactElement {
  const [asciiData, setAsciiData] = useState<string | null>(null);

  function getCharacterForGrayScale(grayScale: number) {
    return grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];
  }

  function drawAscii(grayScales : number[], width: number) : string {
    return grayScales.reduce((asciiImage : string, grayScale : number, index : number) => {
      let nextChars = getCharacterForGrayScale(grayScale);

      if ((index + 1) % width === 0) {
          nextChars += '\n';
      }

      return asciiImage + nextChars;
    }, '');
  }

  return (
    <pre>
      {asciiData}
    </pre>
  );
}

export default AsciiImage;
