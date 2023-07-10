const stars = document.querySelectorAll('.star');

stars.forEach((star, index) => {
  const rating = (course_rating < (index + 1)) ? ((course_rating > index) ? ((course_rating - index) * 100) : '0') : '100';
  const gradientPercentage = rating + '%, ' + rating + '%';
  star.style.backgroundImage = 'linear-gradient(to right, #f7c927 0%, #f7c927 ' + gradientPercentage + ', #888 ' + gradientPercentage + ', #888 100%)';
});

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