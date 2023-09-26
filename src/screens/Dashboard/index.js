import React from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// import ImageAnalysis from '../../screens/ImageAnalysis/index';
import SoloAnalysis from '../../screens/SoloAnalysis/index';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function DashScreen({ navigation }) {
  const goToSoloAnalysis = () => {
    navigation.navigate("SoloAnalysis");
  };

  const goToImageAnalysis = () => {
    navigation.navigate("ImageAnalysis");
  };

  const goToChat = () => {
    navigation.navigate("Chat");
  };

  return (
    // <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("../../../assets/logoGreenDark.png")}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goToImageAnalysis}>
            <Text style={styles.buttonText}>Análise Imagem</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goToSoloAnalysis}>
            <Text style={styles.buttonText}>Análise Solo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goToChat}>
            <Text style={styles.buttonText}>Assistente virtual</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fiapLogo}>
          <Image
            source={require("../../../assets/fiap.png")}
            style={styles.fiapLogoImage}
          />
        </View>
      </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 100,
    backgroundColor: "#ffffff",
    padding: windowHeight * 0.1,
  },
  specsAI: {
    width: "70%",
    aspectRatio: 1099 / 184,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  specsAIImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonContainer: {
    width: "100%",
    //paddingTop: "0%", 
    //aspectRatio: 958.077 / 188, 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#40a742",
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: windowHeight * 0.03,
  },
  logo: {
    width: "100%",
    aspectRatio: 754 / 466,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  fiapLogo: {
    width: "30%",
    aspectRatio: 370 / 108,
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  fiapLogoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});


