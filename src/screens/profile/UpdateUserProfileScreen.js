import React, { useState } from 'react';
import { Box, Text, Input, Button } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateUserProfileScreen({ route, navigation }) {
  const { id } = route.params;
  const [newName, setNewName] = useState('');

  const updateUserProfile = async () => {
    try {
      // Carregar os dados antigos do usuário
      const userDataString = await AsyncStorage.getItem(`user_${id}`);
      if (userDataString) {
        const oldUserData = JSON.parse(userDataString);

        // Atualizar os dados desejados (no exemplo, estamos atualizando o nome)
        const updatedUserData = { ...oldUserData, name: newName };

        // Armazenar os dados atualizados
        await AsyncStorage.setItem(`user_${id}`, JSON.stringify(updatedUserData));

        // Redirecionar para a tela de visualização de dados
        navigation.navigate('GetUserScreen', { id });

        // Atualizar o nome na tela
        setNewName('');
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil do usuário:', error);
    }
  };

  return (
    <Box flex={1} padding={5}>
      <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
        Atualizar Perfil do Usuário
      </Text>
      <Input
        placeholder="Novo Nome"
        value={newName}
        onChangeText={(text) => setNewName(text)}
        marginBottom={4}
      />
      <Button onPress={updateUserProfile}>Atualizar</Button>
    </Box>
  );
}
