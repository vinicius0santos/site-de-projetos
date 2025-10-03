import Project from './connectApi/Project.js';
import CompactedImage from './CompactedImage.js';
import Warning from './Warning.js';

const projectList = document.getElementById('project-list');
const createProject = document.getElementById('create-project');
const usernameSpan = document.getElementById('username');
const warning = new Warning(document);
let projects = [];

function showUsername() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const payload = JSON.parse(atob(token.split('.')[1]));
  usernameSpan.textContent = payload.username;
}

createProject.addEventListener('submit', async (event) => {
  event.preventDefault();

  const projectName = event.target.projectName.value;
  const createdBy = usernameSpan.textContent;
  const userId = localStorage.getItem('userId');
  const file = event.target.file;
  let imageName = projectName + '_' + usernameSpan.textContent;
  let blob;

  if(projectName.trim() == ''){
    warning.create('O nome do projeto não pode estar em branco.')
    return
  }
  if(projects.find(p => p.name == projectName)){
    warning.create('Um projeto com o mesmo nome já existe.')
  }

  if(file.files.length){
    blob = await new CompactedImage(file, document).getBlob()
  }
  
  const project = new Project(projectName, createdBy, userId, imageName, blob);
  
  await project.create();

  [...event.target].forEach(input => input.value = '');
  fetchProjects()
})

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
      <h2>${project.name}</h2>
      <img src='${project.icon_url != '' ? project.icon_url : "../default_project_icon.png"}'>
      <h2> Criado por: ${project.created_by}</h2>
    `;
    projectList.appendChild(div);
  });
}

async function fetchProjects() {
  try {
    const result = await Project.getAll();
    projects = result.data;

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
