import { View, Text, StyleSheet } from 'react-native';
import Click from './Click';
import { Colors } from '../constant/Colors';

export default function ErrorOverlay({msg, onConfirm}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>AN ERROR OCCURRED!!</Text>
      <Text style={styles.text}>{msg}</Text>
      <Click onPress={onConfirm}>Okay</Click>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary700,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
