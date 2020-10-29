const canvas = document.getElementById('preview') as HTMLCanvasElement;
const fileInput = document.querySelector('input[type="file"') as HTMLInputElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

fileInput.onchange = (e: Event) => {
    // just handling single file upload
    const file = (e.target as HTMLInputElement).files[0];

    const reader : FileReader = new FileReader();
    reader.onload = (event: Event) => {
        const image : HTMLImageElement = new Image();
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;

            context.drawImage(image, 0, 0);
        }
        image.src = reader.result;
    };

    reader.readAsDataURL(file);
};