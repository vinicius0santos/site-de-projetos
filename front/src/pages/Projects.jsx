import '../styles/Projects.css'
import { useEffect, useState } from 'react'
import Project from '../api/Project'
import { Link } from 'react-router-dom'
import Chat from '../components/Chat';
import NewProjectMenu from '../components/NewProjectMenu';
import CompactedImage from '../utils/CompactedImage';

export default function Projects(){
  const [projects, setProjects] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  useEffect(() => {
    fetchProjects();
  }, []);
  
  const fetchProjects = async () => {
    try{
      const result = await Project.getAll();
  
      if(result.success){
        setProjects(result.data);
      }
      else{
        //...
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const projectListElement = () => {
    return projects.map((project) => 
      <Link
        to={`/projects/${project.slug}`}
        key={project.id}
        className='project-card'
      >
        <h3>{project.name}</h3>
        <img src={project.icon_url || 'default_project_icon.png'} alt={`Ícone do projeto ${project.name}`}/>
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
      setIsCreating(false);
    }
  }
 
  return (
    <section className='projects'>
      <Chat username={localStorage.getItem('username')}/>
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
