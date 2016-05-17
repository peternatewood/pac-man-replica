var Ghost = function(args) {
  this.x = args.startX;
  this.y = args.startY;
  this.direction = args.direction ? args.direction : "left";
  this.speed = GHOST_MOVE_DELAY;
  this.context = args.context;
  this.name = args.name;
  this.color = nameToColor[args.name];
  this.movementMode = args.mode ? args.mode : "scatter";
  this.targetTile = GHOST_CORNERS[this.name];
}
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
    this.setNextDirection();
  }
};
Ghost.prototype.setMode = function(modeName) {
  if(GHOST_MODES.includes(modeName)) {
    this.movementMode = modeName;
  }
};
