let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
let nx = 16;
let ny = 11;
//let sqside = 24;
let herox = 2;
let heroy = 1;
let villainx = 5;
let villainy = 6;
let hasvillainspawned = false;
let r = 16;
let a = Math.PI / 3; //angle
let h = r * Math.sqrt(3) / 2;
let heroimg = new Image();
let villainimg = new Image();
heroimg.src = "devil.png";
villainimg.src = "durvo.png";
canvas.width = nx * h * 2;
canvas.height = ny * (2 * r - Math.sqrt(r ** 2 - h ** 2)) + Math.sqrt(r ** 2 - h ** 2);
let map = [];

function Hexagon(x, y, isFill) {
    this.x = x;
    this.y = y;
    this.isFill = isFill;
}
mapGen(canvas.width, canvas.height);

function drawMap() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(villainimg, villainx - 5, villainx - 55, 30, 75);
    context.drawImage(heroimg, herox - 5, heroy - 50, 30, 75);
    drawGrid(canvas.width, canvas.height);
}
drawMap();

function mapGen(width, height) {
    for (let y = r, i = 0, j = 0; y < height; y += 2 * r - Math.sqrt(r ** 2 - h ** 2), j++) {
        for (let x = (j % 2 == 0 ? 2 * h : h); x < width; x += h * 2, i++) {
            let isFill = false;
            if (Math.random() * 176 <= 3) {
                isFill = true;
            } else if (Math.random() * 100 <= 1 && !hasvillainspawned) {
                hasvillainspawned = true;
                villainx = x - 2 * r / 3;
                villainy = y - 2 * r / 3;
            }
            map.push(new Hexagon(x, y, isFill));
        }
    }
}

function drawGrid(width, height) {
    for (let y = r, i = 0, j = 0; y < height; y += 2 * r - Math.sqrt(r ** 2 - h ** 2), j++) {
        for (let x = (j % 2 == 0 ? 2 * h : h); x < width; x += h * 2, i++) {
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
    if (isFill) {
        context.fill();
    } else {
        context.stroke();
    }
}
canvas.onclick = function(e) {
    let x = e.x - canvas.offsetLeft;
    let y = e.y - canvas.offsetTop;
    let h = Math.sqrt(3) * r / 2;
    for (let hex of map) {
        let distance = Math.sqrt((hex.x - x) ** 2 + (hex.y - y) ** 2);
        if (distance < h && !hex.isFill) {
            herox = hex.x - 2 * r / 3;
            heroy = hex.y - 2 * r / 3;
            break;
        }
    }
    drawMap();
}
