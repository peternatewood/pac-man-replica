var Controller = function(args) {
  this.actorCanvas = args.actorCanvas;
  this.boardCanvas = args.boardCanvas;
  this.pelletCanvas = args.pelletCanvas;

  this.pac = new Actor({
    context: this.actorCanvas.context,
    startX: 113,
    startY: 212,
    name: "m",
    direction: "right"
  });
  this.blinky = new Ghost({
    context: this.actorCanvas.context,
    direction: "left",
    name: "b",
    startX: 112,
    startY: 116
  });
  this.inky = new Ghost({
    context: this.actorCanvas.context,
    direction: "up",
    name: "i",
    startX: 96,
    startY: 139
  });
  this.pinky = new Ghost({
    context: this.actorCanvas.context,
    direction: "right",
    name: "p",
    startX: 112,
    startY: 139
  });
  this.clyde = new Ghost({
    context: this.actorCanvas.context,
    direction: "down",
    name: "c",
    startX: 128,
    startY: 139
  });

  this.drawPellets();

  addEventListener("keydown", this.handleKeyDown.bind(this));
  addEventListener("keyup", this.handleKeyUp.bind(this));
}
Controller.prototype.drawPellets = function() {
  gameBoard.board.matrix.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      if(col == ".") {
        this.pelletCanvas.drawRect({
          x: (8 * cIndex) + 3,
          y: (8 * rIndex) + 27,
          w: 2,
          h: 2
        });
      }
      else if(col == "o") {
        this.pelletCanvas.drawCircle({
          x: (8 * cIndex) + 4,
          y: (8 * rIndex) + 28,
          rad: 4
        });
      }
      else if(col == "-") {
        this.pelletCanvas.drawRect({
          x: 8 * cIndex,
          y: (8 * rIndex) + 29,
          w: 8,
          h: 2
        });
      }
    });
  });
};
Controller.prototype.handleKeyDown = function(event) {
  var keyPressed = keyCodes[event.keyCode];
  if(keyPressed) {
    event.preventDefault();
    this.pac.handleKeyDown(keyPressed);
  }
};
Controller.prototype.handleKeyUp = function(event) {
  var keyPressed = keyCodes[event.keyCode];
  if(keyPressed) {
    event.preventDefault();
    this.pac.handleKeyUp(keyPressed);
  }
};
