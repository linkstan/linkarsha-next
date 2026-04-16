export default function getCroppedImg(imageSrc, crop, zoom) {
return new Promise((resolve) => {

const image = new Image();
image.src = imageSrc;

image.onload = () => {

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const size = 1200;

canvas.width = size;
canvas.height = size * 0.35;

ctx.drawImage(
image,
crop.x,
crop.y,
crop.width,
crop.height,
0,
0,
canvas.width,
canvas.height
);

canvas.toBlob((blob) => {
resolve(blob);
}, "image/jpeg", 0.9);

};

});
}
