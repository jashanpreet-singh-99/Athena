// Get all the chapter buttons
const chapterButtons = document.querySelectorAll('.chapter-view-container');
const videoContainer = document.getElementById('video-content');
const nonVideoContent = document.getElementById('non-video-content');
const quizContainer = document.getElementById('quiz-content');
const videoElement = document.getElementById('video-box');
const contentElement = document.getElementById('content-frame');
const chapterTitle = document.getElementById('chapter_title');

const quizBottomBar = document.getElementById('quiz-time-container');
const chapterExtra = document.getElementById('chapter-extra-container');

const MODE_CH = 1;
const MODE_Q = 2;
const MODE_A = 3;

function changePDF(newUrl, container) {
  var pdfPages = document.querySelectorAll("#content-frame canvas");

  // Remove the existing pages from the container
  for (var i = 0; i < pdfPages.length; i++) {
    pdfPages[i].remove();
  }

  // Render the new PDF
  renderPDF(newUrl, container);
}

function renderPDF(url, container) {
  console.log('PDF: ' + url);
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc) {
        let totalHeight = 0;
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        pdfDoc.getPage(pageNum).then(function(page) {
         const canvas = document.createElement("canvas");
         const context = canvas.getContext("2d");

         let viewport = page.getViewport({scale: 1});
         let pdfPageHeight = viewport.height;
         let pdfPageWidth = viewport.width;
         let scale = container.clientWidth / pdfPageWidth;
        console.log(pdfPageHeight, pdfPageWidth, scale);

        canvas.height = pdfPageHeight * scale;
        canvas.width = container.clientWidth;
        totalHeight += canvas.height;

        viewport = page.getViewport({ scale: scale });
        page.render({ canvasContext: context, viewport: viewport });

        container.appendChild(canvas);

        if (pageNum === pdfDoc.numPages) {
          container.style.height = totalHeight + "px";
        }
      });
    }
  });
}


function switchContentModes(mode, index = -1) {
    videoContainer.hidden = true;
    videoContainer.style.display = "none";
    nonVideoContent.style.display = "none";
    quizContainer.hidden = true;
    chapterExtra.style.display = 'none';
    quizContainer.style.display = "none";
    quizBottomBar.style.display = "none";
    console.log(mode, index);
    chapterButtons.forEach(b => {
    b.classList.remove("sel");
    });
    quizButtons.forEach(b => {
      b.classList.remove("sel");
    });
    assignmentButtons.forEach(b => {
        b.classList.remove("sel");
    });
    switch (mode) {
        case MODE_CH: // Chapter Mode
            if (chapters[index]['is_streaming'] === 'True') {
                videoContainer.hidden = false;
                videoContainer.style.display = "flex";
                chapterExtra.style.display = 'flex';
            } else {
                nonVideoContent.style.display = "flex";
                chapterExtra.style.display = 'flex';
            }
            break;
        case MODE_Q: // Quiz Mode
            quizContainer.hidden = false;
            quizContainer.style.display = "flex";
            quizBottomBar.style.display = "flex";
            break;
        case MODE_A:
            nonVideoContent.style.display = "flex";
            chapterExtra.style.display = 'flex';
            break;
    }
}


// Chapter Selection
chapterButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    switchContentModes(MODE_CH, index);
    if (chapters[index]['is_streaming'] === 'True') {
        videoElement.src = button.dataset.video;
    } else {
        changePDF(button.dataset.pdfUrl, contentElement);
    }
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
    switchContentModes(MODE_Q, index);

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

const assignmentButtons = document.querySelectorAll('.assignment-view-container');

assignmentButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    switchContentModes(MODE_A, index);
    console.log(button.dataset.pdfUrl);
    changePDF(button.dataset.pdfUrl, contentElement);

    button.classList.add("sel");
    chapterTitle.textContent = assignments[index]['title'];
    console.log(assignments[index]);
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
  current_selection = 0;
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
  sendQuizRequest(current_question + 1, current_selection, 0);
});

var QuestionCount = 0;

function sendQuizRequest(questionNo, prev_selection, submit) {
  var xhr = new XMLHttpRequest();

  var quiz = quizzes[selected_quiz_id]
  var data = '?quiz_id=' + encodeURIComponent(quiz['id']) +
               '&course_id=' + encodeURIComponent(quiz['course_id']) +
               '&question_no=' + encodeURIComponent(questionNo) +
                '&prev_selection=' + encodeURIComponent(prev_selection) +
                '&submit_quiz=' + encodeURIComponent(submit);
  xhr.open('GET', quiz_url + data);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    console.log(xhr.status);
      if (xhr.status === 200) {
            if (questionNo === 0) {
                startTimer(quiz['time']);
            }
            current_question = questionNo
            console.log(submit, questionNo, QuestionCount)
            if (submit > 0 || (QuestionCount === questionNo && QuestionCount > 0) ) {
                stopTimer();
            }
            var response = JSON.parse(xhr.responseText);
            if (Boolean(response.blank)) {
                quizQPage.style.display = 'none';
                quizFinishPage.style.display = 'flex'
                quizTotal.textContent = response.total;
                quizCorrect.textContent = response.answered;
                quizScore.textContent = response.score + ' / ' + response.total_score;
                QuestionCount = response.questions_count;
                renderQuestionProgress();
            } else {
                console.log('Q: ' + response.question.question);
                qQuestion.textContent = 'Q ' + (current_question + 1) + '. ' + response.question.question;
                qOption1.innerHTML = '<span>1</span>' + response.question.options_1;
                qOption2.innerHTML = '<span>2</span>' + response.question.options_2;
                qOption3.innerHTML = '<span>3</span>' + response.question.options_3;
                qOption4.innerHTML = '<span>4</span>' + response.question.options_4;
                QuestionCount = response.questions_count;
                reset_q_page();
                quizStartPage.style.display = 'none';
                quizQPage.style.display = 'flex'
                renderQuestionProgress();
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

let timer;
let countdown;
const timerDisplay = document.getElementById("time-display");
function startTimer(duration) {
  // duration = duration * 60;
  duration = duration - 20;

  let minutes, seconds;

  clearInterval(countdown); // Clear any existing countdown

  countdown = setInterval(function() {
    minutes = parseInt(duration / 60, 10);
    seconds = parseInt(duration % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = minutes + ":" + seconds;

    if (--duration < 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "00:00";
      sendQuizRequest(current_question + 1, current_selection, 1);
      //Submit the Quiz
      alert("Timer Over! Auto Submitted.");
    }
  }, 1000);
}

function stopTimer() {
  console.log("Stop timer");
  clearInterval(countdown);
  timerDisplay.textContent = "00:00";
}

function retakeQuiz() {
    quizFinishPage.style.display = 'none'
    quizStartPage.style.display = 'flex';
    stopTimer();
    sendQuizRequest(0, 0, 0);
}

const questionContainer = document.getElementById("question-container");

function renderQuestionProgress() {
    questionContainer.innerHTML = '';
    for (let i = 1; i <= QuestionCount; i++) {
      var questionDiv = document.createElement("div");
      questionDiv.classList.add("question-box");
      questionDiv.textContent = i;

      if (i <= current_question) {
        questionDiv.classList.add("dark-b");
      } else {
        questionDiv.classList.add("grey-b");
      }

      questionContainer.appendChild(questionDiv);
    }
}

const ratingWidget = document.querySelector('.rating-widget');
const stars = ratingWidget.querySelectorAll('.star');
const ratingIntput = document.getElementById('rating_input');
const ratingForm = document.getElementById('rating_form');

stars.forEach((star, index) => {
  const rating = (course_rating < (index + 1)) ? ((course_rating > index) ? ((course_rating - index) * 100) : '0') : '100';
  const gradientPercentage = rating + '%, ' + rating + '%';
  star.style.backgroundImage = 'linear-gradient(to right, #f7c927 0%, #f7c927 ' + gradientPercentage + ', #888 ' + gradientPercentage + ', #888 100%)';

  star.addEventListener('click', () => {
      ratingForm.submit();
  });
});

ratingWidget.addEventListener('mouseover', (event) => {
  const hoveredStar = event.target;
  const indexH = parseInt(hoveredStar.dataset.index, 10);
  if (isNaN(indexH)) {
      return;
  }
  console.log('Called hover: ' + indexH);
  stars.forEach((star, index) => {
    if (index < indexH) {
      star.dataset.rating = 100;
    } else {
        star.dataset.rating = 0;
    }
    const gradientPercentage = star.dataset.rating + '%, ' + star.dataset.rating + '%';
    star.style.backgroundImage = 'linear-gradient(to right, #f7c927 0%, #f7c927 ' + gradientPercentage + ', #888 ' + gradientPercentage + ', #888 100%)';
  });
  ratingIntput.value = 5 * indexH /5;
});