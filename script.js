const pads = document.querySelectorAll(".pad");

// Crear contexto de audio (compatible con iPhone)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Buffers de audio
const buffers = [];

// 🔥 Cargar sonidos
async function loadSounds() {
  for (let i = 1; i <= 16; i++) {
    const response = await fetch(`sounds/sound${i}.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    buffers.push(audioBuffer);
  }
}

loadSounds();

// 🔊 Reproducir sonido (sin lag)
function playSound(buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  // Nodo de ganancia (mejor control y rendimiento)
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 1;

  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  source.start(0);
}

// 🎛️ Eventos de pads
pads.forEach((pad, index) => {

  pad.addEventListener("click", () => {

    // 🔥 NECESARIO en iPhone
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // reproducir sonido
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
