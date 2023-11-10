import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importe useNavigation e useRoute

export default function UserActionsScreen() {
  const navigation = useNavigation(); 
  const route = useRoute(); 

  const { id } = route.params;
  
  return (
    <View style={styles.container}>
      <Button
        title="Atualizar Perfil"
        onPress={() => navigation.navigate('UpdateUserProfileScreen', { id: id })}
      />
      <Button
        title="Excluir Usuário"
        onPress={() => navigation.navigate('DeleteUserScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
