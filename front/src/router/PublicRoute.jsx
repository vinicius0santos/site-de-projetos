import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContent';

const isAuth = () => {
  const isAuth = () => {
      const { isLoggedIn } = useContext(AuthContext);
  
      return isLoggedIn;
  }
}

export default function PublicRoute() {
  return isAuth() ? <Navigate to='/projects' /> : <Outlet />
}
