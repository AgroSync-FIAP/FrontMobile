import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
      padding: 5,
      backgroundColor: "#c6ccc5",
    },
    logo: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 20,
      top: "10%",
    },
    logoImage: {
      height: 80,
      width: 250,
    },
    inputContainer: {
      marginTop: 100,
      width: "90%",
      alignSelf: "center",
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      height: 50,
      borderRadius: 15,
      borderColor: "#2c752e",
      borderWidth: 1,
      fontSize: 18,
    },
    icon: {
      left: "-8%",
    },
    containerBio: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: "10%",
    },
    buttonBio: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      padding: "2%",
    },
    iconBio: {
      marginRight: "7%",
    },
    textoLinkBio: {
      color: "#2c752e",
      fontSize: 18,
    },
    containerCheckbox: {
      flexDirection: "row",
      paddingLeft: 10,
    },
    textoSecundario: {
      color: "#204721",
      fontSize: 13,
      height: "100%",
      width: "50%",
      left: "50%",
    },
    textoLink: {
      color: "#40a742",
      paddingLeft: 18,
      marginRight: 10,
      fontSize: 14,
      letterSpacing: 1,
      right: "28%",
    },
    checkbox: {
      borderColor: "#2c752e",
      borderRadius: 5,
      color: "#2c752e",
    },
    containerCadastro: {
      justifyContent: "space-between",
      alignSelf: "center",
      marginTop: "10%",
    },
    textoRodape: {
      color: "#204721",
      marginTop: "1%",
      fontSize: 15,
    },
  });

