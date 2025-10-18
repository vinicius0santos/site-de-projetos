import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Alert from './components/Alert';
import { AlertProvider } from './context/AlertContext';
import { ProjectProvider } from './context/ProjectContext';

export default function AppLayout(){
  return (
    <div className='app-layout'>
      <AlertProvider>
      <ProjectProvider>
      <Header />
        <Alert />
        <main>
          <Outlet />
        </main>
      <Footer />
      </ProjectProvider>
      </AlertProvider>
    </div>
  )
}