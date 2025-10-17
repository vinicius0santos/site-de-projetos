import '../styles/Auth.css'
import User from '../api/User';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from '../context/AlertContext';

export default function Signup(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { _alert } = useContext(AlertContext);
  
  const navigate = useNavigate();

  const handleUsername = ({target}) => {
    setUsername(target.value)
  }
  const handlePassword = ({target}) => {
    setPassword(target.value)
  }
  const handleConfirmPassword = ({target}) => {
    setConfirmPassword(target.value)
  }

  const createUser = async ({target}) => {
    target.disabled = true;

    if(!username || !password || !confirmPassword){
      _alert.show('Preencha todos os campos')
    }
    else if(password != confirmPassword){
      _alert.show('As senhas não coincidem')
    }
    else if(password.length < 6){
      _alert.show('A senha precisa ter no mínimo 6 caracteres')
    }
    else{
      const user = new User(username, password);
      const result = await user.create();
      
      if(result.success){
        navigate('/login');
      }
      else{
        _alert.show('O usuário digitado já existe.')
      }
    }
    target.disabled = false;
  }

  return (
    <section className='signup'>
      <article className="container">
        <h1>Entre na sua conta</h1>

        <form id="signup-form" onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <label>Usuário</label>
            <input type="text" value={username} onChange={handleUsername} />
            <label>Senha</label>
            <input type="password" value={password} onChange={handlePassword} />
            <label>Confirmar senha</label>
            <input type="password" value={confirmPassword} onChange={handleConfirmPassword} />
          </fieldset>
          <button onClick={createUser}>Criar conta</button>
        </form>

        <p>Já tem uma conta? <Link to="/login">Entre</Link></p>
      </article>
    </section>
  )
}