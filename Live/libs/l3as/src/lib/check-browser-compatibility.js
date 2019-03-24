function CheckBrowserCompatibility() {
  if (
    typeof AudioContext === 'undefined' &&
    typeof webkitAudioContext === 'undefined' &&
    typeof mozAudioContext === 'undefined'
  ) {
    return false;
  }

  var AudioTag = new Audio();
  var answer = AudioTag.canPlayType('audio/mpeg');
  if (!(answer === 'probably' || answer === 'maybe')) {
    return false;
  }

  return true;
}
