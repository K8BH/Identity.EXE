const canvas = document.getElementById('pfpCanvas');
const ctx = canvas.getContext('2d');
const imgInput = document.getElementById('imgUpload');
const pxSlider = document.getElementById('pxSlider');
let currentImg = new Image();
let hasImage = false;

const cur = document.getElementById('cur');
window.addEventListener('mousemove', e => {cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
});

window.addEventListener('mouseover', e => {
    cur.classList.toggle('hover', ['BUTTON', 'INPUT', 'A', 'CANVAS'].includes(e.target.tagName));
});

drawStamp();

imgInput.onchange = e => {
    if (!e.target,files[0]) return;
    const reader = new FileReader();
    reader.onload = ev => currentImg.src = ev.target.result;
    reader.readAsDataURL(e.target.files[0]);
};

currentImg.onload = () => {hasImage = true; process();};

pxSlider.oninput = process;

function process() {
    if (!hasImage) return;
    const size = canvas.width;
    const px = pxSlider.value;
    ctx.imageSmoothingEnabled = false;


    const min = Math.min(currentImg.width, currentImg.height);
    const sx = (currentImg.width - min) / 2;
    const sy = (currentImg.height - min) / 2;

    const temp = document.createElement('canvas');
    temp.width = temp.height = size / px;
    temp.getContext('2d').drawImage(currentImg, sx ,sy , min ,min , 0,0)
}

