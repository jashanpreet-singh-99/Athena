console.log("Nav Script Loaded.");
document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.getElementById('user_profile_btn');
    const menu = document.getElementById('menu');

    profileContainer.addEventListener('click', function(event) {
      event.stopPropagation();
      const buttonRect = profileContainer.getBoundingClientRect();
        menu.style.display = 'block';
        menu.style.top = buttonRect.bottom + 'px';
        menu.style.left = (buttonRect.left - 80) + 'px';
    });

    document.addEventListener('click', function() {
      menu.style.display = 'none';
    });

    function handleKeyPress(event) {
        event = event || window.event;
        const keyCode = event.keyCode || event.which;

        if (keyCode === 13) {
            event.preventDefault();
            document.getElementById("search_form").submit();
        }
    }
});

