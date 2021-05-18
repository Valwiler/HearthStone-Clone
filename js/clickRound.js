let canvas = null;
let ctx = null;
let particuleNumber = 150;
let round = [];
let x = 0;
let y = 0;



window.addEventListener("click", (e) => {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d"); // Comme Graphics de Java
    x = e.pageX;
    y = e.pageY;
    for (let i = 0; i < particuleNumber; i++) {
        particule.push(new cercle(x, y));
    }

    tick();
})

const tick = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particule.length; i++) {
        particule[i].tick();


    }

    window.requestAnimationFrame(tick);
}

class cercle {
    constructor(x, y) {
        let x = x;
        let y = y;
        let opacity = Math.random();
        let gravity = Math.random();
        let size = 1;
        let alive = true;
    }

    tick() {
        this.size += 1;
        if (this.size < 200) {
            ctx.beginPath();
            ctx.arc(100, 75, 50, 0, size * Math.PI);
            ctx.stroke();
        } else {
            alive = false;
        }
    }
}