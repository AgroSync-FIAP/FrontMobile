import React, { useEffect } from 'react';
import { Box, Text, Button } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeleteUserScreen({ route, navigation }) {
  const { id } = route.params;

  const deleteUser = async () => {
    try {
      // Remover os dados do usuário do AsyncStorage
      await AsyncStorage.removeItem(`user_${id}`);

      // Redirecionar para a tela inicial ou outra tela após a exclusão (opcional)
      navigation.navigate('Home'); // Substitua 'Home' pelo nome da tela desejada
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
    }
  };

  return (
    <Box flex={1} padding={5}>
      <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
        Excluir Usuário
      </Text>
      <Text>
        Tem certeza de que deseja excluir este usuário? Esta ação não pode ser desfeita.
      </Text>
      <Button onPress={deleteUser} colorScheme="danger" marginTop={4}>
        Excluir
      </Button>
    </Box>
  );
}
