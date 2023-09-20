import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./src/screens/Home/index";
import Login from "./src/screens/Login/index";
import LoginBio from "./src/screens/LoginBio/index";
import Register from "./src/screens/Register/index";
import Dashboard from "./src/screens/Dashboard/index";
// import ImageAnalysis from "./src/screens/ImageAnalysis/index";
import SoloAnalysis from "./src/screens/SoloAnalysis/index";
import Chat from "./src/screens/Chat/index";

import Nav from "./src/components/Nav";
import FormSection from "./src/components/FormSection";
// import Item from "./src/components/Item/index";
// import Loading from "./src/components/Loading/index";
// import Tip from "./src/components/Tip/index";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LoginBio" component={LoginBio} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        {/* <Stack.Screen name="ImageAnalysis" component={ImageAnalysis} /> */}
        <Stack.Screen name="SoloAnalysis" component={SoloAnalysis} />
        <Stack.Screen name="Chat" component={Chat} />

        <Stack.Screen name="Nav" component={Nav} />
        <Stack.Screen name="FormSection" component={FormSection} />
        {/* <Stack.Screen name="Item" component={Item} />
        <Stack.Screen name="Loading" component={Loading} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
