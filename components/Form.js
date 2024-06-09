import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from './Input';
import Click from './Click';
import { Colors } from '../constant/Colors';

export default function Form({
  onCancel,
  onSubmit,
  submitLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    price: {
      value: defaultValues ? defaultValues.price.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.title : '',
      isValid: true,
    },
  });

  function handleChangeInput(inputIdentifier, enteredValue) {
    setInputs(prevValue => {
      return {
        ...prevValue,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function handleSubmition() {
    const expenseData = {
      price: +inputs.price.value,
      date: new Date(inputs.date.value),
      title: inputs.description.value,
    };
    const isPriceValid = !isNaN(expenseData.price) && expenseData.price > 0;
    const isDateValid = expenseData.date.toString() !== 'Invalid Date';
    const isTilteValid = expenseData.title.trim().length > 0;
    // console.log(expenseData);
    // console.log(isPriceValid);
    if (!isPriceValid || !isDateValid || !isTilteValid) {
      setInputs(curInputs => {
        return {
          price: { value: curInputs.price.value, isValid: isPriceValid },
          date: { value: curInputs.date.value, isValid: isDateValid },
          description: {
            value: curInputs.description.value,
            isValid: isTilteValid,
          },
        };
      });
      //     Alert.alert('Invalid Input', "Please re-Enter the Value Again!")
      return;
    }
    // console.log(expenseData)
    onSubmit(expenseData);
  }

  const isInputsValid =
    !inputs.price.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.firstRowContainer}>
        <Input
          style={styles.firstRow}
          label='Price'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: handleChangeInput.bind(this, 'price'),
            value: inputs.price.value,
          }}
          invalid={!inputs.price.isValid}
        />
        <Input
          style={styles.firstRow}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: handleChangeInput.bind(this, 'date'),
            value: inputs.date.value,
          }}
          invalid={!inputs.date.isValid}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: 'none',
          onChangeText: handleChangeInput.bind(this, 'description'),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {isInputsValid && (
        <Text style={styles.invalidText}>Invalid Input value - Please check your entered data!</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Click style={styles.button} onPress={onCancel} mode='flat'>
          Cancel
        </Click>
        <Click style={styles.button} onPress={handleSubmition}>
          {submitLabel}
        </Click>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    marginBottom: 24,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
  },
  firstRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstRow: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  invalidText: {
    color: Colors.error500,
    textAlign: 'center',
    margin: 8
  }
});
