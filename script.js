const pads = document.querySelectorAll(".pad");

// 🎧 contexto compatible iPhone
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// buffers
const buffers = [];

// 🔥 cargar sonidos al inicio (sin esperar interacción)
function loadSounds() {
  for (let i = 1; i <= 16; i++) {
    fetch(`sounds/sound${i}.mp3`)
      .then(res => res.arrayBuffer())
      .then(data => audioContext.decodeAudioData(data))
      .then(buffer => {
        buffers[i - 1] = buffer;
      });
  }
}

loadSounds();

// 🔊 reproducir
function playSound(buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 1;

  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  source.start(0);
}

// 🎛️ evento
pads.forEach((pad, index) => {

  pad.addEventListener("click", () => {

    // 🔥 activar audio en iPhone
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    if (buffers[index]) {
      playSound(buffers[index]);
    }

    // animación
    pad.style.transform = "scale(0.85)";
    setTimeout(() => {
      pad.style.transform = "scale(1)";
    }, 80);
  });

});
