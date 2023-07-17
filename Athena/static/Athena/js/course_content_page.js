// Get all the chapter buttons
const chapterButtons = document.querySelectorAll('.chapter-view-container');
const videoElement = document.getElementById('video-box');
const chapterTitle = document.getElementById('chapter_title');

// Chapter Selection
chapterButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Get the video URL from the button's data attribute
      // Create a video element and set the source to the video URL
    videoElement.src = button.dataset.video;
    chapterButtons.forEach(b => {
      b.classList.remove("sel");
    });
    button.classList.add("sel");
    chapterTitle.textContent = chapters[index]['title'];
    console.log(chapters[index]);
  });
});

chapterButtons[0].click();

// Video Controls
const overlay_video = document.getElementById('overlay-tint');
const previous_btn = document.getElementById('previous-button');
const rewind_btn = document.getElementById('rewind-button');
const play_pause_btn = document.getElementById('play-pause-button');
const play_pause_btn_img = document.getElementById('play-pause-btn-img');
const next_btn = document.getElementById('next-button');
const playback_time = document.getElementById('cur-time');
const seek_bar = document.getElementById('seek-bar');
const sound_btn = document.getElementById('mute_button');
const fullscreen_btn = document.getElementById('full_screen_button');

videoElement.addEventListener('loadedmetadata', function() {
  seek_bar.max = videoElement.duration;
  videoElement.muted = true;
});

videoElement.addEventListener('timeupdate', () => {
    seek_bar.value = videoElement.currentTime;
    const currentTime = videoElement.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
   playback_time.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

overlay_video.addEventListener('click', () => {
  play_pause_btn.click();
});

previous_btn.addEventListener('click', () => {

});

rewind_btn.addEventListener('click', () => {
  videoElement.currentTime -= 15;
});

play_pause_btn.addEventListener('click', () => {
  if (videoElement.paused) {
    videoElement.play();
    play_pause_btn_img.src = 'https://img.icons8.com/sf-regular/48/pause.png';
  } else {
    videoElement.pause();
    play_pause_btn_img.src = 'https://img.icons8.com/sf-regular/48/play.png';
  }
});

next_btn.addEventListener('click', () => {

});

seek_bar.addEventListener('input', () => {
    videoElement.currentTime = seek_bar.value;
    videoElement.play();
    play_pause_btn_img.src = 'https://img.icons8.com/sf-regular/48/pause.png';
});

sound_btn.addEventListener('click', () => {
  videoElement.muted = !videoElement.muted;
  updateSoundBtn();
});

fullscreen_btn.addEventListener('click', () => {
  if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen();
  } else if (videoElement.mozRequestFullScreen) { // Firefox
    videoElement.mozRequestFullScreen();
  } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    videoElement.webkitRequestFullscreen();
  } else if (videoElement.msRequestFullscreen) { // IE/Edge
    videoElement.msRequestFullscreen();
  }
});

function updateSoundBtn() {
  if (videoElement.muted) {
    sound_btn.innerHTML = '<img width="32" height="32" src="https://img.icons8.com/sf-regular/48/sound-speaker.png" alt="sound"/>';
  } else {
    sound_btn.innerHTML = '<img width="32" height="32" src="https://img.icons8.com/sf-regular/48/high-volume.png" alt="sound"/>';
  }
}