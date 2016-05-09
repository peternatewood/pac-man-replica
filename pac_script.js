var BOARD_HEIGHT = 288;
var BOARD_WIDTH = 224;
var VERT_TILES = BOARD_HEIGHT / 8;
var HORIZ_TILES = BOARD_WIDTH / 8;
var PAC_MOVE_DELAY = 20;

var canvas, context, canvasData;

var drawPixel = function(args) {
  var index = (args.x + args.y * canvas.width) * 4;

  canvasData.data[index + 0] = args.r;
  canvasData.data[index + 1] = args.g;
  canvasData.data[index + 2] = args.b;
  canvasData.data[index + 3] = args.a;
}

var drawObject = function(args) {
  var width = args.objectArr.length;
  var height = args.objectArr[0].length;
  context.clearRect(args.x, args.y, width, height);

  args.objectArr.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      if(col == "x") {
        drawPixel({
          x: args.x + cIndex,
          y: args.y + rIndex,
          r: args.color.r,
          g: args.color.g,
          b: args.color.b,
          a: args.color.a
        });
      }
    });
  });
}

var drawPellets = function() {
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

var Actor = function(startX, startY, name, direction) {
  this.x = startX;
  this.y = startY;
  this.name = name;
  this.radius = 4;
  this.direction = direction;
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
  context.fillStyle = "#000";
  context.beginPath();

  var arcStart, arcEnd;
  switch(this.direction) {
    case "up":
      arcStart = 1.8 * Math.PI;
      arcEnd = 1.2 * Math.PI;
    break;
    case "down":
      arcStart = 0.8 * Math.PI;
      arcEnd = 0.2 * Math.PI;
    break;
    case "left":
      arcStart = 1.2 * Math.PI;
      arcEnd = 0.8 * Math.PI;
    break;
    case "right":
      arcStart = 0.2 * Math.PI;
      arcEnd = 1.8 * Math.PI;
    break;
  }

  if(this.name == "m") {
    context.arc(this.x, this.y, 7, arcStart, arcEnd, false);
    context.lineTo(this.x + 1, this.y);
  }

  context.closePath();
  context.fill();
}
Actor.prototype.render = function() {
  context.fillStyle = nameToColor[this.name];
  context.beginPath();

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
    context.arc(this.x, this.y, 6, arcStart, arcEnd, false);
    context.lineTo(this.x, this.y);
  }

  context.closePath();
  context.fill();

  // Used to update debug display in upper left
  // document.getElementById("debug-x").innerHTML = this.x;
  // document.getElementById("debug-y").innerHTML = this.y;
  // document.getElementById("debug-direction").innerHTML = this.direction;
  // document.getElementById("debug-is-moving").innerHTML = this.isMoving;
  // document.getElementById("debug-key-up").innerHTML = this.keyStates.up;
  // document.getElementById("debug-key-down").innerHTML = this.keyStates.down;
  // document.getElementById("debug-key-left").innerHTML = this.keyStates.left;
  // document.getElementById("debug-key-right").innerHTML = this.keyStates.right;
};
Actor.prototype.detectCollision = function() {
  var collision = "none";
  var xMod, yMod;
  switch(this.direction) {
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
  if(this.x % 8 == 4 && this.y % 8 == 4) {
    if(this.keyStates[this.direction] === false || this.detectCollision() == "wall") {
      var newDirection = false;
      for(var prop in this.keyStates) {
        if(this.keyStates.hasOwnProperty(prop) && this.keyStates[prop]) {
          newDirection = prop;
          break;
        }
      }
      if(newDirection) {
        this.direction = newDirection;
        if(this.detectCollision() == "wall") {
          this.isMoving = false;
          clearInterval(this.moveIntervalID);
        }
      }
      else {
        this.isMoving = false;
        clearInterval(this.moveIntervalID);
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
      this.direction = keyPressed;
      if(this.detectCollision() == "wall") {
        this.isMoving = false;
      }
      else {
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

var drawGhost = function(xPos, yPos, color, direction, step) {
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

  drawGhostTendrils(xPos, yPos, step);
  drawGhostEyes(xPos, yPos, direction);
}
var drawGhostEyes = function(ghostX, ghostY, direction) {
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
var drawGhostTendrils = function(ghostX, ghostY, step) {
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
  var actorCanvas = document.getElementById("actors");
  var boardCanvas = document.getElementById("board");
  var pelletCanvas = document.getElementById("pellets");

  var x = boardCanvas.offsetLeft + boardCanvas.clientLeft;
  var y = boardCanvas.offsetTop + boardCanvas.clientTop;

  actorCanvas.style["left"] = x + "px";
  actorCanvas.style["top"] = y + "px";
  pelletCanvas.style["left"] = x + "px";
  pelletCanvas.style["top"] = y + "px";

  window.pac = new Actor(113, 212, "m", "right");

  addEventListener("keydown", pac.handleKeyDown.bind(pac));
  addEventListener("keyup", pac.handleKeyUp.bind(pac));

  canvas = document.getElementById("board");
  context = canvas.getContext("2d");
  canvasData = context.getImageData(0, 0, canvas.width, canvas.height);

  var debugDisp = document.getElementById("debug");

  var x = 8;
  var y = 8;
  for(var prop in charset) {
    drawObject({
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

  context.putImageData(canvasData, 0, 0);

  drawBorders();
  drawPellets();

  // Green grid to delineate 8 x 8 tiles
  // context.fillStyle = "#080";
  // for(var x = 0; x < BOARD_WIDTH; x += 8) {
  //   context.fillRect(x, 0, 1, BOARD_HEIGHT);
  // }
  // for(var y = 0; y < BOARD_HEIGHT; y += 8) {
  //   context.fillRect(0, y, BOARD_WIDTH, 1);
  // }

  pac.render();

  var step = 0;
  setInterval(function() {
    if(step == 0) step = 1;
    else step = 0;

    drawGhost(112, 115, nameToColor["b"], "left", step);
    drawGhost(96, 139, nameToColor["i"], "up", step);
    drawGhost(112, 139, nameToColor["p"], "right", step);
    drawGhost(128, 139, nameToColor["c"], "down", step);
  }, 250);
});
