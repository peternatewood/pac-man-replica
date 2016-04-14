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
  context.fillStyle = args.color;

  args.objectArr.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      if(col == 1) {
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
});
