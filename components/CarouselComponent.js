import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const images = [
  require('../assets/C1.jpg'),
  require('../assets/C2.jpg'),
  require('../assets/C3.jpg'),
];

export default function CarouselComponent () {

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={images}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} />
        )}
        loop
        width={width}
        height={width / 2}
        autoPlay
        autoPlayInterval={2000}
        scrollAnimationDuration={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: width / 2, // Maintain a consistent height for the carousel
  },
  image: {
    width: width,
    height: width / 2,
    resizeMode: 'cover',
  },
});

