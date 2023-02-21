let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let nx = 16;
let ny = 11;
let sqside = 24;
let herox = 2;
let heroy = 1;
let r = 16;
let a = Math.PI/3; //angle
let heroimg = new Image();
heroimg.src = "hero.png";
canvas.width = nx * r * 2;
canvas.height =  ny * r * 2;
let map = [];

function Hexagon(x, y, isFill) {
    this.x = x;
    this.y = y;
    this.isFill = isFill;
}
mapGen(canvas.width, canvas.height);
function drawMap() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(heroimg, herox, heroy, sqside, sqside);
    drawGrid(canvas.width, canvas.height);
}
drawMap();
function mapGen(width, height){
     for (let x = r, j = 0; x + r * Math.sin(a) < height; x += 2 ** ((j + 1) % 2) * r * Math.sin(a), j = 0) {
        for (let y = r; y + r * (1 + Math.cos(a)) < width; y += r * (1 + Math.cos(a)), x += (-1) ** j++ * r * Math.sin(a)) {
            let isFill = false;
            if(Math.random() * 176 <= 3){
                isFill = true;
            }
            map.push(new Hexagon(x, y, isFill));
        }
    }
}
function drawGrid(width, height) {
    for (let x = r, j = 0, i = 0; x + r * Math.sin(a) < height; x += 2 ** ((j + 1) % 2) * r * Math.sin(a), j = 0) {
        for (let y = r; y + r * (1 + Math.cos(a)) < width; y += r * (1 + Math.cos(a)), x += (-1) ** j++ * r * Math.sin(a), i++) {
            drawHexagon(x, y, map[i].isFill);
        }
    }
}
function drawHexagon(x, y, isFill) {
    context.beginPath();
    for (let i = 0; i < 6; i++) {
        context.lineTo(x + r * Math.sin(a * i), y + r * Math.cos(a * i));
    }
    context.closePath();
    if(isFill){
        context.fill();
    } else{
        context.stroke();
    }
}
canvas.onclick = function(e) {
    let x = e.x - canvas.offsetLeft;
    let y = e.y - canvas.offsetTop;
    let h = Math.sqrt(3) * r / 2;
    for(let hex of map){
        let distance = Math.sqrt((hex.x - x) ** 2 + (hex.y - y) ** 2);
        if(distance < h && !hex.isFill){
            herox = hex.x - 2 * r / 3;
            heroy = hex.y - 2 * r / 3;
            break;
        }
    }
    drawMap();
}
