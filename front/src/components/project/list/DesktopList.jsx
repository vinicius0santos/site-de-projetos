import ListOptions from "./ListOptions";
import "../../../styles/DesktopList.css"
export default function DesktopList({
  list, 
  handleDeleteList, 
  handleSelectList, 
  isActive,
  handleRenameList,
}){
  return (
    <div className="list-container">
      <header className="list-header">
        <label 
          onClick={() => handleSelectList(list)}
          className="list-title"
        >
          {list.title}
        </label>
        <ListOptions 
          list={list}
          handleRenameList={handleRenameList}
          handleDeleteList={handleDeleteList}
        />
      </header>

      <div className="card-area">

      </div>

      <footer className="add-card-footer">
        <button 
          onClick={() => {}}
          className="add-card-button"
        >
          <span className="plus-icon">+</span>
          Adicionar um card
        </button>
        <button 
          onClick={() => {}}
          className="image-icon"
        >
          <img src="../../../../public/image.svg" width="22"></img>
        </button>
      </footer>
    </div>
  )
}