// Load sidebar content and set active page
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Load sidebar content
    fetch('sidebar.html')
        .then(response => response.text())
        .then(html => {
            sidebar.innerHTML = html;
            
            // Set active page based on current URL
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            let activeId = '';
            
            if (currentPage === '' || currentPage === 'index.html') {
                activeId = 'nav-about';
            } else if (currentPage === 'science_writing.html') {
                activeId = 'nav-science';
            } else if (currentPage === 'projects.html') {
                activeId = 'nav-projects';
            } else if (currentPage === 'funstuff.html') {
                activeId = 'nav-fun';
            }
            
            // Add active class to current page
            if (activeId) {
                const activeLink = document.getElementById(activeId);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        })
        .catch(error => {
            console.error('Error loading sidebar:', error);
        });
}); 