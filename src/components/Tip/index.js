import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export function Tip({ message }) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="agriculture"
        color="#FFFFFF"
        size={24}
      />

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    height: 56,
    borderRadius: 7,
    justifyContent: 'center',
    backgroundColor: "#2E9D4C",
  },
  message: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
});