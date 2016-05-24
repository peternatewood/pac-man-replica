var Board = function(boardArray) {
  this.board = new Matrix;
  this.board.matrix = boardArray.map(function(row) {
    return row.split("");
  });
}
Board.getTileDistance = function(tile1, tile2) {
  var width = Math.abs(tile1.x - tile2.x);
  var height = Math.abs(tile1.y - tile2.y);

  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
};
Board.convertToTile = function(coords) {
  return {
    x: Math.floor(coords.x / 8),
    y: Math.floor(coords.y / 8) - 3
  }
};
Board.prototype.getCell = function(args) {
  return this.board.matrix[args.y][args.x];
};
Board.prototype.setCell = function(args) {
  this.board.matrix[args.y][args.x] = args.value;
};
Board.prototype.find = function(value) {
  return this.board.find(value);
};
Board.prototype.count = function(value) {
  var count = 0;
  this.board.matrix.forEach(function(row) {
    row.forEach(function(cell) {
      if(cell == value) count++;
    });
  });
  return count;
};
Board.prototype.predictCollision = function(coords, direction) {
  var yOffset = 0;
  var xOffset = 0;
  switch(direction) {
    case "up": yOffset -= 4.5; break;
    case "down": yOffset += 4.5; break;
    case "left": xOffset -= 4.5; break;
    case "right": xOffset += 4.5; break;
  }

  var tile = this.getCell(Board.convertToTile({
    x: coords.x + xOffset,
    y: coords.y + yOffset
  }));
  return TILE_LETTER_TO_NAME[tile];
};
Board.prototype.getAdjacentTiles = function(args) {
  var coords = Board.convertToTile({x: args.x, y: args.y});
  return {
    up: {y: coords.y - 1, x: coords.x},
    down: {y: coords.y + 1, x: coords.x},
    left: {y: coords.y, x: coords.x - 1},
    right: {y: coords.y, x: coords.x + 1}
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
Board.prototype.getClosestTile = function(args) {
  var tiles = args.tiles;
  var closestTile;
  for(var prop in tiles) {
    if(tiles.hasOwnProperty(prop)) {
      var currentDistance = Board.getTileDistance(args.target, tiles[prop]);
      if(closestTile) {
        closestTile = currentDistance < Board.getTileDistance(args.target, closestTile) ? tiles[prop] : closestTile;
      }
      else {
        closestTile = tiles[prop];
      }
    }
  }
  return closestTile;
};
