import User from './UserConnectApi.js';

const projectList = document.getElementById('project-list');
const usernameSpan = document.getElementById('username');

function showUsername() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const payload = JSON.parse(atob(token.split('.')[1]));
  usernameSpan.textContent = payload.username;
}

function showProjects(projects) {
  projectList.innerHTML = '';

  if (projects.length === 0) {
    projectList.innerHTML = '<p>Nenhum projeto encontrado.</p>';
    return;
  }

  projects.forEach(project => {
    const div = document.createElement('div');
    div.classList.add('project-card');
    div.innerHTML = `
      <h2>${project.title}</h2>
      <p>ID: ${project.id}</p>
    `;
    projectList.appendChild(div);
  });
}

async function fetchProjects() {
  try {
    const result = await User.fetchWithToken('/projects');
    if (result.success) {
      showProjects(result.data);
    } else {
      projectList.innerHTML = '<p>Não foi possível carregar os projetos.</p>';
    }
  } catch (err) {
    console.error(err);
    projectList.innerHTML = '<p>Ocorreu um problema ao conectar ao servidor. Atualize a página e tente novamente.</p>'
  }
}

showUsername();
fetchProjects();
