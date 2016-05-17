var GameController = function(args) {
  this.keyStates = {
    up: false,
    down: false,
    left: false,
    right: false
  }

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
    mode: "house",
    name: "i",
    startX: 96,
    startY: 139
  });
  this.pinky = new Ghost({
    context: this.actorCanvas.context,
    direction: "right",
    mode: "exitting",
    name: "p",
    startX: 112,
    startY: 139
  });
  this.clyde = new Ghost({
    context: this.actorCanvas.context,
    direction: "down",
    mode: "house",
    name: "c",
    startX: 128,
    startY: 139
  });

  this.drawPellets();
  this.actorCanvas.renderPac(this.pac);

  addEventListener("keydown", this.handleKeyDown.bind(this));
  addEventListener("keyup", this.handleKeyUp.bind(this));

  setInterval(function() {
    this.moveGhost("b");
    this.moveGhost("i");
    this.moveGhost("p");
    this.moveGhost("c");
  }.bind(this), GHOST_MOVE_DELAY);

  setTimeout(function() {
    this.inky.setMode("exitting");
  }.bind(this), INKY_EXIT_DELAY);
  setTimeout(function() {
    this.clyde.setMode("exitting");
  }.bind(this), CLYDE_EXIT_DELAY);
}
GameController.prototype.drawPellets = function() {
  this.pelletCanvas.clearRect({
    x: 0,
    y: 0,
    w: BOARD_WIDTH,
    h: BOARD_HEIGHT
  });
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
GameController.prototype.moveActor = function() {
  this.actorCanvas.clearRect(this.pac.getClearDimensions());
  var coords = {
    x: this.pac.x,
    y: this.pac.y
  }

  var newDirection = false;
  for(var prop in this.pac.keyStates) {
    if(this.pac.keyStates.hasOwnProperty(prop) && this.pac.keyStates[prop]) {
      newDirection = prop;
      break;
    }
  }

  var collision;
  if(this.pac.keyStates[this.pac.direction] === false && newDirection) {
    collision = gameBoard.detectCollision(coords, newDirection);
    if(collision != "door" && collision != "wall") {
      this.pac.direction = newDirection;
    }
  }

  collision = gameBoard.detectCollision(coords, this.pac.direction);
  if(collision == "wall" || collision == "door") {
    clearInterval(this.pac.moveIntervalID);
    this.pac.moveIntervalID = false;
  }
  else {
    this.pac.move();
  }
  this.pac.moveTowardCenter();

  this.actorCanvas.renderPac(this.pac);
};
GameController.prototype.moveGhost = function(name) {
  var ghost;
  switch(name) {
    case "b": ghost = "blinky"; break;
    case "i": ghost = "inky"; break;
    case "p": ghost = "pinky"; break;
    case "c": ghost = "clyde"; break;
  }
  this.actorCanvas.clearRect(this[ghost].getClearDimensions());

  if(this[ghost].movementMode == "house") {
    if(this[ghost].y + 8 >= HOUSE_BOTTOM || this[ghost].y - 5 <= HOUSE_TOP) {
      this[ghost].direction = oppositeDirection(this[ghost].direction);
    }
  }
  else if(this[ghost].movementMode == "exitting") {
    this[ghost].exitHouse();
  }
  else if(this[ghost].isCentered()) {
    this[ghost].setNextDirection();
  }

  this[ghost].move();
  this.actorCanvas.renderGhost({
    x: this[ghost].x,
    y: this[ghost].y,
    color: this[ghost].color,
    direction: this[ghost].direction
  });
};
GameController.prototype.handleKeyDown = function(event) {
  var keyPressed = keyCodes[event.keyCode];
  if(keyPressed) {
    event.preventDefault();
    if(this.pac.keyStates[keyPressed] === false) {
      this.pac.keyStates[keyPressed] = true;
      if(this.pac.moveIntervalID === false) {
        this.pac.moveIntervalID = setInterval(this.moveActor.bind(this), this.pac.speed);
      }
    }
  }
};
GameController.prototype.handleKeyUp = function(event) {
  var keyPressed = keyCodes[event.keyCode];
  if(keyPressed) {
    event.preventDefault();
    this.pac.handleKeyUp(keyPressed);
  }
};
