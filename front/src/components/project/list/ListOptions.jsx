import { useEffect, useRef, useState } from "react"
import "../../../styles/ListOptions.css"

export default function ListOptions({ list, handleRenameList, handleDeleteList }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="options-container" ref={containerRef}>
      <button 
        onClick={toggleMenu}
        className={`toggle-button ${isOpen ? 'active' : ''}`}
      >
        ...
      </button>
      {isOpen && (
        <div className="toggle-button-menu">
          <button onClick={() => {handleRenameList(list); setIsOpen(false);}}>Renomear</button>
          <button
            onClick={() => {handleDeleteList(list); setIsOpen(false);}} className="delete-button">Deletar</button>
        </div>
      )}
    </div>
  )
}
