import React, { useEffect } from "react";
import { Image } from "react-native";
import { styles } from "./styles"; 

export default function Home({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Image
      source={require("../../../assets/HomeYellow.gif")}
      resizeMode="stretch"
      style={styles.container} 
    />
  );
}
