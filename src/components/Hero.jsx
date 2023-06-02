import { Text, StyleSheet, ImageBackground, View } from "react-native";
import herobg from "../../assets/herobg.png";
import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';



export default function Hero() {
  
  return (
    <View style={styles.container}>
      <ImageBackground source={herobg} resizeMode="center" style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Your favourite manga reader 😏</Text>
          <Text style={styles.p}>is an exceptional app for all manga lovers. With a wide range of titles available, from classics to the latest releases, this app is perfect for those who want to read manga anytime, anywhere.</Text>
          <SearchBar 
        placeholder="Search Mangas"
        onChangeText={""}
        value={""}
        containerStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
        inputContainerStyle={{ backgroundColor: '#ffffff3d', color: '#fff' }}
        inputStyle={{ color: 'black' }}
        cancelButtonProps={{ buttonStyle: { backgroundColor: 'red' }, color: 'white' }}
      />
        </View>
        
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    height: "100%",
    
  },
  textContainer: {
    backgroundColor: "#000000a9",
    height: "100%",
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: '100%'
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 62,
    fontWeight: "bold",
    textAlign: "center",
    
  },
  p: {
    padding: 20,
    color: "white",
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
  },
 
})

