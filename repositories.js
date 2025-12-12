// GitHub username
const GITHUB_USERNAME = 'annikasalmi';

// Repository list - add your repositories here
const REPOSITORIES = [
    'mdwarf-habitability',
    'exo-venus-evolution',
    'exo-atm-predict',
    'alignpy',
    'annikasalmi.github.io'
];

// Simple HTML escape to avoid accidental markup injection
function escapeHtml(text) {
    if (typeof text !== 'string') {
        return '';
    }
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function formatUpdatedAt(dateString) {
    if (!dateString) return '';
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) return '';
    return parsed.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

function createRepoCard(repo) {
    const name = repo.name || repo.full_name || 'Repository';
    const description = repo.description ? escapeHtml(repo.description) : 'No description yet.';
    const language = repo.language ? `<span class="repo-language"><span class="repo-language-dot"></span>${escapeHtml(repo.language)}</span>` : '';
    const stars = typeof repo.stargazers_count === 'number' ? `<span class="repo-stat">⭐ ${repo.stargazers_count}</span>` : '';
    const forks = typeof repo.forks_count === 'number' ? `<span class="repo-stat">🍴 ${repo.forks_count}</span>` : '';
    const updated = formatUpdatedAt(repo.updated_at);
    const updatedText = updated ? `<span class="repo-updated">Updated ${updated}</span>` : '';
    const repoUrl = repo.html_url || `https://github.com/${GITHUB_USERNAME}/${name}`;

    return `
        <div class="repo-card">
            <a href="${repoUrl}" target="_blank" rel="noopener noreferrer">
                <div class="repo-card-header">
                    <h3 class="repo-title">${escapeHtml(name)}</h3>
                    ${repo.private ? '<span class="repo-badge">Private</span>' : ''}
                </div>
                <p class="repo-description">${description}</p>
                <div class="repo-meta">
                    ${language}
                    ${stars}
                    ${forks}
                    ${updatedText}
                </div>
            </a>
        </div>
    `;
}

async function fetchRepoData(repoName) {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
    if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status} for ${repoName}`);
    }
    return response.json();
}

async function loadRepositories() {
    const container = document.getElementById('repositories');
    if (!container) {
        console.error('Repositories container not found');
        return;
    }

    container.innerHTML = '<p class="repo-loading">Loading repositories...</p>';

    try {
        let repoNames = REPOSITORIES;

        // If no repositories are listed, pull the latest from GitHub
        if (!repoNames || repoNames.length === 0) {
            const listResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
            if (!listResponse.ok) {
                throw new Error(`GitHub list API returned ${listResponse.status}`);
            }
            const repos = await listResponse.json();
            repoNames = repos.map(repo => repo.name);
        }

        const results = await Promise.allSettled(repoNames.map(fetchRepoData));

        const repoCards = results.map((result, index) => {
            if (result.status === 'fulfilled') {
                return createRepoCard(result.value);
            }

            const fallbackName = repoNames[index];
            console.warn(`Falling back to link-only card for ${fallbackName}:`, result.reason);
            return createRepoCard({
                name: fallbackName,
                description: 'Open on GitHub',
                html_url: `https://github.com/${GITHUB_USERNAME}/${fallbackName}`,
                stargazers_count: 0,
                forks_count: 0
            });
        }).join('');

        container.innerHTML = repoCards || '<p class="repo-error">No repositories found.</p>';
    } catch (error) {
        console.error('Error loading repositories:', error);
        container.innerHTML = '<p class="repo-error">Unable to load repositories right now. Please try again later.</p>';
    }
}

// Load repositories when page loads
document.addEventListener('DOMContentLoaded', loadRepositories);