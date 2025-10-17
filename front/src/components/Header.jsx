import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProjectHeader from './header/ProjectHeader';
import ProjectsHeader from './header/ProjectsHeader';
import HomeHeader from './header/HomeHeader';
import User from '../api/User';
import '../styles/Header.css';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../context/AlertContext';

export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { _alert } = useContext(AlertContext);


  const [username, setUsername] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    setCurrentProject(localStorage.getItem('currentProject'));
  }, [path]);

  const handleLogout = async () => {
    const result = await User.logout();

    if (result.success) {
      setUsername(null);
      setCurrentProject(null);

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
        username={username}
        onLogout={handleLogout}
      >
      </HomeHeader>
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
