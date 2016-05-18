var GameController = function(args) {
  this.pelletCount = 0;
  this.lives = 2;
  this.keyStates = {
    up: false,
    down: false,
    left: false,
    right: false
  }
  this.pacMoveInterval = false;

  this.pacCanvas = args.pacCanvas;
  this.blinkyCanvas = args.blinkyCanvas;
  this.inkyCanvas = args.inkyCanvas;
  this.pinkyCanvas = args.pinkyCanvas;
  this.clydeCanvas = args.clydeCanvas;
  this.boardCanvas = args.boardCanvas;
  this.pelletCanvas = args.pelletCanvas;

  this.pac = new Actor(ACTOR_ARGS.pac);
  this.blinky = new Ghost(ACTOR_ARGS.blinky);
  this.inky = new Ghost(ACTOR_ARGS.inky);
  this.pinky = new Ghost(ACTOR_ARGS.pinky);
  this.clyde = new Ghost(ACTOR_ARGS.clyde);

  this.gameBoard = args.gameBoard;
  this.actorBoard = args.actorBoard;

  this.drawPellets();

  this.pacCanvas.renderPac(this.pac);
  this.updateGameBoard();

  addEventListener("keydown", this.handleKeyDown.bind(this));
  addEventListener("keyup", this.handleKeyUp.bind(this));

  setInterval(function() {
    this.moveGhost("b");
    this.moveGhost("i");
    this.moveGhost("p");
    this.moveGhost("c");
  }.bind(this), GHOST_MOVE_DELAY);
}
GameController.prototype.drawPellets = function() {
  this.pelletCanvas.clearRect({
    x: 0,
    y: 0,
    w: BOARD_WIDTH,
    h: BOARD_HEIGHT
  });
  this.gameBoard.board.matrix.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      if(col == ".") {
        this.pelletCanvas.drawRect({
          color: PELLET_COLOR,
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
          color: PELLET_COLOR,
          x: 8 * cIndex,
          y: (8 * rIndex) + 29,
          w: 8,
          h: 2
        });
      }
    }.bind(this));
  }.bind(this));

  var score = this.pelletCount.toString();
  if(score.length == 1) {
    score = "0" + score;
  }
  this.boardCanvas.drawText({
    text: score,
    col: 4 - score.length,      
    row: 2
  });
};
GameController.prototype.moveActor = function() {
  this.pacCanvas.clearRect(this.pac.getClearDimensions());
  var coords = {
    x: this.pac.x,
    y: this.pac.y
  }

  var newDirection = false;
  for(var prop in this.keyStates) {
    if(this.keyStates.hasOwnProperty(prop) && this.keyStates[prop]) {
      newDirection = prop;
      break;
    }
  }

  var collision;
  if(this.keyStates[this.pac.direction] === false && newDirection) {
    collision = this.gameBoard.predictCollision(coords, newDirection);
    if(collision != "door" && collision != "wall") {
      this.pac.direction = newDirection;
    }
  }

  collision = this.gameBoard.predictCollision(coords, this.pac.direction);
  if(collision == "wall" || collision == "door") {
    clearInterval(this.pacMoveInterval);
    this.pacMoveInterval = false;
  }
  else {
    var coords = this.actorBoard.find("m");

    this.pac.move();
    if(this.pac.x < 0) {
      this.pac.x = BOARD_WIDTH;
    }
    else if(this.pac.x > BOARD_WIDTH) {
      this.pac.x = 0;
    }

    var newCoords = Board.convertToTile({
      x: this.pac.x,
      y: this.pac.y
    });

    this.updateActorBoard({
      coords: coords,
      newCoords: newCoords,
      name: "m",
      actor: "pac"
    });
  }
  this.pac.moveTowardCenter();
  this.updateGameBoard();

  this.pacCanvas.renderPac(this.pac);
};
GameController.prototype.moveGhost = function(name) {
  var ghost;
  switch(name) {
    case "b": ghost = "blinky"; break;
    case "i": ghost = "inky"; break;
    case "p": ghost = "pinky"; break;
    case "c": ghost = "clyde"; break;
  }
  this[ghost + "Canvas"].clearRect(this[ghost].getClearDimensions());

  switch(this[ghost].movementMode) {
    case "house":
      if(this[ghost].y + 8 >= HOUSE_BOTTOM || this[ghost].y - 5 <= HOUSE_TOP) {
        this[ghost].direction = oppositeDirection(this[ghost].direction);
      }
    break;
    case "exitting":
      this[ghost].exitHouse();
      if(this[ghost].movementMode == "scatter") {
        this.setNextDirection(ghost);
      }
    break;
    case "scatter":
      if(this[ghost].isCentered()) {
        this.setNextDirection(ghost);
      }
    break;
    case "chase":
      var coords = Board.convertToTile({
        x: this.pac.x,
        y: this.pac.y
      });
      var ghostCoords = Board.convertToTile({
        x: this[ghost].x,
        y: this[ghost].y
      });
      var blinkyCoords = Board.convertToTile({
        x: this.blinky.x,
        y: this.blinky.y
      });
      this[ghost].targetTile = Ghost[ghost + "Target"]({
        coords: coords,
        direction: this.pac.direction,
        ghost: ghostCoords,
        blinky: blinkyCoords
      });
      if(this[ghost].isCentered()) {
        this.setNextDirection(ghost);
      }
    break;
  }

  this[ghost].move();
  if(this[ghost].x < 0) {
    this[ghost].x = BOARD_WIDTH;
  }
  else if(this[ghost].x > BOARD_WIDTH) {
    this[ghost].x = 0;
  }
  this[ghost + "Canvas"].renderGhost(this[ghost]);
};
GameController.prototype.handleKeyDown = function(event) {
  var keyPressed = keyCodes[event.keyCode];
  if(keyPressed) {
    event.preventDefault();
    if(this.keyStates[keyPressed] === false) {
      this.keyStates[keyPressed] = true;
      if(this.pacMoveInterval === false) {
        this.pacMoveInterval = setInterval(this.moveActor.bind(this), this.pac.speed);
      }
    }
  }
};
GameController.prototype.handleKeyUp = function(event) {
  var keyPressed = keyCodes[event.keyCode];
  if(keyPressed) {
    event.preventDefault();
    this.keyStates[keyPressed] = false;
  }
};
GameController.prototype.setNextDirection = function(ghost) {
  var currentTile = Board.convertToTile({
    x: this[ghost].x,
    y: this[ghost].y
  });
  var adjacentTiles = this.gameBoard.getAdjacentTiles({
    x: this[ghost].x,
    y: this[ghost].y
  });
  adjacentTiles[oppositeDirection(this[ghost].direction)] = undefined;

  var emptyTiles = this.gameBoard.getEmptyTiles(adjacentTiles);
  var nextTile = this.gameBoard.getClosestTile({
    tiles: emptyTiles,
    target: this[ghost].targetTile
  });

  if(nextTile) {
    if(nextTile.x < currentTile.x) {
      this[ghost].direction = "left";
    }
    else if(nextTile.x > currentTile.x) {
      this[ghost].direction = "right";
    }
    else if(nextTile.y < currentTile.y) {
      this[ghost].direction = "up";
    }
    else if(nextTile.y > currentTile.y) {
      this[ghost].direction = "down";
    }
  }
};

GameController.prototype.updateActorBoard = function(args) {
  if(args.coords.x != args.newCoords.x || args.coords.y != args.newCoords.y) {
    this.actorBoard.setCell({
      x: args.coords.x,
      y: args.coords.y,
      value: " "
    });
    this.actorBoard.setCell({
      x: args.newCoords.x,
      y: args.newCoords.y,
      value: args.name
    });
  }
};
GameController.prototype.updateGameBoard = function() {
  this.updatePellets();
  drawBorders(this.boardCanvas.context);
  this.updateLivesDisplay();
};
GameController.prototype.updateLivesDisplay = function() {
  for(var i = 0; i < 2; i++) {
    this.boardCanvas.clearRect({
      x: (24 + (16 * i)) - this.pac.radius,
      y: BOARD_HEIGHT - (8 + this.pac.radius),
      w: 2 * this.pac.radius,
      h: 2 * this.pac.radius
    })
  }
  for(var i = 0; i < this.lives; i++) {
    this.boardCanvas.renderPac({
      color: nameToColor["m"],
      mouthPos: 0.2,
      direction: "left",
      x: 24 + (16 * i),
      y: BOARD_HEIGHT - 8,
      radius: this.pac.radius
    });
  }
};
GameController.prototype.updatePellets = function() {
  var coords = Board.convertToTile({
    x: this.pac.x,
    y: this.pac.y
  });
  var tile = this.gameBoard.getCell(coords);

  if(tile == "." || tile == "o") {
    this.gameBoard.setCell({
      x: coords.x,
      y: coords.y,
      value: " "
    });
    this.pelletCount++;
    if(this.inky.movementMode == "house") {
      this.inky.handlePelletCount(this.pelletCount);
    }
    if(this.clyde.movementMode == "house") {
      this.clyde.handlePelletCount(this.pelletCount);
    }
    this.drawPellets();

    var score = this.pelletCount.toString();
    if(score.length == 1) {
      score = "0" + score;
    }
    this.boardCanvas.drawText({
      text: score,
      col: 4 - score.length,      
      row: 2
    });
  }
};
