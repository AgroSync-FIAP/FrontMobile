import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./src/screens/Home/index";
import Login from "./src/screens/Login/index";
import LoginBio from "./src/screens/LoginBio/index";

import UserAddScreen from "./src/screens/Register/UserAddScreen";
import UserAddressScreen from "./src/screens/Register/UserAddressScreen";
import UserTest from "./src/screens/Register/UserTest";

import DeleteUserScreen from './src/screens/profile/DeleteUserScreen';
import EditProfileScreen from './src/screens/profile/EditProfileScreen';
import GetUserScreen from './src/screens/profile/GetUserScreen';
import UpdateUserProfileScreen from './src/screens/profile/UpdateUserProfileScreen';
import UserActionsScreen from './src/screens/profile/UserActionsScreen';

import Dashboard from "./src/screens/Dashboard/index";
import ImageAnalysis from "./src/screens/ImageAnalysis/index";
//import RecognitionScreen from "./src/screens/RecognitionScreen/index";
import SoloAnalysis from "./src/screens/SoloAnalysis/index";
import Chat from "./src/screens/Chat/index";
import SuplayChain from "./src/screens/SuplayChain/index";
import GeoLocation from "./src/screens/GeoLocation/index";
import ClimaTempo from "./src/screens/ClimaTempo";
import WeatherWidget from "./src/screens/WeatherWidget/index";

import Nav from "./src/components/Nav";
import Maps from "./src/components/Maps";
import FormSection from "./src/components/FormSection";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SuplayChain"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LoginBio" component={LoginBio} />
        <Stack.Screen name="UserAddScreen" component={UserAddScreen} />
        <Stack.Screen name="UserAddressScreen" component={UserAddressScreen} />
        <Stack.Screen name="UserTest" component={UserTest} />

        <Stack.Screen name="DeleteUserScreen" component={DeleteUserScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="GetUserScreen" component={GetUserScreen} />
        <Stack.Screen name="UpdateUserProfileScreen" component={UpdateUserProfileScreen} />
        <Stack.Screen name="UserActionsScreen" component={UserActionsScreen} />

        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ImageAnalysis" component={ImageAnalysis} />
        {/* <Stack.Screen name="RecognitionScreen" component={RecognitionScreen} /> */}
        <Stack.Screen name="SoloAnalysis" component={SoloAnalysis} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="GeoLocation" component={GeoLocation} />
        <Stack.Screen name="ClimaTempo" component={ClimaTempo} />
        <Stack.Screen name="WeatherWidget" component={WeatherWidget} />
        <Stack.Screen name="SuplayChain" component={SuplayChain} />

        <Stack.Screen name="Nav" component={Nav} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="FormSection" component={FormSection} />
        {/* <Stack.Screen name="Item" component={Item} />
        <Stack.Screen name="Loading" component={Loading} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
