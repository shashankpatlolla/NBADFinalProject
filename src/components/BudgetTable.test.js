import { BudgetTableforTesting } from './BudgetTable';

test('BudgetTableforTesting calculates percentages correctly', () => {
  const budgets = [
    { category: 'Category1', budget: 100 },
    { category: 'Category2', budget: 200 },
    // ... other budgets
  ];

  const expenses = [
    { category: 'Category1', expense: 30 },
    { category: 'Category2', expense: 50 },
    // ... other expenses
  ];

  const selectedMonth = 'January';

  const result = BudgetTableforTesting({ budgets, expenses, selectedMonth });

  // You can now assert the result against your expectations
  expect(result).toEqual([30, 25]); // Example values, replace with your expected results
});
