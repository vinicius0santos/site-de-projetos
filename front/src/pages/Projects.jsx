import '../styles/Home.css'
import { useEffect } from 'react'
import Project from '../api/Project'
import { useNavigate } from 'react-router-dom';

let projects = [];

export default function Projects(){
  const navigate = useNavigate();
  
  useEffect(() => {
    getProjects();
  }, [])
  
  const getProjects = async () => {
    try{
      const result = await Project.getAll();
      projects = result.data;
  
      if(result.success){
        console.log(projects)
      }
      else{
        logout();
      }
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='projets'>

    </div>
  )
}
