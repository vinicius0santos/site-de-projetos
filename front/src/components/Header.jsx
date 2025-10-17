import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProjectHeader from './header/ProjectHeader';
import ProjectsHeader from './header/ProjectsHeader';
import User from '../api/User';
import '../styles/Header.css';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const currentProject = localStorage.getItem('currentProject');

    setUsername(username);
    setCurrentProject(currentProject);
  }, [path]);

  const handleLogout = () => {
    User.logout();
    setUsername(null);
    setCurrentProject(null);

    navigate('/');
  }

  if (path == '/login' || path == '/signup') return <></>

  if (path == '/') {
    return (
      <header className='home-header'>
        <div>
          <h1><Link to="/" aria-label="Ir para página inicial do Bundello">Bundello</Link></h1>
        </div>
        <nav id="navLinks">
          <ul>
            <li><Link to="/signup">Crie a sua conta</Link></li>
            <li><Link to="/login">Entre</Link></li>
          </ul>
        </nav>
      </header>
    )
  }

  if (path == '/projects') {
    return (
      <ProjectsHeader
        username={username}
        onLogout={handleLogout}
      >
      </ProjectsHeader>
    )
  }

  if (path.startsWith('/projects/') && path.length > '/projects/'.length) {
    return (
      <ProjectHeader
        projectName={currentProject}
        username={username}
        onLogout={handleLogout}
      >
      </ProjectHeader>
    )
  }
}
