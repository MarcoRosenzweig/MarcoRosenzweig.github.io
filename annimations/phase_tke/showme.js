let slider = null;
let sliderValue = null;
let interval = null;

function initSlider() {
    // console.log("Trying to get slider", document.getElementById("slider"));

    slider = document.getElementById("slider");
    sliderValue = document.getElementById("slider-value");

    slider.oninput = updateImages;
    updateImages(); // Load initial images
}

function updateImages() {
    if (!slider || !sliderValue) return;
    const index = slider.value % 25;
    sliderValue.textContent = index;
    document.getElementById("image1").src = `annimations/phase_tke/1_2_3_4_5_6/p_tke_phase_bars${index}.png`;
    document.getElementById("image2").src = `annimations/phase_tke/1_2_3_4_5_6/p_tke_phase_contours${index}.png`;
}

function playSlider() {
    if (interval) return;
    interval = setInterval(() => {
        slider.value = (parseInt(slider.value) + 1) % 50;
        updateImages();
    }, 50);
}

function stopSlider() {
    clearInterval(interval);
    interval = null;
}

document.addEventListener('DOMContentLoaded', initSlider);
document.addEventListener("DOMContentLoaded", () => {
  slider = document.getElementById("slider");
  sliderValue = document.getElementById("slider-value");

  slider.addEventListener("input", updateImages);
  document.getElementById("play").addEventListener("click", playSlider);
  document.getElementById("stop").addEventListener("click", stopSlider);

  updateImages();
  });