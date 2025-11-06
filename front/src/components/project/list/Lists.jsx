import { act, useContext, useEffect, useState } from 'react';
import '../../../styles/List.css';
import DesktopList from './DesktopList';
import List from '../../../api/List';
import { ProjectContext } from '../../../context/ProjectContext';
import MenuRename from '../section_list_menus/MenuRename';
import MenuCreate from '../section_list_menus/MenuCreate';

const SERVER_DELAY = 1 * 200;

export default function Lists() {
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState({});
  const [reloadLists, setReloadLists] = useState(false);
  const [firstListsLoaded, setFirstListsLoaded] = useState(false);
  const { section, setList, list } = useContext(ProjectContext);
  const [showMenuRename, setShowMenuRename] = useState(false);
  const [showMenuCreate, setShowMenuCreate] = useState(false);

  useEffect(() => {
    setFirstListsLoaded(false);
    if (section && section?.id) {
      (async () => {
        const allLists = await List.getAll(section.id);
        setLists(allLists);
        setFirstListsLoaded(true);
      })()
    }
  }, [section])

  useEffect(() => {
    if (activeList && firstListsLoaded){
      setList(activeList);
    } 
  }, [activeList]) 

  useEffect(() => {
    if(!firstListsLoaded) return
    awaitToUpdatePath();

  }, [list, firstListsLoaded])
  
  const awaitToUpdatePath = (selected = {}) => {
    try{
      if(lists && list && lists.length > 0 ){
        const find = lists.find(l => l?.id == list?.id);
    
        if(find?.id){
          if(!find?.is_deleted){
            setActiveList(find);
          }
          else setList({})
        }
      }
      else if(!list){
        setActiveList(selected)
      }
    }
    catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (firstListsLoaded) {
      updateLists();
    }
  }, [reloadLists, firstListsLoaded])

  const updateLists = async () => {
    if (section && section?.id) {
      const lastListDate = lists[lists.length - 1]?.updated_at || 0;
      const latestLists = await List.getLatestLists(section.id, lastListDate);

      if (latestLists.length > 0) {
        setLists(lists => {
          [...latestLists]
            .forEach((lList, lListIndex) => [...lists]
              .forEach((list, listIndex) => {
                if (lList.id == list.id) {
                  lists[listIndex] = lList;
                  latestLists.splice(lListIndex, 1);
                }
                if (activeList?.id == lList?.id && !lList.is_deleted) {
                  setActiveList(lList);
                }
                else if (activeList?.id == lList?.id && lList.is_deleted) {
                  if (activeList.id == lList.id) {
                    setActiveList({})
                  }
                }
              }))

          if (latestLists.length > 0) {
            latestLists.forEach(s => {
              if (s.created_by === localStorage.username) {
                setActiveList(latestLists[latestLists.length - 1]);
              }
            })
            lists = [...lists, ...latestLists];
          }
          return lists.sort((a, b) => a.updated_at - b.updated_at);
        })
      }
    }

    setTimeout(() => setReloadLists(!reloadLists), SERVER_DELAY);
  }

  // SELECIONAR LISTA
  const handleSelectList = (list) => {
    setActiveList(list)
  }

  // ABRIR POPUP PARA CRIAR LISTA
  const handleShowMenuCreate = () => {
    setShowMenuCreate(true);
  }

  // CRIAR NOVA LISTA
  const handleAddList = async (title) => {
    if (section && section?.id && title.trim() != '') {
      await List.create(title, section.id, localStorage.username)
      setShowMenuCreate(false);
    }
  }

  // DELETAR LISTA
  const handleDeleteList = async (id) => {
    await List.delete(id);
  }

  // ABRIR POPUP PARA RENOMEAR LISTA
  const handleShowMenuRename = (list) => {
    setActiveList(list)
    setShowMenuRename(true);
  }

  // RENOMEAR LISTA
  const handleRenameList = async (id, newTitle) => {
    if (newTitle.trim() != '') {
      await List.rename(id, newTitle)
      setShowMenuRename(false);
    }
  }

  // OBTER COMPONENTES DE LISTA DE DESKTOP
  const getDesktopListComponents = () => {
    return lists
      .filter(list => !list.is_deleted)
      .sort((a, b) => a._order - b._order)
      .map(list =>
        <DesktopList
          list={list}
          key={list.id}
          handleDeleteList={handleDeleteList}
          handleSelectList={handleSelectList}
          handleRenameList={handleShowMenuRename}
          isActive={list.id == activeList?.id}
        />
      )
  }

  return (
    <div className='lists'>
      {showMenuRename && activeList && activeList?.id &&
        <MenuRename
          activeComponent={activeList}
          handleRename={handleRenameList}
          setShowOverlay={setShowMenuRename}
          label={'Título da lista'}
          />
        }
      {showMenuCreate &&
        <MenuCreate
          activeComponent={activeList}
          handleCreate={handleAddList}
          setShowOverlay={setShowMenuCreate}
          label={'Título da lista'}
        />
      }

      <div className='lists-container'>
        {section && section?.id &&
          <>
            {getDesktopListComponents()}
            <button onClick={() => handleShowMenuCreate()}>adicionar</button>
          </>
        }
      </div>
    </div>
  )
}
