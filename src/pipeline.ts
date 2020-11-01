import { ConfigurationInterface } from "./useImageData";

let RgbQuant = require('rgbquant');

export function toGrayScale(red: number, green: number, blue: number) : number {
  return 0.21 * red + 0.72 * green + 0.07 * blue;
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

