import { useState } from 'react'
import '../../styles/MenuDelete.css'

export default function MenuDelete({setShowOverlay, handleDelete, activeComponent, label}){
  return (
    <section className="menu-delete">
      <div className="overlay" onClick={() => setShowOverlay(false)}></div>

      <form className='container' onSubmit={(event) => event.preventDefault()}>
        <h3>Deletar {label}?</h3>
        <p>Você tem certeza que deseja continuar?</p>

        <div className='buttons-delete'>
          <button id='cancel' onClick={() => setShowOverlay(false)} type='button'>Cancelar</button>
          <button id='delete' autoFocus onClick={() => handleDelete(activeComponent?.id)} type='submit'>Deletar</button>
        </div>
      </form>
    
    </section>
  )
}