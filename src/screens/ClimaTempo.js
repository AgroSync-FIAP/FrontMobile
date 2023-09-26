import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import GeoLocation from './GeoLocation/index';
import WeatherWidget from './WeatherWidget';

export default function ClimaTempo() {
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationChange = (location) => {
    setUserLocation(location);
  };

  return (
    <View style={styles.container}>
      <GeoLocation onLocationChange={handleLocationChange} />
      <WeatherWidget userLocation={userLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});