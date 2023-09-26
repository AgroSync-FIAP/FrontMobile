import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../../components/Card/index';
//import GeoLocation from '../../screens/GeoLocation/index';
import Header from '../../components/Header';
import WeatherWidget from '../WeatherWidget/index';
import GeoLocation from '../GeoLocation';


const Teste = ({ navigation }) => {
  const goToImageAnalysis = () => {
    navigation.navigate('ImageAnalysis');
  };

  const goToSoloAnalysis = () => {
    navigation.navigate('SoloAnalysis');
  };

  const goToChat = () => {
    navigation.navigate('Chat');
  };

  const goToSuplayChain = () => {
    navigation.navigate('SuplayChain');
  };

  const cardsData = [
    {
      id: '1',
      title: 'Análise de Imagem',
      imageSource: require('../../../assets/login-agro-syncpng-4.png'),
      onPress: goToImageAnalysis,
    },
    {
      id: '2',
      title: 'Análise de Solo',
      imageSource: require('../../../assets/solo2.png'),
      onPress: goToSoloAnalysis,
    },
    {
      id: '3',
      title: 'Assistente Virtual',
      imageSource: require('../../../assets/chat.png'),
      onPress: goToChat,
    },
    {
      id: '4',
      title: 'Suplay Chain',
      imageSource: require('../../../assets/imagemTest/images5.jpeg'),
      onPress: goToSuplayChain,
    },
  ];
  return (
    <View style={styles.container}>
      <View>

        {/* Widget de Previsão do Tempo (substitua pelo seu widget real)
      <View style={styles.widget}>
        <Text>Widget de Previsão do Tempo</Text>
      </View> */}

        <Header
          title="Página Inicial"
          profileImage={require('../../../assets/perfil.jpg')} // Substitua pelo caminho da sua imagem de perfil
        />

        <ScrollView
          horizontal
          style={styles.scroll}
        >
          <View>
            <Image source={require("../../../assets/imagemTest/download.jpeg")} resizeMode="stretch" style={{ width: 100, height: 100, margin: 2 }} />
          </View>
          <View>
            <Image source={require("../../../assets/imagemTest/images3.jpeg")} resizeMode="stretch" style={{ width: 100, height: 100, margin: 2 }} />
          </View>
          <View>
            <Image source={require("../../../assets/imagemTest/images7.jpeg")} resizeMode="stretch" style={{ width: 100, height: 100, margin: 2 }} />
          </View>
          <View>
            <Image source={require("../../../assets/imagemTest/images5.jpeg")} resizeMode="stretch" style={{ width: 100, height: 100, margin: 2 }} />
          </View>
          <View>
            <Image source={require("../../../assets/imagemTest/images.jpeg")} resizeMode="stretch" style={{ width: 100, height: 100, margin: 2 }} />
          </View>
          <View>
            <Image source={require("../../../assets/imagemTest/images2.jpeg")} resizeMode="stretch" style={{ width: 100, height: 100, margin: 2 }} />
          </View>
          <View>
            <Image source={require("../../../assets/imagemTest/images4.jpeg")} resizeMode="stretch" style={{ width: 100, height: 100, margin: 2 }} />
          </View>
        </ScrollView>

        {/* <View style={styles.cardGrid}>
          <FlatList
            data={[
              { id: '1', title: 'Análise de Imagem', onPress: goToImageAnalysis },
              { id: '2', title: 'Análise de Solo', onPress: goToSoloAnalysis },
              { id: '3', title: 'Assistente Virtual', onPress: goToChat },
              { id: '4', title: 'Suplay Chain', onPress: goToSuplayChain },
            ]}
            renderItem={({ item }) => (
              <View style={styles.cardItem}>
                <Card title={item.title} onPress={item.onPress} />
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.cardGrid}
          />
        </View> */}

        <View style={styles.cardGrid}>
          {cardsData.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              imageSource={card.imageSource}
              onPress={card.onPress}
            />
          ))}
        </View>

        <View style={styles.geo}>
          <WeatherWidget />
        </View>



      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
  },
  widget: {
    backgroundColor: 'lightblue',
    padding: 50,
  },
  scroll: {
    flexDirection: 'row',
    padding: 4,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 2,
  },
  cardGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  geo: {
    width: '100%', // Ocupa a largura total da tela
    height: 100,   // Define a altura desejada
    marginTop: 390,
    //backgroundColor: 'red',
  },
  // cardGrid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap', // Permite que os cards quebrem em várias linhas
  //   justifyContent: 'space-between', // Distribui os cards igualmente em duas colunas
  //   paddingHorizontal: 8, // Espaçamento horizontal entre os cards
  //   backgroundColor: 'rgba(255, 255, 255, 0.5)', // Cor de fundo dos cards
  // },
  // cardItem: {
  //   flexBasis: '50%', // Define a largura de cada card em 48% do contêiner pai (para duas colunas)
  //   //marginBottom: 8, // Espaçamento inferior entre os cards
  //   width: 200,
  //   height: 400,
  // },
});

export default Teste;
