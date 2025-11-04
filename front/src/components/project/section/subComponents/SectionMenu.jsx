import { useEffect, useRef } from "react";

export default function SectionMenu({
  handleRenameSection,
  handleDeleteSection,
  section,
  sectionTab,
  isActive
}) {
  const sectionMenu = useRef(null);

  useEffect(() => {
    const tabRect = sectionTab.current.getBoundingClientRect();
    sectionMenu.current.style.left = tabRect.left + 'px';
    sectionMenu.current.style.top = tabRect.bottom-2 + 'px';
    sectionMenu.current.style.width = tabRect.width + 'px';
  }, [])

  const openMenuRename = () => {
    if(isActive){
      handleRenameSection(section.id) 
    }
  }

  return (
    <div
      ref={sectionMenu}
      id="active-section-menu"
      className="w-full absolute top-full left-0 mt-0.5 bg-neutral-900 rounded-lg shadow-xl z-50 transition-opacity duration-200 border border-neutral-700/50"
    >
      <button
        onClick={(e) => { e.stopPropagation(); openMenuRename(); }}
        className="w-full text-left block px-3 py-2 text-sm text-gray-200 hover:bg-neutral-800 rounded-t-lg"
      >
        Renomear
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); handleDeleteSection(section.id); }}
        className="w-full text-left block px-3 py-2 text-sm text-red-400 hover:bg-neutral-800 rounded-b-lg"
      >
        Excluir
      </button>
    </div>
  );
};
