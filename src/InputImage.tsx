import React, { useRef } from "react";

interface InputImageInterface {
 
}

function InputImage({}: InputImageInterface): React.ReactElement {
  const canvasRef = useRef(null);

  function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files as FileList;
    console.log(files[0]);
  }

  return (
    <>
      <p>
        <input type="file" onChange={onChangeFile} />
      </p>
      <canvas ref={canvasRef} id="preview"></canvas>
    </>
  );
}

export default InputImage;
