var Controller = function() {
  this.pac = new Actor({
    context: actorCanvas.context,
    startX: 113,
    startY: 212,
    name: "m",
    direction: "right"
  });
  this.blinky = new Ghost({
    context: actorCanvas.context,
    direction: "left",
    name: "b",
    startX: 112,
    startY: 116
  });
  this.inky = new Ghost({
    context: actorCanvas.context,
    direction: "up",
    name: "i",
    startX: 96,
    startY: 139
  });
  this.pinky = new Ghost({
    context: actorCanvas.context,
    direction: "right",
    name: "p",
    startX: 112,
    startY: 139
  });
  this.clyde = new Ghost({
    context: actorCanvas.context,
    direction: "down",
    name: "c",
    startX: 128,
    startY: 139
  });
}
