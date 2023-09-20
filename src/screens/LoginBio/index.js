import { MaterialIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    Text,
    View
} from "react-native";

import {styles} from "./styles";

import Botao from "../../components/Button";

export default function LoginBioScreen({ navigation }) {
  const [autenticado, setAutenticado] = useState(false);

  async function verificarAutenticacao() {
    const compativel = await LocalAuthentication.hasHardwareAsync();
    console.log(compativel);

    if (!compativel) {
      Alert.alert("Dispositivo incompatível");
      navigation.navigate("LoginScreen");
      return;
    }

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(
      types.map((types) => LocalAuthentication.AuthenticationType[types])
    );
  }
  async function biometriaAutenticada() {
    const biometriaCadastrada = await LocalAuthentication.isEnrolledAsync();
    console.log(biometriaCadastrada);

    if (!biometriaCadastrada) {
      Alert.alert("Login", "Nenhuma biomatria localizada");
      navigation.navigate("Register");
      return;
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login com biometria",
      fallbackLabel: "Biometria inválida",
    });

    console.log(auth);
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../../assets/logoGreenDark.png")} style={styles.logo} />
      <MaterialIcons
        name="fingerprint"
        size={80}
        color={"#2c752e"}
        style={styles.icon}
      />

      <Botao texto="Entrar" funcao={biometriaAutenticada} />

      <View style={styles.containerCadastro}>
        <Text style={styles.textoRodape}>
          Não possui conta?
          <Text
            style={styles.textoLink}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            Criar conta
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
