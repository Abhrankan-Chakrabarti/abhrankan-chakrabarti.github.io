const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");
lightIcon.setAttribute("display", "none");
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-theme"); // Toggle the dark theme

    // Select the icon inside the theme toggle button
    const themeButtonIcon = document.querySelector(".toggle-theme-btn svg");

    // Check if dark theme is active and change icon accordingly
    if (body.classList.contains("dark-theme")) {
        themeButtonIcon.className = "light-icon"; // Change to light icon for dark mode
        lightIcon.setAttribute("display", "block");
        darkIcon.setAttribute("display", "none");
    } else {
        themeButtonIcon.className = "dark-icon"; // Change back to dark icon for light mode
        lightIcon.setAttribute("display", "none");
        darkIcon.setAttribute("display", "block");
    }
}