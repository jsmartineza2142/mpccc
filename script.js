const pads = document.querySelectorAll(".pad");

// 🔊 crear múltiples instancias por sonido (clave para repetir rápido)
const soundPools = [];

// 🔥 crear 5 copias de cada sonido (puedes subir a 8 si quieres)
for (let i = 1; i <= 16; i++) {
  const pool = [];

  for (let j = 0; j < 5; j++) {
    const audio = new Audio(`sounds/sound${i}.mp3`);
    audio.preload = "auto";
    pool.push(audio);
  }

  soundPools.push(pool);
}

// 🔊 reproducir sin cortar sonidos
function playSound(pool) {
  for (let audio of pool) {
    if (audio.paused) {
      audio.currentTime = 0;
      audio.play();
      return;
    }
  }

  // si todos están ocupados, reutiliza el primero
  pool[0].currentTime = 0;
  pool[0].play();
}

// 🎛️ eventos
pads.forEach((pad, index) => {

  pad.addEventListener("click", () => {

    playSound(soundPools[index]);

    // animación
    pad.style.transform = "scale(0.85)";
    setTimeout(() => {
      pad.style.transform = "scale(1)";
    }, 80);
  });

});
