const pads = document.querySelectorAll(".pad");

// 🔊 sonidos (compatibles con iPhone)
const sounds = [];

for (let i = 1; i <= 16; i++) {
  const audio = new Audio(`sounds/sound${i}.mp3`);
  audio.preload = "auto";
  sounds.push(audio);
}

// 🎚️ CANVAS
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

// resolución real (importante)
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

// 🔥 dibujar golpe (onda)
function drawHit() {
  if (!recording) return;

  const centerY = canvas.height / 2;

  // intensidad aleatoria (simula energía del sonido)
  const amplitude = Math.random() * 80 + 20;

  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(x, centerY - amplitude);
  ctx.lineTo(x, centerY + amplitude);
  ctx.stroke();

  x += 4;

  if (x > canvas.width) x = 0;
}

// 🎛️ eventos de pads
pads.forEach((pad, index) => {

  pad.addEventListener("click", () => {

    const sound = sounds[index];

    // 🔥 clave iPhone: clonar sonido
    const clone = sound.cloneNode();
    clone.currentTime = 0;
    clone.play();

    drawHit(); // 🎚️ dibuja onda

    // animación
    pad.style.transform = "scale(0.85)";
    setTimeout(() => {
      pad.style.transform = "scale(1)";
    }, 80);
  });

});

// 🔴 GRABAR ONDA
recordBtn.onclick = () => {
  recording = true;
  x = 0;
  clearCanvas();
};

// ⏹️ PARAR Y DESCARGAR
stopBtn.onclick = () => {
  recording = false;

  const dataURL = canvas.toDataURL("image/png");

  downloadLink.href = dataURL;
  downloadLink.download = "onda.png";
  downloadLink.style.display = "block";
};
