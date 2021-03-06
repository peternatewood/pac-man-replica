var Actor = function(args) {
  this.x = args.startX;
  this.y = args.startY;
  this.name = args.name;
  this.color = NAME_TO_COLOR[args.name];
  this.radius = 6;
  this.direction = args.direction;
  this.speed = PAC_MOVE_DELAY;
  this.mouthPos = 0.0;
  this.mouthIsOpening = true;
}
Actor.prototype.getClearDimensions = function() {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    w: 2 * this.radius,
    h: 2 * this.radius
  }
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
