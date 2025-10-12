import '../styles/Auth.css'
import User from '../api/User';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from '../context/AlertContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { _alert } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }
  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  const loginUser = async ({ target }) => {
    target.disabled = true;

    if (!username || !password) {
      _alert.show('Preencha todos os campos');
    }
    else{
      const user = new User(username, password);
      const result = await user.login();
      
      if (result.success) {
        navigate('/projects');
      }
      else if (result.serverError) {
        _alert.show('Não foi possível se conectar ao servidor');
      }
      else {
        _alert.show('Usuário ou senha incorreta');
      }
    }
    target.disabled = false;

  }

  return (
    <section className='login'>
      <article className="container">
        <h1>Entre na sua conta</h1>

        <form id='login-form' onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <label>Usuário</label>
            <input type='text' value={username} onChange={handleUsername} />
            <label>Senha</label>
            <input type='password' value={password} onChange={handlePassword} />
          </fieldset>
          <button onClick={loginUser}>Entrar</button>
        </form>

        <p>Novo por aqui? <Link to='/signup'>Crie sua conta</Link></p>
      </article>
    </section>
  )
}