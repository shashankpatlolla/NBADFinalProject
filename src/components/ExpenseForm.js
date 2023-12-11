// ExpenseForm.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onClose, UpdateExpensesperMonth }) => {
//   const [month, setMonth] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  //const [budget, setBudget] = useState('');
  const [expense, setExpense] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);
  //const [categoriesLoaded, setCategoriesLoaded] = useState(false);


  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  
  //const categories =[];

  const GetCategories = async () =>{
    try{
    const username = localStorage.getItem('username');
    const response = await axios.get('/api/savedBudget', {
        headers: {
          'x-username': username,
        },
        });
        console.log("At expense form ",response.data.budgets);
        const categories = response.data.budgets.map((category) => category.category);
        setCategories(categories);
        //setCategoriesLoaded(true);
        /* for(let i=0;i<response.data.budgets.length;i++)
        {
            Categories.push(response.data.budgets[i].category);
        } */
        console.log("categories are: ",categories);
    }
    catch(error)
    {
        console.error('Error fetching categories:', error);
    }
  };

  useEffect (()=>{
    GetCategories();
  },[]);

  const handleSave = async () => {
    try {
        const username = localStorage.getItem('username');
        console.log(username);
        
        if (!selectedMonth ||!selectedCategory || !expense) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        
      // Send the expense/month data to the backend to save in MongoDB
      await axios.post('/api/saveExpenseMonth', { username,month:selectedMonth, category:selectedCategory, expense });
      UpdateExpensesperMonth();
      // Close the form after saving
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
      // Handle save failure
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header} onClick={GetCategories}>Configure Expense/Month</h2>
      {/* {categoriesLoaded ? ( */}
      <form style={styles.form}>
        <label style={styles.label}>Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={styles.input}
        >
          <option value="" disabled>Select a Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>

        <label style={styles.label}>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.input}
        >
          <option value="" disabled>Select a Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <label style={styles.label}>Expense:</label>
        <input
          type="number"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          style={styles.input}
        />

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
      {/* ) : (
        <p>Loading categories...</p>
        )} */}
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

export default ExpenseForm;
