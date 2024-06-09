import { View, FlatList, StyleSheet } from 'react-native';

import Item from './Item';

function renderItemes(itemData) {
  const item = itemData.item;
  const items = {
    id: item.id,
    title: item.title,
    date: item.date,
    price: item.price,
  };

  return <Item {...items} />;
}

export default function ListItems({ items }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItemes}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 40,
  },
});
