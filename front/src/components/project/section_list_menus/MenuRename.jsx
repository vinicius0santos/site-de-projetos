import { useState } from 'react'
import '../../../styles/Rename_Create_Menu.css'

export default function MenuRename({setShowOverlay, activeComponent, handleRename, label}){
  const [title, setTitle] = useState(activeComponent?.title);

  return (
    <section className="section_list-menu">
      <div className="overlay" onClick={() => setShowOverlay(false)}></div>

      <form onSubmit={(event) => event.preventDefault()}>
        <div className="input">
          <label>{label}</label>
          <input autoFocus type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>
        
        <div className="buttons">
          <button onClick={() => setShowOverlay(false)} type='button'>Cancelar</button>
          <button onClick={() => handleRename(activeComponent.id, title)} type='submit'>Salvar</button>
        </div>
      </form>
    
    </section>
  )
}