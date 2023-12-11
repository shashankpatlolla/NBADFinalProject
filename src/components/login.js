// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [LoginMessage, setLoginMessage] = useState('');
  const history = useNavigate();

  const handleLogin = async () => {
    // Add your login logic here
    // For now, simply navigate to the home page on successful login
    //history('/home');
    try {
      const response = await axios.post('http://137.184.208.233:5000/api/login', { username, password });
      //localStorage.setItem('token', response.data.token);
      if (response.status === 200) {
        //localStorage.setItem('token', response.data.token);
        //console.log("value os set token is:",response.data.token);
        const {token, expiresIn} = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expiresIn * 1000);
        console.log("value od the token expiration is:",expiresIn * 1000);
        localStorage.setItem('username', username); // Save the username in local storage
        history('/home');
      } else {
        setLoginMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage('Internal server error');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <form style={styles.form}>
        <label style={styles.label}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="button" onClick={handleLogin} style={styles.button}>
          Login
        </button>
        {LoginMessage && (
          <div style={styles.message}>{LoginMessage}</div>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  label: {
    marginBottom: '8px',
  },
  input: {
    padding: '8px',
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: 'red',
  },
};

export default Login;
