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
                let totalRepoCommits = 0;
                let page = 1;
                let hasMoreCommits = true;
                
                while (hasMoreCommits) {
                    const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100&page=${page}`);
                    
                    if (commitsResponse.ok) {
                        const commits = await commitsResponse.json();
                        
                        if (commits.length === 0) {
                            hasMoreCommits = false;
                        } else {
                            totalRepoCommits += commits.length;
                            page++;
                            
                     
                            if (commits.length < 100) {
                                hasMoreCommits = false;
                            }
                        }
                    } else {
                        hasMoreCommits = false;
                    }
                    
           
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                
                console.log(`Repo ${repo.name}: ${totalRepoCommits} commits`);
                return totalRepoCommits;
                
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

document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubCommits();
});

setInterval(fetchGitHubCommits, 5 * 60 * 1000);