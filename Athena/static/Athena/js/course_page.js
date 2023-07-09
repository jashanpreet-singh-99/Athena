const openStartDialogBtn = document.getElementById('open-start-dialog');
const openEndDialogBtn = document.getElementById('open-end-dialog');
const dateDialog = document.getElementById('date-dialog');
const currentMonthSpan = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const datesDiv = document.getElementById('dates');
// P1
const inputFieldTitle = document.getElementById('courseTitle');
const inputFieldDesc = document.getElementById('courseDesc');
const inputFieldStart = document.getElementById('startDate');
const inputFieldEnd = document.getElementById('endDate');

// P2
const selectedCategoriesContainer = document.getElementById('selected-categories');
const selectElement = document.getElementById('categories-c');
const inputFieldCat = document.getElementById('categories');
const selectedCategories = new Set();

// P3
const inputFieldType = document.getElementById('courseType');
const inputFieldDiff = document.getElementById('courseDiff');
const inputFieldDay = document.getElementById('courseDay');

// P4
const reviewTitle = document.getElementById('rev-c-title');
const reviewDesc = document.getElementById('rev-c-desc');
const reviewStart = document.getElementById('rev-c-start-date');
const reviewEnd = document.getElementById('rev-c-end-date');
const reviewDay = document.getElementById('rev-c-day');
const reviewType = document.getElementById('rev-c-type');
const reviewDiff = document.getElementById('rev-c-diff');
const reviewCat = document.getElementById('rev-c-cat');

// Form
const courseForm = document.getElementById('form-course-details');

let selectField = inputFieldEnd;

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;

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

openStartDialogBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  dateDialog.style.display = 'block';

  const btnRect = openStartDialogBtn.getBoundingClientRect();
  const btnTop = btnRect.top + window.pageYOffset;
  const btnLeft = btnRect.left + window.pageXOffset;

  dateDialog.style.top = btnTop + 'px';
  dateDialog.style.left = btnLeft + 'px';
  selectField = inputFieldStart;
  updateCalendar();
});

openEndDialogBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  dateDialog.style.display = 'block';

  const btnRect = openEndDialogBtn.getBoundingClientRect();
  const btnTop = btnRect.top + window.pageYOffset;
  const btnLeft = btnRect.left + window.pageXOffset;

  dateDialog.style.top = btnTop + 'px';
  dateDialog.style.left = btnLeft + 'px';
  selectField = inputFieldEnd;
  updateCalendar();
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

//
// Logic for page navigation
//
const pages = document.querySelectorAll('.details-page');
const prevButtons = document.querySelectorAll('.prev-btn');
const nextButtons = document.querySelectorAll('.next-button');
const pageDivs = document.querySelectorAll('.divider')
const pageIcons = document.querySelectorAll('.prog-icon')

let currentIndex = 0;
function showPage(index) {
  pages.forEach((page) => {
    page.classList.remove('active');
  });
  pages[index].classList.add('active');
}

function colorDivider(index, val) {
  if (val) {
    pageDivs[index - 1].classList.add('comp');
  } else {
    pageDivs[index].classList.remove('comp');
  }
}

function changeIcon(index, val) {
  if (val) {
    pageIcons[index].src = 'https://img.icons8.com/4CAF50/pastel-glyph/64/checked--v3.png';
  } else {
    pageIcons[index].src = 'https://img.icons8.com/999999/dotty/80/circled.png';
  }

}

function navigateLeft() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  if (currentIndex >= 0) {
    colorDivider(currentIndex, false)
  }
  changeIcon(currentIndex, false);
  showPage(currentIndex);
}

function navigateRight() {
  currentIndex++;
  if (currentIndex === pages.length) {
    console.log("4th page");
    inputFieldCat.value = [...selectedCategories].join(',');
    courseForm.submit();
  }
  if (currentIndex >= pages.length) {
    currentIndex = pages.length - 1;
  }
  if (currentIndex <= pages.length-1) {
    colorDivider(currentIndex, true)
  }
  changeIcon(currentIndex - 1, true);
  showPage(currentIndex);
  switch (currentIndex) {
    case 1:
      reviewTitle.textContent = inputFieldTitle.value;
      reviewDesc.textContent = inputFieldDesc.value;
      reviewStart.textContent = inputFieldStart.value;
      reviewEnd.textContent = inputFieldEnd.value;
      break;
    case 2:
      // reviewCat.textContent = [...selectedCategories].join(',');
      createCategoryDivs(selectedCategories);
      break;
    case 3:
      const selectedOption = inputFieldDiff.options[inputFieldDiff.selectedIndex];
      reviewDiff.textContent = selectedOption.textContent;

      const selectedOptionT = inputFieldType.options[inputFieldType.selectedIndex];
      reviewType.textContent = selectedOptionT.textContent;

      reviewDay.textContent = inputFieldDay.value;
      break;
  }
}

prevButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    navigateLeft();
  });
});

nextButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    navigateRight();
  });
});

showPage(currentIndex);

function createCategoryDivs(items) {
  // Clear the container
  reviewCat.innerHTML = '';

  // Loop through the items in the Set
  for (const item of items) {
    // Create a new div for the category
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category-item');

    const categoryNameSpan = document.createElement('span');
    categoryNameSpan.textContent = item;
    categoryDiv.appendChild(categoryNameSpan);

    // Add the category div to the container
    reviewCat.appendChild(categoryDiv);
  }
}

document.getElementById('add-button').addEventListener('click', function() {
  const selectedCategory = selectElement.value;
  const categoryName = selectElement.options[selectElement.selectedIndex].text.trim();

  if (!selectedCategory || selectedCategories.has(categoryName)) {
      return;
  }
  // Create a new div for the selected category
  const categoryDiv = document.createElement('div');
  categoryDiv.classList.add('category-item');

    // Add the category name and remove button to the div
  const categoryNameSpan = document.createElement('span');
  categoryNameSpan.textContent = categoryName;
  categoryDiv.appendChild(categoryNameSpan);

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');

  const icon = document.createElement('img');
  icon.width = 20;
  icon.height = 20;
  icon.src = "https://img.icons8.com/070708/ios-filled/50/delete-sign--v1.png"
  removeButton.appendChild(icon);

  categoryDiv.appendChild(removeButton);

    // Add the div to the selected-categories container
  selectedCategoriesContainer.appendChild(categoryDiv);

  // Clear the selected option in the ModelChoiceField
  selectedCategories.add(categoryName);
  selectElement.value = '';

  rearrangeCategories();
});

  // Remove button click event
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-button') || event.target.parentNode.classList.contains('remove-button')) {
      const categoryDiv = event.target.closest('.category-item');
      const categoryName = categoryDiv.querySelector('span').textContent.trim();
      console.log('index : '+categoryName);
      selectedCategories.delete(categoryName);
      console.log(selectedCategories)
      categoryDiv.remove();

      rearrangeCategories();
    }
});

window.addEventListener('resize', function() {
    rearrangeCategories();
});

function rearrangeCategories() {
  const categoryDivs = selectedCategoriesContainer.getElementsByClassName('category-item');
  const containerWidth = selectedCategoriesContainer.clientWidth;
  let totalWidth = 0;
  let currentRowDiv = null;

  for (let i = 0; i < categoryDivs.length; i++) {
    const categoryDiv = categoryDivs[i];
    categoryDiv.style.width = '';
    totalWidth += categoryDiv.offsetWidth;
    // console.log('totalWidth : '+ totalWidth);
    // console.log('containerWidth : '+ containerWidth);
      if (totalWidth <= containerWidth) {
        if (currentRowDiv) {
          currentRowDiv.appendChild(categoryDiv);
        } else {
          currentRowDiv = document.createElement('div');
          currentRowDiv.classList.add('category-row');
          currentRowDiv.appendChild(categoryDiv);
          selectedCategoriesContainer.appendChild(currentRowDiv);
        }
      } else {
        totalWidth = categoryDiv.offsetWidth;
        currentRowDiv = document.createElement('div');
        currentRowDiv.classList.add('category-row');
        currentRowDiv.appendChild(categoryDiv);
        selectedCategoriesContainer.appendChild(currentRowDiv);
      }
    }
}

rearrangeCategories();

const daysContainer = document.querySelector('.days-container');
const selectedDayInput = document.getElementById('courseDay');
const days = daysContainer.getElementsByClassName('day');

// Add click event listeners to each day div
for (let day of days) {
  day.addEventListener('click', function() {
    // Reset the background color of all days
    for (let day of days) {
      day.classList.remove('selected');
    }

    // Set the background color of the clicked day
    this.classList.add('selected');

    // Update the selected day value in the input label
    selectedDayInput.value = this.getAttribute('data-day');
  });
}

function openImageBrowser(event) {
    event.preventDefault();
    const inputImgElement = document.getElementById('image-input');
    console.log("Open Image browser");
    inputImgElement.click();
}

document.getElementById('image-input').addEventListener('change', handleImageSelection);

function handleImageSelection(event) {
  const file = event.target.files[0];
  const course_banner_img = document.getElementById('course-banner-img')
  const course_banner_img_f = document.getElementById('course-banner-img-f')
  if (file) {
    // Perform operations with the selected file (e.g., display preview, upload, etc.)
    console.log('Selected image file:', file);
    const reader = new FileReader();
    reader.onload = function() {
      course_banner_img.src = reader.result;
      course_banner_img_f.src = reader.result;
    }
    reader.readAsDataURL(file);
  }
}