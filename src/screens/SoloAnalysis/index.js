import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function SoloAnalysis() {
  const [umidade, setUmidade] = useState(null);

  // Função para iniciar a leitura de umidade
  const iniciarLeituraUmidade = async () => {
    try {
      // Envie uma solicitação para o servidor Flask para iniciar a leitura de umidade
      const response = await fetch('http://192.168.0.18:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ umidade: 0 }), // Você pode ajustar esse valor conforme necessário
      });

      const data = await response.json();

      // Verifique a resposta do servidor Flask
      if (data.message === 'Leitura de umidade recebida com sucesso') {
        // A solicitação foi bem-sucedida, agora você pode buscar a umidade atual
        buscarUmidadeAtual();
      } else {
        // Lida com erros ou mensagens de resposta do Flask
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Função para buscar a umidade atual
  const buscarUmidadeAtual = async () => {
    try {
      // Envie uma solicitação GET para obter a umidade atual do servidor Flask
      const response = await fetch('http://192.168.0.18:5000');
      const data = await response.json();

      // Atualize o estado para exibir a umidade atual na tela
      setUmidade(data.umidade);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Umidade Atual !!!!! : {umidade !== null ? `${umidade}%` : 'N/A'}</Text>
      <Button title="Iniciar Leitura de Umidade" onPress={iniciarLeituraUmidade} />
    </View>
  );
}
