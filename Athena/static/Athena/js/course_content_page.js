// Get all the chapter buttons
const chapterButtons = document.querySelectorAll('.chapter-view-container');
const videoElement = document.getElementById('video-box');
const chapterTitle = document.getElementById('chapter_title');
// Add click event listener to each button
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