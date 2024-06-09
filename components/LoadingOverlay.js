import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../constant/Colors';

export default function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='whie' />
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
});
