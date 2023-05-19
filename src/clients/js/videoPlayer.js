const video=document.querySelector("video");
const playBtn=document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn=document.getElementById("mute");
const muteBtnIcon=muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime=document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline=document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const subscribeBtn=document.getElementById("videoSubscribe");
const likeBtn=document.getElementById("videoLike");
const textarea=document.getElementById("textarea");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;


const handlePlay=()=>{
  if(video.paused){
    video.play();
  }else{
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}

const handleMute=()=>{
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
}

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const formatTime = (seconds) =>{
  return new Date(seconds * 1000).toISOString().substring(14, 19);
}

const handleTimeLineChange = (event) => {
  const {
    target: { value }
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () =>{
  return videoControls.classList.remove("showing");
}
  

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 2000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
  }, 100);
  controlsTimeout = setTimeout(hideControls, 100);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/video/${id}/view`, {
    method: "POST",
  });
};

const handleVideoClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const handleKeyDown = (event) => {
  const { keyCode } = event;  
  if (keyCode === 37) {
    video.currentTime -= 5;
  } else if (keyCode === 39) {
    video.currentTime += 5;
  } else if (keyCode === 38) {
    event.preventDefault();
    volumeValue = Math.min(volumeValue + 0.05, 1);
    video.volume = volumeValue;
    volumeRange.value = volumeValue;
  } else if (keyCode === 40) {
    event.preventDefault();
    volumeValue = Math.max(volumeValue - 0.05, 0); 
    video.volume = volumeValue;
    volumeRange.value = volumeValue;
  }
  else if (event.target!==textarea&& keyCode === 32) {
    event.preventDefault();
    handlePlay();
  } else if (keyCode === 77) {
    handleMute();
  } else if (keyCode === 70) {
    handleFullScreen();
  }
};

playBtn.addEventListener("click",handlePlay);
muteBtn.addEventListener("click",handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimeLineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handleVideoClick);
document.addEventListener("keydown", handleKeyDown);