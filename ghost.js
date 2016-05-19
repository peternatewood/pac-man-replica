var Ghost = function(args) {
  this.x = args.startX;
  this.y = args.startY;
  this.direction = args.direction ? args.direction : "left";
  this.speed = GHOST_MOVE_DELAY;
  this.name = args.name;
  this.color = NAME_TO_COLOR[args.name];
  this.movementMode = args.mode ? args.mode : "scatter";
  this.targetTile = GHOST_CORNERS[this.name];
  this.pelletLimit = args.limit ? args.limit : 0;
}
Ghost.blinkyTarget = function(args) {
  return {
    x: args.coords.x,
    y: args.coords.y
  }
};
Ghost.pinkyTarget = function(args) {
  var xMod = 0;
  var yMod = 0;
  switch(args.direction) {
    case "up": yMod -= 4; break;
    case "down": yMod += 4; break;
    case "left": xMod -= 4; break;
    case "right": xMod += 4; break;
  }
  return {
    x: args.coords.x + xMod,
    y: args.coords.y + yMod
  }
};
Ghost.inkyTarget = function(args) {
  var xMod = 0;
  var yMod = 0;
  switch(args.direction) {
    case "up": yMod -= 2; break;
    case "down": yMod += 2; break;
    case "left": xMod -= 2; break;
    case "right": xMod += 2; break;
  }
  var pacDistance = {
    x: (args.coords.x + xMod) - args.blinky.x,
    y: (args.coords.y + yMod) - args.blinky.y
  }

  return {
    x: args.coords.x + pacDistance.x,
    y: args.coords.y + pacDistance.y
  }
};
Ghost.clydeTarget = function(args) {
  var distance = Board.getTileDistance(args.coords, args.ghost);
  if(distance > 8) {
    return args.coords;
  }
  else {
    return GHOST_CORNERS.c;
  }
};
Ghost.prototype.isCentered = function() {
  return this.x % 8 == 4 && this.y % 8 == 4;
};
Ghost.prototype.getClearDimensions = function() {
  return {
    x: this.x - 7,
    y: this.y - 7,
    w: 14,
    h: 16
  }
};
Ghost.prototype.move = function() {
  switch(this.direction){
    case "up": this.y--; break;
    case "down": this.y++; break;
    case "left": this.x--; break;
    case "right": this.x++; break;
  }
};
Ghost.prototype.exitHouse = function() {
  this.setMode("exitting");
  if(this.x < BOARD_WIDTH / 2) {
    this.direction = "right";
  }
  else if(this.x > BOARD_WIDTH / 2) {
    this.direction = "left";
  }
  else {
    this.direction = "up";
  }
  if(this.y <= 116) {
    this.setMode("scatter");
  }
};
Ghost.prototype.setMode = function(modeName) {
  if(GHOST_MODES.includes(modeName)) {
    this.movementMode = modeName;
  }
};
Ghost.prototype.handlePelletCount = function(pelletCount) {
  if(pelletCount >= this.pelletLimit) {
    this.setMode("exitting");
  }
};
