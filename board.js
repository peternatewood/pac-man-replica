var Board = function(args) {
  this.board = new Matrix;
  this.board.matrix = START_BOARD.map(function(row) {
    return row.split("");
  });
}
Board.prototype.getCell = function(args) {
  return this.board.matrix[args.y][args.x];
};
Board.prototype.setCell = function(args) {
  this.board.matrix[args.y][args.x] = args.value;
};
Board.prototype.getAdjacentTiles = function(args) {
  var x = Math.floor(args.x / 8);
  var y = Math.floor(args.y / 8) - 3;
  return {
    up: {y: y - 1, x: x},
    down: {y: y + 1, x: x},
    left: {y: y, x: x - 1},
    right: {y: y, x: x + 1}
  }
};
Board.prototype.getEmptyTiles = function(tiles) {
  var emptyTiles = new Object;
  for(var prop in tiles) {
    if(tiles[prop] && tiles.hasOwnProperty(prop)) {
      var x = tiles[prop].x;
      var y = tiles[prop].y;
      var currentTile = this.getCell({x: x, y: y});
      if(!(prop == "up" && currentTile == "/") && EMPTY_TILES.includes(currentTile)) {
        emptyTiles[prop] = tiles[prop];
      }
    }
  }
  return emptyTiles;
};
Board.prototype.getTileDistance = function(tile1, tile2) {
  var width = Math.abs(tile1.x - tile2.x);
  var height = Math.abs(tile1.y - tile2.y);

  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
};
Board.prototype.getClosestTile = function(args) {
  var tiles = args.tiles;
  var closestTile;
  for(var prop in tiles) {
    if(tiles.hasOwnProperty(prop)) {
      var currentDistance = this.getTileDistance(args.target, tiles[prop]);
      if(closestTile) {
        closestTile = currentDistance < this.getTileDistance(args.target, closestTile) ? tiles[prop] : closestTile;
      }
      else {
        closestTile = tiles[prop];
      }
    }
  }
  return closestTile;
};
