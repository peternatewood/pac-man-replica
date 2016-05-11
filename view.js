var View = function(elementId) {
  this.canvas = document.getElementById(elementId);
  this.context = this.canvas.getContext("2d");
  this.canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
}
View.prototype.drawPixel = function(args) {
  var index = (args.x + args.y * this.canvas.width) * 4;

  this.canvasData.data[index + 0] = args.r;
  this.canvasData.data[index + 1] = args.g;
  this.canvasData.data[index + 2] = args.b;
  this.canvasData.data[index + 3] = args.a;
};
View.prototype.drawObject = function(args) {
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
View.prototype.drawCircle = function(args) {
  this.context.fillStyle = PELLET_COLOR;
  this.context.beginPath();
  this.context.arc(args.x, args.y, args.rad, 0, 2 * Math.PI, false);
  this.context.closePath();
  this.context.fill();
};
