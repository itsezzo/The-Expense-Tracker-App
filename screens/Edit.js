import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IconButton from '../components/IconButton';
import Form from '../components/Form';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

import { Colors } from '../constant/Colors';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';

export default function Edit({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState();
  
  const expenseId = route.params?.expenseId;
  const isIded = !!expenseId;

  const updatedExpense = expensesCtx.expenses.find(expense => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isIded ? 'Edit Expenses' : 'Add Expenses',
    });
  }, [navigation, isIded]);

  async function handleDeletion() {
    setIsSubmiting(true);
    try {
      await deleteExpense(expenseId);
      expensesCtx.removeExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could Not Delete Expense!!');
      setIsSubmiting(false);
    }
  }

  function handleCanceltion() {
    navigation.goBack();
  }

  async function handleConformation(expenseData) {
    setIsSubmiting(true);
    if (isIded) {
      try {
        await updateExpense(expenseId, expenseData);
        expensesCtx.updateExpense(expenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setError('Could Not Update Expense!!')
        setIsSubmiting(false);
      }
    } else {
      try {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({id: id, ...expenseData});
        navigation.goBack();
      } catch (error) {
        setError('Could Not Add Expense!!')
        setIsSubmiting(false);
      }
    }
    // console.log(expenseData);
  }

  function hanleFailure() {
    setError(null);
  }

  if(error && !isSubmiting) {
    return(<ErrorOverlay msg={error} onConfirm={hanleFailure} />);
  }


  if(isSubmiting) {
    return(<LoadingOverlay />);
  }

  return (
    <View style={styles.container}>
      <Form
        onCancel={handleCanceltion}
        onSubmit={handleConformation}
        submitLabel={isIded ? 'Update' : 'Add'}
        defaultValues={updatedExpense}
      />
      {isIded && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            size={36}
            color={Colors.error500}
            onPress={handleDeletion}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: 'center',
  },
});
