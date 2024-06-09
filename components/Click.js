import { View, Pressable, Text, StyleSheet } from 'react-native';

import { Colors } from '../constant/Colors';

export default function Click({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  button: {
    backgroundColor: Colors.primary500,
    borderRadius: 4,
    padding: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
  flat: {
    backgroundColor: 'transparent',
  },
  flatText: {
    color: Colors.primary200
  },
});
