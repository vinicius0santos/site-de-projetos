import { useEffect, useRef, useState } from 'react'
import '../../../styles/Rename_Create_Menu.css'

export default function MenuCreate({setShowOverlay, handleCreate, label}){
  const [title, setTitle] = useState('');

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
          <button onClick={() => handleCreate(title)} type='submit'>Criar</button>
        </div>
      </form>
    
    </section>
  ) 
}