import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginService.login({ username, password });
    localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user);
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleUsernameChange}
      />
      <br />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <br />
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;