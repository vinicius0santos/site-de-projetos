import Project from './connectApi/Project.js';
import CompactedImage from './CompactedImage.js';
import Warning from './Warning.js';
import Chat from './Chat.js';

const projectList = document.getElementById('project-list');
const createProject = document.getElementById('create-project');
const usernameSpan = document.getElementById('username');
const warning = new Warning(document);
let projects = [];

const chat = new Chat('adm',document);
chat.load()

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
  let imgName = projectName + '_' + usernameSpan.textContent;
  let blob;

  if(projectName.trim() == ''){
    warning.create('O nome do projeto não pode estar em branco.')
    return
  }
  if(projects.find(p => p.name == projectName)){
    warning.create('Um projeto com o mesmo nome já existe.')
  }

  if(file.files.length){
    blob = await new CompactedImage(file, document, 400, 0.9).getBlob()
  }
  
  const project = new Project(projectName, createdBy, userId, imgName, blob);
  
  await project.create();

  [...event.target].forEach(input => input.value = '');
  fetchProjects()
})

async function deleteProject({target}){
  const id = target.parentNode.children.id.value;
  const paths = target.parentNode.children.iconPaths.value;

  await Project.delete(id, paths);
  fetchProjects();
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
      <h2>${project.name}</h2>
      <button name='deleteProject'>Deletar</button>
      <img src='${project.icon_url != '' ? project.icon_url : "../default_project_icon.png"}'>
      <h2> Criado por: ${project.created_by}</h2>
      <input type='hidden' value='${project.icon_paths}' name='iconPaths'/>
      <input type='hidden' value='${project.id}' name='id'/>
    `;

    div.children.deleteProject.addEventListener('click', deleteProject);
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
