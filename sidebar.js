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
            } else if (currentPage === 'repositories.html') {
                activeId = 'nav-repos';
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
            
            // Initialize mobile menu functionality after sidebar is loaded
            initializeMobileMenu();
        })
        .catch(error => {
            console.error('Error loading sidebar:', error);
        });
});

// Mobile menu toggle functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
        
        // Close sidebar when clicking on a link (mobile only)
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 700) {
                    sidebar.classList.remove('show');
                }
            });
        });
        
        // Close sidebar when clicking outside (mobile only)
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 700 && 
                !sidebar.contains(event.target) && 
                !mobileMenuToggle.contains(event.target)) {
                sidebar.classList.remove('show');
            }
        });
    }
} 