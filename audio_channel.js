var AudioChannel = function(args) {
  this.context = AudioContext ? new AudioContext() : new webkitAudioContext();
  this.oscill = this.context.createOscillator();
  this.gain = this.context.createGain();

  this.oscill.connect(this.gain);
  this.gain.connect(this.context.destination);

  if(args) {
    this.oscill.frequency.value = args.freq ? args.freq : 220;
    this.gain.gain.value = args.gain ? args.gain : 0.05;
  }
}
