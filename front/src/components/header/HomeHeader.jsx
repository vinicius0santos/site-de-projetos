import { useEffect, useState } from 'react';
import Chat from '../Chat';
import DesktopUserButtons from '../DesktopUserButtons';
import DesktopProjectsButton from '../DesktopProjectsButton';
import DesktopLogo from '../DesktopLogo';
import MobileMenuButton from '../MobileMenuButton';

function HomeHeader({ onLogout }) {
  const isLoggedIn = !!localStorage.username;
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
        {isLoggedIn && (
          <Chat />
        )}
      </div>

      {/* HEADER DESKTOP */}
      <div id="desktop-full-header" className="min-h-16 hidden md:flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <DesktopLogo />
          {isLoggedIn && (
            <DesktopProjectsButton />
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Chat />
              <DesktopUserButtons
                toggleUserMenu={toggleUserMenu}
                onLogout={onLogout}
                userInitial={userInitial}
                isUserMenuOpen={isUserMenuOpen}
              />
            </>
          ) : (
            <>
              <a href="/signup" className="text-white text-base font-semibold px-4 py-2 rounded-lg transition duration-150 hover:bg-neutral-800">
                Crie a sua conta
              </a>
              <a href="/login" className="text-white text-base font-semibold px-4 py-2 rounded-lg transition duration-150 hover:bg-neutral-800">
                Entre
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;