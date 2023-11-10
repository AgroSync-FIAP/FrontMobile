import axios from 'axios';
import { ImagePicker } from 'expo';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

const RecognitionScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = async () => {
    // Solicitar permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('É necessário permitir o acesso à galeria para usar esta funcionalidade.');
      return;
    }

    // Selecionar imagem da galeria
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const base64 = await convertImageToBase64(uri);

      // Substitua 'SEU_ENDPOINT' pelo endpoint da sua API
      const response = await axios.post(
        `https://api.clarifai.com/v2/models/${process.env.EXPO_PUBLIC_API_MODEL_ID}/versions/${process.env.EXPO_PUBLIC_API_MODEL_VERSION_ID}/outputs`, // Insira o endpoint da sua API aqui
        {
          user_app_id: {
            user_id: process.env.EXPO_PUBLIC_API_USER_ID,
            app_id: process.env.EXPO_PUBLIC_API_APP_ID,
          },
          inputs: [
            {
              data: {
                image: {
                  base64: base64,
                },
              },
            },
          ],
        },
        {
          headers: {
            'Authorization': 'Key ' + process.env.EXPO_PUBLIC_API_MODEL_VERSION_ID,
            'Content-Type': 'application/json',
          },
        }
      );

      setResult(response.data); // Defina a resposta recebida do Clarifai no estado 'result'
    
      const cultivos = response.data.outputs[0].data.concepts.map((concept) => {
        return {
          name: concept.name,
          percentage: `${Math.round(concept.value * 100)}%`
        }
      });

      const isFarm = farmcontainer(cultivos, 'farm');
      setMessage(isFarm ? 'Adicione fertilizante' : 'Não é fazenda ou cultivo!');

      setItems(cultivos);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setIsLoading(false);
    }
  };

  const convertImageToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={styles.container}>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <Button title="Selecionar Imagem" onPress={handleImageUpload} />
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Resultado do Reconhecimento:</Text>
          <Text>{JSON.stringify(result, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RecognitionScreen;
