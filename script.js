document.addEventListener('DOMContentLoaded', () => {
  fetch('./data/source.json')
    .then(response => {
      if (!response.ok) console.error('Network connection error');
      else return response.json();
    })
    .then(d => {
      const data = d.projects;
      const logos = d.logos;
      const projects = document.querySelector('.projects');

      for (const project of data) {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = project.imageURL;
        img.alt = `${project.name} logo` || 'logo';
        img.loading = 'lazy';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';

        const h3 = document.createElement('h3');
        h3.textContent = project.name;

        const cardLinks = document.createElement('div');
        cardLinks.className = 'card-links';

        const gitlink = document.createElement('a');
        gitlink.href = project.githubURL;
        gitlink.target = '_blank';
        const githubIcon = document.createElement('img');
        githubIcon.src = logos.github;
        githubIcon.alt = 'github icon';
        gitlink.appendChild(githubIcon);

        const weblink = document.createElement('a');
        weblink.href = project.web;
        weblink.target = '_blank';
        const webIcon = document.createElement('img');
        webIcon.src = logos.web;
        webIcon.alt = 'web icon';
        weblink.appendChild(webIcon);

        cardLinks.appendChild(gitlink);
        cardLinks.appendChild(weblink);

        cardHeader.appendChild(h3);
        cardHeader.appendChild(cardLinks);

        const ul = document.createElement('ul');
        project.techStack.forEach(tech => {
          const li = document.createElement('li');
          li.textContent = tech;
          ul.appendChild(li);
        });

        const p = document.createElement('p');
        p.textContent = project.description;

        card.appendChild(img);
        card.appendChild(cardHeader);
        card.appendChild(ul);
        card.appendChild(p);

        projects.appendChild(card);
      }
    })
    .catch(err => console.error('Fetch error:', err.message));

    const footer = document.querySelector('footer');
    const p = document.createElement('p');
    p.textContent = `© ${new Date().getFullYear()} | Designed and developed by Ifeanyi Ikpenyi.`;
    footer.appendChild(p);

    function adjustTextareaHeight(textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    const textarea = document.querySelector('#message');
    textarea.addEventListener('input', () => {
        adjustTextareaHeight(textarea);
    });

    const form = document.querySelector(".form");
    async function handleSubmit(event) {
      event.preventDefault();
      const status = document.querySelector('.submit');
      const data = new FormData(event.target);
      console.log(data);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          status.innerHTML = "Message sent!";
          form.reset()
        } else {
          response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            console.log(`Error=> ${data["errors"]}`);
            } else {
                status.innerHTML = "Oops! Error occurred";
            }
            })
        }
        })
        .catch(error => {
        status.innerHTML = "Oops! Error occurred";
        });
    }
    form.addEventListener("submit", handleSubmit);
});
