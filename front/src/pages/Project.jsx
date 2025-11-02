import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectApi from '../api/Project';
import { ProjectContext } from "../context/ProjectContext.jsx";
import { bufferToBlob } from "../utils/bufferToBlob.js";
import SectionBar from "../components/project/section/SectionBar.jsx";

function Project() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { project, setProject, section } = useContext(ProjectContext);

  useEffect(() => {
    setLoading(true);

    const fetchProjectData = async () => {
      const project = await ProjectApi.getBySlug(slug);

      if (project) {
        localStorage.setItem('currentProject', project.name)
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
      <main className="flex-1" style={{
        background: 'var(--board-bg))',
      }}>
        <SectionBar></SectionBar>
        <div
          className="flex flex-col justify-center items-center text-center h-full gap-3 text-gray-300"
        >
          <h1>{project.name}</h1>
          <p>ID do projeto: {project.id}</p>
          <p>Ícone do projeto:</p>
          <img
            src={bufferToBlob(project.image)}
            alt={`Ícone do projeto ${project.name}`}
            className="max-w-[150px] h-auto"
          />
          {section && section.title ?
            <>
              <p>Título da seção: {section?.title}</p>  
              <p>Id da seção: {section?.id}</p>
            </>
            : <></>
          }
        </div>
      </main>
    </div>
  );
}

export default Project; 
