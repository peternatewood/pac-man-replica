var actorCanvas, boardCanvas, pelletCanvas;
var gameBoard = new Board();

var drawPellets = function(context) {
  context.fillStyle = "#FCF";

  gameBoard.board.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      if(col == ".") {
        context.fillRect((8 * cIndex) + 3, (8 * rIndex) + 27, 2, 2);
      }
      else if(col == "o") {
        context.beginPath();
        context.arc((8 * cIndex) + 4, (8 * rIndex) + 28, 4, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();
      }
      else if(col == "-") {
        context.fillRect((8 * cIndex), (8 * rIndex) + 29, 8, 2);
      }
    });
  });
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
  actorCanvas = new View("actors");
  boardCanvas = new View("board");
  pelletCanvas = new View("pellets");

  var alignCanvases = function() {
    var x = boardCanvas.canvas.offsetLeft + boardCanvas.canvas.clientLeft + "px";
    var y = boardCanvas.canvas.offsetTop + boardCanvas.canvas.clientTop + "px";

    actorCanvas.canvas.style["left"] = x;
    actorCanvas.canvas.style["top"] = y;
    pelletCanvas.canvas.style["left"] = x;
    pelletCanvas.canvas.style["top"] = y;
  }
  alignCanvases();

  window.pac = new Actor({
    context: actorCanvas.context,
    startX: 113,
    startY: 212,
    name: "m",
    direction: "right"
  });

  addEventListener("keydown", pac.handleKeyDown.bind(pac));
  addEventListener("keyup", pac.handleKeyUp.bind(pac));

  var debugDisp = document.getElementById("debug");

  var x = 8;
  var y = 8;
  for(var prop in charset) {
    boardCanvas.drawObject({
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

  boardCanvas.context.putImageData(boardCanvas.canvasData, 0, 0);

  drawBorders(boardCanvas.context);
  drawPellets(pelletCanvas.context);

  // Green grid to delineate 8 x 8 tiles
  // context.fillStyle = "#080";
  // for(var x = 0; x < BOARD_WIDTH; x += 8) {
  //   context.fillRect(x, 0, 1, BOARD_HEIGHT);
  // }
  // for(var y = 0; y < BOARD_HEIGHT; y += 8) {
  //   context.fillRect(0, y, BOARD_WIDTH, 1);
  // }

  pac.render();

  var blinky = new Ghost({
    context: actorCanvas.context,
    direction: "left",
    name: "b",
    startX: 112,
    startY: 116
  });
  var inky = new Ghost({
    context: actorCanvas.context,
    direction: "up",
    name: "i",
    startX: 96,
    startY: 139
  });
  var pinky = new Ghost({
    context: actorCanvas.context,
    direction: "right",
    name: "p",
    startX: 112,
    startY: 139
  });
  var clyde = new Ghost({
    context: actorCanvas.context,
    direction: "down",
    name: "c",
    startX: 128,
    startY: 139
  });
});
