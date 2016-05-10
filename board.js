var Board = function(args) {
  this.board = START_BOARD.map(function(row) {
    return row.split("");
  });
}
