import '../styles/Projects.css'
import { useEffect, useState } from 'react'
import Project from '../api/Project'
import { useNavigate } from 'react-router-dom';

let projects = [];

export default function Projects(){
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    (async () => {
      try{
        const result = await Project.getAll();
    
        if(result.success){
          setProjects(result.data);
        }
        else{
          logout();
        }
      }
      catch(err){
        console.log(err);
      }
    })()
  }, [])

  const projectListElement = () => {
    return projects.map((project) => {
      const projectSlug = slugify(project.name);

      return (
        <Link
          to={`/projects/${projectSlug}`}
          key={project.id}
          className='project-card'
        >
          <h3>{project.name}</h3>
          <img src={project.icon_url} alt={`Ícone do projeto ${project.name}`}/>
        </Link>
      );
    })
  }
  
  return (
    <section className='projects'>
      <Chat username={localStorage.getItem('username')}/>
      <div className='project-list'>
        {projectListElement()}
        {projects.length &&
          <div className='project-card new-card' onClick={() => {/*Colocar popup de novo projeto*/}}>
            <h3>+</h3>
          </div>
        }
      </div>
    </section>
  )
}
