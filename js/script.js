let currentPage = 1;
        let postsPerPage = 10;

        function sortBlogPosts() {
            const sortOrder = document.getElementById('sortOrder').value;
            const blogContainer = document.getElementById('blogContainer');
            const posts = Array.from(blogContainer.getElementsByClassName('blog-post'));
            
            posts.sort((a, b) => {
                const dateA = new Date(a.querySelector('.date').textContent);
                const dateB = new Date(b.querySelector('.date').textContent);
                
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });
            
            posts.forEach(post => blogContainer.appendChild(post));
            displayPage(1);
        }
        
        function displayPage(page) {
            const blogContainer = document.getElementById('blogContainer');
            const posts = Array.from(blogContainer.getElementsByClassName('blog-post'));
            const totalPages = Math.ceil(posts.length / postsPerPage);

            currentPage = page;
            const start = (currentPage - 1) * postsPerPage;
            const end = start + postsPerPage;

            posts.forEach((post, index) => {
                post.style.display = (index >= start && index < end) ? '' : 'none';
            });

            document.getElementById('prevPage').disabled = currentPage === 1;
            document.getElementById('nextPage').disabled = currentPage === totalPages;

            document.getElementById('pageInfo').textContent = `${currentPage}/${totalPages}`;
        }

        function changePage(direction) {
            displayPage(currentPage + direction);
        }

        function changePostsPerPage() {
            postsPerPage = parseInt(document.getElementById('postsPerPage').value);
            displayPage(1);
        }

        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('sortOrder').value = 'desc';
            sortBlogPosts();
        });

function scrollTrigger(selector, options = {}) {
    let els = document.querySelectorAll(selector);
    els = Array.from(els);
    els.forEach((el) => {
        addObserver(el, options);
    });
}

function addObserver(el, options) {
    if (!("IntersectionObserver" in window)) {
        if (options.cb) {
            options.cb(el);
        } else {
            entry.target.classList.add("active");
        }
        return;
    }
    let observer = new IntersectionObserver((entries, observer) => {
        //this takes a callback function which receives two arguments: the elements list and the observer instance
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (options.cb) {
                    options.cb(el);
                } else {
                    entry.target.classList.add("active");
                }
                observer.unobserve(entry.target);
            }
        });
    }, options);
    observer.observe(el);
}

scrollTrigger(".percentage");

// Gist toggle + lazy-load: default collapsed, load on expand
function initGists() {
    const gistEls = document.querySelectorAll('.gist[data-src]');
    gistEls.forEach((gist) => {
        const btn = gist.querySelector('.gist-toggle');
        const content = gist.querySelector('.gist-content');
        if (!btn || !content) return;

        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                btn.setAttribute('aria-expanded', 'false');
                btn.textContent = 'Show Gist';
                content.style.display = 'none';
            } else {
                btn.setAttribute('aria-expanded', 'true');
                btn.textContent = 'Hide Gist';
                content.style.display = '';
                if (!gist.dataset.loaded) {
                    // Embed the gist inside an iframe so the gist's document.write
                    // targets the iframe document instead of the main document.
                    const iframe = document.createElement('iframe');
                    iframe.className = 'gist-iframe';
                    iframe.style.width = '100%';
                    iframe.style.border = '0';
                    iframe.setAttribute('title', 'Gist');
                    content.appendChild(iframe);
                    try {
                        const idoc = iframe.contentDocument || iframe.contentWindow.document;
                        const isDarkMode = document.body.classList.contains('dark-theme');
                        const iframeHtml = `<!DOCTYPE html><html><head><base target="_parent"><style>body{margin:0;background-color:${isDarkMode ? '#0d1117' : '#fff'};color:${isDarkMode ? '#c9d1d9' : '#24292f'};}.gist-file{background-color:${isDarkMode ? '#0d1117' : '#fff'} !important;border-color:${isDarkMode ? '#21262d' : '#ddd'} !important;}.gist-file .gist-meta{background-color:${isDarkMode ? '#111827' : '#f6f8fa'} !important;color:${isDarkMode ? '#9ca3af' : '#57606a'} !important;}.gist-file .gist-meta a{color:${isDarkMode ? '#8fbcff' : '#0366d6'} !important;}</style></head><body></body></html>`;
                        idoc.open();
                        idoc.write(iframeHtml);
                        idoc.close();
                        const gistScript = idoc.createElement('script');
                        gistScript.src = gist.dataset.src;
                        gistScript.async = true;
                        idoc.body.appendChild(gistScript);
                    } catch (e) {
                        // Fallback: if iframe writing is blocked, append script directly (may still error)
                        const s = document.createElement('script');
                        s.src = gist.dataset.src;
                        s.async = true;
                        content.appendChild(s);
                    }
                    gist.dataset.loaded = 'true';
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initGists);
