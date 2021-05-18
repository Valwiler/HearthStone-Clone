let spriteList = [];
let x = 0;
let y = 0;


window.addEventListener("load", () => {

    for (let i = 0; i < 100; i++) {
        spriteList.push(new particules(window.innerWidth, window.innerHeight));
    }

    tick();

})
document.onmousemove = e => {
    x = e.pageX;
    y = e.pageY;

}


const tick = () => {
    for (i = 0; i < spriteList.length; i++) {
        spriteList[i].tick(x, y);
        if (spriteList[i].alive == false) {
            spriteList.splice(i, 1)
            i--;
        }
    }
    window.requestAnimationFrame(tick);
}