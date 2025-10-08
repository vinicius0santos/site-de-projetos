import '../styles/Projects.css'
import { useEffect, useState } from 'react'
import Project from '../api/Project'
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';

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
          //...
        }
      }
      catch(err){
        console.log(err);
      }
    })()
  }, [])

  const projectListElement = () => {
    return projects.map((project, index) => 
      <div className='project-card' key={index}>
        <h3>{project.name}</h3>
        <img src={project.icon_url} />
        <input type="hidden" value={project.id}/>
      </div>
    )
  }
  
  return (
    <section className='projects'>
      <Chat username={localStorage.getItem('username')}/>
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
