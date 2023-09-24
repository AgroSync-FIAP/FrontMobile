import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Dashboard from '../screens/Dashboard/index';
// import ImageAnalysis from '../screens/ImageAnalysis/index';
import SoloAnalysis from '../screens/SoloAnalysis/index';
import Chat from '../screens/Chat/index';

import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
//import IconTabBar from './IconTabBar';

const Tab = createBottomTabNavigator();

export default function Nav() {
    return (
        <Tab.Navigator
            //initialRouteName="DashScreen"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#40a742",
                    borderTopColor: 'transparent',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    height: 55,
                    fontColor: "#204721",
                },
                tabBarActiveTintColor: "#ffffff",
                tabBarInactiveTintColor: "#204721",
                tabBarItemStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                },
            }}
        >

            <Tab.Screen name='Dashboard' component={Dashboard}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />

            {/* <Tab.Screen name='ImageAnalysis' component={ImageAnalysis}
                options={{
                    tabBarLabel: 'imageAnalysis',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="image" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            /> */}

            <Tab.Screen name='SoloAnalysis' component={SoloAnalysis}
                options={{
                    tabBarLabel: 'SoloAnalysis',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="agriculture" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />



            <Tab.Screen name='Chat' component={Chat}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="chat" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />


            {/* <Tab.Screen name='Cam' component={Can}
                options={{
                    tabBarLabel: 'Camera',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="photo-camera" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            /> */}
            {/* <Tab.Screen name='Resultado' component={ResultadoScreen}
                options={{
                    tabBarLabel: 'Resultado',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            /> */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#902323',
    },
  });