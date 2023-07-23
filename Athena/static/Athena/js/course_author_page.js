const COOKIES_author_tab_number = 'author-tab-number';
const COOKIES_author_tab_name = 'author-tab-name';
const COOKIES_chapter_expanded = 'author_chapter_expanded';
const COOKIES_quiz_expanded = 'author_quiz_expanded';
const COOKIES_assignment_expanded = 'author_assignment_expanded';
const COOKIES_exam_expanded = 'author_exam_expanded';

const COOKIES_auth_containers = [COOKIES_chapter_expanded, COOKIES_quiz_expanded, COOKIES_assignment_expanded, COOKIES_exam_expanded];

const basePageContainer = document.getElementById('page-container');
const chapterExpandBtn = document.getElementById('chapter-expand-btn');
const quizExpandBtn = document.getElementById('quiz-expand-btn');
const assignmentExpandBtn = document.getElementById('assignment-expand-btn');
const examExpandBtn = document.getElementById('exam-expand-btn');

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function applyCookies() {
    // TAB Cookies
    const selectedTab = getCookie(COOKIES_author_tab_name);
    const selectedBtn = getCookie(COOKIES_author_tab_number);
    if (selectedTab != null) {
        document.getElementsByClassName("tab")[selectedBtn].classList.add("active");
        document.getElementById(selectedTab).classList.add("show");
    } else {
        document.getElementsByClassName("tab")[0].classList.add("active");
        document.getElementById('tab1').classList.add("show");
    }

    // Content Container Cookies
    const chapterExp = getCookie(COOKIES_chapter_expanded);
    const quizExp = getCookie(COOKIES_quiz_expanded);
    const assignmentExp = getCookie(COOKIES_assignment_expanded);
    const examExp = getCookie(COOKIES_exam_expanded);

    if (chapterExp != null && chapterExp === 'expanded') {
        chapterExpandBtn.click();
    }
    if (quizExp != null && quizExp === 'expanded') {
        quizExpandBtn.click();
    }
    if (assignmentExp != null && assignmentExp === 'expanded') {
        assignmentExpandBtn.click();
    }
    if (examExp != null && examExp === 'expanded') {
        examExpandBtn.click();
    }

    // Scroll page to last known
    console.log('Page Scroll request:', page_scroll_y);
    basePageContainer.scrollTop = parseInt(page_scroll_y);
    updateGradesStudents();
}

window.addEventListener("load", applyCookies);

/**
 *
 *  COOKIES STUFF ABOVE
 *
 */

function openTab(evt, tabName, index) {
  let i;
// Get all tab content elements and hide them
    const tabContents = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("show");
  }

  // Get all tab buttons and remove the active class
    const tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  // Show the selected tab content and mark the button as active
  document.getElementById(tabName).classList.add("show");
  evt.currentTarget.classList.add("active");
}

function createButtons() {
  const catContainer = document.getElementById("cat-container");
  const containerWidth = catContainer.clientWidth;
  const catArray = course_categories.split(",");

  let totalWidth = 0;
  let rowDiv;
  rowDiv = document.createElement("div");
  rowDiv.classList.add("cat-row");
  catContainer.appendChild(rowDiv);

  for (let i = 0; i < catArray.length; i++) {

    const button = document.createElement("button");
    button.classList.add('cat')
    button.textContent = catArray[i];

    totalWidth += button.offsetWidth;
    if (totalWidth >= containerWidth) {
      rowDiv = document.createElement("div");
      rowDiv.classList.add("cat-row");
      catContainer.appendChild(rowDiv);
    }
    rowDiv.appendChild(button);
  }
}

// Call the function to create the buttons
createButtons();

const expandButtons = document.querySelectorAll('.content-p-container .expand-button');
const contentContainers = document.querySelectorAll('.content-p-container .content-container');

expandButtons.forEach((expandButton, index) => {
    contentContainers[index].style.display = 'none';
    expandButton.textContent = 'Expand';
    expandButton.addEventListener('click', function() {
      const contentContainer = contentContainers[index];
      if (contentContainer.style.display === 'none') {
        contentContainer.style.display = 'block';
        expandButton.textContent = 'Close';
        setCookie(COOKIES_auth_containers[index], 'expanded')
      } else {
        contentContainer.style.display = 'none';
        expandButton.textContent = 'Expand';
        setCookie(COOKIES_auth_containers[index], 'closed')
      }
    });
});

const visibleBtn = document.getElementById('visible-button');
const hiddenBtn = document.getElementById('hidden-button');
const visibilityCheckBox = document.getElementById('chapter-visibility');

visibleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    visibleBtn.classList.add("sel");
    hiddenBtn.classList.remove("sel");
    visibilityCheckBox.checked = true;
});

hiddenBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    hiddenBtn.classList.add("sel");
    visibleBtn.classList.remove("sel");
    visibilityCheckBox.checked = false;
});


const streamBtn = document.getElementById('stream-button');
const noStreamBtn = document.getElementById('no-stream-button');
const streamCheckBox = document.getElementById('is_streaming_check');
const streamFileDiv = document.getElementById('stream_video_file_div');
const nonStreamFileDiv = document.getElementById('no_stream_video_file_div');
streamFileDiv.hidden = true;

streamBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    streamBtn.classList.add("sel");
    noStreamBtn.classList.remove("sel");
    streamCheckBox.checked = true;
    streamFileDiv.hidden = false;
    nonStreamFileDiv.hidden = true;
});

noStreamBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    noStreamBtn.classList.add("sel");
    streamBtn.classList.remove("sel");
    streamCheckBox.checked = false;
    streamFileDiv.hidden = true;
    nonStreamFileDiv.hidden = false;
});

const qVisibleBtn = document.getElementById('q-visible-button');
const qHiddenBtn = document.getElementById('q-hidden-button');
const qVisibilityCheckBox = document.getElementById('quiz-visibility');

qVisibleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    qVisibleBtn.classList.add("sel");
    qHiddenBtn.classList.remove("sel");
    qVisibilityCheckBox.checked = true;
});

qHiddenBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    qHiddenBtn.classList.add("sel");
    qVisibleBtn.classList.remove("sel");
    qVisibilityCheckBox.checked = false;
});

const negMBtn = document.getElementById('n-allowed-button');
const normalMBtn = document.getElementById('n-not-allowed-button');
const nMarkingBox = document.getElementById('quiz-negative-marking');
const nGradeValue = document.getElementById('negative_grade');
negMBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    negMBtn.classList.add("sel");
    normalMBtn.classList.remove("sel");
    nMarkingBox.checked = true;
    nGradeValue.hidden = false;
});

normalMBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    normalMBtn.classList.add("sel");
    negMBtn.classList.remove("sel");
    nMarkingBox.checked = false;
    nGradeValue.hidden = true;
});

const chapterContainers = document.querySelectorAll('.chapter-v-container');
const visForm = document.getElementById('vis-form');
const dummyFormVis = document.getElementById('visibility-f-input');
const dummyFormID = document.getElementById('chapter_id-f');
const dummyFormMode = document.getElementById('mode-f-input');
const dummyFormScroll = document.getElementById('scroll-f-input');
// Loop through each chapter container and add event listeners to the buttons
chapterContainers.forEach((container, index) => {
  const visibleButton = container.querySelector('#ch-visible-button');
  const hiddenButton = container.querySelector('#ch-hidden-button');
  const removeBtn = container.querySelector('#ch-delete-btn');

  if (chapters[index]['visibility'] === 'True') {
      visibleButton.classList.add('sel');
      hiddenButton.classList.remove('sel');
  } else {
      hiddenButton.classList.add('sel');
      visibleButton.classList.remove('sel');
  }
  visibleButton.addEventListener('click', () => {
    // Add the "sel" class to the visible button
    visibleButton.classList.add('sel');
    // Remove the "sel" class from the hidden button
    hiddenButton.classList.remove('sel');
    console.log('Vis: ch-' + index);
    visForm.action = change_vis_url;
    dummyFormVis.value = 'True';
    dummyFormID.value = chapters[index]['id'];
    dummyFormMode.value = "Chapter";
    dummyFormScroll.value = basePageContainer.scrollTop;
    console.log('Page Scroll:' + dummyFormScroll.value);
    visForm.submit();
  });

  hiddenButton.addEventListener('click', () => {
    // Add the "sel" class to the hidden button
    hiddenButton.classList.add('sel');
    // Remove the "sel" class from the visible button
    visibleButton.classList.remove('sel');
    visForm.action = change_vis_url;
    console.log('Hid: ch-' + index);
    dummyFormVis.value = 'False';
    dummyFormID.value = chapters[index]['id'];
    dummyFormMode.value = "Chapter";
    dummyFormScroll.value = basePageContainer.scrollTop;
    console.log('Page Scroll:' + dummyFormScroll.value);
    visForm.submit();
  });

  removeBtn.addEventListener('click', () => {
    visForm.action = delete_url;
    dummyFormID.value = chapters[index]['id'];
    dummyFormMode.value = "Chapter";
    dummyFormScroll.value = basePageContainer.scrollTop;
    console.log('Page Scroll:' + dummyFormScroll.value);
    visForm.submit();
  });
});

const quizContainers = document.querySelectorAll('.quiz-v-container');
quizContainers.forEach((container, index) => {
    console.log('Quiz container');
  const visibleButton = container.querySelector('#qq-visible-button');
  const hiddenButton = container.querySelector('#qq-hidden-button');
  const removeBtn = container.querySelector('#q-delete-btn');

  if (quizzes.length > index && quizzes[index]['visibility'] === 'True') {
      visibleButton.classList.add('sel');
      hiddenButton.classList.remove('sel');
  } else {
      hiddenButton.classList.add('sel');
      visibleButton.classList.remove('sel');
  }
  visibleButton.addEventListener('click', () => {
    visibleButton.classList.add('sel');
    hiddenButton.classList.remove('sel');
    visForm.action = change_vis_url;
    console.log('Vis: q-' + index);
    dummyFormVis.value = 'True';
    dummyFormID.value = quizzes[index]['id'];
    dummyFormMode.value = "Quiz";
    dummyFormScroll.value = basePageContainer.scrollTop;
    console.log('Page Scroll:' + dummyFormScroll.value);
    visForm.submit();
  });

  hiddenButton.addEventListener('click', () => {
    hiddenButton.classList.add('sel');
    visibleButton.classList.remove('sel');
    visForm.action = change_vis_url;
    console.log('Hid: q-' + index);
    dummyFormVis.value = 'False';
    dummyFormID.value = quizzes[index]['id'];
    dummyFormMode.value = "Quiz";
    dummyFormScroll.value = basePageContainer.scrollTop;
    console.log('Page Scroll:' + dummyFormScroll.value);
    visForm.submit();
  });

  removeBtn.addEventListener('click', () => {
    visForm.action = delete_url;
    dummyFormID.value = quizzes[index]['id'];
    dummyFormMode.value = "Quiz";
    dummyFormScroll.value = basePageContainer.scrollTop;
    console.log('Page Scroll:' + dummyFormScroll.value);
    visForm.submit();
  });
});

//
// Assignment Stuff
//
const aVisibleBtn = document.getElementById('a-visible-button');
const aHiddenBtn = document.getElementById('a-hidden-button');
const aVisibilityCheckBox = document.getElementById('ass-visibility');

aVisibleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    aVisibleBtn.classList.add("sel");
    aHiddenBtn.classList.remove("sel");
    aVisibilityCheckBox.checked = true;
});

aHiddenBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    aHiddenBtn.classList.add("sel");
    aVisibleBtn.classList.remove("sel");
    aVisibilityCheckBox.checked = false;
});

const pCheckBtn = document.getElementById('p-check-button');
const noPCheckBtn = document.getElementById('no-p-check-button');
const pCheckCheckBox = document.getElementById('plagiarism_check');

pCheckBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    pCheckBtn.classList.add("sel");
    noPCheckBtn.classList.remove("sel");
    pCheckCheckBox.checked = true;
});

noPCheckBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    noPCheckBtn.classList.add("sel");
    pCheckBtn.classList.remove("sel");
    pCheckCheckBox.checked = false;
});

//
// Date Dialog
//
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;
const openStartDialogBtn = document.getElementById('open-deadline-dialog');
const openExamDialogBtn = document.getElementById('open-exam-dialog');
const dateDialog = document.getElementById('date-dialog');
const currentMonthSpan = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const datesDiv = document.getElementById('dates');
const deadlineInput = document.getElementById('deadline-input');
const examInput = document.getElementById('exam_date-input');

let selectField = deadlineInput;

function updateCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const numDays = lastDay.getDate();

  currentMonthSpan.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${currentYear}`;

  datesDiv.innerHTML = '';

  for (let i = 1; i <= numDays; i++) {
    const dateBtn = document.createElement('button');
    dateBtn.textContent = i;
    dateBtn.addEventListener('click', () => {
      console.log(`Selected date: ${i}/${currentMonth + 1}/${currentYear}`);
      selectDate(dateBtn);
      dateDialog.style.display = 'none';
      // Additional logic to set the date
    });
    datesDiv.appendChild(dateBtn);
  }
}

function selectDate(dateBtn) {
  if (selectedDate) {
    selectedDate.classList.remove('selected');
  }

  dateBtn.classList.add('selected');
  selectedDate = dateBtn;

  selectField.value = `${currentMonth + 1}/${dateBtn.textContent}/${currentYear}`;
}

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
});

function openDateWork(btn, event, input) {
  event.stopPropagation();
  event.preventDefault();
  updateCalendar();
  dateDialog.style.display = 'block';

  const btnRect = btn.getBoundingClientRect();
  const btnTop = btnRect.top + window.pageYOffset - 50;
  const btnLeft = btnRect.left + window.pageXOffset - 50;

  dateDialog.style.top = btnTop + 'px';
  dateDialog.style.left = btnLeft + 'px';
  selectField = input;
  updateCalendar();
}

openStartDialogBtn.addEventListener('click', (event) => {
  openDateWork( openStartDialogBtn, event, deadlineInput);
});

openExamDialogBtn.addEventListener('click', (event) => {
    openDateWork( openExamDialogBtn, event, examInput);
});

dateDialog.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
});

document.addEventListener('click', (event) => {
  if (!dateDialog.contains(event.target)) {
    dateDialog.style.display = 'none';
  }
});

const assContainers = document.querySelectorAll('.ass-v-container');
assContainers.forEach((container, index) => {
  const visibleButton = container.querySelector('#aa-visible-button');
  const hiddenButton = container.querySelector('#aa-hidden-button');
  const removeBtn = container.querySelector('#ass-delete-btn');
  if (assignments[index]['visibility'] === 'True') {
      visibleButton.classList.add('sel');
      hiddenButton.classList.remove('sel');
  } else {
      hiddenButton.classList.add('sel');
      visibleButton.classList.remove('sel');
  }
  visibleButton.addEventListener('click', () => {
    visibleButton.classList.add('sel');
    hiddenButton.classList.remove('sel');
    visForm.action = change_vis_url;
    console.log('Vis: q-' + index);
    dummyFormVis.value = 'True';
    dummyFormID.value = assignments[index]['id'];
    dummyFormMode.value = "Assignment";
    dummyFormScroll.value = basePageContainer.scrollTop;
    console.log('Page Scroll:' + dummyFormScroll.value);
    visForm.submit();
  });

  hiddenButton.addEventListener('click', () => {
    hiddenButton.classList.add('sel');
    visibleButton.classList.remove('sel');
    visForm.action = change_vis_url;
    console.log('Hid: q-' + index);
    dummyFormVis.value = 'False';
    dummyFormID.value = assignments[index]['id'];
    dummyFormMode.value = "Assignment";
    dummyFormScroll.value = basePageContainer.scrollTop;
    console.log('Page Scroll:' + dummyFormScroll.value);
    visForm.submit();
  });

  removeBtn.addEventListener('click', () => {
    visForm.action = delete_url;
    dummyFormID.value = assignments[index]['id'];
    dummyFormMode.value = "Assignment";
    dummyFormScroll.value = basePageContainer.scrollTop;
    console.log('Page Scroll:' + dummyFormScroll.value);
    visForm.submit();
  });
});


const examContainers = document.querySelectorAll('.exam-v-container');
examContainers.forEach((container, index) => {
  const removeBtn = container.querySelector('#ex-delete-btn');
  removeBtn.addEventListener('click', () => {
    visForm.action = delete_url;
    dummyFormID.value = exams[index]['id'];
    dummyFormMode.value = "Exam";
    dummyFormScroll.value = basePageContainer.scrollTop;
    console.log('Page Scroll:' + dummyFormScroll.value);
    visForm.submit();
  });
});

const examCatButtons = document.querySelectorAll('.exam-cat-btn');
const examGetIDInput = document.getElementById('exam_get_id_input');
const dummyExamGetFrom = document.getElementById('dummy-exam-grade-form');
function toggleButtonClass(clickedButton) {
    examCatButtons.forEach((button) => {
        if (button === clickedButton) {
            button.classList.remove('light');
            examGetIDInput.value = button.dataset.examId
        } else {
            button.classList.add('light');
        }
    });
}
examCatButtons.forEach((button) => {
    button.addEventListener('click', () => {
        toggleButtonClass(button);
        dummyExamGetFrom.submit();
    });
});

const gradeField = document.querySelector('#scored_exam_grade_input');
const editSaveButton = document.getElementById('editSaveButton');
const gradeForm = document.getElementById('updateGradeForm');

editSaveButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (editSaveButton.textContent === 'Edit') {
        gradeField.readOnly = false;
        editSaveButton.textContent = 'Save';
    } else if (editSaveButton.textContent === 'Save') {
        gradeForm.submit();
    }
});

function updateGradesStudents() {
    const gradeField = document.querySelectorAll('.gradeField');
    scored_grades_list.forEach((score, index) => {
        if (index < gradeField.length) {
            gradeField[index].value = score;
        }
    });
}