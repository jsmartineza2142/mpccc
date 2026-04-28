const pads = document.querySelectorAll(".pad");

// 🔊 sonidos simples (compatibles iPhone)
const sounds = [];

for (let i = 1; i <= 16; i++) {
  const audio = new Audio(`sounds/sound${i}.mp3`);
  audio.preload = "auto";
  sounds.push(audio);
}

pads.forEach((pad, index) => {

  pad.addEventListener("click", () => {

    const sound = sounds[index];

    // 🔥 truco iPhone: clonar el audio
    const clone = sound.cloneNode();

    clone.currentTime = 0;
    clone.play();

    // animación
    pad.style.transform = "scale(0.85)";
    setTimeout(() => {
      pad.style.transform = "scale(1)";
    }, 80);
  });

});
