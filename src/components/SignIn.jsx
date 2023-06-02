import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Logominga from "../../assets/Logominga.png";
import Google from '../../assets/Google.png'
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function SignIn() {
  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState()

  async function handleSubmit() {
    let data = {
      email: email,
      password: password
    };
    console.log(data)
    

    try {
      setLoading(true)
      const response = await axios.post("https://minga-violeta-back.onrender.com/auth/signin", data)
      console.log(response)
      const { token, user } = response.data;
      await AsyncStorage.setItem('token', token);
      const storedToken = await AsyncStorage.getItem('token');
      console.log('Token almacenado:', storedToken);
      await AsyncStorage.setItem('user', JSON.stringify({
        name: user.name,
        email: user.email,
        photo: user.photo,
      }));
      const storedUser = await AsyncStorage.getItem('user');
      console.log('Usuario almacenado:', storedUser);
      console.log('logueado');
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('Home');
      }, 1500);
      Alert.alert(
        'User logged in!',
      
      );
        
        
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Wrong Credentials',
        
        );
        setLoading(false);
      }
    }


  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image source={Logominga} style={styles.image} resizeMode="center" />
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.description}>
          Discover manga, manhua and manhwa, track your progress, have fun, read
          manga.
        </Text>
        <View style={styles.fieldset}>
          <Text style={styles.legend}>Email</Text>
          <View style={styles.legendCont}>
            <TextInput
              style={styles.input}
              id="email"
              name="email"
              required
              onChangeText={(inputText) => setemail(inputText)}
            />
          </View>
        </View>

        <View style={styles.fieldset}>
          <Text style={styles.legend}>Password</Text>
          <View style={styles.legendCont}>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              id="password"
              name="password"
              required
            onChangeText={(inputText) => setPassword(inputText)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.divGoogle}>
          <TouchableOpacity style={styles.button2} onPress={() => {}}>
            <Image source={Google} style={styles.googleImg}/>
            <Text style={styles.buttonText2}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.parrafosForm}>
          <Text>
            You don't have an account yet?
            <Text style={styles.parrafosFormText} onPress={() => {
              navigation.navigate('register');
            }}> Sign up</Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    marginTop: 30,
    width: "100%",
  },
  image: {
    width: 60,
    aspectRatio: 2,
  },
  title: {
    fontSize: 32,
    lineHeight: 30,
    fontWeight: 700,
    color: "#1F1F1F",
  },
  description: {
    fontSize: 12,
    lineHeight: 20,
    paddingHorizontal: 10,
    color: "#1F1F1F",
  },
  fieldset: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 30,
    width: 410,
    height: 65,
    width: "90%",
    justifyContent: "flex-start",
    background: "#EBEBEB",
    borderBottomWidth: 1,
  },
  legendCont: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imagen: {
    width: 19,
    height: 19,
    marginBottom: 10,
  },
  googleImg: {
    width: 30,
    height: 30,
  },
  buttonText2: {
    color: "gray",
   
  },
  legend: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 1,
    fontWeight: 500,
    color: "#5F5F5F",
  },
  input: {
    width: "90%",
    backgroundColor: "transparent",
    height: 45,
    fontSize: 15,
    padding: 11,
    borderRadius: 5,
  },
  divCheck: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 12,
    lineHeight: 5,
    letterSpacing: 5,
    color: "#1F1F1F",
    gap: 5,
    width: 410,
  },

  button: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputTextKeyboard: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  buttonText: {
    color: "white",
  },

  button2: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 60,
    margin: 15,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    gap: 20,
  },

  buttonText3: {
    color: "red",
  },

  divGoogle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 370,
    height: 16,
    borderRadius: 10,
    background: "#EBEBEB",
    border: 1,
    
  },

  parrafosForm: {
    display: "flex",
    gap: 17,
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  parrafosFormText: {
    color: "red",
    fontWeight: 700,
    
  },
});

export default SignIn;
