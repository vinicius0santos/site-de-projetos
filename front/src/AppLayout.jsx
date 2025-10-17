import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Alert from './components/Alert';
import { AlertProvider } from './context/AlertContext';

export default function AppLayout(){
  return (
    <div className='app-layout'>
      <AlertProvider>
      <Header />
        <Alert />
        <main>
          <Outlet />
        </main>
      <Footer />
      </AlertProvider>
    </div>
  )
}