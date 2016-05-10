var charset = {
  0: [
    "   xxx  ",
    "  x  xx ",
    " xx  xxx",
    " xx   xx",
    " xxx  xx",
    "  xx  x ",
    "   xxx  ",
    "        "
  ],
  1: [
    "    xx  ",
    "   xxx  ",
    "    xx  ",
    "    xx  ",
    "    xx  ",
    "    xx  ",
    "  xxxxxx",
    "        ",
  ],
  2: [
    "  xxxxx ",
    " xx   xx",
    "     xxx",
    "   xxxx ",
    "  xxxx  ",
    " xxx    ",
    " xxxxxxx",
    "        "
  ],
  3: [
    "  xxxxxx",
    "     xx ",
    "    xx  ",
    "   xxxx ",
    "      xx",
    " xx   xx",
    "  xxxxx ",
    "        "
  ],
  4: [
    "    xxx ",
    "   xxxx ",
    "  xx xx ",
    " xx  xx ",
    " xxxxxxx",
    "     xx ",
    "     xx ",
    "        "
  ],
  5: [
    " xxxxxx ",
    " x      ",
    " xxxxxx ",
    "      xx",
    "      xx",
    " xx   xx",
    "  xxxxx ",
    "        "
  ],
  6: [
    "   xxxxx",
    "  xx    ",
    " xx     ",
    " xxxxxx ",
    " xx   xx",
    " xx   xx",
    "  xxxxx ",
    "        "
  ],
  7: [
    " xxxxxxx",
    " xx   xx",
    "     xx ",
    "    xx  ",
    "   xx   ",
    "   xx   ",
    "   xx   ",
    "        "
  ],
  8: [
    "  xxxxx ",
    " xx   xx",
    " xx   xx",
    "  xxxxx ",
    " xx   xx",
    " xx   xx",
    "  xxxxx ",
    "        "
  ],
  9: [
    "  xxxxx ",
    " xx   xx",
    " xx   xx",
    "  xxxxxx",
    "      xx",
    "     xx ",
    "  xxxx  ",
    "        "
  ],
  A: [
    "   xxx  ",
    "  xx xx ",
    " xx   xx",
    " xx   xx",
    " xxxxxxx",
    " xx   xx",
    " xx   xx",
    "        "
  ],
  C: [
    "   xxxx ",
    "  xx  xx",
    " xx     ",
    " xx     ",
    " xx     ",
    "  xx  xx",
    "   xxxx ",
    "        "
  ],
  D: [
    " xxxxx  ",
    " xx  xx ",
    " xx   xx",
    " xx   xx",
    " xx   xx",
    " xx  xx ",
    " xxxxx  ",
    "        "
  ],
  E: [
    "  xxxxxx",
    "  xx    ",
    "  xx    ",
    "  xxxxx ",
    "  xx    ",
    "  xx    ",
    "  xxxxxx",
    "        "
  ],
  G: [
    "   xxxxx",
    "  xx    ",
    " xx     ",
    " xx   xx",
    " xx   xx",
    "  xx  xx",
    "   xxxxx",
    "        "
  ],
  H: [
    " xx   xx",
    " xx   xx",
    " xx   xx",
    " xxxxxxx",
    " xx   xx",
    " xx   xx",
    " xx   xx",
    "        "
  ],
  I: [
    "  xxxxxx",
    "    xx  ",
    "    xx  ",
    "    xx  ",
    "    xx  ",
    "    xx  ",
    "  xxxxxx",
    "        "
  ],
  O: [
    "  xxxxx ",
    " xx   xx",
    " xx   xx",
    " xx   xx",
    " xx   xx",
    " xx   xx",
    "  xxxxx ",
    "        "
  ],
  R: [
    " xxxxxx ",
    " xx   xx",
    " xx   xx",
    " xx  xxx",
    " xxxxx  ",
    " xx xxx ",
    " xx  xxx",
    "        "
  ],
  Y: [
    "  xx  xx",
    "  xx  xx",
    "  xx  xx",
    "   xxxx ",
    "    xx  ",
    "    xx  ",
    "    xx  ",
    "        ",
  ],
  "!": [
    "    xxx ",
    "    xxx ",
    "   xxx  ",
    "   xx   ",
    "   x    ",
    "        ",
    "  x     ",
    "        "
  ]
}

for(var prop in charset) {
  if(charset.hasOwnProperty(prop)) {
    charset[prop] = charset[prop].map(function(row) {
      return row.split("");
    });
  }
}

var START_BOARD = [
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "x............xx............x",
  "x.xxxx.xxxxx.xx.xxxxx.xxxx.x",
  "xoxxxx.xxxxx.xx.xxxxx.xxxxox",
  "x.xxxx.xxxxx.xx.xxxxx.xxxx.x",
  "x..........................x",
  "x.xxxx.xx.xxxxxxxx.xx.xxxx.x",
  "x.xxxx.xx.xxxxxxxx.xx.xxxx.x",
  "x......xx....xx....xx......x",
  "xxxxxx.xxxxx xx xxxxx.xxxxxx",
  "     x.xxxxx xx xxxxx.x     ",
  "     x.xx    b     xx.x     ",
  "     x.xx xxx--xxx xx.x     ",
  "xxxxxx.xx x      x xx.xxxxxx",
  "      .   xi p c x   .      ",
  "xxxxxx.xx x      x xx.xxxxxx",
  "     x.xx xxxxxxxx xx.x     ",
  "     x.xx          xx.x     ",
  "     x.xx xxxxxxxx xx.x     ",
  "xxxxxx.xx xxxxxxxx xx.xxxxxx",
  "x............xx............x",
  "x.xxxx.xxxxx.xx.xxxxx.xxxx.x",
  "x.xxxx.xxxxx.xx.xxxxx.xxxx.x",
  "xo..xx.......m .......xx..ox",
  "xxx.xx.xx.xxxxxxxx.xx.xx.xxx",
  "xxx.xx.xx.xxxxxxxx.xx.xx.xxx",
  "x......xx....xx....xx......x",
  "x.xxxxxxxxxx.xx.xxxxxxxxxx.x",
  "x.xxxxxxxxxx.xx.xxxxxxxxxx.x",
  "x..........................x",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
];

gameBoard = START_BOARD.map(function(row) {
  return row.split("");
});

var keyCodes = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
}

var nameToColor = {
  b: "#F00",
  i: "#4FF",
  p: "#FCF",
  c: "#FA6",
  m: "#FF0"
}

var BOARD_HEIGHT = 288;
var BOARD_WIDTH = 224;
var VERT_TILES = BOARD_HEIGHT / 8;
var HORIZ_TILES = BOARD_WIDTH / 8;
var PAC_MOVE_DELAY = 20;
var GHOST_TENDRIL_DELAY = 200;
