import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";

import { styles } from "./styles";


import Botao from "../../components/Button";

export default function Login({ navigation }) {
  const [user, setUser] = useState({
    username: "",
    senha: "",
    lembrarSenha: "",
  });

  const changeUsername = (value) => {
    setUser((prevState) => ({
      ...prevState,
      username: value,
    }));
  };

  const changeSenha = (value) => {
    setUser((prevState) => ({
      ...prevState,
      senha: value,
    }));
  };

  const changeLembrarSenha = (value) => {
    setUser((prevState) => ({
      ...prevState,
      lembrarSenha: value,
    }));
  };

  const mostrarToast = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      50
    );
  };
  const [acesso, setAcesso] = useState({
    id: "",
    token: "",
  });

  const login = async () => {
    if (user.username === "") {
      mostrarToast("O username é obrigatório");
      return;
    }
    if (user.senha === "") {
      mostrarToast("A senha é obrigatória");
      return;
    }

    navigation.navigate("Nav");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../../../assets/logoGreenDark.png")}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="person"
            size={20}
            color={"#2c752e"}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={user.username}
            onChangeText={changeUsername}
            cursorColor={"#204721"}
            keyboardType="numbers-and-punctuation"
            placeholder=" Digite seu username"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="lock"
            size={20}
            color={"#2c752e"}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={user.senha}
            onChangeText={changeSenha}
            cursorColor={"#204721"}
            secureTextEntry={true}
            keyboardType="number-pad"
            placeholder=" Digite sua senha"
          />
        </View>
      </View>

      <View style={styles.containerCheckbox}>
        <Checkbox
          style={styles.checkbox}
          disabled={false}
          value={user.lembrarSenha}
          onValueChange={changeLembrarSenha}
          isChecked={user.lembrarSenha}
          color={user.lembrarSenha ? "#40a742" : undefined}
        />

        <Text style={styles.textoSecundario}>Lembrar minha senha</Text>
        <Text style={styles.textoLink}>Esqueci a senha</Text>
      </View>

      <Botao texto="Entrar" funcao={login} />

      <View style={styles.containerBio}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonBio}
          onPress={() => navigation.navigate("LoginBio")}
        >
          <MaterialIcons
            name="fingerprint"
            size={50}
            color={"#2c752e"}
            style={styles.iconBio}
          />
          <Text style={styles.textoLinkBio}>Entrar com biometria</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerCadastro}>
        <Text style={styles.textoRodape}> Não possui conta? <Text
          style={styles.textoLink}
          onPress={() => navigation.navigate("Register")}
        >
          Criar conta
        </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

