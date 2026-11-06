const KEY = 'id_min_v1';

const def = {

    name: 'Kaustubh Patil',
    handle:'@k8bh',
    bio:'indie game devloper and guitarist',
    stack:'Html,css,js,guitar,physics',
    goal:'nuclear scientist',
    link:'github.com/K8BH',
    theme:'cream'
};

let state = JSON.parse(localStorage.getItem(KEY)) || { ...def };

const cur = document.getElementById('cur');
window.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';

});


window.addEventListener('mouseover',e => {
    cur.classList.toggle('hover',['BUTTON','INPUT'].includes(e.target.tagName));

});

function setTheme(t) {
    state.theme = t;
    const c = document.getElementById('card');
    if (c) c.className = 'card ' + t;
    localStorage.setItem(KEY, JSON.stringify(state));
}

function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++){
        h = Math.imul(h ^ str.charCodeAt(i), 16777619);
    }
    return h >>> 0;
}

function drawPix(seed) {
    const ctx = document.getElementById('pix').getContext('2d');
    const cols = ['#181a16', '#86946f','#e4dec8','#f3efe9'];
    let b = seed;
    for (let y = 0; y < 8; y++){
        for (let x = 0; x < 4; x++){
            b = (b * 1664525 + 1013904223) >>> 0;
            ctx.fillStyle = cols[b % 4];
            ctx.fillRect(x,y,1,1);
            ctx.fillRect(7 - x,y,1,1);
        }
    }
}

function shareURL(){
    const base = location.origin !== 'null' ? location.origin + location.pathname : 'https://k8bh.github.io/id/';
    return base + '#id=' + btoa(encodeURIComponent(JSON.stringify(state)));
}

function makeQR() {
    const q = document.getElementById('qr');
    if (!q) return;
    q.innerHTML = '';
    new QRCode(q,{
        text: shareURL(),
        width:54,
        height:54,
        colorDark: '#181a16',
        colorLight: '#f3Efe9',
        correctLevel: QRcode.CorrectLevel.L
    });
}

function update (read = true) {
    if (read) {
        state.name = document.getElementById('inName').value;
        state.handle = document.getElementById('inHandle').value;
        state.bio = document.getElementById('inBio').value;
        state.stack = document.getElementById('inStack').value;
        state.goal = document.getElementById('inGoal').value;
        state.link = document.getElementById('inLink').value;
        localStorage.setItem(KEY, JSON.stringify(state));

    }
    document.getElementById('outName').innerText = state.name;
    document.getElementById('outHandle').innerText = state.handle;
    document.getElementById('outBio').innerText = state.bio;
    document.getElementById('outGoal').innerText = state.goal;
    document.getElementById('outLink').innerText = state.link;
}