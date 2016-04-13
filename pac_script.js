var BOARD_HEIGHT = 288;
var BOARD_WIDTH = 224;
var VERT_TILES = BOARD_HEIGHT / 8;
var HORIZ_TILES = BOARD_WIDTH / 8;

gameBoard = new Array(VERT_TILES);
for(var y = 0; y < VERT_TILES; y++) {
  gameBoard[y] = new Array(HORIZ_TILES);
  for(var x = 0; x < HORIZ_TILES; x++) {
    gameBoard[y][x] = "";
  }
}

var canvas, context;

var drawObject = function(args) {
  var width = args.objectArr.length;
  var height = args.objectArr[0].length;
  args.context.clearRect(x, y, width, height);
  args.context.fillStyle = args.color;

  args.objectArr.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      if(col == 1) {
        args.context.fillRect(args.x + cIndex, args.y + rIndex, 1, 1);
      }
    });
  });
}

var ready = function(fun) {
  if(document.readyState != "loading") {
    fun();
  }
  else if(document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fun);
  }
  else {
    document.attachEvent("onreadystatechange", function() {
      if(document.readyState != "loading") {
        fun();
      }
    });
  }
}

ready(function() {
  canvas = document.getElementById("board");
  context = canvas.getContext("2d");

  drawObject({
    x: 80,
    y: 80,
    objectArr: charset["A"],
    color: "#FFF",
    context: context
  });
});
