import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SelectedItemContext } from '../context/SelectedItemProvider';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CartItem from '../components/CartItem';

export default function Cart({navigation}) {
  const { selectedItems, products } = useContext(SelectedItemContext);

  const expand_items = selectedItems.map((item) => {
    return {
      "productId": item.productId,
      "quantity": parseInt(item.quantity),
      "price": products[parseInt(item.productId) - 1].price
    };
  });

  const total_price = expand_items.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  function handlePress(){
    navigation.navigate('Home');
  }

  if(selectedItems.length === 0){
    return(
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="cart-remove" size={64} color="grey" />
        <Text style={styles.emptyText}>Empty Cart</Text>
        <Button title="Start Shopping" onPress={handlePress} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={selectedItems}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={({ item }) => {
          return (
          <CartItem productId={item.productId} quantity={item.quantity} />
          )
        }}
        contentContainerStyle={{ paddingBottom: 60 }} // To avoid overlap with the button
      />
      <View style={styles.bottomContainer}>
      <Text style={styles.totalPrices}>Total Prices: ${total_price}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: 'grey',
    marginVertical: 16,
    textAlign: 'center',
  },
  shoppingButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
  },
  shoppingButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  checkoutButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrices: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6347'
  },
});
