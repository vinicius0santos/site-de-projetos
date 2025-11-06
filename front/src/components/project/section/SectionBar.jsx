import '../../../styles/SectionBar.css'
import { useState, useEffect, useContext, Activity, act } from 'react';
import SectionTab from './subComponents/SectionTab';
import MobileSectionButton from './subComponents/MobileSectionButton';
import MobileSectionMenu from './subComponents/MobileSectionMenu';
import NewSectionButton from './subComponents/NewSectionButton';
import Section from '../../../api/Section';
import { ProjectContext } from '../../../context/ProjectContext';
import MenuRename from '../section_list_menus/MenuRename';
import MenuCreate from '../section_list_menus/MenuCreate';

const SERVER_DELAY = 1 * 200;

const SectionBar = () => {
  const { project, section, setSection } = useContext(ProjectContext);
  const [sections, setSections] = useState([]);
  const [isMobileSectionMenuOpen, setIsMobileSectionMenuOpen] = useState(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [reloadSections, setReloadSections] = useState(false);
  const [firstSectionsLoaded, setFirstSectionsLoaded] = useState(false);
  const [showMenuRename, setShowMenuRename] = useState(false);
  const [showMenuCreate, setShowMenuCreate] = useState(false);
  const [activeSection, setActiveSection] = useState({})

  useEffect(() => {
    (async () => {
      if (project && project.id) {
        const allSections = await Section.getAll(project.id);

        if (allSections.length > 0) {
          const selected = allSections.find(s => !s?.is_deleted);
          setSections(allSections);
          awaitToUpdatePath(selected)
        }
      }
      setFirstSectionsLoaded(true);
    })()
  }, [firstSectionsLoaded]);

  useEffect(() => {
    if (firstSectionsLoaded) {
      updateSections();
    }
  }, [reloadSections, firstSectionsLoaded])

  useEffect(() => {
    if (activeSection && firstSectionsLoaded){
      setSection(activeSection);
    }
  }, [activeSection]) 

  useEffect(() => {
    if(!firstSectionsLoaded) return
    awaitToUpdatePath();

  }, [section, firstSectionsLoaded])
  
  const awaitToUpdatePath = (selected = {}) => {
    try{
      if(sections && section && sections.length > 0 ){
        const find = sections.find(s => s?.id == section?.id);
    
        if(find?.id){
          if(!find?.is_deleted){
            setActiveSection(find);
          }
          else setSection({})
        }
      }
      else if(!section){
        setActiveSection(selected)
      }
    }
    catch(err){
      console.log(err.message);
    }
  }

  const updateSections = async () => {
    if (project && project.id) {
      const lastSectionDate = sections[sections.length - 1]?.updated_at || 0;
      const latestSections = await Section.getLatestSections(project.id, lastSectionDate);

      if (latestSections.length > 0) {
        setSections(sections => {
          [...latestSections]
            .forEach((lSection, lSectionIndex) => [...sections]
              .forEach((section, sectionIndex) => {
                if (lSection.id == section.id) {
                  sections[sectionIndex] = lSection;
                  latestSections.splice(lSectionIndex, 1);
                }
                if (activeSection?.id == lSection?.id && !lSection.is_deleted) {
                  setActiveSection(lSection);
                }
                else if (activeSection?.id == lSection?.id && lSection.is_deleted) {
                  if (activeSection.id == lSection.id) {
                    setActiveSection({})
                  }
                }
              }))

          if (latestSections.length > 0) {
            latestSections.forEach(s => {
              if (s.created_by === localStorage.username) {
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

  const handleShowMenuCreate = () => {
    setShowMenuCreate(true);
  }

  const handleAddSection = async (title) => {
    if (project && project.id && title.trim() != '') {
      await Section.create(title, project.id, localStorage.username);

      setIsMobileSectionMenuOpen(false);
      setIsSectionMenuOpen(false);
      setShowMenuCreate(false);
    }
  };

  const handleSelectSection = (section) => {
    setActiveSection(section);
    setIsMobileSectionMenuOpen(false);
    setIsSectionMenuOpen(false);
  };

  const handleShowMenuRename = () => {
    setShowMenuRename(true);
    setIsSectionMenuOpen(false);
  };

  const handleRenameSection = async (id, newTitle) => {
    if (newTitle.trim() != '') {
      await Section.rename(id, newTitle)
      setShowMenuRename(false)
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

      {showMenuRename && activeSection && activeSection?.id &&
        <MenuRename
          activeComponent={activeSection}
          handleRename={handleRenameSection}
          setShowOverlay={setShowMenuRename}
          label={'Título da seção'}
          />
        }

      {showMenuCreate &&
        <MenuCreate
        handleCreate={handleAddSection}
        setShowOverlay={setShowMenuCreate}
        label={'Título da seção'}
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
              handleRenameSection={handleShowMenuRename}
              handleDeleteSection={handleDeleteSection}
              handleToggleSectionMenu={handleToggleSectionMenu}
            />
          ))}
        <NewSectionButton handleAddSection={handleShowMenuCreate} />
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
