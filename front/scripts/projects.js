import Project from './connectApi/Project.js';
import CompactedImage from './CompactedImage.js';
import Warning from './Warning.js';

const projectList = document.getElementById('projectList');
const usernameSpan = document.getElementById('username');
const warning = new Warning(document);
let projects = [];

function createHeader() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const payload = JSON.parse(atob(token.split('.')[1]));
  usernameSpan.textContent = payload.username;
}

function openNewProjectPopup() {
  if (document.querySelector('.popup')) return;

  const overlay = document.createElement('div');
  overlay.className = 'popup';
  overlay.innerHTML = `
    <div class="popup-content role="dialog">
      <div class="popup-header">
      <h2>Novo projeto</h2>
      <button class="btn-close">x</button>
      </div>
      <form id="newProjectForm">
        <fieldset>
          <label for="projectName">Nome</label>
          <input id="projectName" name="projectName" type="text" required></input>
          <label for="projectImage">Thumbnail</label>
          <input id="projectImage" name="projectImage" type="file"></input>
        </fieldset>
        <button type="submit" class="btn-new-project">Novo projeto</button>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);

  const form = overlay.querySelector('#newProjectForm');
  const closeBtn = overlay.querySelector('.btn-close');
  const nameInput = overlay.querySelector('#projectName');

  setTimeout(() => nameInput.focus(), 50);

  closeBtn.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const projectName = e.target.projectName.value;
    const createdBy = usernameSpan.textContent;
    const userId = localStorage.getItem('userId');
    const file = e.target.projectImage;
    let imgName = projectName + '_' + usernameSpan.textContent;
    let blob;

    if (projectName.trim() == '') {
      warning.create('O nome do projeto não pode estar em branco.');
      return;
    }

    if (projects.find(p => p.name == projectName)) {
      warning.create('Um projeto com o mesmo nome já existe.');
      return;
    }

    if (file.files.length) {
      blob = await new CompactedImage(file, document, 400, 0.9).getBlob();
    }
    
    const project = new Project(projectName, createdBy, userId, imgName, blob);
    
    await project.create();

    [...e.target].forEach(input => input.value = '');

    fetchProjects();
    overlay.remove();
  });
}

function createNewProjectCard() {
  const div = document.createElement('div');

  div.id = 'newProjectCard';
  div.classList.add('project-card');
  div.addEventListener('click', openNewProjectPopup);
  div.innerHTML = `
    Novo Projeto
  `;

  projectList.appendChild(div);
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
      createNewProjectCard();
    } else {
      projectList.innerHTML = '<p>Não foi possível carregar os projetos.</p>';
    }
  } catch (err) {
    console.error(err);
    projectList.innerHTML = '<p>Ocorreu um problema ao conectar ao servidor. Atualize a página e tente novamente.</p>'
  }
}

async function deleteProject({target}){
  const id = target.parentNode.children.id.value;
  const paths = target.parentNode.children.iconPaths.value;

  await Project.delete(id, paths);
  fetchProjects();
}

createHeader();
fetchProjects();
