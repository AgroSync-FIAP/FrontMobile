import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';
import Botao from "../../components/Button";

const ImageAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos das permissões de acesso à câmera e à galeria para funcionar!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Galeria" />
      <Botao texto="Selecione a foto" funcao={pickImage} />
      <Botao texto="Tirar Foto" funcao={takePhoto} />

      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

      <ScrollView contentContainerStyle={styles.scroll} horizontal={false}>
        <View style={styles.row}>
          <Image source={require("../../../assets/imagemTest/download.jpeg")} resizeMode="stretch" style={styles.smallImage} />
          <Image source={require("../../../assets/imagemTest/images3.jpeg")} resizeMode="stretch" style={styles.smallImage} />
        </View>
        <View style={styles.row}>
          <Image source={require("../../../assets/imagemTest/images7.jpeg")} resizeMode="stretch" style={styles.smallImage} />
          <Image source={require("../../../assets/imagemTest/images5.jpeg")} resizeMode="stretch" style={styles.smallImage} />
        </View>
        <View style={styles.row}>
          <Image source={require("../../../assets/imagemTest/images.jpeg")} resizeMode="stretch" style={styles.smallImage} />
          <Image source={require("../../../assets/imagemTest/images2.jpeg")} resizeMode="stretch" style={styles.smallImage} />
        </View>
        <View style={styles.row}>
          <Image source={require("../../../assets/imagemTest/images4.jpeg")} resizeMode="stretch" style={styles.smallImage} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#ffffff',
    //paddingHorizontal: 4,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  scroll: {
    flexDirection: 'column', 
    alignItems: 'center', 
  },
  row: {
    flexDirection: 'row', 
    marginVertical: 10, 
  },
  smallImage: {
    flex: 1,
    height: 200,
    margin: 2,
    borderRadius: 10,
  },
});

export default ImageAnalysis;
