import {useEffect, useState} from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext} from 'react';
import { SelectedItemContext } from '../context/SelectedItemProvider';
import { jwtDecode } from 'jwt-decode';

export default function LoginPage ({navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const { setAuth } = useContext(SelectedItemContext);
    //username is mor_2314
    //password is 83r5^_
    useEffect(() => {
      async function login() {
        if (toggleButton) {
          try {
            const result = await fetch('https://fakestoreapi.com/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            });

            const resultJson = await result.json();
            const token = resultJson.token;

            if (result.ok) {
              // Navigate to the main app
              const decoded_token = jwtDecode(token);
              const user_id = decoded_token.sub;
              await AsyncStorage.setItem('user_id', user_id.toString());
              setAuth(true);
              navigation.replace("MainTabs");
            } 
            else {
              alert("Invalid username or password");
            }
          } 
          
          catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred. Please try again.");
          } 
          
          finally {
            setToggleButton(false); // Re-enable the button after request completion
          }
        }
      }
  
      login();
    },[toggleButton]);

    function handleButton() {
      if (username && password) {
        setToggleButton(true);
      } else {
        alert("Please fill in both fields");
      }
    }
    return (
    <View style={styles.container}>
        <Text style={styles.title}> Login </Text>
        <View style={styles.form}>
        <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            onChangeText={(text) => setUsername(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
        />
        <Pressable style={styles.button} disabled={toggleButton} onPress={handleButton}>
            <Text style={styles.buttonText}>
              {
                toggleButton ? 
                "Đang đăng nhập..."
                :
                "Login"
              }
            </Text>
        </Pressable>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});





