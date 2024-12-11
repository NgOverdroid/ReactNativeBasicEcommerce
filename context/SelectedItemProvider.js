import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SelectedItemContext = createContext();

export default function SelectedItemProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [auth, setAuth] = useState(false);

  useEffect(()=>{
    async function fetchData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products_json = await response.json();
        setProducts(products_json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function loadSelectedItems () {
      try {
        const user_id = await AsyncStorage.getItem('user_id');
        if(user_id) {
            const get_cart = await fetch('https://fakestoreapi.com/carts/user/' + user_id);
            const get_cart_json = await get_cart.json();
            if(get_cart_json.length != 0){
              const get_first_cart = get_cart_json[0];
              const user_cart = get_first_cart.products;
              setSelectedItems(user_cart);
            }
        }
      } 
      catch (error) {
          console.error('Failed to load selected items:', error);
      } 
    };
    loadSelectedItems();
  }, [auth]);

  function addItem (id) {
    const find_item = selectedItems.find(item => item.productId == id);
    if(!find_item){
      setSelectedItems([...selectedItems, {"productId": id, "quantity": 1}]);
      return false;
    }
    else 
      return true;
  };

  function itemExists(id){
    const find_item = selectedItems.find(item => item.productId == id)
    if(find_item)
      return true;
    else
      return false;
  }
  
  function removeItem (id){
    const updatedItems = selectedItems.filter((item) => item.productId != id)
    setSelectedItems(updatedItems);
  };
    
  function incrementItem(id) {
    setSelectedItems((prevItems) =>
        prevItems.map((item) =>
            item.productId === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    );
  } 
    
  function decrementItem(id) {
    setSelectedItems((prevItems) =>
        prevItems
            .map((item) =>
                item.productId === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0) // Remove items with quantity <= 0
  );
}

  
  return (
    <SelectedItemContext.Provider
      value={{
        selectedItems,
        products,
        userData,
        setUserData,
        addItem,
        removeItem,
        incrementItem,
        decrementItem,
        auth,
        setAuth,
      }}
    >
      {children}
    </SelectedItemContext.Provider>
  );
}

[{"productId": 2, "quantity": 1}, {"productId": 5, "quantity": 1}];