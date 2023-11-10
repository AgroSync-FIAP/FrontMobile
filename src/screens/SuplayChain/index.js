import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, SafeAreaViewComponent } from 'react-native';
import Header from '../../components/Header';

const supplyChainData = [
  { id: '1', productName: 'Produto A', quantity: 100, location: 'Armazém 1' },
  { id: '2', productName: 'Produto B', quantity: 150, location: 'Armazém 2' },
  { id: '3', productName: 'Produto C', quantity: 200, location: 'Armazém 1' },
  // Adicione mais dados fictícios conforme necessário
];

const SupplyChain = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text>Quantidade: {item.quantity}</Text>
      <Text>Localização: {item.location}</Text>
    </View>
  );

  return (
    
      <View style={styles.container}>
        <Header title="Supply Chain" />
        <FlatList
          data={supplyChainData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    backgroundColor: '#ffffff',
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default SupplyChain;
