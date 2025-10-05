import '../styles/Login.css'
import User from '../api/User';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (btn) => {
    btn.disabled = true;

    try{
      if(!username || !password){
        console.log('preencha todos os campos');
        return;
      }
      
      const user = new User(username, password);
      const result = await user.login();
      
      if(result && result.success){
        navigate('/projects');
      }
      else{
        console.log('usuario ou senha invalidos');
      }
    }
    catch(err){
      console.log(err);
    }
    finally{
      btn.disabled = false;
    }
  }

  return (
    <div className='login'>
      <input type='text' value={username} onChange={({target}) => setUsername(target.value)}/>
      <input type='text' value={password} onChange={({target}) => setPassword(target.value)}/>
      <button onClick={({target}) => loginUser(target)}>Entrar</button>
    </div>
  )
}