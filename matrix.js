var Matrix = function(rowLength) {
  if(rowLength) {
    this.matrix = new Array;
    for(var i = 0; i < rowLength; i++) {
      this.matrix.push(new Array);
    }
  }
  else {
    this.matrix = new Array(new Array);
  }
}
Matrix.prototype.find = function(value) {
  var coordinates;

  this.matrix.forEach(function(row, rIndex) {
    row.forEach(function(cell, cIndex) {
      if(cell === value) {
        coordinates = {
          x: cIndex,
          y: rIndex
        }
      }
    });
  });

  return coordinates;
};
Matrix.prototype.getRandomCoords = function() {
  var row = Math.floor(Math.random() * this.matrix.length);
  var col = Math.floor(Math.random() * this.matrix[0].length);
  return {x: col, y: row}
};
