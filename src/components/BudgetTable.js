// BudgetTable.js
import React from 'react';

export const calculatePercentageBudgetTable = ({ budgets, expenses, selectedMonth }) => {
    return budgets.map((budget) => {
      const category = budget.category;
      const budgetValue = budget.budget || 0;
      const categoryExpenses = expenses.filter((expense) => expense.category === category);
      const totalSpent = categoryExpenses.reduce((total, expense) => total + expense.expense, 0);
      return budgetValue > 0 ? ((totalSpent / budgetValue) * 100).toFixed(1) : 0;
    });
  };
  

const BudgetTable = ({ budgets, expenses, selectedMonth }) => {
  const getExpenseForCategory = (category) => {
    const expense = expenses.find((item) => item.category === category);
    return expense ? expense.expense : 0;
  };

  const getTotalSpent = () => {
    return expenses.reduce((acc, item) => acc + item.expense, 0);
  };
  const calculateTotalSpent = (category) => {
    const categoryExpenses = expenses.filter((expense) => expense.category === category);
    return categoryExpenses.reduce((total, expense) => total + expense.expense, 0);
  };

  // Calculate average expense for each category
/*   const calculateAverageExpense = (category) => {
    const totalSpent = calculateTotalSpent(category);
    const expenseCount = expenses.filter((expense) => expense.category === category).length;
    return expenseCount > 0 ? totalSpent / expenseCount : 0;
  };
 */
  // Calculate percentage spent for each category
  const calculatePercentageSpent = (category) => {
    const budget = budgets.find((budget) => budget.category === category)?.budget || 0;
    const totalSpent = calculateTotalSpent(category);
    return budget > 0 ? ((totalSpent / budget) * 100).toFixed(1) : 0;
  };

  return (
    <div width="300px" height="300px">
      <h1>Budget Table</h1>
      <p>This table displays the configured budget and expenses for each category for the month of {selectedMonth} </p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Budget</th>
            <th scope="col">Expense</th>
            <th scope="col">Total Spent</th>
            {/* <th scope="col">Average Expense</th> */}
            <th scope="col">Percentage Spent</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.category}>
              <td>{budget.category}</td>
              <td>${budget.budget}</td>
              <td>${getExpenseForCategory(budget.category)}</td>
              {/* <td>{getTotalSpent()}</td> */}
              <td>${calculateTotalSpent(budget.category)}</td>
            {/* <td>${calculateAverageExpense(budget.category)}</td> */}
            <td>{calculatePercentageSpent(budget.category)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
