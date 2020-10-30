import React, { useRef } from "react";

interface InputImageInterface {
 
}

function InputImage({}: InputImageInterface): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    // get files
    const files = event.target.files as FileList;
    const file = files[0];

    const canvas = canvasRef.current;
    if(!canvas) {
      return;
    }
    const context = canvas.getContext('2d')  as CanvasRenderingContext2D;

    const reader : FileReader = new FileReader();
    reader.onload = (event: Event) => {
      const image : HTMLImageElement = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        // disable to not puth the image in grey scale
        // convertToGrayScales(context, canvas.width, canvas.height);
      }
      if(reader.result) {
        image.src = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }


  return (
    <>
      <p>
        <input type="file" onChange={onChangeFile} />
      </p>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default InputImage;
