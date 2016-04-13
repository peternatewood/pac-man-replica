var charset = {
  A: [
    "00111100",
    "01100110",
    "11000011",
    "11000011",
    "11111111",
    "11000011",
    "11000011",
    "11000011"
  ]
}

for(var prop in charset) {
  if(charset.hasOwnProperty(prop)) {
    charset[prop] = charset[prop].map(function(row) {
      return row.split("");
    });
  }
}
