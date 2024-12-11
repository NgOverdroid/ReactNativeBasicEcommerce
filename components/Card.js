import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Button, Image } from 'react-native';
import { SelectedItemContext } from '../context/SelectedItemProvider';

export default function Card({ id, title, price, rating_rate, rating_count, img_url, navigation}) {
  const { addItem } = useContext(SelectedItemContext);

  function handleNavigate () {
    navigation.navigate('ProductDetails', { id });
  }

  function handleAdd(id) {
    const item_added = addItem(id);
    if(item_added) {
      alert("This product is already in your cart");
    }
  }
  return (
    <View style={styles.cardContainer}>
      <Pressable style={styles.card} onPress={handleNavigate}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: img_url }} style={styles.image} />
        </View>
      </Pressable>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
          <Text style={styles.priceText}>${price}</Text>
          <Text style={styles.ratingText}>{rating_rate} ⭐ ({rating_count})</Text>
        </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add"
           onPress={() => { handleAdd(id)}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '50%',
    height: 300, // Fixed height to include the button
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    justifyContent: 'space-between',
  },
  card: {
    flex: 1, // Allow the card content to take remaining space
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    color: '#666',
    marginVertical: 5,
  },
  ratingText: {
    color: '#888',
  },
  buttonContainer: {
    paddingTop: 10, // Space between the card and the button
    alignItems: 'center',
  },
});
