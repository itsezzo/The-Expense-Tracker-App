import { View, TextInput, Text, StyleSheet } from "react-native";
import { Colors } from "../constant/Colors";



export default function Input({label, style, invalid, textInputConfig}) {
    
    const inputStyle = [styles.input];

    if(textInputConfig && textInputConfig.multiline) {
        inputStyle.push(styles.inputMultiline);
    }
    if(invalid) {
        inputStyle.push(styles.invalidInput);
    }
    
    return(
        <View style={[styles.container, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyle} {...textInputConfig} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        color: Colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: Colors.primary100,
        borderRadius: 6,
        padding: 6,
        fontSize: 18,
        color: Colors.primary700
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top"
    },
    invalidLabel: {
        color: Colors.error500
    },
    invalidInput: {
        backgroundColor: Colors.error50
    },
})