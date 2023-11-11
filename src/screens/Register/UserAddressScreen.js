import axios from 'axios';
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Botao from "../../components/Button";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import ApiCep from "../../screens/service/ApiCep";

const Campo = (props) => <TextInput
    style={styles.input}
    value={props.valor}
    onChangeText={props.funcao}
    cursorColor={"#63C71F"}
    keyboardType={props.teclado}
    secureTextEntry={props.seguranca}
    placeholder={props.texto}
/>

export default function UserAddressScreen({ navigation, route }) {
    const { user } = route.params;
    const [endereco, setEndereco] = useState({
        zipCode: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "Brasil",
    });

    async function buscarCEP() {
        if (endereco.zipCode === "") {
            Alert.alert("CEP inválido");
            return;
        }

        try {
            const response = await ApiCep.get(`/${endereco.zipCode}/json/`);
            const { logradouro, bairro, localidade, uf } = response.data;
            setEndereco(prevState => ({
                ...prevState,
                street: logradouro,
                neighborhood: bairro,
                city: localidade,
                state: uf
            }));
        } catch (error) {
            console.log("ERROR", error);
        }
    }


    const [enderecosSugeridos, setEnderecosSugeridos] = useState([]);

    const finalizarCadastro = async () => {
        try {
            const data = {
                name: user.name,
                birthday: user.nasc,
                username: user.username,
                email: user.email,
                password: user.senha,
                address: {
                    number: endereco.number,
                    street: endereco.street,
                    neighborhood: endereco.neighborhood,
                    city: endereco.city,
                    state: endereco.state,
                    CEP: endereco.zipCode,
                    country: endereco.country
                },
                phone: {
                    number: user.telefone,
                    ddi: "+55",
                    ddd: "74"
                }
            };
            console.log(JSON.stringify(data, null, 2));

            const response = await axios.post('http://192.168.0.18:8080/agrosync/users', data);
            0
            if (response.status === 201) {
                mostrarToast('Cadastro realizado com sucesso!');
                navigation.navigate('Login');
            } else {
                mostrarToast('Erro ao finalizar o cadastro.' + { error });
            }
        } catch (error) {
            mostrarToast('Erro ao finalizar o cadastro. Tente novamente.' + { error });
            console.error(error);
        }
    };

    const changeZipCode = (value) => {
        setEndereco({
            ...endereco,
            zipCode: value,
        });
    };

    const changeStreet = (value) => {
        setEndereco({
            ...endereco,
            street: value,
        });
    };

    const changeNumber = (value) => {
        setEndereco({
            ...endereco,
            number: value,
        });
    };

    const changeNeighborhood = (value) => {
        setEndereco({
            ...endereco,
            neighborhood: value,
        });
    };

    const changeCity = (value) => {
        setEndereco({
            ...endereco,
            city: value,
        });
    };

    const changeState = (value) => {
        setEndereco({
            ...endereco,
            state: value,
        });
    };

    const changeCountry = (value) => {
        setEndereco({
            ...endereco,
            country: value,
        });
    };

    const mostrarToast = (mensagem) => {
        ToastAndroid.showWithGravityAndOffset(
            mensagem,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            50,
        );
    }
    const cadastrar = async () => {
        if (endereco.zipCode === "") {
            mostrarToast('O CEP é obrigatório');
            return;
        }
        if (endereco.street === "") {
            mostrarToast('O endereço é obrigatório');
            return;
        }
        if (endereco.number === "") {
            mostrarToast('O número é obrigatório');
            return;
        }
        if (endereco.neighborhood === "") {
            mostrarToast('O bairro é obrigatório');
            return;
        }
        if (endereco.city === "") {
            mostrarToast('A cidade é obrigatória');
            return;
        }
        if (endereco.state === "") {
            mostrarToast('O estado é obrigatório');
            return;
        }
        if (endereco.country === "") {
            mostrarToast('O país é obrigatório');
            return;
        }
        try {
            await AsyncStorage.setItem('userAddress', JSON.stringify(endereco));
        } catch (error) {
            console.error('Erro ao salvar os detalhes do endereço do usuário:', error);
        }
        navigation.navigate('Login', { user });
        finalizarCadastro();
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.Scroll}>
                <Image
                    source={require("../../../assets/logoGreenDark.png")}
                    style={styles.imagem}
                />
                <View style={styles.formulario}>
                    <Text style={styles.textoInput}>CEP: </Text>
                    <Campo
                        valor={endereco.zipCode}
                        funcao={changeZipCode}
                        teclado='number-pad'
                        seguranca={false}
                        onChangeText={(texto) => setZipCode(texto)}
                        placeholder="CEP"
                    // texto="Informe o seu CEP"
                    // onPress={buscarCEP}
                    />

                    <Botao texto="Buscar" funcao={buscarCEP} />

                    <Text style={styles.textoInput}>Endereço: </Text>
                    <Campo
                        valor={endereco.street}
                        funcao={changeStreet}
                        teclado='default'
                        seguranca={false}
                        texto="Informe o seu endereço"
                    />

                    <Text style={styles.textoInput}>Número: </Text>
                    <Campo
                        valor={endereco.number}
                        funcao={changeNumber}
                        teclado='number-pad'
                        seguranca={false}
                        texto="Informe o número"
                    />

                    <Text style={styles.textoInput}>Bairro </Text>
                    <Campo
                        valor={endereco.neighborhood}
                        funcao={changeNeighborhood}
                        teclado='default'
                        seguranca={false}
                        texto="Informe o bairro"
                    />

                    <Text style={styles.textoInput}>Cidade </Text>
                    <Campo
                        valor={endereco.city}
                        funcao={changeCity}
                        teclado='default'
                        seguranca={false}
                        texto="Informe a cidade"
                    />

                    <Text style={styles.textoInput}>Estado </Text>
                    <Campo
                        valor={endereco.state}
                        funcao={changeState}
                        teclado='default'
                        seguranca={false}
                        texto="Informe a cidade"
                    />

                    <Text style={styles.textoInput}>País </Text>
                    <Campo
                        valor={endereco.country}
                        funcao={changeCountry}
                        teclado='default'
                        texto="Informe o país "
                    />
                    <Botao texto="Cadastrar " funcao={cadastrar} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#green",
        alignItems: "flex-start",
        justifyContent: "center",
        fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    },
    formulario: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 50,
    },
    imagem: {
        resizeMode: "center",
        position: "relative",
        height: 90,
        width: 261,
        top: 10,
        left: 70,
    },
    titulo: {
        fontSize: 35,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#335138",
    },
    subtitulo: {
        color: "#335138",
        fontSize: 20,
    },
    form: {
        marginTop: 20,
        marginBottom: 20,
    },
    textoInput: {
        color: "#335138",
        marginTop: 20,
    },
    input: {
        paddingHorizontal: 18,
        //marginTop: 80,
        height: 40,
        maxWidth: "100%",
        minWidth: "100%",
        borderRadius: 50,
        borderColor: "#39AE6E",
        marginTop: 10,
        backgroundColor: "#eff4f6",
        borderWidth: 1,
    }
});
