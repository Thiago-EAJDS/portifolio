async function fetchGitHubCommits() {
    const username = 'Thiago-EAJDS';
    let totalCommits = 0;
    
    try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        
        if (!reposResponse.ok) {
            throw new Error(`Erro ao buscar repositórios: ${reposResponse.status}`);
        }
        
        const repos = await reposResponse.json();
        

        const commitPromises = repos.map(async (repo) => {
            try {
                const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100`);
                
                if (commitsResponse.ok) {
                    const commits = await commitsResponse.json();
                    return commits.length;
                }
                return 0;
            } catch (error) {
                console.log(`Erro ao buscar commits do repo ${repo.name}:`, error);
                return 0;
            }
        });

        const commitCounts = await Promise.all(commitPromises);
        totalCommits = commitCounts.reduce((sum, count) => sum + count, 0);
        

        const commitsElement = document.querySelector('.stat-item:nth-child(3) .stat-number');
        if (commitsElement) {

            commitsElement.setAttribute('data-target', totalCommits);

            commitsElement.textContent = totalCommits;
        }
        
        console.log(`Total de commits encontrados: ${totalCommits}`);
        return totalCommits;
        
    } catch (error) {
        console.error('Erro ao buscar commits do GitHub:', error);

        const commitsElement = document.querySelector('.stat-item:nth-child(3) .stat-number');
        if (commitsElement) {
            commitsElement.setAttribute('data-target', 120); 
            commitsElement.textContent = '120';
        }
        return 120;
    }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubCommits();
});

// Opcional: Atualizar a cada 5 minutos
setInterval(fetchGitHubCommits, 5 * 60 * 1000);