 const username = 'Thiago-EAJDS';

  async function getTotalCommits() {
    let totalCommits = 0;

    try {
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const repos = await reposResponse.json();

      if (!Array.isArray(repos)) return;

      for (const repo of repos) {
        const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`);
        const linkHeader = commitsResponse.headers.get('Link');

        if (linkHeader && linkHeader.includes('rel="last"')) {
          const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
          const count = match ? parseInt(match[1]) : 1;
          totalCommits += count;
        } else {
          const data = await commitsResponse.json();
          if (Array.isArray(data) && data.length > 0) {
            totalCommits += data.length;
          }
        }
      }

      const statItems = document.querySelectorAll('.stat-item');
      statItems.forEach(item => {
        const label = item.querySelector('.stat-label')?.innerText?.trim();
        if (label === 'Commits no GitHub') {
          const numberDiv = item.querySelector('.stat-number');
          animateNumber(numberDiv, totalCommits);
        }
      });

    } catch (err) {
      console.error('Erro ao carregar commits:', err);
    }
  }

  function animateNumber(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 100);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.innerText = target;
        clearInterval(interval);
      } else {
        element.innerText = current;
      }
    }, 20);
  }

