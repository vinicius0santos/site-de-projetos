import '../../styles/Header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ProjectHeader from './templates/ProjectHeader';
import ProjectsHeader from './templates/ProjectsHeader';
import HomeHeader from './templates/HomeHeader';
import User from '../../api/User';
import { useContext } from 'react';
import { AlertContext } from '../../context/AlertContext';
import { ProjectContext } from '../../context/ProjectContext';

export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { _alert } = useContext(AlertContext);
  const { project, setProject } = useContext(ProjectContext);

  const handleLogout = async () => {
    const result = await User.logout();

    if (result.success) {   
      setProject(null);

      navigate('/');
    }
    else {
      _alert.show('Não foi possível deslogar');
    }
  }

  if (path == '/login' || path == '/signup') return <></>

  if (path == '/') {
    return (
      <HomeHeader
        onLogout={handleLogout}
      >
      </HomeHeader>
    )
  }

  if (path == '/projects') {
    return (
      <ProjectsHeader
        onLogout={handleLogout}
      >
      </ProjectsHeader>
    )
  }

  if (path.startsWith('/projects/') && path.length > '/projects/'.length) {
    return (
      <ProjectHeader
        project={project}
        onLogout={handleLogout}
      >
      </ProjectHeader>
    )
  }
}
