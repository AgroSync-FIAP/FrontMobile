import Constants from 'expo-constants';
import { Configuration, OpenAIApi } from 'openai';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FormSection from '../../components/FormSection';

export default function Chat() {
  const [storedValues, setStoredValues] = useState([]);
  const apiKey = process.env.EXPO_PUBLIC_API_KEY; 

  const generateResponse = async (newQuestion, setNewQuestion) => { 
    try {
      const configuration = new Configuration({
        apiKey: apiKey,
        basePath: 'https://api.openai.com/v1',
      });

      const openai = new OpenAIApi(configuration);

      const options = {
        model: 'text-davinci-003',
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['/'],
      };

      const completeOptions = {
        ...options,
        prompt: newQuestion,
      };

      const queryString = Object.entries(completeOptions)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      const response = await openai.createCompletion(queryString);

      if (response.data.choices) {
        setStoredValues([
          {
            question: newQuestion,
            answer: response.data.choices[0].text,
          },
          ...storedValues,
        ]);
        setNewQuestion('');
      }
    } catch (error) {
      console.error('Erro ao gerar a resposta:', error);
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
            <Text style={styles.questionText}>{value.question}</Text>
            <Text style={styles.answerText}>{value.answer}</Text>
          </View>
        ))}
      </ScrollView>

      <FormSection generateResponse={generateResponse} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});