var AudioChannel = function(args) {
  this.context = AudioContext ? new AudioContext() : new webkitAudioContext();
  this.oscill = this.context.createOscillator();
  this.gain = this.context.createGain();

  this.oscill.connect(this.gain);
  this.gain.connect(this.context.destination);

  if(args) {
    this.oscill.frequency.value = args.freq ? args.freq : 220;
    this.oscill.type = args.wave ? args.wave : "triangle";
    this.gain.gain.value = args.gain ? args.gain : 0.05;
  }
}
AudioChannel.prototype.playSong = function(song) {
  this.oscill.start();
  var playNextNote = function(song) {
    this.oscill.frequency.value = song[0].freq;
    if(song[1]) {
      setTimeout(playNextNote.bind(this, song.slice(1)), song[0].length);
    }
    else {
      setTimeout(function() {
        this.gain.gain.value = 0;
      }.bind(this), song[0].length);
    }
  }.bind(this);
  playNextNote(song);
}
