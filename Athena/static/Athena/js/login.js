const signupBtn = document.getElementById('signup-btn');

signupBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    window.location.href = signup_url;
});