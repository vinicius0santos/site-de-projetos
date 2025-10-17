import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectApi from '../api/Project';
import Header from '../components/header/ProjectHeader.jsx';
import User from "../api/User.js";

function Project() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    User.logout();
    navigate('/');
  }

  useEffect(() => {
    setLoading(true);

    const fetchProjectData = async () => {
      const project = await ProjectApi.getBySlug(slug);

      if (project) {
        setProject(project);
      } 
      else {
        return navigate('/404', { replace: true });
      }
      setLoading(false);
    };

    fetchProjectData();
  }, [slug, navigate]);

  if (loading) return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100vh', color: '#eee' }}>Carregando...</div>;
  if (!project) return <h1 style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100vh', color: '#eee' }}>Projeto não encontrado.</h1>;

  return (
    <div className="flex flex-col h-full app-layout">
      <Header 
        projectName={project.name}
        username={localStorage.getItem('username')}
        onLogout = {handleLogout}
      ></Header> 
      
      <main className="flex-1" style={{
          background: 'var(--board-bg))',
      }}>
        <div 
          className="flex flex-col justify-center items-center text-center h-full gap-3 text-gray-300"
        >
          <h1>{project.name}</h1>
          <p>ID do projeto: {project.id}</p>
          <p>Ícone do projeto:</p>
          <img 
            src={project.icon_url} 
            alt={`Ícone do projeto ${project.name}`} 
            className="max-w-[150px] h-auto"
          />
        </div>
      </main>
    </div>
  );
}

export default Project; 
