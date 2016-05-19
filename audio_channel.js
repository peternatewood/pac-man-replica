var AudioChannel = function(args) {
  this.context = AudioContext ? new AudioContext() : new webkitAudioContext();
  this.oscill = null;
  this.gain = this.context.createGain();
  this.gain.connect(this.context.destination);

  var args = args ? args : {};

  this.frequency = args.freq ? args.freq : 220;
  this.wave = args.wave ? args.wave : "triangle";
  this.volume = args.gain ? args.gain : 0.2;
}
AudioChannel.prototype.setNodes = function() {
  if(this.oscill) {
    this.oscill.stop();
  }
  this.oscill = this.context.createOscillator();
  this.oscill.connect(this.gain);

  this.oscill.frequency.value = this.frequency;
  this.oscill.type = this.wave;
  this.gain.gain.value = this.volume;
  this.oscill.start();
};
AudioChannel.prototype.playSong = function(song) {
  var playNextNote = function(song) {
    this.frequency = noteToFreq(song[0].note, song[0].octave);
    this.setNodes();
    if(song[1]) {
      setTimeout(playNextNote.bind(this, song.slice(1)), song[0].length);
    }
    else {
      setTimeout(function() {
        this.oscill.stop();
      }.bind(this), song[0].length);
    }
  }.bind(this);
  playNextNote(song);
};
