const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScixgkFMDzRrtLoP1GRbaneMxQEpqULF-8f1Uan7FNuL2L4Ew/viewform?usp=dialog";
const VISITED_KEY = "ml-form-animation-seen-v2";

const videoScreen = document.querySelector("#video-screen");
const video = document.querySelector("#intro-video");
const status = document.querySelector("#video-status");

function redirectToForm() {
  status.textContent = "Opening the form…";
  window.location.replace(FORM_URL);
}

function startVideoGate() {
  document.title = "Please watch to continue";

  video.addEventListener("ended", redirectToForm, { once: true });
  video.addEventListener("error", () => {
    status.textContent = "Opening the form…";
    window.setTimeout(redirectToForm, 500);
  }, { once: true });

  // This is Tenor's MP4 version of the supplied GIF. Muting lets it start reliably on mobile.
  video.play().then(() => {
    status.textContent = "Please watch the video to continue";
  }).catch(() => {
    status.textContent = "Tap the video to start, then the form will open when it finishes.";
    video.controls = true;
  });
}

if (localStorage.getItem(VISITED_KEY) === "true") {
  redirectToForm();
} else {
  // Mark the first visit before playback so a refresh or Back navigation does not replay it.
  localStorage.setItem(VISITED_KEY, "true");
  startVideoGate();
}
