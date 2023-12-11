// Home.js
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BudgetForm from './BudgetForm'; // Import the BudgetForm component
import ExpenseForm from './ExpenseForm';
import BudgetTable from './BudgetTable';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import FocusLock from 'react-focus-lock'; // Import the FocusLock component


const Home = () => {
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showTokenExpirationWarning, setShowTokenExpirationWarning] = useState(false);
  const [closeTimeoutId, setCloseTimeoutId] = useState(null);
  const [WarningcloseTimeoutId, setWarningCloseTimeoutId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
  const [focusLockEnabled, setFocusLockEnabled] = useState(false);

  //const [defaultMonthSet, setDefaultMonthSet] = useState(false);

  // const [expenseData, setExpenseData] = useState([]);
  // const [enteredExpenses, setEnteredExpenses] = useState([]);
  //const [expenseData, setExpenseData] = useState([]);

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const navigate  = useNavigate();

  const HomeButton = () =>{
    //window.location.reload();
    navigate('/home');
    window.location.reload();
  };

  const skipToContent = () => {
    document.getElementById('mainContent').scrollIntoView({ behavior: 'smooth' });
  };

  const openBudgetForm = () => {
    setIsExpenseFormOpen(false);
    setIsBudgetFormOpen(true);
    setFocusLockEnabled(true);  // Enable focus-lock when modal opens
  };

  const closeBudgetForm = () => {
    setIsBudgetFormOpen(false);
    setFocusLockEnabled(false); // Disable focus-lock when modal closes
  };
  const openExpenseForm = () => {
    setIsBudgetFormOpen(false);
    setIsExpenseFormOpen(true);
    setFocusLockEnabled(true); // Enable focus-lock when modal opens
  };

  const closeExpenseForm = () => {
    setIsExpenseFormOpen(false);
    setFocusLockEnabled(false); // Disable focus-lock when modal closes
  };

  const handleLogout = async ()  => {
    localStorage.clear();
    clearTimeout(WarningcloseTimeoutId);
    clearTimeout(closeTimeoutId);
    navigate('/');
  };

  const updateBudgets = async () => {
    try {
      const username = localStorage.getItem('username');
      //console.log(username);
      const response = await axios.get('/api/savedBudget', {
        headers: {
          'x-username': username,
        },
      });
      //console.log(response.data.budgets);
      setBudgets(response.data.budgets);

      //console.log("BUdgets available are: ",response.data.budgets);
      const bckcolors =[];
      for(let i=0;i<response.data.budgets.length;i++)
      {
        bckcolors.push(getRandomColor());
      }

      const ctx = document.getElementById('myChart');
      if (ctx && Chart.getChart(ctx)?.destroy) {
        Chart.getChart(ctx)?.destroy();
      }
      const totalBudget = response.data.budgets.reduce((acc, item) => acc + item.budget, 0);
      new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [
            {
              data: response.data.budgets.map((item) => item.budget),
              backgroundColor: bckcolors,
            },
          ],
          labels:
          response.data.budgets.map((item) => {
            const percentage = ((item.budget / totalBudget) * 100).toFixed(1);
            return `${item.category}: ${percentage}%`;
          }), 
          //response.data.budgets.map((item) => item.category),
        },
      });

      ctx.style.width = '400px';  
      ctx.style.height = '400px';
    } catch (error) {
      console.error('Budget retrieval failed:', error);
    }
  };
  const UpdateExpensesperMonth = async ()=>{
    try {
      const username = localStorage.getItem('username');
      //console.log(username);
      const response = await axios.get('/api/savedExpense', {
        headers: {
          'x-username': username,
          'x-month': selectedMonth,
        },
      });
      console.log("Expenses retreived from the DB are: ",response.data.expenses);
      setExpenses(response.data.expenses);
      //setBudgets(response.data.budgets);
    } catch (error) {
      console.error('Expense retrieval failed:', error);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const checkTokenExpiration = () => {

    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const showWarning =()=>{
      console.log("Shashank11");
      setShowTokenExpirationWarning(true);
      const closeTimeout = setTimeout(() => {
        console.log("Shashank12");
        setShowTokenExpirationWarning(false);
        handleTokenExpirationResponse(false);
      }, 20000);
      setCloseTimeoutId(closeTimeout);
    };
    const WarrningTimeout = setTimeout(showWarning, tokenExpiration - 20000);
    setWarningCloseTimeoutId(WarrningTimeout);

    /* if (tokenExpiration && currentTime > tokenExpiration - 10000) {
      // if (tokenExpiration && timeUntilExpiration > 0 && timeUntilExpiration <= 10000) {
        console.log("Shashank123");

        //if (tokenExpiration && timeUntilExpiration > 0) {
          console.log("Shashank1");
      // Show a warning when the token is about to expire (20 seconds before)
      //alert('Warning: Your session will expire in 20 seconds. Click "Refresh" to extend your session.');
      setShowTokenExpirationWarning(true);
      setTimeout(() => {
        console.log("Shashank2");
        setShowTokenExpirationWarning(false);
       // handleLogout();
        handleTokenExpirationResponse(false); // Auto handle as "Cancel"
      }, 10000);
    } */
  };

  const handleTokenExpirationResponse = (resumeSession) => {

    /* if(closeTimeoutId) {
      console.log("Cleared the timedout bcz ok is clicked");
      clearTimeout(closeTimeoutId);
    } */
    if (resumeSession) {

//      window.location.reload();
      console.log("Cleared the timedout bcz ok is clicked");
      clearTimeout(closeTimeoutId);
      setShowTokenExpirationWarning(false);
      checkTokenExpiration();
    } 
    else {
      console.log("else condition in handle expiration response");
      handleLogout();
    }
  };

/*   const handleRefreshToken = async () => {
    localStorage.clear();
    navigate('/');
  }; */
  useEffect(() => {
    // Fetch budgets associated with the logged-in user
    /* const fetchBudgets = async () => {
      try {
        //const token = localStorage.getItem('token'); // Make sure to handle token retrieval based on your implementation
        const username = localStorage.getItem('username');

        console.log("value of username from localstorage is",username);
        const response = await axios.post('/api/budgets',{username});
        console.log(response);  
        setBudgets(response.data.budgets);
      } catch (error) {
        console.error('Budget retrieval failed:', error);
        // Handle error
      }
    };

    fetchBudgets(); */
    //updateBudgets();
    UpdateExpensesperMonth();
    /* if (!defaultMonthSet) {
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      setSelectedMonth(currentMonth);
      setDefaultMonthSet(true);
    } */
    console.log("at useeffect checktoken");
  }, [selectedMonth]);

  useEffect(()=>{
    //checkTokenExpiration();
    updateBudgets();
  },[]);
  return (
    
    <FocusLock disabled={!focusLockEnabled}> {/* Wrap your modal content with FocusLock */}
    <main role="main">
      {/* Skip to Content Link */}
      <nav style={styles.navbar}>
      <div style={styles.logo}>
       {/* Setting tabIndex to control the focus order */}
      <button type="button" className="btn btn-outline-secondary me-2" onClick={HomeButton} tabIndex="1">Home</button>
      {/* <a href="#mainContent" className='btn btn-outline-secondary me-2'>Skip to Content</a> */}
      <button className='btn btn-outline-secondary me-2' onClick={skipToContent}>Skip to Content</button>

      </div>
      <div style={styles.navLinks}>
      <button className="btn btn-outline-secondary me-2" type="button" onClick={openBudgetForm} tabIndex="2">Configure Budget</button>
      {/* <button className="btn btn-outline-secondary me-2" type="button" onClick={openBudgetForm}>Update Budget</button> */}
      <button className="btn btn-outline-secondary me-2" type="button" onClick={openExpenseForm} tabIndex="3">Configure Expense/Month</button>
      <button className="btn btn-outline-warning me-2" type="button" onClick={handleLogout} tabIndex="4">Log Out</button>
      </div>
      </nav>
        {/* <label>Select Month:</label><br></br>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          //style={styles.input}
          className="form-select form-select-sm"
        >
          <option value="" disabled>Select a Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select> */}
        {/* Main Content */}
        
        <div style={styles.chartContainer}>
      <article>
          <h1 id="pieChartHeading">Pie Chart </h1><span><p>Visual representation of the configured budget for each category.</p></span>
          <p>
              <canvas id="myChart" aria-labelledby="pieChartHeading"></canvas>
          </p>
      </article>
      </div>
      <div id="mainContent">
      <label htmlFor="selectMonth"><b>Select Month:</b></label>
          <select
          id="selectMonth"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          //style={styles.input}
          className="form-select form-select-sm"
        >
          <option value="" disabled>Select a Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      <section style={styles.tableContainer}>
      {/* Display Budget Table */}
      <br></br>
      <BudgetTable budgets={budgets} expenses={expenses} selectedMonth={selectedMonth} />
        </section>
      </div>
      <article>
        <h1 id="barChartHeading">Bar Chart</h1>
        <p>This bar chart visualizes the configured budget and expenses for each category for the month of {selectedMonth}</p>
        <div>
          
          {/* <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-select form-select-sm"
          >
            <option value="" disabled>
              Select a Month
            </option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select> */}
          {/* <label>Select Month:</label><br></br>
          <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          //style={styles.input}
          className="form-select form-select-sm"
        >
          <option value="" disabled>Select a Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select> */}
        </div>
        {/* Bar Chart for Budget and Expenses */}
        <Bar
          data={{
            labels: budgets.map((item) => item.category),
            datasets: [
              {
                label: 'Budget',
                data: budgets.map((item) => item.budget),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: 'Expense',
                data: expenses.map((item) => item.expense),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          }}
          /* options={{
           // maintainAspectRatio: false, // Set to false to allow custom width and height
           // responsive: false, // Set to false to disable responsiveness
            layout: {
              padding: {
                left: 50,
                right: 50,
                top: 50,
                bottom: 50,
              },
            },
          }}
          width={400} // Set the width of the chart
          height={400} // Set the height of the chart */
        />
      </article>

      {/* Render the ExpenseForm component */}
      {isExpenseFormOpen && <ExpenseForm onClose={closeExpenseForm} UpdateExpensesperMonth={UpdateExpensesperMonth} />}

      {/* Render the BudgetForm component if the form is open */}
      {isBudgetFormOpen && <BudgetForm onClose={closeBudgetForm} updateBudgets={updateBudgets}/>}

      {/* Token expiration warning modal */}
      {showTokenExpirationWarning && (
        <section style={styles.container}>
          <h3 style={styles.header}>Your session will expire in 20 seconds.</h3>
          <form style={styles.form}>
          <button type="button" className="btn btn-success" onClick={() => handleTokenExpirationResponse(true)}>OK</button>
          <br></br>
          <button type="button" className="btn btn-danger" onClick={() => handleTokenExpirationResponse(false)}>Cancel</button>
          </form>
        </section>
      )}
    </main>
    </FocusLock>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: '#262728',
    color: 'white',
    height: '80px'
  },
  logo: {
    fontSize: '24px',
  },
  navLinks: {
    display: 'flex',
  },
  container: {
    position: 'fixed',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '20px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  chartContainer: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
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


export default Home;
