import { StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../constant/Colors';
import { getFormatedDate } from '../utils/date';

export default function Item({ id, title, date, price }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('EditExpenceses', {expenseId: id})}
        style={styles.pressable}
        android_ripple={{ color: Colors.primary200 }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{getFormatedDate(date)}</Text>
        </View>
        <View style={styles.priceTab}>
          <Text style={styles.priceText}>${price.toFixed(2)}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
  },
  container: {
    marginVertical: 8,
    backgroundColor: Colors.primary500,
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    overflow: Platform.select({ios: 'visible', android: 'hidden'}),
  },
  textContainer: {
    // margin: 12,
    // overflow: 'hidden',
  },
  title: {
    color: Colors.primary50,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: Colors.primary50,
    // fontSize: 16,
  },
  priceTab: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  priceText: {
    color: Colors.primary500,
    // fontSize: 16,
    fontWeight: 'bold',
  },
});
