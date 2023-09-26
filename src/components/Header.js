import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';

const Header = ({ title, profileImage }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c752e', // Cor de fundo do cabeçalho
    padding: 10,
  },
  profileImage: {
    width: 50, // Largura da imagem de perfil
    height: 50, // Altura da imagem de perfil
    borderRadius: 20, // Para tornar a imagem redonda (metade da largura/altura)
    marginRight: 10, // Espaçamento entre a imagem e o título
  },
  title: {
    fontSize: 18, // Tamanho do texto do título
    color: '#fff', // Cor do texto do título
    fontWeight: 'bold', // Negrito do texto do título
    justifyContent: 'center', // Esta linha estava no lugar errado e agora foi corrigida
  },
});

export default Header;
