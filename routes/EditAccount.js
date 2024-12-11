import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { SelectedItemContext } from '../context/SelectedItemProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditAccount() {
  const { userData, setUserData } = useContext(SelectedItemContext);
  const [firstName, setFirstName] = useState(userData.name.firstName);
  const [lastName, setLastName] = useState(userData.name.lastName);
  const [phone, setPhone] = useState(userData.phone);
  const [email, setEmail] = useState(userData.email);
  const [house_number, setHouseNumber] = useState(userData.address.number);
  const [street, setStreet] = useState(userData.address.street);
  const [city, setCity] = useState(userData.address.city);
  const [saveStatus, setSaveStatus] = useState(false);

  function saveChanges () {
    const updatedUser = { ...userData,
      name: {
        firstname: firstName,
        lastname: lastName,
      },
      phone: phone,
      email: email,
      address: {
        city: city,
        street: street,
        number: house_number
      }
    };
    setUserData(updatedUser);
  };

  useEffect(() => {
    async function updateData() {
      try {
        const user_id = await AsyncStorage.getItem('user_id');
        const response = await fetch('https://fakestoreapi.com/users/' + user_id,{
            method:"PUT",
            body:JSON.stringify(
                {
                email: email,
                username:'johnd',
                name:{
                    firstname: firstName,
                    lastname: lastName
                },
                address:{
                    city: city,
                    street: street,
                    number: house_number
                },
                phone: phone
                }
            )
        })
        if(response.ok)
          console.log("OK updated");
          saveChanges();
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    }
    if(saveStatus)
      updateData();
  }, [saveStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.name_container}>
        <View style={styles.name_input_container}>
          <Text style={styles.title}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder={userData.name?.firstname}
          />
        </View>
        <View style={styles.name_input_container}>
          <Text style={styles.title}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder={userData.name?.lastname}
          />
        </View>
      </View>
      <Text style={styles.title}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder={userData.phone}
        keyboardType="phone-pad"
      />
      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder={userData.email}
      />
      <Text style={styles.title}>House Number</Text>
      <TextInput
        style={styles.input}
        value={house_number}
        onChangeText={setHouseNumber}
        placeholder={userData.address.number.toString()}
        keyboardType='numeric'
      />
      <Text style={styles.title}>Street</Text>
      <TextInput
        style={styles.input}
        value={street}
        onChangeText={setStreet}
        placeholder={userData.address.street}
      />
      <Text style={styles.title}>City</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder={userData.address.city}
      />
      <View style={styles.button_style}>
        <Button title="Save" 
        onPress={() => setSaveStatus(true)} 
        style={styles.button_style}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  name_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  name_input_container: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  button_style: {
    marginTop: 20
  }
});
