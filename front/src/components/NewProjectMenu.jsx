import '../styles/newProjectMenu.css'
import { useState } from "react"

export default function NewProjectMenu({createProject, setShowOverlay, isCreating}){
  const [name, setName] = useState('');
  const [file, setFile] = useState({});

  return (
    <div className="new-project-menu">
      <div className="overlay" onClick={() => setShowOverlay(false)}></div>

      <main>
        <span className="close" onClick={() => setShowOverlay(false)}>X</span>
        
        <h4>Novo Projeto</h4>
        <div>
          <input type="text" placeholder='Nome do projeto' value={name} onChange={({target}) => setName(target.value)}/>
        </div>
        <div>
          <label htmlFor="file" className="file">{file?.name ? file.name : "Escolha um arquivo"}</label>
          <input type="file" id="file" onInput={({target}) => setFile(target.files[0])}/>
        </div>
        <button onClick={() => createProject(name, file)} disabled={isCreating}>Criar</button>
      </main>
    </div>
  )
}