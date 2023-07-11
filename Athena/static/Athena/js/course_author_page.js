function openTab(evt, tabName) {
  // Get all tab content elements and hide them
  var tabContents = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("show");
  }

  // Get all tab buttons and remove the active class
  var tabs = document.getElementsByClassName("tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  // Show the selected tab content and mark the button as active
  document.getElementById(tabName).classList.add("show");
  evt.currentTarget.classList.add("active");
}

// Show the default tab on page load
document.getElementById("tab1").classList.add("show");
document.getElementsByClassName("tab")[0].classList.add("active");

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