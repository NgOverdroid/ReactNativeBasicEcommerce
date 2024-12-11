import { StyleSheet, ActivityIndicator, Text, View, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../components/Card';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function Category({navigation}) {
  const [category, setCategory] = useState('/products');
  const [products, setProducts] = useState([]);

  function changeCategory(option){
    switch(option) {
      case "All":
        setCategory('/products');
        break;
      case "Electronics":
        setCategory('/products/category/electronics');
        break;
      case "Jewelery":
        setCategory('/products/category/jewelery');
        break;
    }
    setProducts([]);
  }

  const renderItem = ({ item }) => (
    <Card 
      id={item.id}
      title={item.title} 
      price={item.price}
      rating_rate={item.rating.rate} 
      rating_count={item.rating.count}
      img_url={item.image}
      navigation={navigation}
    />
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://fakestoreapi.com' + category);
        const products_json = await response.json();
        setProducts(products_json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [category]);

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Pressable style={styles.button} onPress={() => changeCategory('All')}>
          <Ionicons name="home-outline" style={styles.logo} />
          <Text>All Products</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => changeCategory('Electronics')}>
          <Ionicons name="bulb-outline" style={styles.logo} />
          <Text>Electronics</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => changeCategory('Jewelery')}>
          <Ionicons name="flower-outline" style={styles.logo} />
          <Text>Jewelery</Text>
        </Pressable>
      </View>
      {
      products.length ?
        <FlatList
          data={products} 
          numColumns={2}
          renderItem={renderItem}  
          keyExtractor={item => item.id} 
          />
      :
      <SafeAreaProvider>
      <SafeAreaView style={[styles.loaderContainer, styles.loaderHorizontal]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    </SafeAreaProvider>
      }
    </>

  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc', 
    borderRadius: 10, 
    padding: 10, 
    margin: 5, 
    backgroundColor: 'lightblue'
  },
  logo: {
    fontSize: 30, 
    color: '#000', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loaderHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});