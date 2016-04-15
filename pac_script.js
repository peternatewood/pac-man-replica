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

var drawBorders = function() {
  var x = 0.5;
  var y = 32.5;

  context.strokeStyle = "#6800FF";
  context.lineWidth = 1;

  // Outer border
  context.beginPath();
  context.moveTo(x, y);
  context.quadraticCurveTo(x, y -= 8, x += 8, y);
  context.lineTo(x += 207, y);
  context.quadraticCurveTo(x += 8, y, x, y += 8);
  context.lineTo(x, y += 63);
  context.quadraticCurveTo(x, y += 8, x -= 8, y);
  context.lineTo(x -= 31, y);
  context.moveTo(--x, ++y);
  context.lineTo(x, y += 23);
  context.moveTo(++x, ++y);
  context.lineTo(x += 40, y);
  context.moveTo(x, y += 23);
  context.lineTo(x -= 40, y);
  context.moveTo(--x, ++y);
  context.lineTo(x, y += 23);
  context.moveTo(++x, ++y);
  context.lineTo(x += 31, y);
  context.quadraticCurveTo(x += 8, y, x, y += 8);
  context.lineTo(x, y += 79);
  context.quadraticCurveTo(x, y += 8, x -= 8, y);
  context.lineTo(x -= 207, y);
  context.quadraticCurveTo(x -= 8, y, x, y -= 8);
  context.lineTo(x, y -= 79);
  context.quadraticCurveTo(x, y -= 8, x += 8, y);
  context.lineTo(x += 32, y);
  context.moveTo(++x, --y);
  context.lineTo(x, y -= 23);
  context.moveTo(--x, --y);
  context.lineTo(x -= 40, y);
  context.moveTo(x, y -= 23);
  context.lineTo(x += 40, y);
  context.moveTo(++x, --y);
  context.lineTo(x, y -= 23);
  context.moveTo(--x, --y);
  context.lineTo(x -= 32, y);
  context.quadraticCurveTo(x -= 8, y, x, y -= 8);
  context.lineTo(x, y -= 63);

  // Inner border
  context.moveTo(x += 3, y);
  context.lineTo(x, y -= 3);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 100, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 28);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 4, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 28);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 101, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 69);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 36, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 27);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 41, y);
  context.moveTo(x, y += 17);
  context.lineTo(x -= 41, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 27);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 36, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 36);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 14, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 4);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 14, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 37);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 213, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 37);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 14, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 4);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 14, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 36);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 37, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 27);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 42, y);
  context.moveTo(x, y -= 17);
  context.lineTo(x += 42, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 27);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 37, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 69);

  // Ghost house
  context.moveTo(x += 81, y += 96);
  context.lineTo(x += 19, y);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 16, y);
  context.lineTo(x, y += 26);
  context.lineTo(x += 50, y);
  context.lineTo(x, y -= 26);
  context.lineTo(x -= 16, y);
  context.lineTo(x, y -= 3);
  context.lineTo(x += 19, y);
  context.lineTo(x, y += 32);
  context.lineTo(x -= 56, y);
  context.lineTo(x, y -= 32);

  context.stroke();
}

var drawPac = function(x, y) {
  context.fillStyle = "#FF0";
  context.beginPath();
  context.arc(x, y, 6, 0.25 * Math.PI, 1.75 * Math.PI, false);
  context.lineTo(x, y);
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
  drawPac(114, 208);

  // context.fillStyle = "#080";
  // for(var x = 0; x < BOARD_WIDTH; x += 8) {
  //   context.fillRect(x, 0, 1, BOARD_HEIGHT);
  // }
  // for(var y = 0; y < BOARD_HEIGHT; y += 8) {
  //   context.fillRect(0, y, BOARD_WIDTH, 1);
  // }
});
