import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Botao from '../../components/Button';
import Api from '../../screens/service/ApiCep';
import axios from 'axios';

const Campo = (props) => (
    <TextInput
        style={styles.input}
        value={props.valor}
        onChangeText={props.funcao}
        cursorColor={'#63C71F'}
        keyboardType={props.teclado}
        secureTextEntry={props.seguranca}
        placeholder={props.texto}
    />
);

export default function EditProfileScreen({ route, navigation }) {
    const { user, userId } = route.params;

    // Estados para campos editáveis
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [status, setStatus] = useState(user.status);

    // Estado para informações de endereço
    const [endereco, setEndereco] = useState({
        CEP: user.address.CEP,
        street: user.address.street,
        number: user.address.number,
        neighborhood: user.address.neighborhood,
        city: user.address.city,
        state: user.address.state,
        country: user.address.country,
    });

    const mostrarToast = (mensagem) => {
        ToastAndroid.showWithGravityAndOffset(
            mensagem,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            50
        );
    };

    const buscarCEP = async () => {
        if (endereco.CEP === '') {
            mostrarToast('CEP inválido');
            return;
        }

        try {
            const response = await Api.get(`/${endereco.CEP}/json/`);
            const { logradouro, bairro, localidade, uf } = response.data;
            setEndereco((prevState) => ({
                ...prevState,
                street: logradouro,
                neighborhood: bairro,
                city: localidade,
                state: uf,
            }));
        } catch (error) {
            console.log('ERROR', error);
        }
    };

    const atualizarPerfil = async () => {
        try {
            const updatedData = {
                id: userId,
                name,
                email,
                status,
                address: {
                    id: user.address.id,
                    CEP: endereco.CEP,
                    number: endereco.number,
                    street: endereco.street,
                    neighborhood: endereco.neighborhood,
                    city: endereco.city,
                    state: endereco.state,
                    country: endereco.country,
                },
            };

            const response = await axios.put(
                `http://192.168.0.18:8080/users/${userId}`,
                updatedData
            );

            if (response.status === 200) {
                mostrarToast('Perfil atualizado com sucesso!');
                navigation.goBack();
            } else {
                mostrarToast('Erro ao atualizar o perfil.');
            }
        } catch (error) {
            mostrarToast('Erro ao atualizar o perfil. Tente novamente.');
            console.error(error);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.Scroll}>
                <Image
                    source={require('../../../assets/logoGreenDark.png')}
                    style={styles.imagem}
                />
                <View style={styles.formulario}>
                    <Text style={styles.textoInput}>Nome:</Text>
                    <Campo
                        valor={name}
                        funcao={setName}
                        teclado="default"
                        seguranca={false}
                        texto="Informe o seu nome"
                    />

                    <Text style={styles.textoInput}>Email:</Text>
                    <Campo
                        valor={email}
                        funcao={setEmail}
                        teclado="email-address"
                        seguranca={false}
                        texto="Informe o seu email"
                    />

                    <Text style={styles.textoInput}>Status:</Text>
                    <Campo
                        valor={status}
                        funcao={setStatus}
                        teclado="default"
                        seguranca={false}
                        texto="Informe o seu status"
                    />

                    <Text style={styles.textoInput}>CEP:</Text>
                    <Campo
                        valor={endereco.CEP}
                        funcao={(texto) => setEndereco({ ...endereco, CEP: texto })}
                        teclado="number-pad"
                        seguranca={false}
                        texto="Informe o seu CEP"
                    />
                    <Botao texto="Buscar" funcao={buscarCEP} />

                    <Text style={styles.textoInput}>Endereço:</Text>
                    <Campo
                        valor={endereco.street}
                        funcao={(texto) => setEndereco({ ...endereco, street: texto })}
                        teclado="default"
                        seguranca={false}
                        texto="Informe o seu endereço"
                    />

                    <Botao texto="Atualizar Perfil" funcao={atualizarPerfil} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}