// BudgetForm.js
import React, { useState } from 'react';
import axios from 'axios';

const BudgetForm = ({ onClose , updateBudgets }) => {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  //const [expense, setExpense] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async () => {
    var response =""
    try {
        const username = localStorage.getItem('username');

        if (!category || !budget) {
            setErrorMessage('Please fill in all fields.');
            return;
          }
        console.log("value of username from localstorage is",username);
      // Send the budget data to the backend to save in MongoDB
      response = await axios.post('/api/saveBudget', { username,category, budget });
      if(response.data.msg === 'CategoryExists')
      {
        setCategory('');
        setBudget('');
        setErrorMessage(response.data.error);
        return;
      }
      updateBudgets();
      // Close the form after saving
      onClose();
    } catch (error)
    {
 /*      if(response.status === 401)
      {
        setErrorMessage(response.data.error);
        return;
      } */
      //console.error('Save failed:', error);
      // Handle save failure
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Configure Budget</h2>
      <form style={styles.form}>
        <label style={styles.label}>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Budget:</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          style={styles.input}
        />

        {/* <label style={styles.label}>Expense:</label>
        <input
          type="number"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          style={styles.input}
        /> */}

        <button type="button" onClick={handleSave} style={styles.button}>
          Save
        </button>
        <br></br>
        <button type="button" onClick={onClose} style={styles.button}>
          Cancel
        </button>
        <br></br>
        {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '20px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
    zIndex: 1000,
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
    marginRight: '10px',
  },
};

export default BudgetForm;
