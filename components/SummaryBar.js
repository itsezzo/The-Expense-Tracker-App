import { StyleSheet, View, TextInput, Text } from 'react-native';

import { Colors } from '../constant/Colors';

export default function SummaryhBar({pageTilte, list}) {
    const sum = list.reduce((sum, curPrice) => sum + curPrice.price, 0);
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{pageTilte}</Text>
            <Text style={styles.price}>${sum.toFixed(2)}</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        // width: '90%',
        backgroundColor: Colors.primary50,
        padding: 8,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: Colors.primary400,
        fontSize: 12
    },
    price: {
        // marginHorizontal: 8,
        color: Colors.primary500,
        fontSize: 16,
        fontWeight: 'bold'
    }
});