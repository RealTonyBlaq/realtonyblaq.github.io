document.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.querySelector('.button');
  connectButton.addEventListener('click', () => {
    window.location.href = '#contactMe';
  });

  const showBtn = document.querySelector('.open');
  const closeBtn = document.querySelector('.close');

  function toggleSideBar () {
    const sideBar = document.querySelector('.side-bar');
    if (sideBar.style.display === 'none' || sideBar.style.display === '') {
      showBtn.style.display = 'none';
      sideBar.style.display = 'flex';
    } else {
      sideBar.style.display = 'none';
      showBtn.style.display = 'flex';
    }
  }

  showBtn.addEventListener('click', () => toggleSideBar());
  closeBtn.addEventListener('click', () => toggleSideBar());

  fetch('./data/source.json')
    .then(response => {
      if (!response.ok) console.error('Network connection error');
      return response.json();
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
        img.alt = project.name ? `${project.name} logo` : 'logo';
        img.loading = 'lazy';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';

        const h3 = document.createElement('h3');
        h3.textContent = project.name;

        const cardLinks = document.createElement('div');
        cardLinks.className = 'card-links';

        if (project.githubURL && project.githubURL !== '') {
          const gitlink = document.createElement('a');
          gitlink.href = project.githubURL;
          gitlink.target = '_blank';
          const githubIcon = document.createElement('img');
          githubIcon.src = logos.github;
          githubIcon.alt = 'github icon';
          gitlink.appendChild(githubIcon);
          cardLinks.appendChild(gitlink);
        }

        if (project.URL && project.URL !== '') {
          const weblink = document.createElement('a');
          weblink.href = project.URL;
          weblink.target = '_blank';
          const webIcon = document.createElement('img');
          webIcon.src = logos.web;
          webIcon.alt = 'web icon';
          weblink.appendChild(webIcon);
          cardLinks.appendChild(weblink);
        }

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

  function adjustTextareaHeight (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  const textarea = document.querySelector('#message');
  textarea.addEventListener('input', () => {
    adjustTextareaHeight(textarea);
  });

  const form = document.querySelector('.form');
  async function handleSubmit (event) {
    event.preventDefault();
    const button = document.querySelector('.button-text');
    const data = new FormData(event.target);
    const sentIcon = document.querySelector('.sent-icon');
    const errorIcon = document.querySelector('.error-icon');
    const normalIcon = document.querySelector('.normal-icon');
    console.log(Object.keys(data));
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          button.textContent = 'Message sent!';
          sentIcon.style.display = 'inline';
          normalIcon.style.display = 'none';
          errorIcon.style.display = 'none';
          setTimeout(() => {
            button.textContent = 'Send Message';
            button.style.backgroundColor = '#17255A';
            button.style.color = '#fff';
            sentIcon.style.display = 'none';
            errorIcon.style.display = 'none';
            normalIcon.style.display = 'inline';
            form.reset();
          }, 5000);
        } else {
          button.textContent = 'Oops! Error occurred';
          button.style.color = 'red';
          button.style.backgroundColor = 'white';
          sentIcon.style.display = 'none';
          normalIcon.style.display = 'none';
          errorIcon.style.display = 'inline';
          setTimeout(() => {
            button.textContent = 'Send Message';
            button.style.backgroundColor = '#17255A';
            button.style.color = '#fff';
            sentIcon.style.display = 'none';
            errorIcon.style.display = 'none';
            normalIcon.style.display = 'inline';
          }, 5000);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        button.textContent = 'Oops! Error occurred';
        button.style.color = 'red';
        button.style.backgroundColor = 'white';
        sentIcon.style.display = 'none';
        normalIcon.style.display = 'none';
        errorIcon.style.display = 'inline';
        setTimeout(() => {
          button.textContent = 'Send Message';
          button.style.backgroundColor = '#17255A';
          button.style.color = '#fff';
          sentIcon.style.display = 'none';
          errorIcon.style.display = 'none';
          normalIcon.style.display = 'inline';
        }, 5000);
      });
  }
  form.addEventListener('submit', handleSubmit);
});
