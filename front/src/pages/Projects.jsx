import '../styles/Projects.css'
import { useEffect, useState } from 'react'
import Project from '../api/Project'
import { Link } from 'react-router-dom'
import Chat from '../components/Chat';
import NewProjectMenu from '../components/NewProjectMenu';
import CompactedImage from '../utils/CompactedImage';
import { bufferToBlob } from '../utils/bufferToBlob';
import { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';

export default function Projects(){
  const [projects, setProjects] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { _alert } = useContext(AlertContext);
  
  useEffect(() => {
    fetchProjects();
  }, []);
  
  const fetchProjects = async () => {
      const result = await Project.getAll();
      setProjects(result);
  }

  const projectListElement = () => {
    return projects.map((project) => 
      <Link
        to={`/projects/${project.slug}`}
        key={project.id}
        className='project-card'
      >
        <h3>{project.name}</h3>
        <img src={bufferToBlob(project.image) || 'default_project_icon.png'} alt={`Ícone do projeto ${project.name}`}/>
      </Link>
    )
  }

  const createProject = async (name, file) => {
    setIsCreating(true);
    const img = new CompactedImage(file, document);
    const project = new Project(name, localStorage.userId, await img.getBlob());
    const result = await project.create();

    if(result.success){
      setShowOverlay(false);
      fetchProjects();
    }
    else{
      _alert.show('Preencha todos os campos', _alert.styles.error);
    }
    setIsCreating(false);
  }
 
  return (
    <section className='projects'>
      <Chat/>
      {
        showOverlay && 
        <NewProjectMenu 
          setShowOverlay={setShowOverlay} 
          createProject={createProject}
          isCreating={isCreating}
        />}

      <div className='project-list'>
        {projectListElement()}
        <div className='project-card new-card' onClick={() => {setShowOverlay(true)}}>
          <h3>+</h3>
        </div>
      </div>
    </section>
  )
}
