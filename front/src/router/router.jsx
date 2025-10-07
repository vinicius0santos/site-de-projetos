import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../AppLayout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Projects from '../pages/Projects';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Project from '../pages/Project';
import NotFound from '../pages/NotFound';

export const router = 
createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home />},
      {
        element: <PublicRoute />,
        children: [
          {path: 'login', element: <Login /> },
          {path: 'signup', element: <Signup /> }
        ]
      },
      {
        element: <PrivateRoute />,
        children: [
          {path: 'projects', element: <Projects /> },
          {path: 'projects/:slug', element: <Project />}
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
])
