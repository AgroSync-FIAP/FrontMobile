import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import Botao from "../../components/Button";
import { styles } from "./styles";

const Campo = (props) => (
  <TextInput
    style={styles.input}
    value={props.valor}
    onChangeText={props.funcao}
    cursorColor={"#327CC0"}
    keyboardType={props.teclado}
    secureTextEntry={props.seguranca}
    placeholder={props.texto}
  />
);

export default function Register({ navigation }) {
  const [user, setUser] = useState({
    email: "",
    senha: "",
  });

  const changeEmail = (value) => {
    setUser({
      ...user,
      email: value,
    });
  };

  const changeSenha = (value) => {
    setUser({
      ...user,
      senha: value,
    });
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

  const prosseguir = (_) => {
    if (user.email === "") {
      mostrarToast("O Username é obrigatório");
      return;
    }
    if (user.senha === "") {
      mostrarToast("A senha é obrigatória");
      return;
    }

    console.log("Login:", user.username, user.senha);

    navigation.navigate("Login", { user });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={require("../../../assets/logoGreenDark.png")}
          style={styles.imagem}
        />
        <View style={styles.formulario}>
          <Text style={styles.textoInput}>Username</Text>
          <Campo
            valor={user.email}
            funcao={changeEmail}
            teclado="email-address"
            seguranca={false}
            texto="Informe o seu username"
          />

          <Text style={styles.textoInput}>Senha</Text>
          <Campo
            valor={user.senha}
            funcao={changeSenha}
            teclado="default"
            seguranca={true}
            texto="Crie sua senha"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Botao texto="Prosseguir" funcao={prosseguir} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
