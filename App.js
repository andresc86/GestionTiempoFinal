import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from './src/screens/HomeScreen';
import PlanScreen from './src/screens/PlanScreen';
import HistorialScreen from './src/screens/HistorialScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import AjustesScreen from './src/screens/AjustesScreen';

import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const PURPLE = '#a73fe3ff';

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: true,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#f6e9ff',
        tabBarStyle: {
          backgroundColor: PURPLE,
          borderTopWidth: 0,
          height: 58,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontWeight: '700' },
        tabBarIcon: ({ color, size }) => {
          let name = 'ellipse';
          if (route.name === 'Home') name = 'home';
          else if (route.name === 'Perfil') name = 'person';
          else if (route.name === 'Ajustes') name = 'settings';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Ajustes" component={AjustesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        {}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {}
        <Stack.Screen name="Plan" component={PlanScreen} />
        <Stack.Screen name="Historial" component={HistorialScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
