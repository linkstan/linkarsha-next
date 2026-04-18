export default function getCroppedImg(imageSrc, crop) {
return new Promise((resolve) => {

const image = new Image();
image.src = imageSrc;

image.onload = () => {

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

/* create a PERFECT square image */

const size = 1200;

canvas.width = size;
canvas.height = size;

ctx.drawImage(
image,
crop.x,
crop.y,
crop.width,
crop.height,
0,
0,
size,
size
);

canvas.toBlob((blob) => {
resolve(blob);
}, "image/jpeg", 0.95);

};

});
}
