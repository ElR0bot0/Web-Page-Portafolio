async function getRepoReadme(username, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/readme`, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw'
            }
        });
        const readme = await response.text();
        return readme;
    } catch (error) {
        console.error('Error fetching README:', error);
        return 'README not available';
    }
}

async function displayRepoReadme() {
    const params = new URLSearchParams(window.location.search);
    const repo = params.get('repo');
    const readmeContentElement = document.getElementById('readme-content');
    if (repo) {
        const readme = await getRepoReadme('ElR0bot0', repo);
        if (typeof marked.parse === 'function') {
            readmeContentElement.innerHTML = marked.parse(readme);
        } else {
            console.error('marked is not defined');
            readmeContentElement.textContent = readme;
        }
    } else {
        readmeContentElement.textContent = 'No repository specified';
    }
}
window.onload = function() {
    displayRepoReadme();
};