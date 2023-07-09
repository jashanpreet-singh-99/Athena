let currentCourseIndex = 0;
const bannerContainer = document.getElementById('banner-container');
const courseImage = document.getElementById('course-image');
const courseImageOverlay = document.getElementById('course-image-overlay');
const courseTitle = document.getElementById('course-title');
const courseDescription = document.getElementById('course-description');
const courseAuthor = document.getElementById('course-author');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const circleContainer = document.getElementById('circle-container');


bannerContainer.addEventListener('click', () => {
  console.log(course_link);
  window.location.href = course_link.slice(0, -1) + courses[currentCourseIndex]['course_id'];
});

function matchBannerOverlaySize() {
  courseImageOverlay.style.width = courseImage.offsetWidth + 5 + 'px';
}

function showCourse(index) {
  const course = courses[index];
  courseImage.src = course['course_banner'];
  courseTitle.textContent = course['course_title'];
  courseDescription.textContent = course['course_desc'];
  courseAuthor.textContent = 'By - ' + course['course_author'];
}

function updateNavigation(index) {
  const circles = Array.from(circleContainer.children);
  circles.forEach((circle, i) => {
    circle.classList.toggle('active', i === index);
  });
}

prevButton.addEventListener('click', () => {
  currentCourseIndex = (currentCourseIndex - 1 + courses.length) % courses.length;
  showCourse(currentCourseIndex);
  updateNavigation(currentCourseIndex);
  clearInterval(interval);
  restartAutomaticScrolling();
  matchBannerOverlaySize();
});

nextButton.addEventListener('click', () => {
  currentCourseIndex = (currentCourseIndex + 1) % courses.length;
  showCourse(currentCourseIndex);
  updateNavigation(currentCourseIndex);
  clearInterval(interval);
  restartAutomaticScrolling();
  matchBannerOverlaySize();
});

// Create navigation circles
courses.forEach((_, i) => {
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.addEventListener('click', () => {
    showCourse(i);
    currentCourseIndex = i;
    updateNavigation(i);
  });
  circleContainer.appendChild(circle);
});

// Show initial course
showCourse(currentCourseIndex);
updateNavigation(currentCourseIndex);

// Automatic scrolling
let interval = startAutomaticScrolling();

function startAutomaticScrolling() {
  return setInterval(() => {
    nextButton.click();
  }, 5000);
}

function restartAutomaticScrolling() {
  clearInterval(interval);
  interval = startAutomaticScrolling();
}

// #######
// On Load
// #######
courseImage.onload = function () {
  matchBannerOverlaySize();
};
document.addEventListener('DOMContentLoaded', function() {
  matchBannerOverlaySize();
});

window.addEventListener('resize', matchBannerOverlaySize);