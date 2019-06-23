function sleep(interval) {
    return new Promise(function(a,r) {
        setTimeout(a,interval)
    })
}

// sound code

var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
function beep(duration, frequency, volume, type) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (volume){gainNode.gain.value = volume;};
    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type = type;}

    oscillator.start();
    setTimeout(function(){oscillator.stop()}, (duration ? duration : 500));
};

function fixaudio() {
    audioCtx.resume()
}

window.addEventListener("click", fixaudio)
window.addEventListener("keydown", fixaudio)