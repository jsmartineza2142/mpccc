const pads = document.querySelectorAll(".pad");

// contexto de audio (clave para iPhone)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const buffers = [];

// cargar sonidos como buffers (más rápido que Audio)
async function loadSounds() {
  for (let i = 1; i <= 16; i++) {
    const response = await fetch(`sounds/sound${i}.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    buffers.push(audioBuffer);
  }
}

loadSounds();

// función para reproducir
function playSound(buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);
}

// eventos
pads.forEach((pad, index) => {

  pad.addEventListener("click", () => {

    // importante en iPhone (activa audio)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    playSound(buffers[index]);

    // animación
    pad.style.transform = "scale(0.85)";
    
    setTimeout(() => {
      pad.style.transform = "scale(1)";
    }, 100);
  });

});
