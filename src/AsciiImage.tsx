import React, { useMemo } from "react";
import { toGrayScale, pixels, getCharacterForGrayScale, compressImageData, CompressPixel } from "./pipeline";

import './AsciiImage.css';

interface AsciiImageInterface {
  imageData: ImageData | null;
  colorize: boolean;
  processing: boolean;
}

function AsciiImage({ imageData, colorize, processing }: AsciiImageInterface): React.ReactElement {

  const drawAsciiMemo = useMemo(() => {
    function drawAscii(imageData : ImageData | null) : string {
      console.log("drawAscii");
      if(!imageData) {
        return "";
      }
      const grayScales = convertImageDataToGreyPixels(imageData);
      const result = grayScales.reduce((asciiImage : string, grayScale : number, index : number) => {
        let nextChars = getCharacterForGrayScale(grayScale);

        if ((index + 1) % imageData.width === 0) {
            nextChars += '\n';
        }
        return asciiImage + nextChars;
      }, "");
      return result;
    }

    return drawAscii(imageData);
  }, [imageData]);

  const drawAsciiWithColorMemo = useMemo( () => {
    function drawAsciiWithColor(imageData : ImageData | null ) {
      console.log("drawAsciiWithColor");
      if(!imageData) {
        return "";
      }

      let result : HTMLElement[] = [];
      const compressPixels: CompressPixel[] = compressImageData(imageData);
      compressPixels.forEach(({color, nbOccurences, char}, index) => {
        if(char === "\n") {
          result.push(<br key={index+"br"} />);
        } else {
          result.push(<span key={index} style={{color: pixelToCssColor(color)}}>{char.repeat(nbOccurences)}</span>);
        }
      });
      return result;
    }

    return drawAsciiWithColor(imageData);
  }, [imageData]);

  function convertImageDataToGreyPixels(imageData: ImageData) : number[] {
    let pixelsInGrey : number[] = [];

    for (let i = 0 ; i < imageData.data.length ; i += 4) {
      const red = imageData.data[i];
      const green = imageData.data[i + 1];
      const blue = imageData.data[i + 2];
      const grayScale = toGrayScale(red, green, blue);
      pixelsInGrey = [...pixelsInGrey, grayScale];
    }
    return pixelsInGrey;
  }

  function pixelToCssColor(pixel: number[]) : string {
    const [red, green, blue] = pixel;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  if(processing) {
    return <p>Work in progress...</p>
  }

  return (
    <pre className="Ascii-content">
      {colorize ?
       drawAsciiWithColorMemo:
       drawAsciiMemo
      }
    </pre>
  );
}

export default AsciiImage;

