var Matrix = function(rowLength) {
  this.matrix = new Array;
  if(rowLength) {
    for(var i = 0; i < rowLength; i++) {
      this.matrix.push(new Array);
    }
  }
}
