import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

export default function Header(){
  const path = useLocation().pathname;

  if(path == '/login' || path == '/signup') return <></>
  if(path == '/'){
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
  if(path == '/projects'){
    return (
      <header className='projects-header'>
        <h1><Link to='/'>Bundello</Link></h1>
        <span>{localStorage.getItem('username')}</span>
      </header>
    )
  }
}
