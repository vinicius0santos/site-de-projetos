export default function MobileDropdown({ 
  isMobileSectionMenuOpen,
  sections,
  activeSectionId,
  handleSelectSection,
  handleAddSection
}) {
  return (
    <div 
      id="mobile-section-menu" 
      className={`absolute top-full left-1/2 transform -translate-x-1/2 
                        max-w-xs w-[90vw] bg-neutral-900 shadow-2xl z-50 
                        rounded-b-xl border border-t-0 border-neutral-700/50 
                        ${isMobileSectionMenuOpen ? '' : 'hidden'}`
      }
    >
      <div id="mobile-section-list" className="p-2">
        {sections.map(section => (
          <button 
            key={section.id} 
            data-section={section.name} 
            className={`section-item flex items-center w-full p-3 rounded-lg hover:bg-neutral-800 transition duration-150 text-lg 
                            ${section.id === activeSectionId 
                                ? 'text-white font-bold bg-neutral-800' 
                                : 'text-gray-400'
                            }`
            }
            onClick={() => handleSelectSection(section.id)}
          >
            {section.name}
          </button>
        ))}
                
        <button 
          onClick={handleAddSection}
          className="flex items-center w-full space-x-2 p-3 rounded-lg text-[--logo] mt-2 text-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
          <span>Adicionar nova seção</span>
        </button>
      </div>
    </div>
  );
};
