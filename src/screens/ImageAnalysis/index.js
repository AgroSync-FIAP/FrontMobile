import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';

import { api } from '../../screens/service/ApiClarifai';
import { farmcontainer } from '../../screens/utils/farmcontainer';

import { Tip } from '../../components/Tip/index';
import { Item } from '../../components/Item/index';
import { Button } from '../../components/Button';
import { Loading } from '../../components/Loading/index';

export function Home() {
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  async function handleSelectImage() {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== ImagePicker.PermissionStatus.GRANTED) {
        return Alert.alert("É necessário acessar a galeria");
      }

      setIsLoading(true);

      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1
      });

      if (response.cancelled) {
        return setIsLoading(false);
      }

      if (!response.cancelled) {
        const imgManipulated = await ImageManipulator.manipulateAsync(
          response.assets[0].uri,
          [{ resize: { width: 900 } }],
          {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true
          }
        );
        setSelectedImageUri(imgManipulated.uri);
        farmDetect(imgManipulated.base64);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function farmDetect(imageBase64) {
    try {
      const response = await axios.post(
        `https://api.clarifai.com/v2/models/${process.env.EXPO_PUBLIC_API_MODEL_ID}/versions/${process.env.EXPO_PUBLIC_API_MODEL_VERSION_ID}/outputs`,
        {
          user_app_id: {
            user_id: process.env.EXPO_PUBLIC_API_USER_ID,
            app_id: process.env.EXPO_PUBLIC_API_APP_ID,
          },
          inputs: [
            {
              data: {
                image: {
                  base64: imageBase64,
                },
              },
            },
          ],
        },
        {
          headers: {
            'Authorization': 'Key ' + 'c71bb035823d4f9c86e2fd1238ba3f5e', // Substitua 'YOUR_PAT_HERE' pelo seu PAT
            'Content-Type': 'application/json',
          },
        }
      );

      const cultivos = response.data.outputs[0].data.concepts.map((concept) => {
        return {
          name: concept.name,
          percentage: `${Math.round(concept.value * 100)}%`
        }
      });

      const isFarm = farmcontainer(cultivos, 'farm');
      //setMessage(isFarm ? ``: 'Não é fazenda ou cultivo!');
      //setMessage(isFarm ? ``: 'Não é fazenda ou cultivo!');
      setMessage(isFarm ? 'Adicione fertilizante' : 'Não é fazenda ou cultivo!');

      setItems(cultivos);
      setIsLoading(false);

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button onPress={handleSelectImage} disabled={isLoading} />

        {
          selectedImageUri ?
            <Image
              source={{ uri: selectedImageUri }}
              style={styles.image}
              resizeMode="cover"
            />
            :
            <Text style={styles.description}>
              Selecione a foto do seu prato para analisar.
            </Text>
        }

        <View style={styles.bottom}>
          {
            isLoading ? <Loading /> :
              <>
                {message && <Tip message={message} />}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 24 }}>
                  <View style={styles.items}>
                    {
                      items.map((item) => (
                        <Item key={item.name} data={item} />
                      ))
                    }
                  </View>
                </ScrollView>
              </>
          }
        </View>
      </View>
    </SafeAreaView>
  );
}
export default ImageAnalysis;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  description: {
    color: "#2E9D4C",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    fontSize: 14,
    flex: 1,
    textAlignVertical: "center"
  },
  content: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    marginTop: -42,
    paddingTop: 12
  },
  items: {
    flex: 1,
    gap: 12
  },
  image: {
    flex: 1
  },
});


