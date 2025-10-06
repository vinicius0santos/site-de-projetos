import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PublicRoute() {
  const {checkAuth} = useContext(AuthContext);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let active = true;

    (async () => {  
      const result = await checkAuth();

      if(active){
        setIsAuth(result.success)
        setLoading(false);
      }
    })()

    return () => {
      active = false;
    }
  }, [])


  if(loading) return <></>
  
  else if(isAuth) return <Navigate to='/projects' />
  else{
    localStorage.clear();
    return <Outlet />
  }
}