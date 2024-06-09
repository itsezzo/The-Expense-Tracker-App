import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({icon, size, color, onPress}) {
    return(
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.container}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    container: {
        marginHorizontal: 8,
        marginVertical: 2,
        padding: 6,
        borderRadius: 24   
    }
});