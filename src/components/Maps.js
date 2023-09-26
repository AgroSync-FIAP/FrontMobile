import { LocationAccuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Maps() {
    const [location, setLocation] = useState(null);

    async function requestLocationPermissions() {
        try {
            const { granted } = await requestForegroundPermissionsAsync();

            if (granted) {
                const currentPosition = await getCurrentPositionAsync();
                setLocation(currentPosition);
                console.log("Localização atual =>", currentPosition); // Verifique a localização no console
            } else {
                console.log('Permissão de localização não concedida');
            }
        } catch (error) {
            console.error('Erro ao obter a localização:', error);
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
            console.log("Nova localização =>", response); // Verifique a localização no console

        });
    }, []);

    return (
        <View style={styles.container}>
            {
                location &&
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
            }
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
        width: "90%",
        height: "20%",
        padding: 10,
        borderRadius: 5,
    },
});
