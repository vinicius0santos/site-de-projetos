import { useState, useEffect } from 'react';
import SectionTab from './subComponents/SectionTab';
import MobileSectionButton from './subComponents/MobileSectionButton';
import MobileSectionMenu from './subComponents/MobileSectionMenu';
import NewSectionButton from './subComponents/NewSectionButton';

const initialSections = [
  { id: 1, name: "História" },
  { id: 2, name: "Personagens" },
  { id: 3, name: "Ato 1" },
];

const SectionBar = () => {
  const [sections, setSections] = useState(initialSections);
  const [activeSectionId, setActiveSectionId] = useState(
    sections?.length ? sections[0].id : false
  );

  const [isMobileSectionMenuOpen, setIsMobileSectionMenuOpen] = useState(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);

  const activeSection = sections.find(s => s.id === activeSectionId);

  // Adicionar seção
  const handleAddSection = () => {
    const newSection = { id: Date.now(), name: `Nova seção ${sections.length + 1}` };
    setSections(prevSections => [...prevSections, newSection]);
    setActiveSectionId(newSection.id);
    setIsMobileSectionMenuOpen(false);
    setIsSectionMenuOpen(false);
  };

  // Selecionar seção
  const handleSelectSection = (id) => {
    setActiveSectionId(id);
    setIsMobileSectionMenuOpen(false);
    setIsSectionMenuOpen(false);
  };

  // Renomear seção atual
  const handleRenameSection = () => {
    // Adicionar lógica de renomear aqui
    setIsSectionMenuOpen(false);
  };

  // Deletar seção atual
  const handleDeleteSection = () => {
    // Adicionar lógica pra deletar a seção aqui
    setIsSectionMenuOpen(false);
  };

  const handleToggleSectionMenu = () => {
    setIsSectionMenuOpen(prev => !prev);
    setIsMobileSectionMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsMobileSectionMenuOpen(false);
      setIsSectionMenuOpen(false);
    };

    if (isMobileSectionMenuOpen || isSectionMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileSectionMenuOpen, isSectionMenuOpen]);

  return (
    <div id="section-bar" className="relative border-b border-gray-700/50 px-4 sm:px-6 bg-[--board-bg]">

      {/* DESKTOP */}
      {/* Abas das seções */}
      <div id="desktop-section-tabs" className="hidden md:flex items-center space-x-1 overflow-x-visible whitespace-nowrap">
        {sections.map(section => (
          <SectionTab
            key={section.id}
            section={section}
            isActive={section.id === activeSectionId}
            isSectionMenuOpen={isSectionMenuOpen}
            handleSelectSection={handleSelectSection}
            handleRenameSection={handleRenameSection}
            handleDeleteSection={handleDeleteSection}
            handleToggleSectionMenu={handleToggleSectionMenu}
          />
        ))}
        {/* Botão de nova seção */}
        <NewSectionButton
          handleAddSection={handleAddSection}
        />
      </div>

      {/* MOBILE */}
      {/* Botão das seções */}
      <MobileSectionButton
        isMobileSectionMenuOpen={isMobileSectionMenuOpen}
        activeSection={activeSection}
        setIsMobileSectionMenuOpen={setIsMobileSectionMenuOpen}
        setIsSectionMenuOpen={setIsSectionMenuOpen}
      />

      {/* Menu das seções */}
      <MobileSectionMenu
        isMobileSectionMenuOpen={isMobileSectionMenuOpen}
        sections={sections}
        activeSectionId={activeSectionId}
        handleSelectSection={handleSelectSection}
        handleAddSection={handleAddSection}
      />
    </div>
  );
};

export default SectionBar;
