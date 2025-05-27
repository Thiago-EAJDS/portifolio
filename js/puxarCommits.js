const username = 'Thiago-EAJDS';

  async function getTotalCommits() {
    const statNumber = document.querySelector('.stat-number');
    let totalCommits = 0;

    try {
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const repos = await reposResponse.json();

      if (!Array.isArray(repos)) {
        statNumber.innerText = 'Erro';
        return;
      }

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

      animateNumber(statNumber, totalCommits);

    } catch (err) {
      console.error(err);
      statNumber.innerText = 'Erro';
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

  getTotalCommits();