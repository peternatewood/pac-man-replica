var Ghost = function(args) {
  this.x = args.startX;
  this.y = args.startY;
  this.direction = args.direction ? args.direction : "left";
  this.nextDirection = this.direction;
  this.speed = GHOST_MOVE_DELAY;
  this.isMoving = false;
  this.context = args.context;
  this.name = args.name;
  this.color = nameToColor[args.name];
  this.animStep = 0;
  this.movementMode = "scatter";
  this.targetTile = {
    x: 0,
    y: 0
  }

  setInterval(function() {
    switch(this.animStep) {
      case 0: this.animStep = 1; break;
      case 1: this.animStep = 0; break;
    }
  }.bind(this), GHOST_TENDRIL_DELAY);
}
Ghost.prototype.clear = function() {
  this.context.clearRect(this.x - 7, this.y - 7, 14, 16);
};
Ghost.prototype.render = function() {
  this.context.fillStyle = this.color;

  var x = this.x;
  var y = this.y;

  // body
  this.context.beginPath();
  this.context.arc(x, y, 6, Math.PI, 0, false);
  this.context.moveTo(x += 7, y);
  this.context.lineTo(x, y += 5);
  this.context.lineTo(x -= 14, y);
  this.context.lineTo(x, y -= 5);
  this.context.closePath();
  this.context.fill();

  this.renderTendrils();
  this.renderEyes();
};
Ghost.prototype.renderTendrils = function() {
  var x = this.x + 7;
  var y = this.y + 5;

  this.context.moveTo(x, y);
  switch(this.animStep) {
    case 0:
      this.context.lineTo(x, y += 3);
      this.context.lineTo(x -= 1, y);
      this.context.lineTo(x -= 2, y -= 2.5);
      this.context.lineTo(x -= 2, y += 2.5);
      this.context.lineTo(x -= 1, y);
      this.context.lineTo(x, y -= 2);
      this.context.lineTo(x -= 2, y);
      this.context.lineTo(x, y += 2);
      this.context.lineTo(x -= 1, y);
      this.context.lineTo(x -= 2, y -= 2.5);
      this.context.lineTo(x -= 2, y += 2.5);
      this.context.lineTo(x -= 1, y);
      this.context.lineTo(x, y -= 3);
    break;
    case 1:
      this.context.lineTo(x, y += 1);
      this.context.lineTo(x -= 2, y += 2.5);
      this.context.lineTo(x -= 2, y -= 2.5);
      this.context.lineTo(x -= 1, y);
      this.context.lineTo(x -= 2, y += 2.5);
      this.context.lineTo(x -= 2, y -= 2.5);
      this.context.lineTo(x -= 1, y);
      this.context.lineTo(x -= 2, y += 2.5);
      this.context.lineTo(x -= 2, y -= 2.5);
      this.context.lineTo(x, y -= 1);
    break;
  }
  this.context.closePath();
  this.context.fill();
};
Ghost.prototype.renderEyes = function() {
  this.context.fillStyle = "#FFF";
  var x = this.x - 3;
  var y = this.y - 3;

  switch(this.direction) {
    case "up": y -= 2; break;
    case "down": y += 1; break;
    case "left": x--; break;
    case "right": x++; break;
  }

  // Whites of eyes
  this.context.beginPath();
  this.context.moveTo(x, y);
  this.context.lineTo(x += 0.5, y);
  this.context.lineTo(x += 1.5, y += 1.5);
  this.context.lineTo(x, y += 2);
  this.context.lineTo(x -= 1.5, y += 1.5);
  this.context.lineTo(x -= 1, y);
  this.context.lineTo(x -= 1.5, y -= 1.5);
  this.context.lineTo(x, y -= 2);
  this.context.lineTo(x += 1.5, y -= 1.5);
  this.context.moveTo(x += 6.5, y);
  this.context.lineTo(x += 0.5, y);
  this.context.lineTo(x += 1.5, y += 1.5);
  this.context.lineTo(x, y += 2);
  this.context.lineTo(x -= 1.5, y += 1.5);
  this.context.lineTo(x -= 1, y);
  this.context.lineTo(x -= 1.5, y -= 1.5);
  this.context.lineTo(x, y -= 2);
  this.context.lineTo(x += 1.5, y -= 1.5);
  this.context.fill();

  switch(this.direction) {
    case "up":
      x = this.x - 4;
      y = this.y - 5;
    break;
    case "down":
      x = this.x - 4;
      y = this.y + 1;
    break;
    case "left":
      x = this.x - 6;
      y = this.y - 2;
    break;
    case "right":
      x = this.x - 2;
      y = this.y - 2;
    break;
  }

  this.context.fillStyle = "#22F";
  this.context.fillRect(x, y, 2, 2);
  this.context.fillRect(x += 6, y, 2, 2);
};
Ghost.prototype.move = function() {
  this.clear();
  switch(this.direction){
    case "up": this.y--; break;
    case "down": this.y++; break;
    case "left": this.x--; break;
    case "right": this.x++; break;
  }
  if(this.x % 8 == 4 && this.y % 8 == 4) {
    this.setNextDirection();
    this.direction = this.nextDirection;
  }
  this.render();
};
Ghost.prototype.setNextDirection = function() {
  var currentTile = {
    x: Math.floor(this.x / 8),
    y: Math.floor(this.y / 8) - 3
  }
  var adjacentTiles = gameBoard.getAdjacentTiles({x: this.x, y: this.y});
  adjacentTiles[oppositeDirection(this.direction)] = undefined;

  var emptyTiles = gameBoard.getEmptyTiles(adjacentTiles);
  var nextTile = gameBoard.getClosestTile({
    tiles: emptyTiles,
    target: this.targetTile
  });

  if(nextTile.x < currentTile.x) {
    this.nextDirection = "left";
  }
  else if(nextTile.x > currentTile.x) {
    this.nextDirection = "right";
  }
  else if(nextTile.y < currentTile.y) {
    this.nextDirection = "up";
  }
  else if(nextTile.y > currentTile.y) {
    this.nextDirection = "down";
  }
};