function toGrayScale(red: number, green: number, blue: number) : number {
  return 0.21 * red + 0.72 * green + 0.07 * blue;
}

export function convertToGrayScales(imageData: ImageData) : [number[], ImageData] {
  const grayScales : number[] = [];
  for (let i = 0 ; i < imageData.data.length ; i += 4) {
      const red = imageData.data[i];
      const green = imageData.data[i + 1];
      const blue = imageData.data[i + 2];

      const grayScale = toGrayScale(red, green, blue);
      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;

      grayScales.push(grayScale);
  }
  return [grayScales, imageData];
};


const MAXIMUM_WIDTH = 80;
const MAXIMUM_HEIGHT = 80;

function getFontRatio() : number {
    const pre = document.createElement('pre');
    pre.style.display = 'inline';
    pre.textContent = ' ';

    document.body.appendChild(pre);
    const { width, height } = pre.getBoundingClientRect();
    document.body.removeChild(pre);

    return height / width;
};

export function clampDimensions(width : number, height : number) : [number, number] {
  const rectifiedWidth = Math.floor(getFontRatio() * width);

  if (height > MAXIMUM_HEIGHT) {
    const reducedWidth = Math.floor(rectifiedWidth * MAXIMUM_HEIGHT / height);
    return [reducedWidth, MAXIMUM_HEIGHT];
  }

  if (width > MAXIMUM_WIDTH) {
    const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / rectifiedWidth);
    return [MAXIMUM_WIDTH, reducedHeight];
  }

  return [width, height];
};