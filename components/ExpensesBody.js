import { StyleSheet, View, Text } from 'react-native';

import ListItems from './ListItems';
import SummaryhBar from './SummaryBar';

import { Colors } from '../constant/Colors';

export default function ExpensesBody({ period, list, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if(list.length > 0) {
    content = <ListItems items={list} />
  }
  
  return (
    <View style={styles.container}>
      <SummaryhBar list={list} pageTilte={period} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary700,
    paddingTop: 24,
    paddingHorizontal: 24,
    // paddingBottom: 48,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    marginTop: 32,
    textAlign: 'center'
  }
});
