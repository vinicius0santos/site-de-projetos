import '../styles/Projects.css'
import { useEffect, useState } from 'react'
import Project from '../api/Project'
import { useNavigate } from 'react-router-dom';

let projects = [];

export default function Projects(){
  const navigate = useNavigate();
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
    return projects.map((project) => 
      <div className='project-card'>
        <h3>{project.name}</h3>
        <img src={project.icon_url} />
        <input type="hidden" value={project.id}/>
      </div>
    )
  }
  projectListElement()
  
  return (
    <section className='projects'>
      <div className='project-list'>
        {projectListElement()}
        {projects.length &&
          <div className='project-card new-card'>
            <h3>+</h3>
          </div>
        }
      </div>
    </section>
  )
}
