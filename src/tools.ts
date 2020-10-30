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