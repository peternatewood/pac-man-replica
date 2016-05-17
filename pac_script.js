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
    gameBoard: new Board(START_BOARD),
    actorBoard: new Board(START_BOARD_ACTORS)
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
