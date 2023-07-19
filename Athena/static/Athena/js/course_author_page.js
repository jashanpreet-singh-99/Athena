const COOKIES_author_tab_number = 'author-tab-number';
const COOKIES_author_tab_name = 'author-tab-name';

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
  setCookie(COOKIES_author_tab_number, index, 7);
  setCookie(COOKIES_author_tab_name, tabName, 7);
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
      } else {
        contentContainer.style.display = 'none';
        expandButton.textContent = 'Expand';
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
streamFileDiv.hidden = true;

streamBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    streamBtn.classList.add("sel");
    noStreamBtn.classList.remove("sel");
    streamCheckBox.checked = true;
    streamFileDiv.hidden = false;
});

noStreamBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    noStreamBtn.classList.add("sel");
    streamBtn.classList.remove("sel");
    streamCheckBox.checked = false;
    streamFileDiv.hidden = true;
});

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
    const selectedTab = getCookie(COOKIES_author_tab_name);
    const selectedBtn = getCookie(COOKIES_author_tab_number);
    if (selectedTab != null) {
        document.getElementsByClassName("tab")[selectedBtn].classList.add("active");
        document.getElementById(selectedTab).classList.add("show");
    } else {
        document.getElementsByClassName("tab")[0].classList.add("active");
        document.getElementById('tab1').classList.add("show");
    }
}

window.addEventListener("load", applyCookies);


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
const nGradeValue = document.getElementById('negative_grade')
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
    nGradeValue.hidden = true
});

