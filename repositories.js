// GitHub username
const GITHUB_USERNAME = 'annikasalmi';

// Repository list - add your repositories here
// Supported entries:
// - "repo-name" (assumes owner = GITHUB_USERNAME)
// - "owner/repo-name"
// - { owner, repo, url?, description?, subtitle? }
const REPOSITORIES = [
    {
        owner: 'ExoInteriors',
        repo: 'GlobalChemicalEquilibrium',
        url: 'https://github.com/ExoInteriors/GlobalChemicalEquilibrium',
        subtitle: 'Contributor (2026)',
        description:
            "A high-performance numerical framework designed to simulate the multi-phase chemical interactions between a planet's atmosphere, magma ocean, and metallic core."
    },
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
    const subtitle = repo.subtitle ? `<div class="repo-subtitle">${escapeHtml(repo.subtitle)}</div>` : '';
    const language = repo.language ? `<span class="repo-language"><span class="repo-language-dot"></span>${escapeHtml(repo.language)}</span>` : '';
    const stars = typeof repo.stargazers_count === 'number' ? `<span class="repo-stat">⭐ ${repo.stargazers_count}</span>` : '';
    const forks = typeof repo.forks_count === 'number' ? `<span class="repo-stat">🍴 ${repo.forks_count}</span>` : '';
    const updated = formatUpdatedAt(repo.updated_at);
    const updatedText = updated ? `<span class="repo-updated">Updated ${updated}</span>` : '';
    const repoUrl = repo.html_url || repo.url || `https://github.com/${GITHUB_USERNAME}/${name}`;

    const lightTheme = 'default';
    const darkTheme = 'dark';
    const pinOwner = repo.owner?.login || repo.owner || GITHUB_USERNAME;
    const showOwner = pinOwner !== GITHUB_USERNAME;
    const pinParams = `username=${encodeURIComponent(pinOwner)}&repo=${encodeURIComponent(repo.repo || repo.name || name)}&theme=THEME&show_owner=${showOwner ? 'true' : 'false'}&description_lines_count=2`;

    return `
        <div class="repo-card">
            <a href="${repoUrl}" target="_blank" rel="noopener noreferrer">
                <div class="repo-image-wrapper">
                    <img
                        class="repo-image light-theme"
                        alt="${escapeHtml(name)}"
                        src="https://github-readme-stats.vercel.app/api/pin/?${pinParams.replace('THEME', lightTheme)}"
                        onerror="this.closest('.repo-card').classList.add('repo-text-mode')"
                    >
                    <img
                        class="repo-image dark-theme"
                        alt="${escapeHtml(name)}"
                        src="https://github-readme-stats.vercel.app/api/pin/?${pinParams.replace('THEME', darkTheme)}"
                        onerror="this.closest('.repo-card').classList.add('repo-text-mode')"
                    >
                </div>
                <div class="repo-fallback">
                    <div class="repo-card-header">
                        <h3 class="repo-title">${escapeHtml(name)}</h3>
                        ${repo.private ? '<span class="repo-badge">Private</span>' : ''}
                    </div>
                    ${subtitle}
                    <p class="repo-description">${description}</p>
                    <div class="repo-meta">
                        ${language}
                        ${stars}
                        ${forks}
                        ${updatedText}
                    </div>
                    <div class="repo-cta">Open on GitHub</div>
                </div>
            </a>
        </div>
    `;
}

function normalizeRepoEntry(entry) {
    if (!entry) return null;
    if (typeof entry === 'string') {
        if (entry.includes('/')) {
            const [owner, repo] = entry.split('/');
            return { owner, repo, full_name: `${owner}/${repo}` };
        }
        return { owner: GITHUB_USERNAME, repo: entry, full_name: `${GITHUB_USERNAME}/${entry}` };
    }
    if (typeof entry === 'object' && entry.owner && entry.repo) {
        return { ...entry, full_name: `${entry.owner}/${entry.repo}` };
    }
    return null;
}

async function fetchRepoData(entry) {
    const normalized = normalizeRepoEntry(entry);
    if (!normalized) {
        throw new Error('Invalid repository entry');
    }

    const response = await fetch(`https://api.github.com/repos/${normalized.owner}/${normalized.repo}`);
    if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status} for ${normalized.full_name}`);
    }
    const data = await response.json();

    // Allow local overrides for things not captured in GitHub metadata (role/year text, custom blurb, etc.)
    if (normalized.description) data.description = normalized.description;
    if (normalized.url) data.html_url = normalized.url;
    if (normalized.subtitle) data.subtitle = normalized.subtitle;
    if (normalized.owner && normalized.repo) data.repo = normalized.repo;

    return data;
}

async function loadRepositories() {
    const container = document.getElementById('repositories');
    if (!container) {
        console.error('Repositories container not found');
        return;
    }

    container.innerHTML = '<p class="repo-loading">Loading repositories...</p>';

    try {
        let repoEntries = REPOSITORIES;

        // If no repositories are listed, pull the latest from GitHub
        if (!repoEntries || repoEntries.length === 0) {
            const listResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
            if (!listResponse.ok) {
                throw new Error(`GitHub list API returned ${listResponse.status}`);
            }
            const repos = await listResponse.json();
            repoEntries = repos.map(repo => repo.name);
        }

        const results = await Promise.allSettled(repoEntries.map(fetchRepoData));

        const repoCards = results.map((result, index) => {
            if (result.status === 'fulfilled') {
                return createRepoCard(result.value);
            }

            const fallbackEntry = repoEntries[index];
            const normalized = normalizeRepoEntry(fallbackEntry);
            const fallbackName = normalized?.repo || (typeof fallbackEntry === 'string' ? fallbackEntry : 'Repository');
            const fallbackUrl =
                normalized?.url ||
                (normalized ? `https://github.com/${normalized.owner}/${normalized.repo}` : `https://github.com/${GITHUB_USERNAME}`);

            console.warn(`Falling back to link-only card for ${normalized?.full_name || fallbackName}:`, result.reason);

            return createRepoCard({
                name: fallbackName,
                repo: normalized?.repo || fallbackName,
                owner: normalized?.owner || GITHUB_USERNAME,
                subtitle: normalized?.subtitle,
                description: normalized?.description || 'Open on GitHub',
                html_url: fallbackUrl,
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