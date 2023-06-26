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

    // const menuItems = menu.querySelectorAll('li');
    // menuItems.forEach(function(item) {
    //     item.addEventListener('click', function(event) {
    //       event.stopPropagation();
    //       const menuItemText = item.textContent.trim();
    //       // Perform actions based on the clicked menu item
    //       if (menuItemText === 'Settings') {
    //         // Perform action for 'Settings'
    //         console.log('Settings clicked');
    //       } else if (menuItemText === 'Logout') {
    //         // Perform action for 'Logout'
    //         console.log('Logout clicked');
    //         var url = "{% url 'logout_page' %}"
    //         document.location.href = url
    //       }
    //       // Close the menu
    //       menu.style.display = 'none';
    //     });
    // });
});