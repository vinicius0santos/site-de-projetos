import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContent';

const isAuth = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn;
}

export default function PrivateRoute() {
  return isAuth() ? <Outlet /> : <Navigate to='/projects' /> 
}
