async function getPublicRepositories(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
        const publicRepos = repos.filter(repo => !repo.private & repo.name != "ElR0bot0").map(repo => repo.name);
        return publicRepos;
    } catch (error) {
        console.error('Error fetching public repositories:', error);
        return [];
    }
}
async function displayPublicRepositories() {
    const repoListElement = document.getElementById('repo-list');
    const publicRepos = await getPublicRepositories('ElR0bot0');
    
    publicRepos.forEach(repo => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `projectinfo.html?repo=${encodeURIComponent(repo)}`;
        link.textContent = repo.replace(/-/g, ' ');
        listItem.appendChild(link);
        repoListElement.appendChild(listItem);
    });
}



window.onload = function() {
    displayPublicRepositories();
};