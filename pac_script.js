var actorCanvas, boardCanvas, pelletCanvas;
var gameBoard = new Board();

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

  var controller = new Controller({
    actorCanvas: actorCanvas,
    boardCanvas: boardCanvas,
    pelletCanvas: pelletCanvas
  });

  var alignCanvases = function() {
    var x = boardCanvas.canvas.offsetLeft + boardCanvas.canvas.clientLeft + "px";
    var y = boardCanvas.canvas.offsetTop + boardCanvas.canvas.clientTop + "px";

    actorCanvas.canvas.style["left"] = x;
    actorCanvas.canvas.style["top"] = y;
    pelletCanvas.canvas.style["left"] = x;
    pelletCanvas.canvas.style["top"] = y;
  }
  alignCanvases();

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

  // Green grid to delineate 8 x 8 tiles
  // pelletCanvas.context.fillStyle = "#080";
  // for(var x = 0; x < BOARD_WIDTH; x += 8) {
  //   pelletCanvas.context.fillRect(x, 0, 1, BOARD_HEIGHT);
  // }
  // for(var y = 0; y < BOARD_HEIGHT; y += 8) {
  //   pelletCanvas.context.fillRect(0, y, BOARD_WIDTH, 1);
  // }
});
