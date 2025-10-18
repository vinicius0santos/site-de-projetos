import { useEffect, useState } from 'react';
import Chat from '../Chat';
import DesktopUserButtons from '../DesktopUserButtons';
import DesktopLogo from '../DesktopLogo';
import MobileMenuButton from '../MobileMenuButton';

function ProjectsHeader({ onLogout }) {
  const userInitial = localStorage.username ? localStorage.username.charAt(0).toUpperCase() : '?';
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false);
    };

    if (isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <header className="min-h-16 text-white shadow-xl flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 flex-shrink-0 bg-[var(--header-bg)]">

      {/* HEADER MOBILE */}
      <div id="mobile-only-header" className="flex items-center justify-between w-full md:hidden">
        <MobileMenuButton />
        <Chat />
      </div>

      {/* HEADER DESKTOP */}
      <div id="desktop-full-header" className="min-h-16 hidden md:flex items-center justify-between w-full">
        <DesktopLogo />
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

export default ProjectsHeader;