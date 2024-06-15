function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme"); // Toggle the dark theme

    // Select the icon inside the theme toggle button
    const themeButtonIcon = document.querySelector(".toggle-theme-btn i");

    // Check if dark theme is active and change icon accordingly
    if (body.classList.contains("dark-theme")) {
        themeButtonIcon.className = "fas fa-sun"; // Change to sun icon for dark mode
    } else {
        themeButtonIcon.className = "fas fa-moon"; // Change back to moon icon for light mode
    }
}