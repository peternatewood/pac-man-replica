var BOARD_HEIGHT = 288;
var BOARD_WIDTH = 224;
var VERT_TILES = BOARD_HEIGHT / 8;
var HORIZ_TILES = BOARD_WIDTH / 8;

gameBoard = new Array(VERT_TILES);
for(var y = 0; y < VERT_TILES; y++) {
  gameBoard[y] = new Array(HORIZ_TILES);
  for(var x = 0; x < HORIZ_TILES; x++) {
    gameBoard[y][x] = "";
  }
}

var canvas, context, canvasData;

var drawPixel = function(args) {
  var index = (args.x + args.y * canvas.width) * 4;

  canvasData.data[index + 0] = args.r;
  canvasData.data[index + 1] = args.g;
  canvasData.data[index + 2] = args.b;
  canvasData.data[index + 3] = args.a;
}

var drawObject = function(args) {
  var width = args.objectArr.length;
  var height = args.objectArr[0].length;
  context.clearRect(args.x, args.y, width, height);

  args.objectArr.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      if(col == "x") {
        drawPixel({
          x: args.x + cIndex,
          y: args.y + rIndex,
          r: args.color.r,
          g: args.color.g,
          b: args.color.b,
          a: args.color.a
        });
      }
    });
  });
}

var drawPac = function(x, y) {
  context.fillStyle = "#FF0";
  context.beginPath();
  context.arc(x, y, 6, 0.25 * Math.PI, 1.75 * Math.PI, false);
  context.lineTo(x, y);
  context.closePath();
  context.fill();
}
var drawGhost = function(xPos, yPos, color, direction, step) {
  context.fillStyle = color;
  var x = new Number(xPos);
  var y = new Number(yPos);

  // body
  context.beginPath();
  context.arc(x, y, 6, Math.PI, 0, false);
  context.moveTo(x += 7, y);
  context.lineTo(x, y += 5);
  context.lineTo(x -= 14, y);
  context.lineTo(x, y -= 5);
  context.closePath();
  context.fill();

  drawGhostTendrils(xPos, yPos, step);
  drawGhostEyes(xPos, yPos, direction);
}
var drawGhostEyes = function(ghostX, ghostY, direction) {
  context.fillStyle = "#FFF";
  var x = ghostX -= 3;
  var y = ghostY -= 3;

  switch(direction) {
    case "up": y -= 2; break;
    case "down": y += 1; break;
    case "left": x--; break;
    case "right": x++; break;
  }

  // Whites of eyes
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x += 0.5, y);
  context.lineTo(x += 1.5, y += 1.5);
  context.lineTo(x, y += 2);
  context.lineTo(x -= 1.5, y += 1.5);
  context.lineTo(x -= 1, y);
  context.lineTo(x -= 1.5, y -= 1.5);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 1.5, y -= 1.5);
  context.moveTo(x += 6.5, y);
  context.lineTo(x += 0.5, y);
  context.lineTo(x += 1.5, y += 1.5);
  context.lineTo(x, y += 2);
  context.lineTo(x -= 1.5, y += 1.5);
  context.lineTo(x -= 1, y);
  context.lineTo(x -= 1.5, y -= 1.5);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 1.5, y -= 1.5);
  context.fill();

  switch(direction) {
    case "up":
      x = ghostX - 1;
      y = ghostY - 2;
    break;
    case "down":
      x = ghostX - 1;
      y = ghostY + 4;
    break;
    case "left":
      x = ghostX - 3;
      y = ghostY + 2;
    break;
    case "right":
      x = ghostX + 1;
      y = ghostY + 2;
    break;
  }

  context.fillStyle = "#22F";
  context.fillRect(x, y, 2, 2);
  context.fillRect(x += 6, y, 2, 2);
}
var drawGhostTendrils = function(ghostX, ghostY, step) {
  var x = ghostX + 7;
  var y = ghostY + 5;

  context.moveTo(x, y);
  switch(step) {
    case 0:
      context.lineTo(x, y += 3);
      context.lineTo(x -= 1, y);
      context.lineTo(x -= 2, y -= 2.5);
      context.lineTo(x -= 2, y += 2.5);
      context.lineTo(x -= 1, y);
      context.lineTo(x, y -= 2);
      context.lineTo(x -= 2, y);
      context.lineTo(x, y += 2);
      context.lineTo(x -= 1, y);
      context.lineTo(x -= 2, y -= 2.5);
      context.lineTo(x -= 2, y += 2.5);
      context.lineTo(x -= 1, y);
      context.lineTo(x, y -= 3);
    break;
    case 1:
      context.lineTo(x, y += 1);
      context.lineTo(x -= 2, y += 2.5);
      context.lineTo(x -= 2, y -= 2.5);
      context.lineTo(x -= 1, y);
      context.lineTo(x -= 2, y += 2.5);
      context.lineTo(x -= 2, y -= 2.5);
      context.lineTo(x -= 1, y);
      context.lineTo(x -= 2, y += 2.5);
      context.lineTo(x -= 2, y -= 2.5);
      context.lineTo(x, y -= 1);
    break;
  }
  context.closePath();
  context.fill();
}

var aCxt, pacOsc, pacGain, pacModOsc, pacModGain;

var initAudio = function() {
  aCxt = !!AudioContext ? new AudioContext() : new webkitAudioContext();
  pacOsc = aCxt.createOscillator();
  pacModOsc = aCxt.createOscillator();
  pacGain = aCxt.createGain();
  pacModGain = aCxt.createGain();

  pacOsc.connect(pacGain);
  pacGain.connect(aCxt.destination);
  pacModOsc.connect(pacModGain);
  pacModGain.connect(pacOsc.frequency);

  pacModOsc.type = "triangle";
  pacOsc.type = "triangle";
  pacOsc.frequency.value = 415;
  pacGain.gain.value = 0.1;
  pacModOsc.frequency.value = 2.67;
  pacModGain.gain.value = 100;
}

var startPacAudio = function(seconds) {
  var runSeconds = seconds || 2;
  pacOsc.start();
  pacModOsc.start();
  pacOsc.stop(runSeconds);
  pacModOsc.stop(runSeconds);
}

var ready = function(fun) {
  if(document.readyState != "loading") {
    fun();
  }
  else if(document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fun);
  }
  else {
    document.attachEvent("onreadystatechange", function() {
      if(document.readyState != "loading") {
        fun();
      }
    });
  }
}

ready(function() {
  canvas = document.getElementById("board");
  context = canvas.getContext("2d");
  canvasData = context.getImageData(0, 0, canvas.width, canvas.height);

  var debugDisp = document.getElementById("debug");

  var x = 8;
  var y = 8;
  for(var prop in charset) {
    drawObject({
      x: x,
      y: y,
      objectArr: charset[prop],
      color: {r: 255, g: 255, b: 255, a: 255}
    });
    x += 8;
    if(x + 8 > BOARD_WIDTH) {
      x = 8;
      y += 8;
    }
  }

  context.putImageData(canvasData, 0, 0);

  drawBorders();
  drawPac(113, 212);
  drawGhost(112, 115, "#F00", "left", 1);
  drawGhost(96, 139, "#4FF", "up", 0);
  drawGhost(112, 139, "#FCF", "right", 1);
  drawGhost(128, 139, "#FA6", "down", 0);

  // context.fillStyle = "#080";
  // for(var x = 0; x < BOARD_WIDTH; x += 8) {
  //   context.fillRect(x, 0, 1, BOARD_HEIGHT);
  // }
  // for(var y = 0; y < BOARD_HEIGHT; y += 8) {
  //   context.fillRect(0, y, BOARD_WIDTH, 1);
  // }
});
