// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
//import Login from './components/login';
import Home from './components/Home';
// import Dashboard from './components/Dashboard';
import ConfigureBudget from './components/ConfigureBudget';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/configure-budget" element={<ConfigureBudget />} />
      </Routes>
    </Router>
  );
};

export default App;
