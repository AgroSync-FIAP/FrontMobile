import React from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';

const ImageAnalysis = () => {
  const data = [
    { id: '1', imageUrl: 'https://example.com/image1.jpg' },
    { id: '2', imageUrl: 'https://example.com/image2.jpg' },
    // Adicione mais objetos de imagem conforme necessário
  ];

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3} // Defina o número de colunas desejado
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ImageAnalysis;
