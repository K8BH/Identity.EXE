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
    if (!e.target.files[0]) return;
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
    temp.getContext('2d').drawImage(currentImg, sx ,sy , min ,min , 0,0, size/px , size/px);

    ctx.clearRect(0,0,size,size);
    ctx.drawImage(temp,0,0,size/px,size/px,0,0,size,size);

    drawStamp();
}

function drawStamp() {
    const size = canvas.width;
    ctx.fillStyle = '#181a16';
    ctx.fillRect(0,size -40, size,40);

    ctx.fillStyle = '#f3efe9';
    ctx.font = '700 20px "IBM Plex Mono"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '4px';
    ctx.fillText('Embassy', size / 2,size - 20);

}

function downloadPfp() {
    if (!hasImage) return;
    const a  = document.createElement('a');
    a.download = 'embassy_custom_pfp.png';
    a.href = canvas.toDataURL('image/png');
    a.click();


}

const speed = 1.2;

const allStickers = document.querySelectorAll('.sticker, .img-sticker');


const stickerPhysics = Array.from(allStickers).map(sticker => {
    return{
        Element: sticker,
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        vx: (Math.random() > 0.5 ? 1 : -1 ) * speed,
        vy: (Math.random() > 0.5 ? 1 : -1) * speed,

    };
});

function bounceStickers() {
    stickerPhysics.forEach(sticker => {
        const Rect = sticker.Element.getBoundingClientRect();

        sticker.x += sticker.vx;
        sticker.y += sticker.vy;

        if (sticker.x <= 0 || sticker.x + Rect.width >= window.innerWidth) {
            sticker.vx *= -1;

            sticker.x = sticker.x <= 0 ? 0 : window.innerWidth - Rect.width;
        }

        if (sticker.y <= 0 || sticker.y + Rect.height >= window.innerHeight) {
            sticker.vy *= -1;
            sticker.y = sticker.y <= 0 ? 0 : window.innerHeight - Rect.height;

        }

        sticker.Element.style.transform = `translate(${sticker.x}px, ${sticker.y}px)`;
    });
    requestAnimationFrame(bounceStickers);

}

if (allStickers.length > 0) {
    bounceStickers();
}
