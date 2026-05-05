const pads = document.querySelectorAll(".pad");

// 🔊 sonidos
const sounds = [];

for (let i = 1; i <= 16; i++) {
  const audio = new Audio(`sounds/sound${i}.mp3`);
  audio.preload = "auto";
  sounds.push(audio);
}

// 🎚️ canvas
const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

// ajustar tamaño real
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = 150;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// botones
const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const downloadLink = document.getElementById("downloadLink");
const gallery = document.getElementById("gallery");

// estado
let recording = false;
let x = 0;

// limpiar
function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
clearCanvas();

// dibujar onda
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

// pads
pads.forEach((pad, index) => {
  pad.addEventListener("click", () => {

    const sound = sounds[index];

    const clone = sound.cloneNode();
    clone.currentTime = 0;
    clone.play().catch(() => {}); // 🔥 fix iPhone

    drawHit();

    pad.style.transform = "scale(0.85)";
    setTimeout(() => {
      pad.style.transform = "scale(1)";
    }, 80);
  });
});

// grabar
recordBtn.onclick = () => {
  recording = true;
  x = 0;
  clearCanvas();
};

// parar
stopBtn.onclick = () => {
  recording = false;

  const dataURL = canvas.toDataURL("image/png");

  downloadLink.href = dataURL;
  downloadLink.download = "onda.png";
  downloadLink.style.display = "block";

  // galería
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
