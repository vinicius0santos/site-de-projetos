import { useState } from 'react'
import '../../../styles/RenameMenu.css'

export default function MenuRename({setShowOverlay, activeComponent, handleRename, label}){
  const [title, setTitle] = useState(activeComponent?.title);

  return (
    <section className="rename-menu">
      <div className="overlay" onClick={() => setShowOverlay(false)}></div>

      <form className="rename-form" onSubmit={(event) => event.preventDefault()}>
        <div className="input">
          <label>{label}</label>
          <input autoFocus type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>
        
        <div className="buttons">
          <button onClick={() => handleRename(activeComponent.id, title)} type='submit'>Salvar</button>
          <button onClick={() => setShowOverlay(false)} type='button'>Cancelar</button>
        </div>
      </form>
    
    </section>
  )
}