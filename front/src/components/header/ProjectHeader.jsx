import { useEffect } from 'react';

function ProjectHeader({ projectName, username, onLogout }) {
  const userInitial = username ? username.charAt(0).toUpperCase() : '?';

  const closeAllMenus = () => {
    document.querySelectorAll('[id$="-dropdown-menu"]').forEach(menu => {
      menu.classList.add('hidden');

      const arrowId = menu.id.replace('-dropdown-menu', '-dropdown-arrow');
      const arrow = document.getElementById(arrowId);
      if (arrow) {
        arrow.classList.remove('text-[var(--logo)]');
        arrow.classList.add('text-gray-400');
      }
    });
  };

  useEffect(() => {
    function initListeners() {

      const toggleDropdown = (buttonId, menuId, arrowId) => {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);
        const arrow = document.getElementById(arrowId);

        if (button && menu) {
          button.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = menu.classList.contains('hidden');

            if (isHidden) {
              closeAllMenus();
            }

            menu.classList.toggle('hidden');

            if (arrow) {
              if (menu.classList.contains('hidden')) {
                arrow.classList.remove('text-[var(--logo)]');
                arrow.classList.add('text-gray-400');
              } else {
                arrow.classList.remove('text-gray-400');
                arrow.classList.add('text-[var(--logo)]');
              }
            }
          });
        }
      };

      document.addEventListener('click', closeAllMenus);

      toggleDropdown('project-dropdown-button', 'project-dropdown-menu', 'project-dropdown-arrow');
      toggleDropdown('user-dropdown-button', 'user-dropdown-menu', 'user-dropdown-arrow');

      return () => {
        document.removeEventListener('click', closeAllMenus);
      };
    }

    const cleanup = initListeners();
    return cleanup;
  }, []);

  return (
    <header className="h-16 text-white shadow-xl flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 flex-shrink-0" style={{ backgroundColor: 'var(--header-bg)' }}>

      {/* HEADER MOBILE */}
      <div id="mobile-only-header" className="flex items-center justify-between w-full md:hidden">
        {/* Esquerda: botão do menu */}
        <button
          id="mobile-menu-toggle"
          className="p-1 rounded-full hover:bg-neutral-800 transition duration-150 flex items-center justify-center"
          title="Menu"
        >
          <svg className="w-6 h-6 text-gray-300 block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>

        {/* Direita: botão do chat */}
        <button
          className="p-2 rounded-full hover:bg-neutral-800 transition duration-150 relative flex items-center justify-center"
          title="Chat do Projeto"
        >
          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z"></path></svg>
          <span className="absolute top-0 right-0 h-2 w-2 bg-[var(--logo)] rounded-full"></span>
        </button>
      </div>

      {/* HEADER DESKTOP */}
      <div id="desktop-full-header" className="h-16 hidden md:flex items-center justify-between w-full">
        {/* Esquerda: logo e projeto atual */}
        <div className="flex items-center space-x-3">
          {/* Logo e nome do site */}
          <a
          href='/'
          className="flex items-center space-x-3 group cursor-pointer transition duration-200"
          >
            <img src="/logo.svg" alt="Logo Bundello" className="logo-img group-hover:opacity-80 transition duration-200" />
            <h1 className="text-2xl font-black tracking-wide text-white group-hover:text-[var(--logo)] transition duration-200">
              Bundello
            </h1>
          </a>

          <div className="flex items-center space-x-2 ml-4 pl-4">
            {/* Botão dos projetos */}
            <a href="/projects" className="p-1 rounded hover:bg-neutral-800 transition duration-150 text-gray-400 hover:text-white" title="Voltar para projetos">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            </a>

            {/* Botão do projeto atual */}
            <div className="relative">
              <button id="project-dropdown-button" className="no-click-hover flex items-center space-x-1 p-1 rounded-lg hover:bg-neutral-800 transition duration-150">
                <h2 className="text-base font-semibold text-white cursor-pointer">
                  {projectName || "Projeto Não Carregado"}
                </h2>
                <svg id="project-dropdown-arrow" className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {/* Opções dropdown do projeto atual */}
              <div id="project-dropdown-menu" className="absolute top-full left-0 mt-2 w-48 bg-neutral-900 rounded-lg shadow-xl z-20 hidden border border-neutral-700/50">
                <a href="#" className="block px-4 py-2 text-base text-gray-200 hover:bg-neutral-800 rounded-t-lg">Renomear</a>
                <a href="#" className="block px-4 py-2 text-base text-gray-200 hover:bg-neutral-800">Alterar ícone</a>
                <a href="#" className="block px-4 py-2 text-base text-red-400 hover:bg-neutral-800 rounded-b-lg">Excluir</a>
              </div>
            </div>
          </div>
        </div>

        {/* Direita: chat e usuário */}
        <div className="flex items-center space-x-4">
          {/* Botão do Chat */}
          <button className="p-2 rounded-full hover:bg-neutral-800 transition duration-150 relative" title="Chat do Projeto">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z"></path></svg>
            <span className="absolute top-0 right-0 h-2 w-2 bg-[var(--logo)] rounded-full"></span>
          </button>

          {/* Botão do usuário */}
          <div className="relative">
            <button id="user-dropdown-button" className="no-click-hover flex items-center space-x-2 p-1 rounded-lg cursor-pointer hover:bg-neutral-800 transition duration-150">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg bg-orange-500 text-white flex-shrink-0"
              >
                {userInitial}
              </div>
              <span className="hidden lg:inline text-base font-semibold">{username || "Usuário"}</span>
              <svg id="user-dropdown-arrow" className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Opções dropdown do usuário */}
            <div id="user-dropdown-menu" className="absolute top-full right-0 mt-2 w-40 bg-neutral-900 rounded-lg shadow-xl z-20 hidden border border-neutral-700/50">
              <a href="#" className="block px-4 py-2 text-base text-gray-200 hover:bg-neutral-800 rounded-t-lg">Editar meu perfil</a>
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-base text-red-400 hover:bg-neutral-800 rounded-b-lg"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ProjectHeader;