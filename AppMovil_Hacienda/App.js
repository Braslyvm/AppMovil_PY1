import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Importación de pantallas
import WelcomeScreen from './screens/Welcome';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import cambioscreens from './screens/TipoCambio';
import ProfileScreen from './screens/Profile';
import RegisterScreen from './screens/Register';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function MainApp() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#E5D9F2', 
          width: 240, 
        },
        drawerLabelStyle: {
          fontSize: 16, 
          color: '#000',
        },
        drawerActiveTintColor: '#007bff', 
        drawerInactiveTintColor: '#555', 
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: '#E5D9F2' },
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: { backgroundColor: '#E5D9F2' },
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <Drawer.Screen
        name="Tipo de cambio"
        component={cambioscreens}
        options={{
          headerStyle: { backgroundColor: '#E5D9F2' },
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainApp" component={MainApp} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}


