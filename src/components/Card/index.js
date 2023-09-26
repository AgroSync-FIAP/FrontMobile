import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Card = ({ title, imageSource, onPress }) => (
  <View style={styles.card}>
    <Image source={imageSource} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Ver Mais</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '48%', // Ajustado para caber em duas colunas
    aspectRatio: 1, // Para manter a proporção quadrada
    marginBottom: 16,
    backgroundColor: '#40a742',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '50%',
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff',
  },
  button: {
    //backgroundColor: '#6ed271',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#b4ebb6',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Card;
