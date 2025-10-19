export default function DesktopProjectOptionsButton({toggleProjectMenu, project, isProjectMenuOpen}){
  return (
    <div className="relative">
      <button
        id="project-dropdown-button"
        onClick={toggleProjectMenu}
        className="flex items-center space-x-1 p-1 rounded-lg"
      >
        <h2 className="text-base font-semibold text-white cursor-pointer">
          {project?.name || "Projeto não carregado"}
        </h2>
        <svg
          id="project-dropdown-arrow"
          className={`${isProjectMenuOpen ? 'text-[var(--logo)]' : 'text-gray-400'} w-4 h-4 ml-1`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Opções dropdown do projeto atual */}
      <div
        id="project-dropdown-menu"
        onClick={(e) => e.stopPropagation()}
        className={`${isProjectMenuOpen ? '' : 'hidden'} absolute top-full left-0 mt-2 w-48 bg-neutral-900 rounded-lg shadow-xl z-20 border border-neutral-700/50`}
      >
        <a href="#" className="block px-4 py-2 text-base text-gray-200 hover:bg-neutral-800 rounded-t-lg">Renomear</a>
        <a href="#" className="block px-4 py-2 text-base text-gray-200 hover:bg-neutral-800">Alterar ícone</a>
        <a href="#" className="block px-4 py-2 text-base text-red-400 hover:bg-neutral-800 rounded-b-lg">Excluir</a>
      </div>
    </div>
  )
}