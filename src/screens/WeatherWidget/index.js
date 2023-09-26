import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LocationAccuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';


export default function WeatherWidget() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  async function requestLocationPermissions() {
    try {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);
        console.log("Localização atual =>", currentPosition);
        fetchWeatherData(currentPosition.coords.latitude, currentPosition.coords.longitude);
      } else {
        console.log('Permissão de localização não concedida');
      }
    } catch (error) {
      console.error('Erro ao obter a localização:', error);
    }
  }

  async function fetchWeatherData(latitude, longitude) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.EXPO_PUBLIC_API_WEATHER}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados do clima:', error);
    }
  }

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 10000,
      distanceInterval: 1
    }, (response) => {
      console.log("Nova localização!", response);
      setLocation(response);
      console.log("Nova localização =>", response);
      fetchWeatherData(response.coords.latitude, response.coords.longitude);
    });
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
          />
        </MapView>
      )}

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Clima: {weatherData.weather[0].description}</Text>
          <Text style={styles.weatherText}>Temperatura: {weatherData.main.temp}°C</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: "90%",
    padding: 10,
    borderRadius: 5,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    color: "#2c752e",
  },
});
