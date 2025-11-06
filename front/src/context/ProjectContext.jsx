import { createContext, useState } from 'react';

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(null);
  const [section, setSection] = useState(null);
  const [list, setList] = useState(null);
  const [chatRedirect, setChatRedirect] = useState(null);

  return (
    <ProjectContext.Provider value={{ 
      project, 
      setProject, 
      section, 
      setSection,
      list,
      setList,
      chatRedirect,
      setChatRedirect
    }}>
      {children}
    </ProjectContext.Provider>
  );
}