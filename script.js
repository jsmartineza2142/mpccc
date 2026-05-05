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

// ajustar tamaño real al visible
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = 150;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 🎛️ BOTONES
const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const downloadLink = document.getElementById("downloadLink");
const gallery = document.getElementById("gallery");

// estado
let recording = false;
let x = 0;

// limpiar canvas
function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
clearCanvas();

// 🔥 dibujar golpe (onda)
function drawHit() {
  if (!recording) return;

  const centerY = canvas.height / 2;

  const amplitude = Math.random() * 50 + 30;

  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(x, centerY - amplitude);
  ctx.lineTo(x, centerY + amplitude);
  ctx.stroke();

  x += 6;

  if (x > canvas.width) x = 0;
}

// 🎛️ eventos de pads
pads.forEach((pad, index) => {

  pad.addEventListener("click", () => {

    const sound = sounds[index];

    const clone = sound.cloneNode();
    clone.currentTime = 0;
    clone.play();

    drawHit();

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

// ⏹️ PARAR Y GUARDAR
stopBtn.onclick = () => {
  recording = false;

  const dataURL = canvas.toDataURL("image/png");

  // botón descarga principal
  downloadLink.href = dataURL;
  downloadLink.download = "onda.png";
  downloadLink.style.display = "block";

  // 🔥 agregar a galería
  const container = document.createElement("div");
  container.className = "wave-item";

  const img = document.createElement("img");
  img.src = dataURL;

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "onda.png";
  link.innerText = "Descargar";

  container.appendChild(img);
  container.appendChild(link);

  gallery.appendChild(container);
};
