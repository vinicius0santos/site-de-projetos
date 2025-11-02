import { useState } from 'react'
import '../../../../styles/RenameMenu.css'

export default function RenameMenu({setShowOverlay, section, handleRename}){
  const [title, setTitle] = useState(section?.title)

  return (
    <section className="rename-menu">
      <div className="overlay" onClick={() => setShowOverlay(false)}></div>

      <article className="rename-form">
        <div className="input">
          <label>Título</label>
          <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>
        
        <div className="buttons">
          <button onClick={() => handleRename(section.id, title)}>Salvar</button>
          <button onClick={() => setShowOverlay(false)}>Cancelar</button>
        </div>
      </article>
    
    </section>
  )
}