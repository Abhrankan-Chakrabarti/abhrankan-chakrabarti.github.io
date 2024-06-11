function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme'); // Toggle the dark theme
    
    // Select the icon inside the theme toggle button
    const themeButtonIcon = document.querySelector('.toggle-theme-btn i');
    
    // Check if dark theme is active and change icon accordingly
    if (body.classList.contains('dark-theme')) {
        themeButtonIcon.className = 'fas fa-sun'; // Change to sun icon for dark mode
    } else {
        themeButtonIcon.className = 'fas fa-moon'; // Change back to moon icon for light mode
    }
}

function scrollTrigger(selector, options = {}){
    let els = document.querySelectorAll(selector)
    els = Array.from(els)
    els.forEach(el => {
        addObserver(el, options)
    })
}

function addObserver(el, options){
    if(!('IntersectionObserver' in window)){
        if(options.cb){
            options.cb(el)
        }else{
            entry.target.classList.add('active')
        }
        return
    }
    let observer = new IntersectionObserver((entries, observer) => { //this takes a callback function which receives two arguments: the elements list and the observer instance
        entries.forEach(entry => {
            if(entry.isIntersecting){
                if(options.cb){
                    options.cb(el)
                }else{
                    entry.target.classList.add('active')
                }
                observer.unobserve(entry.target)
            }
        })
    }, options)
    observer.observe(el)
}

scrollTrigger('.percentage')