import { useEffect, useState } from 'react';
import Chat from '../Chat';
import DesktopUserButtons from '../DesktopUserButtons';
import DesktopLogo from '../DesktopLogo';
import DesktopProjectsButton from '../DesktopProjectsButton';
import DesktopProjectOptionsButton from '../DesktopProjectOptionsButton';
import MobileMenuButton from '../MobileMenuButton';

function ProjectHeader({ onLogout, project }) {
  const userInitial = localStorage.username ? localStorage.username.charAt(0).toUpperCase() : '?';
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleProjectMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(false);
    setIsProjectMenuOpen(prev => !prev);
  };

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsProjectMenuOpen(false);
    setIsUserMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsProjectMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    if (isProjectMenuOpen || isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProjectMenuOpen, isUserMenuOpen]);

  return (
    <header className="min-h-16 text-white shadow-xl flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 flex-shrink-0 bg-[var(--header-bg)]">

      {/* HEADER MOBILE */}
      <div id="mobile-only-header" className="flex items-center justify-between w-full md:hidden">
        <MobileMenuButton />
        <Chat />
      </div>

      {/* HEADER DESKTOP */}
      <div id="desktop-full-header" className="min-h-16 hidden md:flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <DesktopLogo />
          <div className="flex items-center space-x-2 ml-4 pl-4">
            <DesktopProjectsButton />
            <DesktopProjectOptionsButton 
              toggleProjectMenu={toggleProjectMenu} 
              project={project} 
              isProjectMenuOpen={isProjectMenuOpen}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Chat />
          <DesktopUserButtons
            toggleUserMenu={toggleUserMenu}
            onLogout={onLogout}
            userInitial={userInitial}
            isUserMenuOpen={isUserMenuOpen}
          />
        </div>
      </div>
    </header>
  );
}

export default ProjectHeader;