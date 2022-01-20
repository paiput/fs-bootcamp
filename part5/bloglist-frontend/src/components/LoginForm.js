import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import Notification from './Notification';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const user = await loginService.login({ username, password });
      localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user);
      setUsername('');
      setPassword('');
    } catch(error) {
      setErrorMsg(error.response.data.error);
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {errorMsg && <Notification type="error" msg={errorMsg} />}
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