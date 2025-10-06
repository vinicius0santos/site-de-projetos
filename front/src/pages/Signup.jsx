import '../styles/Auth.css'
import User from '../api/User';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    try{
      if(!username || !password || !confirmPassword){
        console.log('preencha todos os campos');
        return;
      }
      if(password != confirmPassword){
        console.log('as senhas não coincidem');
        return;
      }
      if(password.length < 6){
        console.log('a senha precisa ter no minimo 6 caracteres');
        return;
      }
      
      const user = new User(username, password);
      const result = await user.create();
      
      if(result && result.success){
        navigate('/login');
      }
      else{
        console.log('error ao criar a conta, tente novamente');
      }
    }
    catch(err){
      console.log(err);
    }
    finally{
      target.disabled = false;
    }
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