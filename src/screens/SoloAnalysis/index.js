import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function SoloAnalysis() {
  const [umidade, setUmidade] = useState(null);

  const iniciarLeituraUmidade = async () => {
    try {
      const response = await fetch('http://192.168.0.18:5000/atualizar-sensor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ umidade: 0 }),
      });

      const data = await response.json();

      if (data.message === 'ligar_rele') {
        console.log('Relé ligado!');
      } else if (data.message === 'desligar_rele') {
        console.log('Relé desligado!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const buscarUmidadeAtual = async () => {
    try {
      const response = await fetch('http://192.168.0.18:5000/umidade-atual');
      const data = await response.json();

      console.log(data.umidade);
      setUmidade(data.umidade);
      console.log(data.umidade);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    buscarUmidadeAtual();
  }, []);

  return (
    <ImageBackground source={require('../../../assets/solo6.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.rightPanel}>
          <View style={styles.middlePanel}>
            <Text style={styles.umidadeText}>
              Umidade Atual: {umidade !== null ? `${umidade}%` : 'N/A'}
            </Text>
            <TouchableOpacity style={styles.button} onPress={iniciarLeituraUmidade}>
              <Text style={styles.textButton}>Verificar Umidade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Preencher toda a tela
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: 'rgba(255, 255, 255, 0.7)', // Cor de fundo com transparência
  },
  rightPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middlePanel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  umidadeText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#2c752e',
    left: 80,
  },
  button: {
    height: "30%",
    width: "100%",
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#40a742',
    borderRadius: 15,
    marginBottom: 20,
    left: 80,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
  },
});


{/* 
height: "10%",
    width: "100%",
    padding: "9%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#40a742",
    borderRadius: 15,
    //marginTop: "10%",
    alignSelf: "center",
    left: 80,



<View style={styles.container}>
<View style={styles.leftPanel}>
  <Image source={require('../../../assets/solo4.png')} style={styles.image} />
</View>
<View style={styles.rightPanel}>
  <View style={styles.middlePanel}>
    <Text style={styles.umidadeText}>
      Umidade Atual: {umidade !== null ? `${umidade}%` : 'N/A'}
    </Text>
    <TouchableOpacity style={styles.button} onPress={iniciarLeituraUmidade}>
      <Text style={styles.textButton}> Verificar Umidade</Text>
    </TouchableOpacity>
    {/* <Button title="Iniciar Leitura de Umidade" onPress={iniciarLeituraUmidade} />
    <Botao texto="Conferir Umidade" funcao={iniciarLeituraUmidade} /> 
  </View>

  <Image source={require('../../../assets/solo4.png')} style={styles.image} /> 
</View>
</View> */}