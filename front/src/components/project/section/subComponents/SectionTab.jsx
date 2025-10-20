import SectionMenu from './SectionMenu';

export default function SectionTab({ 
  section, 
  isActive, 
  isSectionMenuOpen,
  handleSelectSection, 
  handleRenameSection,
  handleDeleteSection,
  handleToggleSectionMenu
}) {
  return (
    <div 
      className={`flex items-center group relative cursor-pointer
                  ${isActive 
                      ? 'font-bold text-white border-b-2 border-[--logo]' 
                      : 'font-medium text-gray-400 hover:text-white hover:bg-neutral-800 rounded-t border-b-2 border-transparent'
                  }`
      }
      onClick={(e) => {
        e.stopPropagation();
        if (isActive) {
            handleToggleSectionMenu();
        } else {
            handleSelectSection(section.id);
        }
      }}
    > 
      {/* Botão com o nome da seção */}
      <button 
        data-section-name={section.name} 
        className={`${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
                    section-tab flex-grow px-3 py-2 text-sm transition duration-150 focus:outline-none`
                  }
      >
        <span>{section.name}</span>
      </button>

      {/* Botão dropdown da seção */}
      {isActive && (
        <div 
          id="active-section-dropdown-button" 
          className={`${isSectionMenuOpen ? 'text-[--logo]' : 'text-gray-400'} p-1 mr-2 ml-auto transition duration-150`}
          onClick={(e) => {
            e.stopPropagation(); 
            handleToggleSectionMenu(); 
          }}
        >
          <svg 
            className={"w-4 h-4"}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      )}
            
      {/* Menu da seção */}
      {isActive && isSectionMenuOpen && (
        <SectionMenu 
          handleRenameSection={handleRenameSection}
          handleDeleteSection={handleDeleteSection}
        />
      )}
    </div>
  );
};
