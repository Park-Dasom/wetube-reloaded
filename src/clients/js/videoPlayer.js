const video = document.querySelector("video");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullscreen");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volume = 0.5;
video.volume = volume;

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    video.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
    muteBtn.classList.remove("fa-volume-mute");
    muteBtn.classList.add("fa-volume-up");
  } else {
    video.muted = true;
    muteBtn.classList.remove("fa-volume-up");
    muteBtn.classList.add("fa-volume-mute");
  }
  volumeRange.value = video.muted ? "0" : volume;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
  }
  if (value === "0") {
    muteBtn.classList.remove("fa-volume-up");
    muteBtn.classList.add("fa-volume-mute");
  } else {
    muteBtn.classList.remove("fa-volume-mute");
    muteBtn.classList.add("fa-volume-up");
  }
  volume = value;
  video.volume = value;
};

const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.classList.remove("fa-compress");
    fullScreenBtn.classList.add("fa-expand");
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.classList.remove("fa-expand");
    fullScreenBtn.classList.add("fa-compress");
  }
};

const hideControls = () => {
  videoControls.classList.remove("showing");
  videoControls.classList.add("hidden");
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }

  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleVideoClick = () => {
  handlePlayClick();
};

const handleKeydown = (event) => {
  if (event.code === "Space") {
    handlePlayClick();
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handlePlayClick);
//window.addEventListener("keydown", handleKeydown);
video.addEventListener("ended", handleEnded);
