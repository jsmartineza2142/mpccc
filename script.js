const pads = document.querySelectorAll(".pad");

// 🎧 Contexto de audio (iPhone compatible)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 🔥 Buffers (audio ya decodificado)
const buffers = [];

// ⚡ Precarga optimizada
async function loadSounds() {
  const promises = [];

  for (let i = 1; i <= 16; i++) {
    const p = fetch(`sounds/sound${i}.mp3`)
      .then(res => res.arrayBuffer())
      .then(data => audioContext.decodeAudioData(data))
      .then(buffer => buffers[i - 1] = buffer);

    promises.push(p);
  }

  await Promise.all(promises);
  console.log("✅ sonidos cargados");
}

loadSounds();

// 🔊 Disparo ultra rápido
function playSound(buffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 1;

  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // 🔥 clave: arranque inmediato con currentTime
  source.start(audioContext.currentTime);
}

// 🎛️ Eventos
pads.forEach((pad, index) => {

  const trigger = () => {

    // activar audio en iPhone
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
    }, 60);
  };

  // 👇 mejor que solo click (reduce lag en móvil)
  pad.addEventListener("touchstart", trigger);
  pad.addEventListener("mousedown", trigger);
});
