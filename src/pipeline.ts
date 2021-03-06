import { ConfigurationInterface } from "./useImageData";

let RgbQuant = require('rgbquant');

const grayRamp : string = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
const rampLength : number = grayRamp.length;

export function toGrayScale(red: number, green: number, blue: number) : number {
  return 0.21 * red + 0.72 * green + 0.07 * blue;
}

export function getCharacterForGrayScale(grayScale: number) {
  return grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];
}


export function pixels(image: ImageData) : number[][] {
  let pixels : number[][] = [];
  for(let i = 0; i < image.data.length; i += 4) {
    const red = image.data[i];
    const green = image.data[i + 1];
    const blue = image.data[i + 2];
    pixels = [...pixels, [red, green, blue]];
  }
  return pixels;
}

function getFontRatio() : number {
    const pre = document.createElement('pre');
    pre.style.display = 'inline';
    pre.textContent = ' ';

    document.body.appendChild(pre);
    const { width, height } = pre.getBoundingClientRect();
    document.body.removeChild(pre);

    return height / width;
};

export function clampDimensions(image: ImageData, configuration: ConfigurationInterface) : ImageData {
  const { maxWidth, maxHeight, autoScale } = configuration;
  console.log(autoScale)
  
  const rectifiedWidth = autoScale ? Math.floor(getFontRatio() * image.width) : image.width;
  if (image.height > maxHeight) {
    const reducedWidth = Math.floor(rectifiedWidth * maxHeight / image.height);
    return { ...image, width: reducedWidth, height: maxHeight } as ImageData;
  }

  if (image.width > maxWidth) {
    const reducedHeight = Math.floor(image.height * maxWidth / rectifiedWidth);
    return { ...image, width: maxWidth, height: reducedHeight } as ImageData;
  }

  return image;
}


export function convertToGrayScales(image: ImageData, _configuration: ConfigurationInterface) : ImageData {
  let rawImage: Uint8ClampedArray = image.data.slice();
  for (let i = 0 ; i < rawImage.length ; i += 4) {
    const red = rawImage[i];
    const green = rawImage[i + 1];
    const blue = rawImage[i + 2];

    const grayScale = toGrayScale(red, green, blue);
    rawImage[i] = rawImage[i + 1] = rawImage[i + 2] = grayScale;
  }
  return new ImageData(rawImage, image.width, image.height);
};

export function quantize(image: ImageData, configuration: ConfigurationInterface) {
  const { colors } = configuration;
  const rgbquant = new RgbQuant({colors , dithKern: "FloydSteinberg", minHueCols: 0});
  rgbquant.sample(image.data.slice());
  const rawImage = rgbquant.reduce(image.data.slice());
  return new ImageData(Uint8ClampedArray.from(rawImage), image.width, image.height);
}


export function makeImageData(image: HTMLImageElement, width: number, height: number) : ImageData {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.height = height;
  canvas.width = width;
  context.drawImage(image, 0, 0, width, height);
  return context.getImageData(0, 0, width, height);
}


export interface CompressPixel {
  color: number[];
  nbOccurences: number;
  char: string;
}

export function compressImageData(quantizedImage: ImageData) : CompressPixel[] {
  let compressedData : CompressPixel[] = [];

  let currentColor : number[] = [
    quantizedImage.data[0],
    quantizedImage.data[1],
    quantizedImage.data[2]
  ];
  let currentOccurence : number = 0;

  for(let i = 0; i < quantizedImage.data.length; i += 4) {
    const red = quantizedImage.data[i];
    const green = quantizedImage.data[i + 1];
    const blue = quantizedImage.data[i + 2];

    if(red !== currentColor[0] || green !== currentColor[1] || blue !== currentColor[2])
    {
      const char = getCharacterForGrayScale(toGrayScale(currentColor[0], currentColor[1], currentColor[2]));
      // flag to avoid an letter after \n
      if(currentOccurence > 0) {
        compressedData = [
          ...compressedData,
          {

            color: currentColor.slice(), nbOccurences: currentOccurence, char
          }
        ];
      }
      currentOccurence = 0;
      currentColor = [red, green, blue];
    }

    //end of line
    if( ((i/4) + 1) % quantizedImage.width === 0) {
      const char = getCharacterForGrayScale(toGrayScale(currentColor[0], currentColor[1], currentColor[2]));
      // add new value + \n that cut the width
      compressedData = [
        ...compressedData,
        {
          color : currentColor.slice(),
          nbOccurences: currentOccurence,
          char
        },
        {
          color: [-1, -1, -1],
          nbOccurences: 1,
          char: "\n"
        }
      ];
      currentOccurence = -1;
    }
    currentOccurence = currentOccurence + 1;
  }
  return compressedData;
}
