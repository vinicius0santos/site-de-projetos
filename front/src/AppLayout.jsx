import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/Footer';
import Alert from './components/Alert';
import { AlertProvider } from './context/AlertContext';
import { useContext, useEffect, useState } from 'react';
import { ProjectContext } from './context/ProjectContext';
import ContextMenuPopup from './components/ContextMenuPopup';

export default function AppLayout() {
  const { project, section, list } = useContext(ProjectContext);
  const path = useLocation().pathname;
  const [textToCopy, setTextToCopy] = useState('')
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [cursorX, setCursorX] = useState(false);
  const [cursorY, setCursorY] = useState(false);

  useEffect(() => {
    if(path.includes('/projects') && path != '/projects'){
      window.addEventListener('contextmenu', openContextMenuPopup);
      window.addEventListener('click', closeContextMenuPopup);
      
      return () => {
        window.removeEventListener('contextmenu', openContextMenuPopup)
        window.removeEventListener('click', closeContextMenuPopup)
      }
    }
  }, [project, section, list])

  const closeContextMenuPopup = () => {
    setShowContextMenu(false)
  }

  const openContextMenuPopup = (event) => {
    event.preventDefault();

    setCursorX(event.clientX);
    setCursorY(event.clientY);

    setShowContextMenu(true);

    setTextToCopy(
      `::${project?.name || ''}<${section?.title || ''}<${list?.title || ''}[+]` +
      JSON.stringify({
        project: { s: project?.slug, d: project?.is_deleted == 0 ? 0 : 1},
        section: { i: section?.id, d: section?.is_deleted == 0 ? 0 : 1 },
        list: { i: list?.id, d: list?.is_deleted == 0 ? 0 : 1 },
      }) +
      "::"
    )
  }

  return (
    <div className='app-layout'>
      {showContextMenu &&
        <ContextMenuPopup 
          text={textToCopy} 
          cursorX={cursorX}
          cursorY={cursorY}
        />
      }
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