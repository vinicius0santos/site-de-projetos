import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function Header(){
  
  return (
    <div className='header'>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
    </div>
  )
}
