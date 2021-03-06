BrowserView.drawBorders = function(context) {
  var x = 0.5;
  var y = 32.5;

  context.clearRect(0, 24, BOARD_WIDTH, BOARD_HEIGHT - 40);
  context.strokeStyle = "#00F";
  context.lineWidth = 1;

  // Outer border
  context.beginPath();
  context.moveTo(x, y);
  context.quadraticCurveTo(x, y -= 8, x += 8, y);
  context.lineTo(x += 207, y);
  context.quadraticCurveTo(x += 8, y, x, y += 8);
  context.lineTo(x, y += 63);
  context.quadraticCurveTo(x, y += 8, x -= 8, y);
  context.lineTo(x -= 31, y);
  context.moveTo(--x, ++y);
  context.lineTo(x, y += 23);
  context.moveTo(++x, ++y);
  context.lineTo(x += 40, y);
  context.moveTo(x, y += 23);
  context.lineTo(x -= 40, y);
  context.moveTo(--x, ++y);
  context.lineTo(x, y += 23);
  context.moveTo(++x, ++y);
  context.lineTo(x += 31, y);
  context.quadraticCurveTo(x += 8, y, x, y += 8);
  context.lineTo(x, y += 79);
  context.quadraticCurveTo(x, y += 8, x -= 8, y);
  context.lineTo(x -= 207, y);
  context.quadraticCurveTo(x -= 8, y, x, y -= 8);
  context.lineTo(x, y -= 79);
  context.quadraticCurveTo(x, y -= 8, x += 8, y);
  context.lineTo(x += 32, y);
  context.moveTo(++x, --y);
  context.lineTo(x, y -= 23);
  context.moveTo(--x, --y);
  context.lineTo(x -= 40, y);
  context.moveTo(x, y -= 23);
  context.lineTo(x += 40, y);
  context.moveTo(++x, --y);
  context.lineTo(x, y -= 23);
  context.moveTo(--x, --y);
  context.lineTo(x -= 32, y);
  context.quadraticCurveTo(x -= 8, y, x, y -= 8);
  context.lineTo(x, y -= 63);

  // Inner border
  context.moveTo(x += 3, y);
  context.lineTo(x, y -= 3);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 100, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 28);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 4, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 28);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 101, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 69);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 36, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 27);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 41, y);
  context.moveTo(x, y += 17);
  context.lineTo(x -= 41, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 27);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 36, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 36);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 14, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 4);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 14, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 37);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 213, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 37);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 14, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 4);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 14, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 36);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 37, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 27);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 42, y);
  context.moveTo(x, y -= 17);
  context.lineTo(x += 42, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 27);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 37, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 69);

  // Internal obstacles
  // 4 x 3 box
  context.moveTo(x += 17, y += 19);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 19, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 11);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 19, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 11);
  // 5 x 3 box
  context.moveTo(x += 40, y += 2);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 27, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 11);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 27, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 11);
  // 5 x 3 box
  context.moveTo(x += 72, y += 2);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 27, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 11);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 27, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 11);
  // 4 x 3 box
  context.moveTo(x += 48, y += 2);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 19, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 11);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 19, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 11);
  // 4 x 2 box
  context.moveTo(x -= 160, y += 34);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 19, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 19, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 1);
  // Right facing T
  context.moveTo(x += 40, y);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 3, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 20);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 20, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 20, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 20);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 3, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 49);
  // T shaped block
  context.moveTo(x += 24, y);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 51, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 20, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 20);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 3, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 20);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 20, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 1);
  // Left facing T
  context.moveTo(x += 72, y);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 3, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 51);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 3, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 20);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 20, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 3);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 20, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 18);
  // 4 x 2 box
  context.moveTo(x += 24, y);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 19, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 19, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 1);
  // 2 x 5 box
  context.moveTo(x -= 120, y += 72);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 3, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 27);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 3, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 27);
  // T shaped box
  context.moveTo(x += 24, y += 26);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 3, y);
  context.lineTo(x += 48, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 20, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 20);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 3, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 20);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 20, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 1);
  // 2 x 5 box
  context.moveTo(x += 72, y -= 24);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 3, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 27);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 3, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 27);
  // 180 rotated L box
  context.moveTo(x -= 136, y += 50);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 19, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 27);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 3, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 20);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 12, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 1);
  // 5 x 2 box
  context.moveTo(x += 40, y -= 1);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 27, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 27, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 1);
  // 5 x 2 box
  context.moveTo(x += 72, y);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 27, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 27, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 1);
  // Vertically flipped L box
  context.moveTo(x += 48, y);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 19, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 12, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 20);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 3, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 27);
  // Lower left box
  context.moveTo(x -= 160, y += 50);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 36, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 20);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 3, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 20);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 20, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 67, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 1);
  // T shaped box
  context.moveTo(x += 64, y -= 24);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 3, y);
  context.lineTo(x += 48, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 20, y);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x, y += 20);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 3, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 20);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x -= 20, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 1);
  // Lower left box
  context.moveTo(x += 48, y += 24);
  context.lineTo(x, y -= 2);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 20, y);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x, y -= 20);
  context.lineTo(x += 2, y -= 2);
  context.lineTo(x += 3, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 20);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x += 36, y);
  context.lineTo(x += 2, y += 2);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 2, y += 2);
  context.lineTo(x -= 67, y);
  context.lineTo(x -= 2, y -= 2);
  context.lineTo(x, y -= 1);

  // Ghost house
  context.moveTo(x = 84.5, y = 124.5);
  context.lineTo(x += 19, y);
  context.lineTo(x, y += 3);
  context.lineTo(x -= 16, y);
  context.lineTo(x, y += 25);
  context.lineTo(x += 49, y);
  context.lineTo(x, y -= 25);
  context.lineTo(x -= 16, y);
  context.lineTo(x, y -= 3);
  context.lineTo(x += 19, y);
  context.lineTo(x, y += 31);
  context.lineTo(x -= 55, y);
  context.lineTo(x, y -= 31);

  context.stroke();
}
