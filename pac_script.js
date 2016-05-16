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
  document.getElementById("update-data").addEventListener("submit", function(event) {
    event.preventDefault();
    var blinkyTarget = document.getElementById("blinky-target").value.split(",");
    if(blinkyTarget) {
      controller.blinky.targetTile = {
        x: blinkyTarget[0],
        y: blinkyTarget[1]
      }
    }
  });

  actorCanvas = new View("actors");
  boardCanvas = new View("board");
  pelletCanvas = new View("pellets");

  var controller = new GameController({
    actorCanvas: actorCanvas,
    boardCanvas: boardCanvas,
    pelletCanvas: pelletCanvas
  });

  var debugDisp = document.getElementById("debug");

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
