const pads = document.querySelectorAll(".pad");

// 🎧 contexto compatible con iPhone
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const buffers = [];
let loaded = false;

// 🔥 cargar sonidos
async function loadSounds() {
  for (let i = 1; i <= 16; i++) {
    const response = await fetch(`sounds/sound${i}.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    buffers.push(audioBuffer);
  }
  loaded = true;
}

// 👇 se carga después del primer toque real
async function initAudio() {
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  if (!loaded) {
    await loadSounds();
  }
}

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

// 🎛️ eventos
pads.forEach((pad, index) => {

  pad.addEventListener("click", async () => {

    // 🔥 activar audio en iPhone
    await initAudio();

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
