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
      if(currentTile != "x" && currentTile != "-") {
        emptyTiles[prop] = tiles[prop];
      }
    }
  }
  return emptyTiles;
};
