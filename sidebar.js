// Load sidebar content and set active page
console.log('Sidebar.js loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Load sidebar content
    fetch('sidebar.html')
        .then(response => response.text())
        .then(html => {
            console.log('Sidebar HTML loaded:', html);
            sidebar.innerHTML = html;
            console.log('Sidebar innerHTML set, current content:', sidebar.innerHTML);
            
            // Scrollspy for single page sections
            const links = [
                { id: 'nav-about', target: 'about' },
                { id: 'nav-repos', target: 'repos' },
                { id: 'nav-cv', target: 'cv' },
                { id: 'nav-science', target: 'science' },
                { id: 'nav-fun', target: 'fun' }
            ];

            const sectionMap = new Map();
            links.forEach(l => {
                const el = document.getElementById(l.target);
                const linkEl = document.getElementById(l.id);
                if (el && linkEl) sectionMap.set(el, linkEl);
            });

            function setActive(linkEl) {
                sidebar.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                if (linkEl) linkEl.classList.add('active');
            }

            // Initial active based on hash
            if (window.location.hash) {
                const target = window.location.hash.replace('#', '');
                const pair = links.find(l => l.target === target);
                if (pair) setActive(document.getElementById(pair.id));
            } else {
                setActive(document.getElementById('nav-about'));
            }

            // Observe sections
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const linkEl = sectionMap.get(entry.target);
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        setActive(linkEl);
                        history.replaceState(null, '', `#${entry.target.id}`);
                    }
                });
            }, { rootMargin: '0px 0px -20% 0px', threshold: [0.3, 0.5, 0.7] });

            sectionMap.forEach((_, sectionEl) => observer.observe(sectionEl));
            
            // Add click handlers to sidebar links for immediate active state
            links.forEach(link => {
                const linkEl = document.getElementById(link.id);
                if (linkEl) {
                    linkEl.addEventListener('click', function(e) {
                        // Set active immediately on click
                        setActive(linkEl);
                    });
                }
            });
            
            // Expose reinitialize function globally
            window.reinitializeScrollspy = function() {
                // Re-observe all sections in case new content was added
                sectionMap.forEach((_, sectionEl) => {
                    observer.unobserve(sectionEl);
                    observer.observe(sectionEl);
                });
            };
            
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
    
    console.log('Initializing mobile menu:', { mobileMenuToggle, sidebar });
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            console.log('Mobile menu toggle clicked');
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
