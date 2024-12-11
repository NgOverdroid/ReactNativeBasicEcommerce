import React, { useState, useContext } from 'react';
import { SelectedItemContext } from '../context/SelectedItemProvider';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Button } from 'react-native'

export default function CartItem({productId, quantity}){
    const {incrementItem, decrementItem, products, removeItem} = useContext(SelectedItemContext);
    const [toggleModal, setToggleModal] = useState(false);
    const expand_item = products[parseInt(productId) - 1]; 

    const handleRemove = () => {
      setModalVisible(false);
    };

    function handleDecrement(productId){
      if(quantity == 1){
        setToggleModal(true);
      }
      else
        decrementItem(productId);
    }
    return (
      <>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {expand_item.title}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Image source={{ uri: expand_item.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.price}>Price: {expand_item.price}</Text>
          <Text style={styles.name}>
            Total Price: ${parseFloat(expand_item.price) * parseInt(quantity)}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrement(productId)}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => incrementItem(productId)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={() => setToggleModal(true)}>
          <Text style={styles.removeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={toggleModal}
        onRequestClose={() => setToggleModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to remove this item?</Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setToggleModal(false)} />
              <Button title="Remove" color="#ff6347" onPress={() => removeItem(productId)} />
            </View>
          </View>
        </View>
      </Modal>
      </>
      
    );
  }
  
  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      shadowColor: '#cccccc',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      backgroundColor: '#fff',
      borderRadius: 10,
      marginBottom: 10,
    },
    titleContainer: {
      flexShrink: 1,
      backgroundColor: '#fff',
      marginTop: 5
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    image: {
      width: 60,
      height: 60,
    },
    infoContainer: {
      marginLeft: 10,
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 14,
      color: '#888',
      marginTop: 5,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantity: {
      marginHorizontal: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    quantityButton: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
    },
    quantityButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    removeButton: {
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ff6347',
      padding: 8,
      borderRadius: 5,
    },
    removeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });
