import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function ProductDetails({route}) {
  const { id } = route.params;
  const [product_details, setProductDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products/' + id);
        const products_json = await response.json();
        setProductDetails(products_json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {product_details ? (
        <>
          <Image source={{ uri: product_details.image }} style={styles.image} />
          <Text style={styles.title}>{product_details.title}</Text>
          <Text style={styles.description}>{product_details.description}</Text>
          <Text style={styles.title}>Price: {product_details.price}</Text>
          <Text style={styles.title}>Rating: {product_details.rating.rate}⭐({product_details.rating.count} reviews)</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  price: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
});


