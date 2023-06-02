import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";

import Hero from "../components/Hero";
import SignIn from "../components/SignIn";

export const Index = () => {
  return (
    <ScrollView>
      <View style={styles.containerHero}>
        <Hero />
      </View>
      <View style={styles.containerSignIn}>
        <SignIn />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerHero: {
    height: Dimensions.get('window').height,
    flex: 1,
  },
  containerSignIn: {
    height: Dimensions.get('window').height,
    flex: 1,
  },

})
