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

// 🎚️ CANVAS
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

// ajustar resolución real
canvas.width = 800;
canvas.height = 200;

// 🎛️ BOTONES
const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const downloadLink = document.getElementById("downloadLink");

// estado
let recording = false;
let x = 0;

// limpiar canvas
function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// iniciar limpio
clearCanvas();

// 🎚️ función que dibuja "onda falsa" basada en interacción
function drawWave() {
  if (!recording) return;

  requestAnimationFrame(drawWave);

  // simulamos onda (basada en interacción)
  const amplitude = Math.random() * 80;

  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(x, canvas.height / 2);
  ctx.lineTo(x, canvas.height / 2 + amplitude);
  ctx.stroke();

  x += 2;

  // si llega al final, sigue dibujando encima
  if (x > canvas.width) x = 0;
}

// 🔴 GRABAR
recordBtn.onclick = () => {
  recording = true;
  x = 0;
  clearCanvas();
  drawWave();
};

// ⏹️ PARAR
stopBtn.onclick = () => {
  recording = false;

  // convertir canvas a imagen
  const dataURL = canvas.toDataURL("image/png");

  downloadLink.href = dataURL;
  downloadLink.download = "onda.png";
  downloadLink.style.display = "block";
};
