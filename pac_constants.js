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
