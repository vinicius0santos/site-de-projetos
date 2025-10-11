import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectApi from '../api/Project';

function Project() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: '100vh',
      gap: '10px',
      color: '#eee'
    }}>
      <h1>{project.name}</h1>
      <p>ID do projeto: {project.id}</p>
      <p>Ícone do projeto:</p>
      <img src={project.icon_url} alt={`Ícone do projeto ${project.name}`} style={{ maxWidth: '150px', height: 'auto' }} />
    </div>
  );
}

export default Project; 
