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

  var controller = new GameController({
    actorCanvas: new BrowserView("actors"),
    boardCanvas: new BrowserView("board"),
    pelletCanvas: new BrowserView("pellets"),
    gameBoard: new Board(START_BOARD)
  });

  document.getElementById("blinky-target").value = controller.blinky.targetTile.x + "," + controller.blinky.targetTile.y;
  document.getElementById("inky-target").value = controller.inky.targetTile.x + "," + controller.inky.targetTile.y;
  document.getElementById("pinky-target").value = controller.pinky.targetTile.x + "," + controller.pinky.targetTile.y;
  document.getElementById("clyde-target").value = controller.clyde.targetTile.x + "," + controller.clyde.targetTile.y;

  document.getElementById("update-data").addEventListener("submit", function(event) {
    event.preventDefault();
    var blinkyTarget = document.getElementById("blinky-target").value.split(",");
    var inkyTarget = document.getElementById("inky-target").value.split(",");
    var pinkyTarget = document.getElementById("pinky-target").value.split(",");
    var clydeTarget = document.getElementById("clyde-target").value.split(",");

    if(blinkyTarget) {
      controller.blinky.targetTile = {
        x: blinkyTarget[0],
        y: blinkyTarget[1]
      }
    }
    if(inkyTarget) {
      controller.inky.targetTile = {
        x: inkyTarget[0],
        y: inkyTarget[1]
      }
    }
    if(pinkyTarget) {
      controller.pinky.targetTile = {
        x: pinkyTarget[0],
        y: pinkyTarget[1]
      }
    }
    if(clydeTarget) {
      controller.clyde.targetTile = {
        x: clydeTarget[0],
        y: clydeTarget[1]
      }
    }
  });

  // Green grid to delineate 8 x 8 tiles
  // pelletCanvas.context.fillStyle = "#080";
  // for(var x = 0; x < BOARD_WIDTH; x += 8) {
  //   pelletCanvas.context.fillRect(x, 0, 1, BOARD_HEIGHT);
  // }
  // for(var y = 0; y < BOARD_HEIGHT; y += 8) {
  //   pelletCanvas.context.fillRect(0, y, BOARD_WIDTH, 1);
  // }
});
