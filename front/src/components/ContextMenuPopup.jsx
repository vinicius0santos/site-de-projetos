import { useEffect, useRef } from 'react';
import '../styles/ContextMenuPopup.css'

export default function ContextMenuPopup({ text, cursorX, cursorY }) {
  const popupRef = useRef(null);
  
  useEffect(() => {
    if(popupRef.current){
      popupRef.current.style.left = cursorX + 'px'
      popupRef.current.style.top = cursorY + 'px'
    }
  }, [])

  async function copyPathToClipboard() {
    if (text && text.trim() != '') {
      try {
        await navigator.clipboard.writeText(text);
      } 
      catch (err) {}
    }
  }
  
  async function copySelectionToClipboard() {
    try {
      if(window.getSelection().rangeCount > 0){
        const selection = window.getSelection().toString();
        await navigator.clipboard.writeText(selection);
      }
    } 
    catch (err) {}
  }

  return (
    <div className="context-menu-popup" ref={popupRef}>
      <div className='context-menu-button' onClick={copyPathToClipboard}>
        <button>Copiar caminho</button>
      </div>
      <div className='context-menu-button' onClick={copySelectionToClipboard}>
        <button>Copiar seleção</button>
      </div>
    </div>
  )
}