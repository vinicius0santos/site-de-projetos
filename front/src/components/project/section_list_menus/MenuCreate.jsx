import { useEffect, useRef, useState } from 'react'
import '../../../styles/RenameMenu.css'

export default function MenuCreate({setShowOverlay, handleCreate, label}){
  const [title, setTitle] = useState('');

  return (
    <section className="rename-menu">
      <div className="overlay" onClick={() => setShowOverlay(false)}></div>

      <form className="rename-form" onSubmit={(event) => event.preventDefault()}>
        <div className="input">
          <label>{label}</label>
          <input autoFocus type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>
        
        <div className="buttons">
          <button onClick={() => handleCreate(title)} type='submit'>Criar</button>
          <button onClick={() => setShowOverlay(false)} type='button'>Cancelar</button>
        </div>
      </form>
    
    </section>
  ) 
}