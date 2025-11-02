import '../../../styles/SectionBar.css'
import { useState, useEffect, useContext, Activity, act } from 'react';
import SectionTab from './subComponents/SectionTab';
import MobileSectionButton from './subComponents/MobileSectionButton';
import MobileSectionMenu from './subComponents/MobileSectionMenu';
import NewSectionButton from './subComponents/NewSectionButton';
import Section from '../../../api/Section';
import { ProjectContext } from '../../../context/ProjectContext';
import RenameMenu from './subComponents/RenameMenu';

const SERVER_DELAY = 1 * 200;

const SectionBar = () => {
  const { project } = useContext(ProjectContext);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState({});
  const [isMobileSectionMenuOpen, setIsMobileSectionMenuOpen] = useState(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [reloadSections, setReloadSections] = useState(false);
  const [firstSectionsLoaded, setFirstSectionsLoaded] = useState(false);
  const [showRenameMenu, setShowRenameMenu] = useState(false);
  const [activeSection, setActiveSection] = useState({})
  const { setSection } = useContext(ProjectContext);

  useEffect(() => {
    (async () => {
      if (project && project.id) {
        const allSections = await Section.getAll(project.id);

        if (allSections.length > 0) {
          const selected = allSections.find(s => !s?.is_deleted);
          setSections(allSections);
          setActiveSection(selected);
        }
      }
      setFirstSectionsLoaded(true);
    })()
  }, []);

  useEffect(() => {
    if (firstSectionsLoaded) {
      updateSections();
    }
  }, [reloadSections, firstSectionsLoaded])

  useEffect(() => {
    if(activeSection) setSection(activeSection);
  }, [activeSection])

  const updateSections = async () => {
    if (project && project.id) {
      const lastSectionDate = sections[sections.length - 1]?.updated_at || 0;
      const latestSections = await Section.getLatestSections(project.id, lastSectionDate);

      if (latestSections.length > 0) {
        setSections(sections => {
          [...latestSections]
          .forEach((lSection, lSectionIndex) => [...sections]
          .forEach((section, sectionIndex) => {
            if(lSection.id == section.id){
              sections[sectionIndex] = lSection;
              latestSections.splice(lSectionIndex, 1);
            }
            if(activeSection?.id == lSection?.id && !lSection.is_deleted){
              setActiveSection(lSection);
            }
            else if(activeSection?.id == lSection?.id && lSection.is_deleted){
              if(activeSection.id == lSection.id){
                setActiveSection({})
              }
            }
          }))

          if(latestSections.length > 0){
            latestSections.forEach(s => {
              if(s.created_by === localStorage.username){
                setActiveSection(latestSections[latestSections.length - 1]);
              }
            })
            sections = [...sections, ...latestSections];
          }
          return sections.sort((a, b) => a.updated_at - b.updated_at);
        })
      }
    }

    setTimeout(() => setReloadSections(!reloadSections), SERVER_DELAY);
  }

  const handleAddSection = async () => {
    if (project && project.id) {
      Section.create('Nova seção', project.id, localStorage.username);

      setIsMobileSectionMenuOpen(false);
      setIsSectionMenuOpen(false);
    }
  };

  const handleSelectSection = (section) => {
    setActiveSection(section);

    setIsMobileSectionMenuOpen(false);
    setIsSectionMenuOpen(false);
  };

  const handleShowRenameMenu = async (section) => {
    setSelectedSection(section);
    setShowRenameMenu(true);
    setIsSectionMenuOpen(false);
  };

  const handleRenameSection = async (id, newTitle) => {
    if (newTitle.trim() != '') {
      await Section.rename(id, newTitle)
      setShowRenameMenu(false)
    }
  };

  const handleDeleteSection = async (id) => {
    await Section.delete(id)
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
      {
        showRenameMenu &&
        <RenameMenu
          section={selectedSection}
          handleRename={handleRenameSection}
          setShowOverlay={setShowRenameMenu}
        />
      }

      {/* DESKTOP */}
      <div id="desktop-section-tabs" className="hidden md:flex items-center space-x-1 overflow-x-visible whitespace-nowrap">
        {sections
          .filter(section => !section.is_deleted)
          .sort((a, b) => a._order - b._order)
          .map(section => (
            <SectionTab
              key={section.id}
              section={section}
              isActive={section.id === activeSection?.id}
              isSectionMenuOpen={isSectionMenuOpen}
              handleSelectSection={handleSelectSection}
              handleRenameSection={handleShowRenameMenu}
              handleDeleteSection={handleDeleteSection}
              handleToggleSectionMenu={handleToggleSectionMenu}
            />
          ))}
        <NewSectionButton handleAddSection={handleAddSection} />
      </div>

      {/* MOBILE */}
      <MobileSectionButton
        isMobileSectionMenuOpen={isMobileSectionMenuOpen}
        activeSection={activeSection}
        setIsMobileSectionMenuOpen={setIsMobileSectionMenuOpen}
        setIsSectionMenuOpen={setIsSectionMenuOpen}
      />

      <MobileSectionMenu
        isMobileSectionMenuOpen={isMobileSectionMenuOpen}
        sections={sections}
        activeSectionId={activeSection?.id}
        handleSelectSection={handleSelectSection}
        handleAddSection={handleAddSection}
      />
    </div>
  );
};

export default SectionBar;
