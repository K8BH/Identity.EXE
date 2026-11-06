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