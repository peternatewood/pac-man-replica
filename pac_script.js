var actorCanvas, boardCanvas, pelletCanvas;

var drawPellets = function(context) {
  context.fillStyle = "#FCF";

  gameBoard.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      if(col == ".") {
        context.fillRect((8 * cIndex) + 3, (8 * rIndex) + 27, 2, 2);
      }
      else if(col == "o") {
        context.beginPath();
        context.arc((8 * cIndex) + 4, (8 * rIndex) + 28, 4, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();
      }
      else if(col == "-") {
        context.fillRect((8 * cIndex), (8 * rIndex) + 29, 8, 2);
      }
    });
  });
}

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

  var cell = gameBoard[y + yMod][x + xMod];
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

var drawGhost = function(context, xPos, yPos, color, direction, step) {
  context.clearRect(xPos - 7, yPos - 7, 14, 16);

  context.fillStyle = color;
  var x = new Number(xPos);
  var y = new Number(yPos);

  // body
  context.beginPath();
  context.arc(x, y, 6, Math.PI, 0, false);
  context.moveTo(x += 7, y);
  context.lineTo(x, y += 5);
  context.lineTo(x -= 14, y);
  context.lineTo(x, y -= 5);
  context.closePath();
  context.fill();

  drawGhostTendrils(context, xPos, yPos, step);
  drawGhostEyes(context, xPos, yPos, direction);
}
var drawGhostEyes = function(context, ghostX, ghostY, direction) {
  context.fillStyle = "#FFF";
  var x = ghostX -= 3;
  var y = ghostY -= 3;

  switch(direction) {
    case "up": y -= 2; break;
    case "down": y += 1; break;
    case "left": x--; break;
    case "right": x++; break;
  }

  // Whites of eyes
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x += 0.5, y);
  context.lineTo(x += 1.5, y += 1.5);
  context.lineTo(x, y += 2);
  context.lineTo(x -= 1.5, y += 1.5);
  context.lineTo(x -= 1, y);
  context.lineTo(x -= 1.5, y -= 1.5);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 1.5, y -= 1.5);
  context.moveTo(x += 6.5, y);
  context.lineTo(x += 0.5, y);
  context.lineTo(x += 1.5, y += 1.5);
  context.lineTo(x, y += 2);
  context.lineTo(x -= 1.5, y += 1.5);
  context.lineTo(x -= 1, y);
  context.lineTo(x -= 1.5, y -= 1.5);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 1.5, y -= 1.5);
  context.fill();

  switch(direction) {
    case "up":
      x = ghostX - 1;
      y = ghostY - 2;
    break;
    case "down":
      x = ghostX - 1;
      y = ghostY + 4;
    break;
    case "left":
      x = ghostX - 3;
      y = ghostY + 2;
    break;
    case "right":
      x = ghostX + 1;
      y = ghostY + 2;
    break;
  }

  context.fillStyle = "#22F";
  context.fillRect(x, y, 2, 2);
  context.fillRect(x += 6, y, 2, 2);
}
var drawGhostTendrils = function(context, ghostX, ghostY, step) {
  var x = ghostX + 7;
  var y = ghostY + 5;

  context.moveTo(x, y);
  switch(step) {
    case 0:
      context.lineTo(x, y += 3);
      context.lineTo(x -= 1, y);
      context.lineTo(x -= 2, y -= 2.5);
      context.lineTo(x -= 2, y += 2.5);
      context.lineTo(x -= 1, y);
      context.lineTo(x, y -= 2);
      context.lineTo(x -= 2, y);
      context.lineTo(x, y += 2);
      context.lineTo(x -= 1, y);
      context.lineTo(x -= 2, y -= 2.5);
      context.lineTo(x -= 2, y += 2.5);
      context.lineTo(x -= 1, y);
      context.lineTo(x, y -= 3);
    break;
    case 1:
      context.lineTo(x, y += 1);
      context.lineTo(x -= 2, y += 2.5);
      context.lineTo(x -= 2, y -= 2.5);
      context.lineTo(x -= 1, y);
      context.lineTo(x -= 2, y += 2.5);
      context.lineTo(x -= 2, y -= 2.5);
      context.lineTo(x -= 1, y);
      context.lineTo(x -= 2, y += 2.5);
      context.lineTo(x -= 2, y -= 2.5);
      context.lineTo(x, y -= 1);
    break;
  }
  context.closePath();
  context.fill();
}

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

  var alignCanvases = function() {
    var x = boardCanvas.canvas.offsetLeft + boardCanvas.canvas.clientLeft + "px";
    var y = boardCanvas.canvas.offsetTop + boardCanvas.canvas.clientTop + "px";

    actorCanvas.canvas.style["left"] = x;
    actorCanvas.canvas.style["top"] = y;
    pelletCanvas.canvas.style["left"] = x;
    pelletCanvas.canvas.style["top"] = y;
  }
  alignCanvases();

  window.pac = new Actor({
    context: actorCanvas.context,
    startX: 113,
    startY: 212,
    name: "m",
    direction: "right"
  });

  addEventListener("keydown", pac.handleKeyDown.bind(pac));
  addEventListener("keyup", pac.handleKeyUp.bind(pac));

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
  drawPellets(pelletCanvas.context);

  // Green grid to delineate 8 x 8 tiles
  // context.fillStyle = "#080";
  // for(var x = 0; x < BOARD_WIDTH; x += 8) {
  //   context.fillRect(x, 0, 1, BOARD_HEIGHT);
  // }
  // for(var y = 0; y < BOARD_HEIGHT; y += 8) {
  //   context.fillRect(0, y, BOARD_WIDTH, 1);
  // }

  pac.render();

  var blinky = new Ghost({
    context: actorCanvas.context,
    direction: "left",
    name: "b",
    startX: 112,
    startY: 115
  });
  var inky = new Ghost({
    context: actorCanvas.context,
    direction: "up",
    name: "i",
    startX: 96,
    startY: 139
  });
  var pinky = new Ghost({
    context: actorCanvas.context,
    direction: "right",
    name: "p",
    startX: 112,
    startY: 139
  });
  var clyde = new Ghost({
    context: actorCanvas.context,
    direction: "down",
    name: "c",
    startX: 128,
    startY: 139
  });
});
