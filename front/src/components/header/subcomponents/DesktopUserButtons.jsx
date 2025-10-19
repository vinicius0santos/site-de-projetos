export default function DesktopUserButtons({toggleUserMenu, onLogout, userInitial, isUserMenuOpen}){
  return (
    <div className="relative">
      <button
        id="user-dropdown-button"
        onClick={toggleUserMenu}
        className="flex items-center space-x-2 p-1 rounded-lg cursor-pointer"
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg text-white flex-shrink-0 bg-[var(--logo)]"
        >
          {userInitial}
        </div>
        <span className="hidden lg:inline text-base font-semibold">
          {localStorage.username || "Usuário"}
        </span>
        <svg
          id="user-dropdown-arrow"
          className={`${isUserMenuOpen ? 'text-[var(--logo)]' : 'text-gray-400'} w-4 h-4 ml-1`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Opções dropdown do usuário */}
      <div
        id="user-dropdown-menu"
        className={`${isUserMenuOpen ? '' : 'hidden'} absolute top-full right-0 mt-2 w-40 bg-neutral-900 rounded-lg shadow-xl z-20 border border-neutral-700/50`}
      >
        <a href="#" className="block px-4 py-2 text-base text-gray-200 hover:bg-neutral-800 rounded-t-lg">
          Editar meu perfil
        </a>
        <button
          onClick={onLogout}
          className="block w-full text-left px-4 py-2 text-base text-red-400 hover:bg-neutral-800 rounded-b-lg"
        >
          Sair
        </button>
      </div>
    </div>
  )
}