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
                console.log(`Looking for section ${l.target}:`, el);
                console.log(`Looking for link ${l.id}:`, linkEl);
                if (el && linkEl) {
                    sectionMap.set(el, linkEl);
                    console.log(`Added to sectionMap: ${l.target} -> ${l.id}`);
                } else {
                    console.log(`Missing: section=${!!el}, link=${!!linkEl}`);
                }
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

            // Scroll-based section detection (robust with scroll-snap)
            const sections = Array.from(sectionMap.keys());
            let ticking = false;

            function updateActiveByScroll() {
                ticking = false;
                if (sections.length === 0) return;
                // Choose the section whose top is closest to viewport top (because of scroll-snap: start)
                const closest = sections.reduce((best, el) => {
                    const top = Math.abs(el.getBoundingClientRect().top);
                    if (!best || top < best.dist) return { el, dist: top };
                    return best;
                }, null);
                if (!closest) return;
                const linkEl = sectionMap.get(closest.el);
                if (linkEl) {
                    setActive(linkEl);
                    history.replaceState(null, '', `#${closest.el.id}`);
                }
            }

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(updateActiveByScroll);
                    ticking = true;
                }
            }, { passive: true });

            window.addEventListener('resize', () => {
                updateActiveByScroll();
            });

            // Initial sync
            updateActiveByScroll();
            
            // Add click handlers to sidebar links for immediate active state and smooth scroll
            links.forEach(link => {
                const linkEl = document.getElementById(link.id);
                if (linkEl) {
                    linkEl.addEventListener('click', function(e) {
                        // Prevent default full reload when using absolute hashes like /#cv
                        if (linkEl.getAttribute('href') && linkEl.getAttribute('href').startsWith('/#')) {
                            e.preventDefault();
                        }
                        const targetEl = document.getElementById(link.target);
                        if (targetEl && typeof targetEl.scrollIntoView === 'function') {
                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        // Set active immediately on click to reflect intent
                        setActive(linkEl);
                        history.replaceState(null, '', `#${link.target}`);
                    });
                }
            });
            
            // Expose reinitialize function globally
            window.reinitializeScrollspy = function() {
                // Rebuild sections list (for dynamically added content)
                updateActiveByScroll();
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
