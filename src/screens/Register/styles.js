import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c6ccc5",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
    marginTop: 100,
  },
  formulario: {
    marginTop: "10%",
    paddingLeft: "8%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  imagem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    left: "20%",
    top: "10%",
    height: 80,
    width: 235,
  },
  textoInput: {
    paddingHorizontal: 1,
    marginTop: "5%",
    color: "#204721",
    top: "25%",
    paddingLeft: "7%",
    fontSize: 18,
  },
  input: {
    height: 50,
    width: 300,
    right: "45%",
    top: "25%",
    borderRadius: 15,
    borderColor: "#2c752e",
    borderWidth: 1,
    paddingLeft: "5%",
    marginHorizontal: "50%",
    fontSize: 18,
  },
  buttonContainer: {
    height: "100%",
    width: 300,
    marginTop: 50,
    left: 50,
  },
});

