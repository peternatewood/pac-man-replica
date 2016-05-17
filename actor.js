var Actor = function(args) {
  this.context = args.context;
  this.x = args.startX;
  this.y = args.startY;
  this.name = args.name;
  this.radius = 6;
  this.direction = args.direction;
  this.speed = PAC_MOVE_DELAY;
  this.mouthPos = 0.0;
  this.mouthIsOpening = true;
  this.moveIntervalID = false;
  this.keyStates = {
    up: false,
    down: false,
    left: false,
    right: false
  }
}
Actor.prototype.getClearDimensions = function() {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    w: 2 * this.radius,
    h: 2 * this.radius
  }
};
Actor.prototype.render = function() {
  this.context.fillStyle = nameToColor[this.name];
  this.context.beginPath();

  var arcStart, arcEnd;
  var cheekX = 0;
  var cheekY = 0;
  switch(this.direction) {
    case "up":
      arcStart = (1.5 + this.mouthPos) * Math.PI;
      arcEnd = (3.5 - this.mouthPos) * Math.PI;
      cheekY = 2.5;
    break;
    case "down":
      arcStart = (0.5 + this.mouthPos) * Math.PI;
      arcEnd = (2.5 - this.mouthPos) * Math.PI;
      cheekY = -2.5;
    break;
    case "left":
      arcStart = (1.0 + this.mouthPos) * Math.PI;
      arcEnd = (3.0 - this.mouthPos) * Math.PI;
      cheekX = 2.5;
    break;
    case "right":
      arcStart = (0.0 + this.mouthPos) * Math.PI;
      arcEnd = (2.0 - this.mouthPos) * Math.PI;
      cheekX = -2.5;
    break;
  }

  if(this.name == "m") {
    this.context.arc(this.x, this.y, this.radius, arcStart, arcEnd, false);
    this.context.lineTo(this.x + cheekX, this.y + cheekY);
  }

  this.context.closePath();
  this.context.fill();
};
Actor.prototype.move = function() {
  this.mouthPos = Math.floor((this.mouthPos + ((this.mouthIsOpening ? 1 : -1) * 0.08)) * 100) / 100;
  if(this.mouthPos <= 0) {
    this.mouthIsOpening = true;
  }
  else if(this.mouthPos >= 0.4) {
    this.mouthIsOpening = false;
  }
  
  switch(this.direction) {
    case "up": this.y--; break;
    case "down": this.y++; break;
    case "left": this.x--; break;
    case "right": this.x++; break;
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
  return {x: this.x, y: this.y}
};
Actor.prototype.moveTowardCenter = function() {
  var xInTile = this.x % 8;
  var yInTile = this.y % 8;
  if((this.direction == "up" || this.direction == "down") && xInTile != 4) {
    this.x += xInTile < 4 ? 1 : -1;
  }
  else if((this.direction == "left" || this.direction == "right") && yInTile != 4) {
    this.y += yInTile < 4 ? 1 : -1;
  }
};
Actor.prototype.handleKeyUp = function(keyPressed) {
  this.keyStates[keyPressed] = false;
};
