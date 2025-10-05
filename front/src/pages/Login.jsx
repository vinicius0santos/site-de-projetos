import { useContext } from 'react'
import '../styles/Login.css'
import { AuthContext } from '../context/AuthContent'

export default function Login(){
  const {login, logout} = useContext(AuthContext);

  return (
    <div className='login'>

    </div>
  )
}