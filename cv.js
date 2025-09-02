// CV data structure
const CV_DATA = [
    {
        title: "Education",
        type: "time_table",
        contents: [
            {
                title: "PhD in Planetary Science",
                institution: "ETH Zurich",
                year: "2025-present",
                description: [
                    "Working on carbon and sulfur cycles on exoplanets"
                ]
            },
            {
                title: "MPhil in Planetary Science and Life in the Universe",
                institution: "University of Cambridge",
                year: "2024-2025",
                description: [
                    "Received distinction (highest mark possible)",
                    "Thesis on simulating LIFE and HWO's future detections",
                    "Modules including Planetary System Dynamics; Extrasolar Planets Atmospheres and Interiors"
                ]
            },
            {
                title: "Bachelor of Arts double major in Physics and Astronomy",
                institution: "Yale University",
                year: "2017-2021",
                description: [
                    "GPA 3.6/4.0 (UK 2:1 equivalent)",
                    "Undergraduate Thesis Title Correlating mapped nuclear dust with AGN obscuration",
                    "Modules including Astrostatistics and Data Mining; Scientific Computing in Astrophysics; Research Methods in Astrophysics; Exoplanets and Data Science; Research semester in Fall 2020, studying dust around supermassive black holes"
                ]
            },
            {
                title: "Physics of Life Summer Program",
                institution: "Princeton University",
                year: "2020",
                description: []
            }
        ]
    },
    {
        title: "Experience",
        type: "time_table",
        contents: [
            {
                title: "Simulation Engineer",
                institution: "Starfish Space",
                year: "2022-2024",
                description: [
                    "Wrote the company tool that uses on-orbit data to find the current location of the satellite in orbit. Used this tool to determine physics simulation accuracy; found the simulation was already 95% accurate.",
                    "Modeled low Earth orbit physics in a Basilisk physics simulation to solve for drag. Obtained a value for coefficient of drag lower than accepted literature value of 2.2.",
                    "Added hot pixels, cosmic rays, and blurring to synthetic Blender satellite images to train the navigation model. Created thousands of images as part of this iterative process.",
                    "Architected and wrote a pipeline to process and clean on-orbit data for ground analysis.",
                    "Improved dynamics simulation model performance by 30%, by rewriting slow algorithms, by tailoring cloud tools, and changing build processes. Dynamics simulation is Python wrapping C++ code; contributed in both languages. Also improved simulation UI for everyone who interacted with the simulation."
                ]
            },
            {
                title: "Research Assistant",
                institution: "Urry Lab, Yale University",
                year: "2020-2021",
                description: [
                    "Mapped galaxy dust distributions of 109 galaxies with active galactic nuclei (AGN) to resolve whether whether dust obscured X-ray radiation from the AGN.",
                    "Wrote an algorithm that combined infrared and optical Hubble images to illuminate the galactic dust.",
                    "Established a GitHub package that when installed, creates attenuation (dust) maps of galaxies.",
                    "Presented at a senior thesis Mellon Forum; funded by the Richter Memorial Fund."
                ]
            },
            {
                title: "Research Assistant",
                institution: "Newburgh Lab, Yale University",
                year: "2019-2020",
                description: [
                    "Generated channel telescope frequency versus intensity graphs of well-known bright stars on the Canadian Hydrogen Intensity Mapping Experiment (CHIME) to find telescope accuracy. Found 5 frequency channels that were over- and under-measuring intensity; results calibrated telescope.",
                    "Research done with Cedar supercomputer; funded by the Richter Memorial Fund."
                ]
            },
            {
                title: "Museum Assistant in Paleobotany",
                institution: "Peabody Museum, Yale University",
                year: "2018",
                description: []
            }
        ]
    },
    {
        title: "Science Communication",
        type: "time_table",
        contents: [
            {
                title: "Science night volunteer",
                institution: "Institute of Astronomy, University of Cambridge",
                year: "2024",
                description: []
            },
            {
                title: "President",
                institution: "Starlab, Yale University",
                year: "2017-2021",
                description: [
                    "Write and present planetarium shows to New Haven students; teach Yale students to communicate science."
                ]
            },
            {
                title: "SciTech Desk Writer",
                institution: "Yale Daily News",
                year: "2020",
                description: [
                    "Astronomy popular science writing has also appeared in publications such as Matador Network, Study Breaks"
                ]
            },
            {
                title: "Docent",
                institution: "Exploratorium Museum",
                year: "2017",
                description: [
                    "Explained exhibits to visitors and ran public dissections in San Francisco's premier hands-on science museum."
                ]
            },
            {
                title: "Student",
                institution: "Joint Antarctic Science Expedition",
                year: "2016",
                description: []
            }
        ]
    },
    {
        title: "Projects",
        type: "time_table",
        contents: [
            {
                title: '<a href="https://github.com/annikasalmi/mdwarf-habitability">mdwarf-habitability</a>',
                year: "2024 (in progress)",
                description: "Predict the number of habitable zone M-dwarf planetary atmospheres HWO and LIFE will see using an MCMC simulated planetary population. Recreated LIFE results and looked for how many planets HWO would find."
            },
            {
                title: '<a href="https://github.com/annikasalmi/exo-venus-evolution">exo-venus-evolution</a>',
                year: "2024 (in progress)",
                description: "Model the evolution of \"exo-Venuses\" over their geological history, using Venus and exo-Venus data"
            },
            {
                title: '<a href="https://github.com/annikasalmi/alignpy">alignpy</a>',
                year: "2024 (in progress)",
                description: "Built a tool that locally downloads FITS files of astronomical objects, specified by filter and catalog. Once they are downloaded, the image files can be aligned and plotted via addition, subtraction, or division"
            }
        ]
    },
    {
        title: "Honors and Awards",
        type: "time_table",
        contents: [
            {
                year: "2021",
                items: [
                    "Mellon Forum fund",
                    "Paul K. Richter and Evalyn E. Cook Richter Memorial Fund"
                ]
            },
            {
                year: "2020",
                items: [
                    "Paul K. Richter and Evalyn E. Cook Richter Memorial Fund"
                ]
            },
            {
                year: "2016",
                items: [
                    "National Science Foundation funding to go to Antarctica"
                ]
            }
        ]
    },
    {
        title: "Academic Interests",
        type: "nested_list",
        contents: [
            "Planetary interiors and atmospheres",
            "Origin of life",
            "Planetary system dynamics",
            "Missions to solar system bodies"
        ]
    },
    {
        title: "Other Interests",
        type: "list",
        contents: [
            'Ski mountaineering',
            'Climbing',
            'Reading (<a href="https://www.gooodreads.com/annikasalmi">Goodreads</a>)'
        ]
    }
];

// Function to render time table entries
function renderTimeTable(contents) {
    return contents.map(entry => {
        let html = '<div class="cv-entry">';
        html += '<div class="cv-entry-header">';
        html += `<h4 class="cv-entry-title">${entry.title}</h4>`;
        if (entry.institution) {
            html += `<div class="cv-entry-institution">${entry.institution}</div>`;
        }
        if (entry.year) {
            html += `<div class="cv-entry-year">${entry.year}</div>`;
        }
        html += '</div>';
        
        if (entry.description && entry.description.length > 0) {
            html += '<ul class="cv-entry-description">';
            entry.description.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }
        
        if (entry.items && entry.items.length > 0) {
            html += '<ul class="cv-entry-items">';
            entry.items.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }
        
        html += '</div>';
        return html;
    }).join('');
}

// Function to render list entries
function renderList(contents) {
    return `<ul class="cv-list">${contents.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

// Function to render nested list entries
function renderNestedList(contents) {
    return `<ul class="cv-nested-list">${contents.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

// Function to render CV content
function renderCV() {
    const container = document.getElementById('cv-content');
    
    if (!container) {
        console.error('CV content container not found!');
        return;
    }
    
    console.log('Rendering CV with', CV_DATA.length, 'sections');
    
    const cvHTML = CV_DATA.map(section => {
        let html = '<div class="cv-section">';
        html += `<h3 class="cv-section-title">${section.title}</h3>`;
        html += '<div class="cv-section-content">';
        
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
                html += section.contents;
        }
        
        html += '</div></div>';
        return html;
    }).join('');
    
    container.innerHTML = cvHTML;
    
    // Add some debugging
    console.log('CV rendered successfully');
    console.log('Container now contains:', container.innerHTML.length, 'characters');
}

// Load CV when page loads, but wait a bit for sidebar to load first
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for sidebar to load, then render CV
    setTimeout(renderCV, 100);
    
    // Also try to render after a longer delay as fallback
    setTimeout(renderCV, 1000);
});
