import React, { useContext, useState } from 'react';
import { Text, ActivityIndicator, View, FlatList, SectionList, StyleSheet, Dimensions } from "react-native";
import Card from '../components/Card';
import { SelectedItemContext } from '../context/SelectedItemProvider';
import CarouselComponent from '../components/CarouselComponent';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function Home({ navigation }) {
  const [hot_deals, setHotDeals] = useState([]);
  const [new_arrival, setNewArrival] = useState([]);
  const { products } = useContext(SelectedItemContext);

  if (products.length > 0 && hot_deals.length === 0) {
    setHotDeals(products.filter(product => product.id % 2 === 0));
    setNewArrival(products.filter(product => product.price > 100));
  }

  const sections = [
    {
      title: "Hot Deals",
      key: "hot_deals",
      data: [
        {
          list: hot_deals,
        },
      ],
    },
    {
      title: "New Arrival",
      key: "new_arrival",
      data: [
        {
          list: new_arrival,
        },
      ],
    },
  ];

  const renderSection = ({ item }) => {
    return (
      <FlatList
        data={item.list}
        numColumns={2}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
      />
    );
  };

  const renderSectionHeader = ({ section }) => {
    return <Text style={styles.title}>{section.title}</Text>;
  };

  const renderListItem = ({ item }) => {
    return (
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
  };

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  if (products.length === 0) {
    return (
      <SafeAreaProvider>
      <SafeAreaView style={[styles.loaderContainer, styles.loaderHorizontal]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    </SafeAreaProvider>
    );
  } else {
    return (
      <View style={styles.container}>
        <SectionList
          sections={sections}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderSection}
          ListHeaderComponent={<CarouselComponent />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
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
