// ConfigureBudget.js
import React, { useState } from 'react';
import axios from 'axios';

const ConfigureBudget = () => {
  const [name, setName] = useState('');
  const [expense, setExpense] = useState('');
  const [month, setMonth] = useState('');

  const handleConfigureBudget = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://137.184.208.233:5000/api/configure-budget',
        { name, expense, month },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Handle success (redirect or show a success message)
    } catch (error) {
      console.error('Configure Budget failed:', error);
    }
  };

  return (
    <div>
      <h2>Configure Budgetsss</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Expense" onChange={(e) => setExpense(e.target.value)} />
      <input type="text" placeholder="Month" onChange={(e) => setMonth(e.target.value)} />
      <button onClick={handleConfigureBudget}>Configure Budget</button>
    </div>
  );
};

export default ConfigureBudget;
