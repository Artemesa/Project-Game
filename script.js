let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let nx = 22;
let ny = 44;
let sqside = 24;
let herox = 2;
let heroy = 1;
let r = 16;
let a = 2*Math.PI/6; //angle
let heroimg = new Image();
heroimg.src = "hero.png";
canvas.width = nx * r;
canvas.height = ny * r;

function drawMap() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(heroimg, herox * sqside, heroy * sqside, sqside, sqside);
    drawGrid(canvas.width, canvas.height);
    // for ( let i = 0; i < nx; i++) {
    //     for (let j = 0; j < ny; j++) {
    //         let start = sqside * i;
    //         if(j%2==0) {
    //            start+=sqside/2
    //         }
    //         context.strokeRect(start, j * sqside, sqside,  sqside);
    //     }
    // }
}

drawMap();
function drawGrid(width, height) {
    // for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
    //     for (let x = r, j = 0; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
    //         drawHexagon(x, y);
    //     }
    // }

    // for (let y = r; y + r * Math.sin(a) < height; y += 2*r-4) {
    //     for (let x = r, j = 0; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
    //         //if(j%2==0){
    //         drawHexagon(x, y);
    //         //}
    //     }
    // }

    for (let y = r, j = 0; y + r * Math.sin(a) < height; y += 2 ** ((j + 1) % 2) * r * Math.sin(a), j = 0) {
    for (let x = r; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
      drawHexagon(y, x);
    }
  }
}
function drawHexagon(x, y) {
    context.beginPath();
    for (let i = 0; i < 6; i++) {
        context.lineTo(x + r * Math.sin(a * i), y + r * Math.cos(a * i));
    }
    context.closePath();
    context.stroke();
}
canvas.onclick = function(e) {
    let x = e.x - canvas.offsetLeft;
    let y = e.y - canvas.offsetTop;
    let posy = Math.floor( y / sqside);
    let posx = 0;
    if(posy%2==0){
        posx = Math.floor( x / sqside) + 0.5;
    }else posx = Math.floor( x / sqside);


    herox = posx;
    heroy = posy;
    drawMap();
}
