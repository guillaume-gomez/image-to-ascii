const MAXIMUM_WIDTH = 80;
const MAXIMUM_HEIGHT = 80;


function toGrayScale(red: number, green: number, blue: number) : number {
  return 0.21 * red + 0.72 * green + 0.07 * blue;
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

export function clampDimensions(image: ImageData) : ImageData {
  const rectifiedWidth = Math.floor(getFontRatio() * image.width);
  if (image.height > MAXIMUM_HEIGHT) {
    const reducedWidth = Math.floor(rectifiedWidth * MAXIMUM_HEIGHT / image.height);
    return { ...image, width: reducedWidth, height: MAXIMUM_HEIGHT } as ImageData;
  }

  if (image.width > MAXIMUM_WIDTH) {
    const reducedHeight = Math.floor(image.height * MAXIMUM_WIDTH / rectifiedWidth);
    return { ...image, width: MAXIMUM_WIDTH, height: reducedHeight } as ImageData;
  }

  return image;
}


export function convertToGrayScales(image: ImageData) : ImageData {
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


export function makeImageData(image: HTMLImageElement, width: number, height: number) : ImageData {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.height = height;
  canvas.width = width;
  context.drawImage(image, 0, 0, width, height);
  return context.getImageData(0, 0, width, height);
}