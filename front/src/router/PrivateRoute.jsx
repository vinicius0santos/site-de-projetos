import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute() {
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
  
  else if(isAuth){
    console.log(1)
    return <Outlet />
  }
  else{
    localStorage.clear();
    return <Navigate to='/login' />
  }
}
