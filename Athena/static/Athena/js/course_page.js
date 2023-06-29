const openStartDialogBtn = document.getElementById('open-start-dialog');
const openEndDialogBtn = document.getElementById('open-end-dialog');
const dateDialog = document.getElementById('date-dialog');
const currentMonthSpan = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const datesDiv = document.getElementById('dates');
const inputFieldStart = document.getElementById('startDate');
const inputFieldEnd = document.getElementById('endDate');

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
});

document.addEventListener('click', (event) => {
  if (!dateDialog.contains(event.target)) {
    dateDialog.style.display = 'none';
  }
});