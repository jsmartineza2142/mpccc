const pads = document.querySelectorAll(".pad");

pads.forEach(pad => {
    pad.addEventListener("click", () => {
        const id = pad.dataset.pad;

        console.log("Pad presionado:", id);

        // animación manual extra
        pad.style.transform = "scale(0.85)";
        setTimeout(() => {
            pad.style.transform = "scale(1)";
        }, 100);
    });
});
