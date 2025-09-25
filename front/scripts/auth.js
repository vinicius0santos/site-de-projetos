import User from './userConnectApi.js';

const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.querySelector('button[type="submit"]');
    btn.disabled = true;

    try {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const confirm = document.getElementById('confirmPassword').value;

      if (!username) {
        alert('Por favor, digite um nome de usuário.');
        return;
      }

      if (password !== confirm) {
        alert('As senhas não coincidem. Verifique e tente novamente.')
        return;
      }

      if (password.length < 6) {
        alert('A senha precisa ter no mínimo 6 caracteres.');
        return;
      }

      const user = new User(username, password);
      const result = await user.create();

      if (result && result.success) {
        alert('Sua conta foi criada com sucesso!')
        window.location.href = '../index.html';
      } else {
        alert('Erro ao criar a conta. Por favor, tente novamente.');
      }
    } catch (err) {
      console.error(err);
      alert('Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.');
    } finally {
      btn.disabled = false;
    }
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = loginForm.querySelector('button[type="submit"]');
    btn.disabled = true;

    try {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('username').value;

      if (!username || !password) {
        alert('Preencha todos os campos.');
        return;
      }

      const user = new User(username, password);
      const result = await user.login();

      if (result && result.success) {
        alert('Login realizado com sucesso!');
        window.location.href = '../pages/projects.html';
      } else {
        console.log(result.data)
        alert('Usuário ou senha inválidos.');
      }
    } catch (err) {
      console.error(err);
      alert('Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.');
    } finally {
      btn.disabled = false;
    }
  });
}
