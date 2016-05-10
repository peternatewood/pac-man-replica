var Board = function(args) {
  this.board = START_BOARD.map(function(row) {
    return row.split("");
  });
}
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
      var currentTile = this.board[y][x];
      if(currentTile == " " || currentTile == "." || currentTile == "o" || currentTile == "m") {
        emptyTiles[prop] = tiles[prop];
      }
    }
  }
  return emptyTiles;
};
Board.prototype.getTileDistance = function(tile1, tile2) {
  var width = tile1.x + tile2.x;
  var height = tile1.y + tile2.y;

  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
};
Board.prototype.getClosestTile = function(args) {
  var tiles = args.tiles;
  var target = {
    x: Math.floor(args.target.x / 8),
    y: Math.floor(args.target.y / 8) - 3
  }
  var closestTile;
  for(var prop in tiles) {
    if(tiles.hasOwnProperty(prop)) {
      var currentDistance = this.getTileDistance(target, tiles[prop]);
      if(closestTile) {
        closestTile = currentDistance < this.getTileDistance(target, closestTile) ? tiles[prop] : closestTile;
      }
      else {
        closestTile = tiles[prop];
      }
    }
  }
  return closestTile;
};
