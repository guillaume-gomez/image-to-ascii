declare module "rgbquant" {

  type ColorDist = "manhattan" | "euclidean";
  type DithKern = "FloydSteinberg" | "FalseFloydSteinberg" | "Stucki" | "Atkinson" | "Jarvis" | "Burkes" | "Sierra"| "TwoSierra"| "SierraLite";
  type RGBType= {
    r: number;
    g: number;
    b: number;
  };
  type Palette = RGBType[] | Uint8Array;
  type Image = HTMLImageElement | HTMLCanvasElement | CanvasRenderingContext2D | ImageData | TypeArray | Array;

  type Opts = {
    colors: number;
    method: number;
    boxSize: [number, number];
    boxPxls: number;
    initColors: number;
    minHueCols: number;
    dithKern:  DithKern | null;
    dithDelta: number;
    dithSerp: boolean;
    palette: RGBType[];
    reIndex: boolean;
    useCache: boolean;
    cacheFreq: number;
    colorDist: ColorDist;
  };

  interface RgbQuant {
    sample: (image: Image, width?: number) => void;
    palette: (tuples: boolean, noSort: boolean) => Palette;
    reduce: (image : Image, retype: number = 1, dithKern: DithKern | null = null, dithSerp: boolean = false) => Uint8Array | Array;
  };
}