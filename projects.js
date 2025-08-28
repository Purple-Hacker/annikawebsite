// GitHub username
const GITHUB_USERNAME = 'annikasalmi';

// Repository list - add your repositories here
const REPOSITORIES = [
    // Add your repository names here, for example:
    // 'annikawebsite',
    // 'another-repo',
    // 'cool-project'
];

// Function to create repository card
function createRepoCard(repoName) {
    const repoUrl = `https://github.com/${GITHUB_USERNAME}/${repoName}`;
    const lightTheme = 'default';
    const darkTheme = 'dark';
    
    return `
        <div class="repo-card">
            <a href="${repoUrl}" target="_blank" rel="noopener noreferrer">
                <img
                    class="repo-image light-theme"
                    alt="${repoName}"
                    src="https://github-readme-stats.vercel.app/api/pin/?username=${GITHUB_USERNAME}&repo=${repoName}&theme=${lightTheme}&show_owner=false&description_lines_count=2"
                    onerror="this.style.display='none'"
                >
                <img
                    class="repo-image dark-theme"
                    alt="${repoName}"
                    src="https://github-readme-stats.vercel.app/api/pin/?username=${GITHUB_USERNAME}&repo=${repoName}&theme=${darkTheme}&show_owner=false&description_lines_count=2"
                    onerror="this.style.display='none'"
                >
            </a>
        </div>
    `;
}

// Function to load repositories
function loadRepositories() {
    const container = document.getElementById('repositories');
    
    if (REPOSITORIES.length === 0) {
        // If no repositories specified, try to fetch them from GitHub API
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
            .then(response => response.json())
            .then(repos => {
                if (repos.length > 0) {
                    const repoCards = repos.map(repo => createRepoCard(repo.name)).join('');
                    container.innerHTML = repoCards;
                } else {
                    container.innerHTML = '<p>No repositories found. Add your repositories to the REPOSITORIES array in projects.js</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching repositories:', error);
                container.innerHTML = '<p>Unable to load repositories. Add your repositories to the REPOSITORIES array in projects.js</p>';
            });
    } else {
        // Use the specified repositories
        const repoCards = REPOSITORIES.map(repo => createRepoCard(repo)).join('');
        container.innerHTML = repoCards;
    }
}

// Load repositories when page loads
document.addEventListener('DOMContentLoaded', loadRepositories); 