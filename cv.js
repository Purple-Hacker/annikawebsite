// Utility function to safely escape HTML
function escapeHtml(text) {
    if (typeof text !== 'string') {
        return String(text);
    }
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Utility function to safely render HTML content (for intentional HTML like links)
function renderHtml(text) {
    if (typeof text !== 'string') {
        return String(text);
    }
    
    // If the text doesn't contain any HTML tags, just escape it normally
    if (!text.includes('<') || !text.includes('>')) {
        return escapeHtml(text);
    }
    
    // Only allow safe HTML tags: a, b, i, em, strong, br
    const safeHtml = text.replace(/<(\/?)(a|b|i|em|strong|br)([^>]*)>/gi, (match, slash, tag, attrs) => {
        if (tag.toLowerCase() === 'a') {
            // For closing tags, always allow them
            if (slash === '/') {
                return match;
            }
            // For opening tags, check href
            const hrefMatch = attrs.match(/href\s*=\s*["']([^"']+)["']/i);
            if (hrefMatch && (hrefMatch[1].startsWith('http://') || hrefMatch[1].startsWith('https://'))) {
                return match; // Allow the link
            }
            return escapeHtml(match); // Escape unsafe links
        }
        return match; // Allow other safe tags
    });
    return safeHtml;
}

// CV data structure
const CV_DATA = [
    {
        title: "Education",
        type: "time_table",
        contents: [
            {
                title: "PhD student",
                institution: "ETH Zurich",
                year: "Oct 2025 - present",
                description: [
                    "Supervised by Professor Paul Tackley and Professor Caroline Dorn"
                ]
            },
            {
                title: "MPhil in Planetary Science and Life in the Universe",
                institution: "Trinity Hall, University of Cambridge",
                year: "Oct 2024 - July 2025",
                description: [
                    "Mark: Distinction (highest mark possible); therefore elected a Bateman Scholar",
                    "Thesis: Simulating LIFE and HWO's future detections. Supervised by Dr. Bonsor and Professor Shorttle",
                    "Received an overall award for Excellence for the thesis.",
                    "Modules including Planetary System Dynamics (part of Math Part III)"
                ]
            },
            {
                title: "Bachelor of Arts double major in Physics and Astronomy",
                institution: "Yale University",
                year: "Aug 2017 - Dec 2021",
                description: [
                    "GPA: 3.6/4.0 (UK 2:1 equivalent); final two years 3.8/4.0",
                    "Undergraduate Thesis Title: Correlating mapped nuclear dust with AGN obscuration. With Professor Urry",
                    "Research semester in Fall 2020 with Professor Meg Urry, studying dust around supermassive black holes"
                ]
            },
            {
                title: "Physics of Life Summer Program",
                institution: "Princeton University",
                year: "June 2020",
                description: []
            }
        ]
    },
    {
        title: "Work & Research Experience",
        type: "time_table",
        contents: [
            {
                title: "Simulation Engineer",
                institution: "Starfish Space",
                year: "Seattle, Washington, Aug 2022 – June 2024",
                description: [
                    "Architected and wrote a pipeline to process and clean on-orbit data for ground analysis. Used this tool to determine physics simulation accuracy; found the simulation was already >95% accurate.",
                    "Upgraded and enhanced simulated images to more effectively train the navigation convolutional neural network (CNN). Designed and led hardware camera testing to add noise to synthetic Blender images.",
                    "Modeled low Earth orbit physics in a Basilisk physics simulation to solve for drag. Improved dynamics simulation model performance by 30%, by rewriting slow algorithms, by tailoring cloud tools, and changing build processes. Dynamics simulation is Python wrapping C++ code; contributed in both languages. Also improved simulation UI."
                ]
            },
            {
                title: "Research Assistant",
                institution: "Urry Lab, Yale University",
                year: "Sep 2020 – Dec 2021",
                description: [
                    "Mapped galaxy dust distributions of 109 galaxies with active galactic nuclei (AGN) to resolve whether galactic dust obscured AGN X-ray radiation. Wrote an algorithm that combined infrared and optical Hubble images to illuminate the galactic dust; now a GitHub package.",
                    "Presented at a senior thesis Mellon Forum; funded by the Richter Memorial Fund."
                ]
            },
            {
                title: "Research Assistant",
                institution: "Newburgh Lab, Yale University",
                year: "Aug 2019 – Aug 2020",
                description: [
                    "Generated channel telescope frequency versus intensity graphs of well-known bright stars on the Canadian Hydrogen Intensity Mapping Experiment (CHIME) to find telescope accuracy. Found ~5 frequency channels that were over- and under-measuring intensity; results calibrated telescope.",
                    "Research done with Cedar supercomputer; funded by the Richter Memorial Fund."
                ]
            },
            {
                title: "Museum Assistant in Paleobotany",
                institution: "Peabody Museum, Yale University",
                year: "Aug 2018 – Dec 2018",
                description: []
            }
        ]
    },
    {
        title: "Papers & Posters",
        type: "list",
        contents: [
            "<em>Revisiting TOI-4438 and TOI-442 planetary systems with new observations from SPIRou and TESS</em>, in prep.<br>J. Bell, G. Hébrard, E. Martioli, R. Díaz, L. de Almeida, R. Doyon, D. de Oliveira, A. L'Heureux, É. Artigau, L. Arnold, I. Boisse, X. Bonfils, A. Carmona, N. J. Cook, X. Delfosse, J.-F. Donati, <strong>A. Salmi</strong>, M. Valatsou",
            "Conference poster: <em>Assessing the habitability and potential detectability of life on planets around M dwarfs</em>, Cambridge Life in the Universe Science Day (2025)<br>V. Ellmies, I. Kisvárdai, M. Kreuziger, A. Kumar, <strong>A. Salmi</strong> (equal contributions)"
        ]
    },
    {
        title: "Honors & Awards",
        type: "list",
        contents: [
            "Planetary Sciences \"Thesis Excellence Award\" at Cambridge (2025)",
            "Bateman Scholarship Fund (2024-2025)",
            "Mellon Forum fund (2021)",
            "Paul K. Richter and Evalyn E. Cook Richter Memorial Fund (2020, 2021)",
            "National Science Foundation funding to go to Antarctica (2016)"
        ]
    },
    {
        title: "Technical Skills",
        type: "list",
        contents: [
            "<strong>Skills:</strong> Cleaning and analyzing astronomical images, generating synthetic images, scientific and big data cloud computing, MCMC simulations, satellite orbit determination filtering algorithms, scientific writing",
            "<strong>Languages:</strong> Python (6 years), Bash/Unix scripting (4 years), C++ (3 years), MATLAB (2 years), R (2 years), YAML (2 years)",
            "<strong>Software tools:</strong> <em>Astronomy:</em> DS9, FITS, <em>Synthetic images:</em> Blender, cuda, <em>Aerospace:</em> Freeflyer, <em>Developer:</em> Linux, Git, Jira, VSCode, Cursor, <em>Cloud:</em> Google Cloud, Kubernetes, Docker"
        ]
    },
    {
        title: "Repos",
        type: "time_table",
        contents: [
            {
                title: '<a href="https://github.com/annikasalmi/mdwarf-habitability">mdwarf-habitability</a>',
                year: "2025",
                description: "Predicted the number of habitable zone planets HWO and LIFE will detect using an MCMC simulated planetary population. LIFE found more planets than HWO, but HWO was more successful for G-type stars."
            },
            {
                title: '<a href="https://github.com/annikasalmi/exo-venus-evolution">exo-venus-evolution</a>',
                year: "2024, in progress",
                description: "Model the evolution of \"exo-Venuses\" over their geological history, using Venus and exo-Venus data."
            },
            {
                title: '<a href="https://github.com/annikasalmi/alignpy">alignpy</a>',
                year: "2020",
                description: "Built a tool that locally downloads FITS files of astronomical objects, specified by filter and catalog. Once they are downloaded, the image files can be aligned and plotted via addition, subtraction, or division"
            }
        ]
    },
    {
        title: "Science Communication",
        type: "time_table",
        contents: [
            {
                title: "TA, AI-Assisted Coding, taught by Dr. Alexis Shakas",
                institution: "ETH",
                year: "spring 2026",
                description: []
            },
            {
                title: "Institute of Astronomy science night volunteer",
                institution: "Cambridge",
                year: "2024-25",
                description: []
            },
            {
                title: "President (2018–2021), Starlab Planetarium Shows",
                institution: "Yale",
                year: "2017–21",
                description: []
            },
            {
                title: "Women in Natural Sciences blog",
                institution: "ETH",
                year: "present",
                description: []
            },
            {
                title: "SciTech Desk Writer, Yale Daily News",
                institution: "Yale",
                year: "2020-21",
                description: [
                    "Popular astronomy writing has also appeared in Matador Network and Study Breaks."
                ]
            }
        ]
    },
    {
        title: "Activities",
        type: "list",
        contents: [
            "Yale Free & Alpine Ski Team, Captain 2019-2020 (Yale, 2017-21)",
            "<strong>Languages:</strong> English (native), Spanish (advanced), French (intermediate)",
            "<strong>Dual citizen of USA and Finland; Swiss resident.</strong>"
        ]
    }
];

// Function to render time table entries
function renderTimeTable(contents) {
    if (!Array.isArray(contents)) {
        console.warn('renderTimeTable: contents is not an array:', contents);
        return '';
    }
    
    return contents.map(entry => {
        // Validate entry object
        if (!entry || typeof entry !== 'object') {
            console.warn('renderTimeTable: invalid entry:', entry);
            return '';
        }
        
        let html = '<div class="cv-entry">';
        html += '<div class="cv-entry-header">';
        
        // Safe title rendering with fallback - allow HTML for links
        const title = entry.title || 'Untitled';
        html += `<h4 class="cv-entry-title">${renderHtml(title)}</h4>`;
        
        // Combine institution and year in the gray box
        let yearBoxContent = '';
        if (entry.institution && typeof entry.institution === 'string' && entry.institution.trim()) {
            yearBoxContent = escapeHtml(entry.institution);
        }
        if (entry.year && (typeof entry.year === 'string' || typeof entry.year === 'number')) {
            if (yearBoxContent) {
                yearBoxContent += ', ' + escapeHtml(String(entry.year));
            } else {
                yearBoxContent = escapeHtml(String(entry.year));
            }
        }
        if (yearBoxContent) {
            html += `<div class="cv-entry-year">${yearBoxContent}</div>`;
        }
        
        html += '</div>';
        
        // Safe description rendering
        if (entry.description) {
            if (Array.isArray(entry.description) && entry.description.length > 0) {
                html += '<ul class="cv-entry-description">';
                entry.description.forEach(item => {
                    if (item && typeof item === 'string' && item.trim()) {
                        html += `<li>${escapeHtml(item)}</li>`;
                    }
                });
                html += '</ul>';
            } else if (typeof entry.description === 'string' && entry.description.trim()) {
                html += `<div class="cv-entry-description">${escapeHtml(entry.description)}</div>`;
            }
        }
        
        // Safe items rendering
        if (entry.items && Array.isArray(entry.items) && entry.items.length > 0) {
            html += '<ul class="cv-entry-items">';
            entry.items.forEach(item => {
                if (item && typeof item === 'string' && item.trim()) {
                    html += `<li>${escapeHtml(item)}</li>`;
                }
            });
            html += '</ul>';
        }
        
        html += '</div>';
        return html;
    }).join('');
}

// Function to render list entries
function renderList(contents) {
    if (!Array.isArray(contents)) {
        console.warn('renderList: contents is not an array:', contents);
        return '';
    }
    
    const validItems = contents.filter(item => item && typeof item === 'string' && item.trim());
    if (validItems.length === 0) {
        return '';
    }
    
    return `<ul class="cv-list">${validItems.map(item => `<li>${renderHtml(item)}</li>`).join('')}</ul>`;
}

// Function to render nested list entries
function renderNestedList(contents) {
    if (!Array.isArray(contents)) {
        console.warn('renderNestedList: contents is not an array:', contents);
        return '';
    }
    
    const validItems = contents.filter(item => item && typeof item === 'string' && item.trim());
    if (validItems.length === 0) {
        return '';
    }
    
    return `<ul class="cv-nested-list">${validItems.map(item => `<li>${renderHtml(item)}</li>`).join('')}</ul>`;
}

// Function to render CV content
function renderCV() {
    const container = document.getElementById('cv-content');
    
    if (!container) {
        console.error('CV content container not found!');
        return;
    }
    
    // Validate CV_DATA
    if (!Array.isArray(CV_DATA) || CV_DATA.length === 0) {
        console.error('CV_DATA is invalid or empty:', CV_DATA);
        container.innerHTML = '<div class="cv-error">Error: CV data is invalid or empty</div>';
        return;
    }
    
    console.log('Rendering CV with', CV_DATA.length, 'sections');
    
    const cvHTML = CV_DATA.map((section, index) => {
        // Validate section object
        if (!section || typeof section !== 'object') {
            console.warn(`Invalid section at index ${index}:`, section);
            return '';
        }
        
        // Validate required fields
        if (!section.title || typeof section.title !== 'string') {
            console.warn(`Section at index ${index} missing or invalid title:`, section);
            return '';
        }
        
        let html = '<div class="cv-section">';
        html += `<h3 class="cv-section-title">${escapeHtml(section.title)}</h3>`;
        html += '<div class="cv-section-content">';
        
        if (section.contents && Array.isArray(section.contents)) {
            switch (section.type) {
                case 'time_table':
                    html += renderTimeTable(section.contents);
                    break;
                case 'list':
                    html += renderList(section.contents);
                    break;
                case 'nested_list':
                    html += renderNestedList(section.contents);
                    break;
                default:
                    // For unknown types, try to render as plain content
                    if (section.contents.length > 0) {
                        html += '<div class="cv-unknown-type">';
                        section.contents.forEach(item => {
                            if (item && typeof item === 'string' && item.trim()) {
                                html += `<p>${escapeHtml(item)}</p>`;
                            }
                        });
                        html += '</div>';
                    }
            }
        } else if (section.contents) {
            // Handle non-array contents
            if (typeof section.contents === 'string' && section.contents.trim()) {
                html += `<div class="cv-plain-content">${escapeHtml(section.contents)}</div>`;
            }
        }
        
        html += '</div></div>';
        return html;
    }).filter(html => html !== '').join('');
    
    if (!cvHTML.trim()) {
        container.innerHTML = '<div class="cv-error">Error: No valid CV content could be rendered</div>';
        return;
    }
    
    container.innerHTML = cvHTML;
    
    // Add some debugging
    console.log('CV rendered successfully');
    console.log('Container now contains:', container.innerHTML.length, 'characters');
    console.log('Rendered sections:', CV_DATA.filter(s => s && s.title).map(s => s.title));
    
    // Reinitialize scrollspy after CV content is loaded
    if (window.reinitializeScrollspy) {
        window.reinitializeScrollspy();
    }
}

// Load CV when page loads, but wait a bit for sidebar to load first
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    console.log('CV_DATA length:', CV_DATA.length);
    console.log('CV_DATA first section:', CV_DATA[0]);
    
    // Try to render immediately first
    console.log('Attempting immediate render');
    renderCV();
    
    // Wait a bit for sidebar to load, then render CV again
    setTimeout(function() {
        console.log('First timeout - attempting to render CV');
        renderCV();
    }, 100);
    
    // Also try to render after a longer delay as fallback
    setTimeout(function() {
        console.log('Second timeout - attempting to render CV');
        renderCV();
    }, 1000);
    
    // Final fallback - render after 3 seconds
    setTimeout(function() {
        console.log('Final fallback - attempting to render CV');
        renderCV();
    }, 3000);
});
