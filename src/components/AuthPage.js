// AuthPage.js
import React, { useState } from 'react';
import Login from './login';
import SignUp from './SignUp';

const AuthPage = () => {
  const [isLoginView, setLoginView] = useState(true);

  const toggleView = () => {
    setLoginView(!isLoginView);
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabContainer}>
        <div
          style={isLoginView ? styles.activeTab : styles.tab}
          onClick={() => setLoginView(true)}
        >
          Login
        </div>
        <div
          style={!isLoginView ? styles.activeTab : styles.tab}
          onClick={() => setLoginView(false)}
        >
          Sign Up
        </div>
      </div>

      {isLoginView ? <Login /> : <SignUp />}
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
  tabContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  activeTab: {
    padding: '10px',
    marginRight: '10px',
    cursor: 'pointer',
    borderBottom: '2px solid #4CAF50',
    fontWeight: 'bold',
  },
};

export default AuthPage;
