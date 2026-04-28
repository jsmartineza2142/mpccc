const pads = document.querySelectorAll(".pad");

// cargar sonidos una sola vez (más rápido)
const sounds = [];

for (let i = 1; i <= 16; i++) {
  sounds.push(new Audio(`sounds/sound${i}.mp3`));
}

pads.forEach((pad, index) => {
  pad.addEventListener("click", () => {

    const audio = sounds[index];

    audio.currentTime = 0; // reinicia el sonido
    audio.play();

    console.log("Pad:", index + 1);

    // animación (la que ya tenías)
    pad.style.transform = "scale(0.85)";
    
    setTimeout(() => {
      pad.style.transform = "scale(1)";
    }, 100);
  });
});
