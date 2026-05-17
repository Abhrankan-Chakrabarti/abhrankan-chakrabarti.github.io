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
                    const s = document.createElement('script');
                    s.src = gist.dataset.src;
                    s.async = true;
                    content.appendChild(s);
                    gist.dataset.loaded = 'true';
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initGists);
