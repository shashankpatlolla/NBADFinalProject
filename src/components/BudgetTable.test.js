import { BudgetTableforTesting } from './BudgetTable';

test('BudgetTableforTesting calculates percentages correctly', () => {
  const budgets = [
    { category: 'Groceries', budget: 1000 },
    { category: 'Entertainment', budget: 500 },
    { category: 'Rent', budget: 500 },
    { category: 'Utilities', budget: 200 },
    { category: 'Transportation', budget: 220 },
    { category: 'Dining Out', budget: 150 },
    { category: 'Shopping', budget: 100 },
    // ... other budgets
  ];

  const expenses = [
    { category: 'Groceries', expense: 500 },
    { category: 'Entertainment', expense: 500 },
    { category: 'Rent', expense: 500 },
    { category: 'Utilities', expense: 150 },
    { category: 'Transportation', expense: 250 },
    { category: 'Dining Out', expense: 250 },
    { category: 'Shopping', expense: 300 },
    // ... other expenses
  ];

  const selectedMonth = 'December';

  const result = BudgetTableforTesting({ budgets, expenses, selectedMonth });

  // You can now assert the result against your expectations
  expect(result).toEqual(["50.0", "100.0", "100.0", "75.0", "113.6", "166.7", "300.0"]); // Example values, replace with your expected results
});

test('BudgetTableforTesting handles zero budget correctly', () => {
    const budgets = [
      { category: 'Category1', budget: 0 },
      { category: 'Category2', budget: 0 },
    ];
  
    const expenses = [
      { category: 'Category1', expense: 30 },
      { category: 'Category2', expense: 50 },
    ];
  
    const selectedMonth = 'February';
  
    const result = BudgetTableforTesting({ budgets, expenses, selectedMonth });
  
    expect(result).toEqual([0, 0]); // Adjust based on your expected results
  });
  
  test('BudgetTableforTesting handles empty budgets and expenses correctly', () => {
    const budgets = [];
    const expenses = [];
    const selectedMonth = 'March';
  
    const result = BudgetTableforTesting({ budgets, expenses, selectedMonth });
  
    expect(result).toEqual([]); // Adjust based on your expected results
  });