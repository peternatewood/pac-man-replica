var Actor = function(args) {
  this.context = args.context;
  this.x = args.startX;
  this.y = args.startY;
  this.name = args.name;
  this.radius = 6;
  this.direction = args.direction;
  this.speed = PAC_MOVE_DELAY;
  this.isMoving = false;
  this.keyStates = {
    up: false,
    down: false,
    left: false,
    right: false
  }
}
Actor.prototype.clear = function() {
  this.context.clearRect(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
}
Actor.prototype.render = function() {
  this.context.fillStyle = nameToColor[this.name];
  this.context.beginPath();

  var arcStart, arcEnd;
  switch(this.direction) {
    case "up":
      arcStart = 1.75 * Math.PI;
      arcEnd = 1.25 * Math.PI;
    break;
    case "down":
      arcStart = 0.75 * Math.PI;
      arcEnd = 0.25 * Math.PI;
    break;
    case "left":
      arcStart = 1.25 * Math.PI;
      arcEnd = 0.75 * Math.PI;
    break;
    case "right":
      arcStart = 0.25 * Math.PI;
      arcEnd = 1.75 * Math.PI;
    break;
  }

  if(this.name == "m") {
    this.context.arc(this.x, this.y, this.radius, arcStart, arcEnd, false);
    this.context.lineTo(this.x, this.y);
  }

  this.context.closePath();
  this.context.fill();
};
Actor.prototype.detectCollision = function(keyPressed) {
  var collision = "none";
  var xMod, yMod;
  var direction = keyPressed ? keyPressed : this.direction
  switch(direction) {
    case "up": xMod = 0; yMod = -1; break;
    case "down": xMod = 0; yMod = 1; break;
    case "left": xMod = -1; yMod = 0; break;
    case "right": xMod = 1; yMod = 0; break;
  }
  var x = Math.floor(this.x / 8);
  var y = Math.floor(this.y / 8) - 3;

  var cell = gameBoard.board[y + yMod][x + xMod];
  if(cell == "x") {
    collision = "wall";
  }
  else if(cell == ".") {
    collision = "pellet";
  }
  else if(cell == "o") {
    collision = "powerPellet";
  }
  else if(cell == "b" || cell == "i" || cell == "p" || cell == "c") {
    collision = "ghost";
  }

  return collision;
};
Actor.prototype.move = function() {
  this.clear();
  switch(this.direction) {
    case "up": this.y--; break;
    case "down": this.y++; break;
    case "left": this.x--; break;
    case "right": this.x++; break;
  }
  var newDirection = false;
  for(var prop in this.keyStates) {
    if(this.keyStates.hasOwnProperty(prop) && this.keyStates[prop]) {
      newDirection = prop;
      break;
    }
  }
  if(this.x + 8 <= 0) {
    if(this.direction == "left") {
      this.x = BOARD_WIDTH;
    }
  }
  else if(this.x - 8 > BOARD_WIDTH) {
    if(this.direction == "right") {
      this.x = 0 - 8;
    }
  }
  else if(this.x % 8 == 4 && this.y % 8 == 4) {
    if(this.detectCollision() == "wall") {
      if(newDirection && this.detectCollision(newDirection) != "wall") {
        this.direction = newDirection;
      }
      else {
        this.isMoving = false;
        clearInterval(this.moveIntervalID);
      }
    }
    else if(this.keyStates[this.direction] === false) {
      if(newDirection) {
        if(this.detectCollision(newDirection) != "wall") {
          this.direction = newDirection;
        }
      }
    }
  }
  this.render();
};
Actor.prototype.handleKeyDown = function(event) {
  var keyPressed = keyCodes[event.keyCode];
  if(keyPressed) {
    this.keyStates[keyPressed] = true;
    if(this.isMoving === false) {
      event.preventDefault();
      this.clear();
      if(this.detectCollision(keyPressed) == "wall") {
        this.isMoving = false;
      }
      else {
        this.direction = keyPressed;
        this.isMoving = true;
        this.moveIntervalID = setInterval(this.move.bind(this), this.speed);
      }
      this.render();
    }
  }
};
Actor.prototype.handleKeyUp = function(event) {
  var keyPressed = keyCodes[event.keyCode];
  if(keyPressed) {
    this.keyStates[keyPressed] = false;
  }
};
