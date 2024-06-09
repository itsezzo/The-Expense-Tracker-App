import { useContext, useEffect, useState } from 'react';

import ExpensesBody from '../components/ExpensesBody';
import LoadingOverlay from '../components/LoadingOverlay';


import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';
import { fetchExpense } from '../utils/http';
import ErrorOverlay from '../components/ErrorOverlay';

export default function Recent() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        expensesCtx.setExpense(expenses)
      } catch (error) {
        setError('Could Not Fetch Expense!!')
      }
      setIsFetching(false);
      // setFetchExpenses(expenses);
    };

    getExpenses();
  }, [])

  function handleFailure() {
    setError(null);
  }

  if(error && !isFetching) {
    return(<ErrorOverlay msg={error} onConfirm={handleFailure} />)
  }

  if(isFetching) {
    return(<LoadingOverlay />);
  }

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const lastSevenDays = getDateMinusDays(today, 7);
    return expense.date > lastSevenDays;
  })

  return (
    <ExpensesBody period='Last 7 Days' list={recentExpenses} fallbackText='No Recent Expenses This Last Week.' />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.primary700,
//     paddingTop: 24,
//     paddingHorizontal: 24,
//     paddingBottom: 0
//   },
// });
