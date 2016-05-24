var GameController = function(args) {
  this.pelletCount = 0;
  this.score = 0;
  this.lives = 2;
  this.gameState = "title";
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
  this.textCanvas = args.textCanvas;

  this.gameBoard = args.gameBoard;
  this.actorBoard = args.actorBoard;

  addEventListener("keydown", this.handleKeyDown.bind(this));
  addEventListener("keyup", this.handleKeyUp.bind(this));

  this.drawTitleScreen();
}
GameController.prototype.drawTitleScreen = function() {
  ["pac", "blinky", "inky", "pinky", "clyde", "board", "pellet"].forEach(function(name) {
    this[name + "Canvas"].clearRect({
      x: 0,
      y: 0,
      w: BOARD_WIDTH,
      h: BOARD_HEIGHT
    });
  }.bind(this));

  this.textCanvas.drawText({
    text: "1up   high score   2up",
    row: 0,
    col: 3
  });
  this.updateScore();
  this.textCanvas.drawText({
    text: "character / nickname",
    row: 5,
    col: 7
  });
  this.blinkyCanvas.renderGhost({
    x: 40,
    y: 58,
    color: NAME_TO_COLOR["b"],
    direction: "right"
  });
  this.textCanvas.drawText({
    text: "-shadow    \"blinky\"",
    row: 7,
    col: 7,
    color: RGBA_COLORS["b"]
  });
  this.pinkyCanvas.renderGhost({
    x: 40,
    y: 82,
    color: NAME_TO_COLOR["p"],
    direction: "right"
  });
  this.textCanvas.drawText({
    text: "-speedy    \"pinky\"",
    row: 10,
    col: 7,
    color: RGBA_COLORS["p"]
  });
  this.inkyCanvas.renderGhost({
    x: 40,
    y: 106,
    color: NAME_TO_COLOR["i"],
    direction: "right"
  });
  this.textCanvas.drawText({
    text: "-bashful   \"inky\"",
    row: 13,
    col: 7,
    color: RGBA_COLORS["i"]
  });
  this.clydeCanvas.renderGhost({
    x: 40,
    y: 130,
    color: NAME_TO_COLOR["c"],
    direction: "right"
  });
  this.textCanvas.drawText({
    text: "-pokey     \"clyde\"",
    row: 16,
    col: 7,
    color: RGBA_COLORS["c"]
  });

  this.textCanvas.drawObject({
    objectArr: TWO_HUND,
    x: 70,
    y: 160,
    color: {r: 0, g: 255, b: 255, a: 255}
  });

  this.textCanvas.drawText({
    text: "10",
    col: 12,
    row: 25
  });
  this.textCanvas.drawText({
    text: "50",
    col: 12,
    row: 27
  });
  this.textCanvas.drawObject({
    objectArr: PTS,
    x: 120,
    y: 202
  });
  this.textCanvas.drawObject({
    objectArr: PTS,
    x: 120,
    y: 218
  });
  this.textCanvas.drawText({
    text: "@ 1980 midway mfg.co.",
    color: RGBA_COLORS["p"],
    col: 4,
    row: 32
  });
  this.textCanvas.drawText({
    text: "credit  0",
    col: 2,
    row: 35
  });

  this.textCanvas.finalizePerPixelRender();

  this.boardCanvas.drawRect({
    color: PELLET_COLOR,
    x: 83,
    y: 203,
    w: 2,
    h: 2
  });
  this.boardCanvas.drawCircle({
    x: 84,
    y: 220,
    rad: 4
  });

  var frightenedGhostArgs = {
    name: "F",
    startX: 96,
    startY: 164
  }
  var frightenedA = new Ghost(frightenedGhostArgs);
  frightenedGhostArgs.startX += 16;
  var frightenedB = new Ghost(frightenedGhostArgs);
  frightenedGhostArgs.startX += 16;
  var frightenedC = new Ghost(frightenedGhostArgs);
  this.boardCanvas.renderGhostFrightened(frightenedA);
  this.boardCanvas.renderGhostFrightened(frightenedB);
  this.boardCanvas.renderGhostFrightened(frightenedC);
};
GameController.prototype.startGame = function() {
  var canvasDims = {
    x: 0,
    y: 0,
    w: BOARD_WIDTH,
    h: BOARD_HEIGHT
  }
  this.boardCanvas.clearRect(canvasDims);
  this.pelletCanvas.clearRect(canvasDims);
  this.textCanvas.clear();

  this.blinkyCanvas.clearRect(canvasDims);
  this.pinkyCanvas.clearRect(canvasDims);
  this.inkyCanvas.clearRect(canvasDims);
  this.clydeCanvas.clearRect(canvasDims);
  this.pacCanvas.clearRect(canvasDims);

  this.resetActors();
  this.drawPellets();

  this.pacCanvas.renderPac(this.pac);
  this.updateGameBoard();

  this.ghostMoveInterval = setInterval(function() {
    this.moveGhost("b");
    this.moveGhost("i");
    this.moveGhost("p");
    this.moveGhost("c");
}.bind(this), GHOST_MOVE_DELAY);

  setTimeout(function() {
    this.ghostsMode = "chase";
  }.bind(this), 7000);
};
GameController.prototype.resetActors = function() {
  for(var prop in ACTOR_ARGS) {
    if(ACTOR_ARGS.hasOwnProperty(prop)) {
      if(prop == "pac") {
        this.pac = new Actor(ACTOR_ARGS.pac);
      }
      else {
        this[prop] = new Ghost(ACTOR_ARGS[prop]);
      }
    }
  }
};
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

    var coords = Board.convertToTile({
      x: this.pac.x,
      y: this.pac.y
    });
    this.updateActorBoard({
      coords: coords,
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
    case "frightened":
      if(this[ghost].isCentered()) {
        this[ghost].targetTile = this.actorBoard.getRandomTile();
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

  var coords = Board.convertToTile({
    x: this[ghost].x,
    y: this[ghost].y
  });

  this.updateActorBoard({
    coords: coords,
    name: ghost[0]
  });

  if(this[ghost].movementMode == "frightened") {
    this[ghost + "Canvas"].renderGhostFrightened({
      x: this[ghost].x,
      y: this[ghost].y,
      color: NAME_TO_COLOR["F"]
    });
  }
  else {
    this[ghost + "Canvas"].renderGhost(this[ghost]);
  }
};
GameController.prototype.handleKeyDown = function(event) {
  var keyPressed = KEY_CODES[event.keyCode];
  if(keyPressed) {
    event.preventDefault();
    if(keyPressed == "space") {
      switch(this.gameState) {
        case "title": this.startGame(); this.gameState = "starting"; break;
        default: break;
      }
    }
    else if(this.gameState != "title" && this.keyStates[keyPressed] === false) {
      this.keyStates[keyPressed] = true;
      if(this.pacMoveInterval === false) {
        this.pacMoveInterval = setInterval(this.moveActor.bind(this), this.pac.speed);
      }
    }
  }
};
GameController.prototype.handleKeyUp = function(event) {
  var keyPressed = KEY_CODES[event.keyCode];
  if(keyPressed) {
    event.preventDefault();
    this.keyStates[keyPressed] = false;
  }
};
GameController.prototype.handlePowerPellet = function() {
  this.ghostsMode = "frightened";
};
GameController.prototype.startPacDeath = function() {
  clearInterval(this.ghostMoveInterval);
  clearInterval(this.pacMoveInterval);

  var canvasDimensions = {x: 0, y: 0, w: BOARD_WIDTH, h: BOARD_HEIGHT}
  this.blinkyCanvas.clearRect(canvasDimensions);
  this.inkyCanvas.clearRect(canvasDimensions);
  this.pinkyCanvas.clearRect(canvasDimensions);
  this.clydeCanvas.clearRect(canvasDimensions);

  this.pac.mouthPos = 0;

  var runDeathLoop = function() {
    this.pacCanvas.renderPacDeath(this.pac);
    if(this.pac.mouthPos < 1) {
      this.pac.mouthPos += 0.1;
      setTimeout(runDeathLoop.bind(this), PAC_DEATH_DELAY);
    }
    else {
      this.pacCanvas.clearRect({
        x: this.pac.x - this.pac.radius,
        y: this.pac.y - this.pac.radius,
        w: 2 * this.pac.radius,
        h: 2 * this.pac.radius
      });
    }
  }.bind(this);

  runDeathLoop();
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
  emptyTiles = this.actorBoard.getEmptyTiles(emptyTiles);
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
  else {
    this[ghost].direction = oppositeDirection(this[ghost].direction);
  }

  if(this[ghost].movementMode == "scatter" || this[ghost].movementMode == "chase") {
    this[ghost].setMode(this.ghostsMode);
  }
};

GameController.prototype.updateActorBoard = function(args) {
  var oldCoords = this.actorBoard.find(args.name);
  var cell = this.actorBoard.getCell(args.coords);
  var ghosts = ["b", "i", "p", "c"];

  if(oldCoords && (oldCoords.x != args.coords.x || oldCoords.y != args.coords.y)) {
    if(args.name == "m" && ghosts.includes(cell)) {
      this.startPacDeath();
    }
    else if(cell == "m") {
      this.startPacDeath();
    }
    else {
      this.actorBoard.setCell({
        x: oldCoords.x,
        y: oldCoords.y,
        value: " "
      });
      this.actorBoard.setCell({
        x: args.coords.x,
        y: args.coords.y,
        value: args.name
      });
    }
  }
  else {
    this.actorBoard.setCell({
      x: args.coords.x,
      y: args.coords.y,
      value: args.name
    });
  }
};
GameController.prototype.updateGameBoard = function() {
  this.updatePellets();
  BrowserView.drawBorders(this.boardCanvas.context);
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
      color: NAME_TO_COLOR["m"],
      mouthPos: 0.2,
      direction: "left",
      x: 24 + (16 * i),
      y: BOARD_HEIGHT - 8,
      radius: this.pac.radius
    });
  }
};
GameController.prototype.updateScore = function() {
  var points = CELL_TO_SCORE[this.gameBoard.getCell(this.actorBoard.find("m"))];
  if(points) {
    this.score += points;
  }
  var score = this.score.toString();
  if(score.length == 1) {
    score = "0" + score;
  }
  this.textCanvas.drawText({
    text: score,
    col: 7 - score.length,
    row: 1
  });
};
GameController.prototype.updatePellets = function() {
  var coords = Board.convertToTile({
    x: this.pac.x,
    y: this.pac.y
  });
  var tile = this.gameBoard.getCell(coords);

  this.updateScore();

  if(tile == "." || tile == "o") {
    if(tile == "o") {
      this.handlePowerPellet();
    }
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
  }
};
