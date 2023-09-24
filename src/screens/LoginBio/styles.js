import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
      padding: 5,
      backgroundColor: "#ffffff",
    },
    logo: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 20,
      top: "10%",
      height: 80,
      width: 235,
    },
    textoInput: {
      color: "#40a742",
      marginTop: 20,
    },
    icon: {
      top: "20%",
      paddingBottom: "40%",
    },
    textoSecundario: {
      color: "#16a619",
      marginTop: "20%",
      fontSize: 12,
      height: "15%",
      width: "142%",
      left: "5%",
    },
    textoLink: {
      color: "#40a742",
      marginTop: 20,
      fontSize: 15,
      letterSpacing: 1,
    },
    containerCadastro: {
      justifyContent: "space-between",
      alignSelf: "center",
      marginTop: "-80%",
    },
    textoRodape: {
      color: "#2c752e",
      marginTop: "100%",
      fontSize: 15,
    },
  });
  