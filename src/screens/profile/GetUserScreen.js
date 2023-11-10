import React, { useState, useEffect } from 'react';
import { Box, Text } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GetUserScreen({ route }) {
  const { id } = route.params;
  const [userData, setUserData] = useState(null);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(`user_${id}`);
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserData(userData);
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do usuário:', error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <Box flex={1} padding={5}>
      <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
        Dados do Usuário
      </Text>
      {userData && (
        <>
          <Text>Nome: {userData.name}</Text>
          {/* Adicione outros campos aqui conforme necessário */}
        </>
      )}
    </Box>
  );
}
