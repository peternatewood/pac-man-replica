var BrowserView = function(elementId) {
  this.canvas = document.getElementById(elementId);
  this.context = this.canvas.getContext("2d");
  this.canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  this.ghostAnimStep = 0;
  setInterval(function() {
    switch(this.ghostAnimStep) {
      case 0: this.ghostAnimStep = 1; break;
      case 1: this.ghostAnimStep = 0; break;
    }
  }.bind(this), GHOST_TENDRIL_DELAY);
}
BrowserView.prototype.drawPixel = function(args) {
  var index = (args.x + args.y * this.canvas.width) * 4;

  this.canvasData.data[index + 0] = args.r;
  this.canvasData.data[index + 1] = args.g;
  this.canvasData.data[index + 2] = args.b;
  this.canvasData.data[index + 3] = args.a;
};
BrowserView.prototype.drawObject = function(args) {
  var width = args.objectArr.length;
  var height = args.objectArr[0].length;
  this.context.clearRect(args.x, args.y, width, height);

  args.objectArr.forEach(function(row, rIndex) {
    row.forEach(function(col, cIndex) {
      var color = args.color ? args.color : CHAR_TO_COLOR[col];
      if(col == " ") {
        this.drawPixel({
          x: args.x + cIndex,
          y: args.y + rIndex,
          r: 0,
          g: 0,
          b: 0,
          a: 0
        });
      }
      else {
        this.drawPixel({
          x: args.x + cIndex,
          y: args.y + rIndex,
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        });
      }
    }.bind(this));
  }.bind(this));
};
BrowserView.prototype.drawCircle = function(args) {
  this.context.fillStyle = PELLET_COLOR;
  this.context.beginPath();
  this.context.arc(args.x, args.y, args.rad, 0, 2 * Math.PI, false);
  this.context.closePath();
  this.context.fill();
};
BrowserView.prototype.drawRect = function(args) {
  this.context.fillStyle = args.color;
  this.context.fillRect(args.x, args.y, args.w, args.h);
};
BrowserView.prototype.clearRect = function(args) {
  this.context.clearRect(args.x, args.y, args.w, args.h);
};
BrowserView.prototype.clear = function() {
  for(var y = 0; y < this.canvas.height; y++) {
    for(var x = 0; x < this.canvas.width; x++) {
      this.drawPixel({
        x: x,
        y: y,
        r: 0,
        g: 0,
        b: 0,
        a: 0
      });
    }
  }
  this.finalizePerPixelRender();
}
BrowserView.prototype.renderPac = function(args) {
  this.context.fillStyle = args.color;
  this.context.beginPath();

  var arcStart, arcEnd;
  var cheekX = 0;
  var cheekY = 0;
  switch(args.direction) {
    case "up":
      arcStart = (1.5 + args.mouthPos) * Math.PI;
      arcEnd = (3.5 - args.mouthPos) * Math.PI;
      cheekY = 2.5;
    break;
    case "down":
      arcStart = (0.5 + args.mouthPos) * Math.PI;
      arcEnd = (2.5 - args.mouthPos) * Math.PI;
      cheekY = -2.5;
    break;
    case "left":
      arcStart = (1.0 + args.mouthPos) * Math.PI;
      arcEnd = (3.0 - args.mouthPos) * Math.PI;
      cheekX = 2.5;
    break;
    case "right":
      arcStart = (0.0 + args.mouthPos) * Math.PI;
      arcEnd = (2.0 - args.mouthPos) * Math.PI;
      cheekX = -2.5;
    break;
  }

  this.context.arc(args.x, args.y, args.radius, arcStart, arcEnd, false);
  this.context.lineTo(args.x + cheekX, args.y + cheekY);

  this.context.closePath();
  this.context.fill();
};
BrowserView.prototype.renderPacDeath = function(args) {
  this.clearRect({
    x: args.x - args.radius,
    y: args.y - args.radius,
    w: 2 * args.radius,
    h: 2 * args.radius
  });
  this.context.fillStyle = args.color;
  this.context.beginPath();

  var arcStart = (1.5 + args.mouthPos) * Math.PI;
  var arcEnd = (3.5 - args.mouthPos) * Math.PI;

  this.context.arc(args.x, args.y, args.radius, arcStart, arcEnd, false);
  this.context.lineTo(args.x, args.y);
  this.context.closePath();
  this.context.fill();
};
BrowserView.prototype.renderGhost = function(args) {
  this.context.fillStyle = args.color;
  var x = args.x;
  var y = args.y;

  // Head
  this.context.beginPath();
  this.context.arc(x, y, 6, Math.PI, 0, false);
  this.context.moveTo(x += 7, y);
  this.context.lineTo(x, y += 5);
  this.context.lineTo(x -= 14, y);
  this.context.lineTo(x, y -= 5);
  this.context.closePath();
  this.context.fill();

  // Tendrils
  x = args.x + 7;
  y = args.y + 5;

  this.context.moveTo(x, y);
  switch(this.ghostAnimStep) {
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

  this.renderGhostEyes(args);
};
BrowserView.prototype.renderGhostEyes = function(args) {
  this.context.fillStyle = "#FFF";
  x = args.x - 3;
  y = args.y - 3;

  switch(args.direction) {
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

  switch(args.direction) {
    case "up":
      x = args.x - 4;
      y = args.y - 5;
    break;
    case "down":
      x = args.x - 4;
      y = args.y + 1;
    break;
    case "left":
      x = args.x - 6;
      y = args.y - 1;
    break;
    case "right":
      x = args.x - 2;
      y = args.y - 1;
    break;
  }

  // Pupils
  this.context.fillStyle = "#22F";
  this.context.fillRect(x, y, 2, 2);
  this.context.fillRect(x += 6, y, 2, 2);
}
BrowserView.prototype.renderGhostFrightened = function(args) {
  this.context.fillStyle = args.color;
  var x = args.x;
  var y = args.y;

  // Head
  this.context.beginPath();
  this.context.arc(x, y, 6, Math.PI, 0, false);
  this.context.moveTo(x += 7, y);
  this.context.lineTo(x, y += 5);
  this.context.lineTo(x -= 14, y);
  this.context.lineTo(x, y -= 5);
  this.context.closePath();
  this.context.fill();

  // Tendrils
  x = args.x + 7;
  y = args.y + 5;

  this.context.moveTo(x, y);
  switch(this.ghostAnimStep) {
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

  // Eyes
  this.context.fillStyle = NAME_TO_COLOR["p"];
  x = args.x - 3;
  y = args.y - 1;
  this.context.fillRect(x, y, 2, 2);
  this.context.fillRect(x + 4, y, 2, 2);

  // Mouth
  x = args.x - 6;
  y = args.y + 4;

  this.context.fillRect(x, y, 1, 1);
  this.context.fillRect(x += 1, y -= 1, 2, 1);
  this.context.fillRect(x += 2, y += 1, 2, 1);
  this.context.fillRect(x += 2, y -= 1, 2, 1);
  this.context.fillRect(x += 2, y += 1, 2, 1);
  this.context.fillRect(x += 2, y -= 1, 2, 1);
  this.context.fillRect(x += 2, y += 1, 1, 1);
};
BrowserView.prototype.drawText = function(args) {
  var text = args.text.toUpperCase().split("");
  var x = 0;
  var y = args.row;
  if(args.center) {
    x = Math.floor((HORIZ_TILES / 2) - (text.length / 2));
  }
  else {
    x = args.col;
  }

  text.forEach(function(char, index) {
    this.drawObject({
      objectArr: CHARSET[char],
      x: 8 * (x + index),
      y: 8 * y,
      color: args.color
    });
  }.bind(this));
  this.finalizePerPixelRender();
};
BrowserView.prototype.finalizePerPixelRender = function() {
  this.context.putImageData(this.canvasData, 0, 0);
};
