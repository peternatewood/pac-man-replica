var BrowserView = function(elementId) {
  this.canvas = document.getElementById(elementId);
  this.context = this.canvas.getContext("2d");
  this.canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
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
      if(col == "x") {
        this.drawPixel({
          x: args.x + cIndex,
          y: args.y + rIndex,
          r: args.color.r,
          g: args.color.g,
          b: args.color.b,
          a: args.color.a
        });
      }
    }.bind(this));
  }.bind(this));
};
BrowserView.prototype.drawText = function(args) {
  var letters = args.text.split("");
  var x = args.x ? args.x * 8 : 0;
  var y = args.y ? args.y * 8 : 0;
  letters.forEach(function(letter) {
    if(charset[letter]) {
      this.drawObject({
        objectArr: charset[letter],
        x: x,
        y: y,
        color: args.color
      });
    }
    else if(letter == "\n") {
      y += 8;
    }
    x += 8;
    if(x + 8 > BOARD_WIDTH - 8) {
      x = args.x ? args.x * 8 : 0;
      y += 8 + (args.x ? args.x * 8 : 0);
    }
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
  this.context.fillStyle = PELLET_COLOR;
  this.context.fillRect(args.x, args.y, args.w, args.h);
};
BrowserView.prototype.clearRect = function(args) {
  this.context.clearRect(args.x, args.y, args.w, args.h);
};
BrowserView.prototype.renderGhost = function(args) {
  this.context.fillStyle = args.color;
  var x = args.x;
  var y = args.y;

  // body
  this.context.beginPath();
  this.context.arc(x, y, 6, Math.PI, 0, false);
  this.context.moveTo(x += 7, y);
  this.context.lineTo(x, y += 5);
  this.context.lineTo(x -= 14, y);
  this.context.lineTo(x, y -= 5);
  this.context.closePath();
  this.context.fill();
};
