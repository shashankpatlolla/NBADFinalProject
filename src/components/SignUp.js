// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const navigate  = useNavigate();
  const handleSignUp = async () => {
    try {
      // Send the user details to the backend to save in MongoDB
      const response = await axios.post('http://137.184.208.233:5000/api/signup', { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username); // Save the username in local storage
      console.log(response);

      if (response.status === 201)
      {
        setSignupMessage('User created successfully!');
        navigate('/home');
        // Optionally, you can redirect the user to the login page or handle success in another way
      }else {
        setSignupMessage('Unexpected response from the server');
      }
      // For now, you might want to navigate the user to the login page after successful signup
      // You can use useHistory or any other navigation method here
    }
    catch (error) {
      console.error('Signup failed:', error);
    
    if (error.response && error.response.status === 400) {
      setSignupMessage('Username already exists');
    } else {
      setSignupMessage('Signup failed. Please try again later.');
    }
  }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sign Up</h2>
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

        <button type="button" onClick={handleSignUp} style={styles.button}>
          Sign Up
        </button>
        {signupMessage && (
          <div style={styles.message}>{signupMessage}</div>
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
    color: 'red', // You can customize the color
  },
};

export default SignUp;
