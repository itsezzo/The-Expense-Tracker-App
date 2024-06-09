import { useContext } from 'react';

import ExpensesBody from '../components/ExpensesBody';

import { ExpensesContext } from '../store/expenses-context';

export default function AllExpenceses() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesBody period='Total' list={expensesCtx.expenses} fallbackText='No Expenses bought Yet!!' />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.primary700,
//     padding: 24
//   },
// });
