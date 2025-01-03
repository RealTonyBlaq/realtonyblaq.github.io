document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.github.com/users/RealTonyBlaq/repos')
    .then(response => {
      if (!response.ok) console.error('Network connection error');
      else return response.json();
    })
    .then(d => {
      d.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
      const data = d.slice(0, 4);
      const projects = document.querySelector('.projects');
      for (const repo of data) {
        const repoName = repo.name;
        const description = repo.description || 'No description available';

        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = 'https://avatars.githubusercontent.com/u/132378140?v=4';
        img.alt = `${repoName} image` || 'Default image';

        const h3 = document.createElement('h3');
        h3.textContent = repoName;

        const p = document.createElement('p');
        p.textContent = `${description}  `;

        const a = document.createElement('a');
        a.href = repo.html_url;
        a.textContent = 'more details';
        a.target = '_blank';
        p.appendChild(a);

        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(p);

        projects.appendChild(card);
      }
    })
    .catch(err => console.error('Fetch error:', err.message));
});
