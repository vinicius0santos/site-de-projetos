export default function DesktopList({
  list, 
  handleDeleteList, 
  handleSelectList, 
  isActive,
  handleRenameList,
}){
  const activeStyle = isActive ? {backgroundColor: '#555'} : {};
  const buttonStyle = {
    border: 'solid 2px #444'
  }

  return (
    <div className="desktop-list">
      <label onClick={() => handleSelectList(list)} style={activeStyle}>
        {list.title}
      </label>
      <label> --- </label>
      <button onClick={() => handleDeleteList(list)} style={buttonStyle}>deletar</button>
      <label> --- </label>
      <button onClick={() => handleRenameList(list)} style={buttonStyle}>renomear</button>
    </div>
  )
}