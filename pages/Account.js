import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectedItemContext } from '../context/SelectedItemProvider';
import { useEffect, useContext } from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function Account({ navigation }) {
  const {userData, setUserData, setAuth } = useContext(SelectedItemContext);

  async function editAccount() {
    navigation.navigate('EditAccount');
  }

  async function logOut() {
    try {
      await AsyncStorage.removeItem('user_id');
      setAuth(false);
      navigation.navigate('Splash');
    } catch (error) {
      alert('Failed to logout');
      console.error('Logout error:', error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const user_id = await AsyncStorage.getItem('user_id');
        const response = await fetch('https://fakestoreapi.com/users/' + user_id);
        const response_json = await response.json();
        setUserData(response_json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
      // finally {
      //   setIsLoading(false);
      // }
    }
    fetchData();
  }, []);

  // if (isLoading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text style={styles.loadingText}>Loading...</Text>
  //     </View>
  //   );
  // }
  if (Object.keys(userData).length === 0){
    return(
      <SafeAreaProvider>
      <SafeAreaView style={[styles.loaderContainer, styles.loaderHorizontal]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    </SafeAreaProvider>
    );
  }
  else 
    return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png' }}
            style={styles.userPhoto}
          />
          <Text style={styles.userName}>
            {userData.name?.firstname + ' ' + userData.name?.lastname}
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={editAccount}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text  style={styles.userName}>Username: </Text>
        <Text style={styles.userInfoText}>{userData.username}</Text>
        <Text  style={styles.userName}>Email: </Text>
        <Text style={styles.userInfoText}>{userData.email}</Text>
        <Text  style={styles.userName}>Phone: </Text>
        <Text style={styles.userInfoText}>{userData.phone}</Text>
        <Text  style={styles.userName}>Address: </Text>
        <Text style={styles.userInfoText}>
          {userData.address?.number + ' ' + userData.address?.street + ' ' + userData.address?.city}
        </Text>
      </View>
      <View style={styles.logoutContainer}>
        <Button style={styles.addButton} onPress={logOut} title="LOGOUT" />
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 60,
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  userInfo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  userInfoText: {
    fontSize: 17,
    marginBottom: 5,
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#008B8B',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
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