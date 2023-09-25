import axios from 'axios';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Loading } from '../../components/Loading/index';

export default function Chat() {
  const [storedValues, setStoredValues] = useState([]);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isChatGPTProcessing, setIsChatGPTProcessing] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const sendMessageToChatGPT = async () => {
    if (inputText.trim() === '') return;

    try {

      // setIsChatGPTProcessing(true);
      setIsLoading(true);
      // setThinkingMessage('Pensando...');
      const payload = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: inputText,
          },
        ],
      };

      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      const reply = response.data.choices[0].message.content;


      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, isUser: true },
        { text: reply, isUser: false },
      ]);

      setInputText('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      // setIsChatGPTProcessing(false);
      setIsLoading(false);
      setThinkingMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerText}>Syncler Chat</Text>
        <Text style={styles.descriptionText}>
          Olá, eu sou a Syncler assistente virtual da AgroSync, como posso te ajudar?
        </Text>
      </View>

      <ScrollView style={styles.chatContainer}>
        {storedValues.map((value, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={styles.questionText} >{value.question}</Text>
            <Text style={styles.answerText}>{value.answer}</Text>
          </View>
        ))}
        {messages.map((message, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={message.isUser ? styles.userText : styles.chatGPTText}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Digite sua mensagem"
          value={inputText}
          onChangeText={setInputText}
        />
        {thinkingMessage ? <Text style={styles.thinkingText}>{thinkingMessage}</Text> : null}

        {isLoading ? (
          <Loading />
        ) : (
          <TouchableOpacity onPress={sendMessageToChatGPT} disabled={isLoading} style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: "#40a742",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  headerSection: {
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 80,
    color: '#40a742',
  },
  descriptionText: {
    fontSize: 16,
    color: '#21593B',
  },
  chatContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  messageContainer: {
    marginBottom: 10,
  },
  questionText: {
    fontWeight: 'bold',
  },
  answerText: {
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    //backgroundColor:'#961212',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  inputText: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  userText: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  chatGPTText: {
    textAlign: 'left',
  },
});