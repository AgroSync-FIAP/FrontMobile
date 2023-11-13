import axios from 'axios';
//import { Modal } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';

const SupplyChain = () => {
  const [supplyChainData, setSupplyChainData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [newItemData, setNewItemData] = useState({
    qtdProduzida: '',
    qtdExportada: '',
    qtdPerdida: '',
  });


  useEffect(() => {
    fetchSupplyChainData();
  }, []);

  const fetchSupplyChainData = async () => {
    try {
      const response = await axios.get('http://192.168.0.18:8080/agrosync/suplychain/all');
      setSupplyChainData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados da cadeia de suprimentos:', error);
    }
  };

  const handleCreate = () => {
    setNewItemData({
      qtdProduzida: '',
      qtdExportada: '',
      qtdPerdida: '',
    });
    setCreateModalVisible(true);
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://192.168.0.18:8080/agrosync/suplychain/${id}`);
      setSelectedItem(response.data);
      setNewItemData({
        qtdProduzida: response.data.qtdProduzida.toString(),
        qtdExportada: response.data.qtdExportada.toString(),
        qtdPerdida: response.data.qtdPerdida.toString(),
      });
      setCreateModalVisible(true);
    } catch (error) {
      console.error('Erro ao buscar dados para edição:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      Alert.alert(
        'Confirmação',
        `Tem certeza que deseja excluir o item ${id}?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: async () => {
              await axios.delete(`http://192.168.0.18:8080/agrosync/suplychain/${id}`);
              Alert.alert('Excluir', `Excluir item ${id}`);
              fetchSupplyChainData();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>{item.farm}</Text>
      <Text style={styles.textId}>{item.id}</Text>
      <Text style={styles.text}>{item.qtdProduzida}</Text>
      <Text style={styles.text}>{item.qtdExportada}</Text>
      <Text style={styles.text}>{item.qtdPerdida}</Text>
      <View style={styles.itemContainerAcao}>
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteButton}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleSaveNewItem = async () => {
    try {
      if (selectedItem) {
        await axios.put(`http://192.168.0.18:8080/agrosync/suplychain/${selectedItem.id}`, newItemData);
      } else {
        await axios.post('http://192.168.0.18:8080/agrosync/suplychain', newItemData);
      }
      console.log('Item salvo com sucesso');
      fetchSupplyChainData();
      setCreateModalVisible(false);
      setSelectedItem(null);
    } catch (error) {
      console.error('Erro ao salvar o item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Controle de Supply Chain" />
      <View style={styles.table}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTextAcao}>ID</Text>
          <Text style={styles.headerText}>Qtd Produzida</Text>
          <Text style={styles.headerText}>Qtd Exportada</Text>
          <Text style={styles.headerText}>Qtd Perdida</Text>
          <Text style={styles.headerTextAcao}>Ações</Text>
        </View>

        <FlatList
          data={supplyChainData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          />
      </View>



      {/* Modal para edição */}
      <Modal visible={isCreateModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedItem ? 'Editar Item' : 'Criar Novo Item'}</Text>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Quantidade Produzida"
              style={styles.input}
              value={newItemData.qtdProduzida}
              onChangeText={(text) => setNewItemData({ ...newItemData, qtdProduzida: text })}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Quantidade Exportada"
              style={styles.input}
              value={newItemData.qtdExportada}
              onChangeText={(text) => setNewItemData({ ...newItemData, qtdExportada: text })}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Quantidade Perdida"
              style={styles.input}
              value={newItemData.qtdPerdida}
              onChangeText={(text) => setNewItemData({ ...newItemData, qtdPerdida: text })}
              keyboardType="numeric"
            />
            <View style={styles.modalButtom} >
              <TouchableOpacity onPress={() => setCreateModalVisible(false)}>
                <Text style={styles.modalCloseButton}>Fechar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveNewItem}>
                <Text style={styles.modalSaveButton}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Button texto="Cadastrar" funcao={handleCreate} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: '#DCE1D2',
  },
  table: {
    margin: 20,
    padding: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderRadius: 10,
    lineHeight: 1.5,
    backgroundColor: '#15440B',
  },
  itemContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#15440B',
    //backgroundColor: '#b62271',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  itemContainerAcao:{


  },
  text: {
    //flex: 1,
    left: 30,
    fontSize: 12,
    textAlign: 'center',
  },
  textId: {
    fontSize: 12,
    textAlign: 'center',
    color: '#bab8b8',

  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextAcao: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    //marginTop: 55,
  },
  modalContent: {
    backgroundColor: 'white',
    width: 300,
    height: 300,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  modalButtom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyItems: 'center',
    alignItems: 'center',
  },
  modalSaveButton: {
    //height: "20%",
    //width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#40a742",
    borderRadius: 15,
    marginTop: "10%",
    alignSelf: "center",
    padding: "8%",
    color: "#ffffff",
  },
  modalCloseButton: {
    color: '#15440B',
    textAlign: 'center',
    marginTop: 10,
  },
  editButton: {
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    alignSelf: "center",
    padding: 8,
    color: "#40a742",
    marginRight: 10,
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    alignSelf: "center",
    padding: 8,
    color: "#a80d0d",
    marginRight: 10,

  }
});
export default SupplyChain;
