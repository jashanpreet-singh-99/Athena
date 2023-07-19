// Get all the chapter buttons
const chapterButtons = document.querySelectorAll('.chapter-view-container');
const videoContainer = document.getElementById('video-content');
const quizContainer = document.getElementById('quiz-content');
const videoElement = document.getElementById('video-box');
const chapterTitle = document.getElementById('chapter_title');

// Chapter Selection
chapterButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    videoContainer.hidden = false;
    quizContainer.hidden = true;
    quizContainer.style.display = "none";
    // Get the video URL from the button's data attribute
      // Create a video element and set the source to the video URL
    videoElement.src = button.dataset.video;
    chapterButtons.forEach(b => {
      b.classList.remove("sel");
    });
    quizButtons.forEach(b => {
      b.classList.remove("sel");
    });
    button.classList.add("sel");
    chapterTitle.textContent = chapters[index]['title'];
    console.log(chapters[index]);
  });
});

chapterButtons[0].click();

//
// Quiz Content
//
const quizButtons = document.querySelectorAll('.quiz-view-container');
const quizTitle = document.getElementById('quiz_title');
const quizTime = document.getElementById('quiz_time');
const quizNMarking = document.getElementById('quiz_negative_marking');
const quizInstructions = document.getElementById('quiz-instructions');
const quizStartButton = document.getElementById('start-quiz');
let selected_quiz_id = 0

quizButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    videoContainer.hidden = true;
    quizContainer.hidden = false;
    quizContainer.style.display = "flex";
    chapterButtons.forEach(b => {
      b.classList.remove("sel");
    });
    quizButtons.forEach(b => {
      b.classList.remove("sel");
    });
    button.classList.add("sel");
    quizTitle.textContent = quizzes[index]['title'];
    quizTime.textContent = quizzes[index]['time'];
    if (quizzes[index]['negative_marking']) {
      quizNMarking.textContent = 'Applicable';
    } else {
      quizNMarking.textContent = 'Not-Applicable';
    }
    quizInstructions.innerText  = quizzes[index]['instructions'];
    console.log(quizzes[index]);
    selected_quiz_id = index;
  });
});

//
// Quiz Buttons
//
const quizStartPage = document.getElementById('quiz-start-page');
const quizQPage = document.getElementById('quiz-q-page');
const quizFinishPage = document.getElementById('quiz-f-page');

const qQuestion = document.getElementById('quiz_question_v');
const qOption1 = document.getElementById('option_1');
const qOption2 = document.getElementById('option_2');
const qOption3 = document.getElementById('option_3');
const qOption4 = document.getElementById('option_4');
const nextQuestionButton = document.getElementById('get_next_question');

const quizScore = document.getElementById('quiz_score');
const quizCorrect = document.getElementById('quiz_correct_q');
const quizTotal = document.getElementById('quiz_total_q');

let current_question = 0;
let current_selection = 0;
const optionButtons = document.querySelectorAll('.q-options')

function reset_q_page() {
  optionButtons.forEach(b => {
      b.classList.remove("sel");
  });
}
optionButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    reset_q_page();
    current_selection = index + 1;
    console.log(current_selection);
    button.classList.add("sel");
  });
});
nextQuestionButton.addEventListener('click', () => {
  sendQuizRequest(current_question + 1, current_selection);
});

function sendQuizRequest(questionNo, prev_selection) {
  var xhr = new XMLHttpRequest();

  var quiz = quizzes[selected_quiz_id]
  var data = '?quiz_id=' + encodeURIComponent(quiz['id']) +
               '&course_id=' + encodeURIComponent(quiz['course_id']) +
               '&question_no=' + encodeURIComponent(questionNo)+
                '&prev_selection=' + encodeURIComponent(prev_selection);
  xhr.open('GET', quiz_url + data);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    console.log(xhr.status);
      if (xhr.status === 200) {
            current_question = questionNo
            var response = JSON.parse(xhr.responseText);
            if (Boolean(response.blank)) {
                quizQPage.style.display = 'none';
                quizFinishPage.style.display = 'flex'
                quizTotal.textContent = response.total;
                quizCorrect.textContent = response.answered;
                quizScore.textContent = response.score + ' / ' + response.total_score;
            } else {
                console.log('Q: ' + response.question.question);
                qQuestion.textContent = 'Q ' + (current_question + 1) + '. ' + response.question.question;
                qOption1.innerHTML = '<span>1</span>' + response.question.options_1;
                qOption2.innerHTML = '<span>2</span>' + response.question.options_2;
                qOption3.innerHTML = '<span>3</span>' + response.question.options_3;
                qOption4.innerHTML = '<span>4</span>' + response.question.options_4;
                reset_q_page();
                quizStartPage.style.display = 'none';
                quizQPage.style.display = 'flex'
            }
        } else {
            console.log('AJAX request failed');
        }
  };
  xhr.onerror = function() {
      console.log('AJAX: request Error:');
  }

  xhr.send();
}

chapterButtons[0].click();


//
// Video Controls
//
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
