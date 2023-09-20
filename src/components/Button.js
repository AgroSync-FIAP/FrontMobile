import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Button({ funcao, texto }) {
  return (
    <TouchableOpacity
      onPress={funcao}
      style={{
        height: "8%",
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#40a742",
        borderRadius: 15,
        marginTop: "10%",
        alignSelf: "center",
        //padding: "2%",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          textTransform: "uppercase",
        }}
      >
        {texto}
      </Text>
    </TouchableOpacity>
  );
}
