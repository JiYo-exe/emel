const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScixgkFMDzRrtLoP1GRbaneMxQEpqULF-8f1Uan7FNuL2L4Ew/viewform?usp=dialog";
const VISITED_KEY = "ml-form-animation-seen-v2";

const videoScreen = document.querySelector("#video-screen");
const video = document.querySelector("#intro-video");
const status = document.querySelector("#video-status");

function redirectToForm() {
  status.textContent = "Entering the battlefield...";
  window.location.replace(FORM_URL);
}

function startVideoGate() {
  document.title = "Preparing for glorious battle for glory...";

  video.addEventListener("ended", redirectToForm, { once: true });
  video.addEventListener("error", () => {
    status.textContent = "Entering the battlefield...";
    window.setTimeout(redirectToForm, 500);
  }, { once: true });

  // This is Tenor's MP4 version of the supplied GIF. Muting lets it start reliably on mobile.
  video.play().then(() => {
    status.textContent = "Preparing for glorious battle for glory...";
  }).catch(() => {
    status.textContent = "Tap the video to see something cool";
    video.controls = true;
  });
}
startVideoGate();
