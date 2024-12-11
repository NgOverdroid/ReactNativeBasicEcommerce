import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SelectedItemContext } from '../context/SelectedItemProvider';

export default function CartIconWithBadge({ color, size }) {
  const { selectedItems } = useContext(SelectedItemContext); 
  const itemCount = selectedItems.length; 

  return (
    <View>
      <Ionicons name="cart-outline" size={size} color={color} />
      {/* The badge */}
      {itemCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    badgeContainer: {
      position: 'absolute',
      right: -10,
      top: -3,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });