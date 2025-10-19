import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from '../src/screens/HomeScreen';
import PlanScreen from '../src/screens/PlanScreen';
import PerfilScreen from '../src/screens/PerfilScreen';
import AjustesScreen from '../src/screens/AjustesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#a73fe3ff', 
        tabBarInactiveTintColor: '#94A3B8',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'ellipse';
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          if (route.name === 'PerfilTab') iconName = focused ? 'person' : 'person-outline';
          if (route.name === 'AjustesTab') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 12 },
      })}
    >
      <Tab.Screen
        name="PerfilTab"
        component={PerfilScreen}
        options={{ tabBarLabel: 'Perfil' }}
      />
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Principal' }}
      />
      <Tab.Screen
        name="AjustesTab"
        component={AjustesScreen}
        options={{ tabBarLabel: 'Ajustes' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {}
      <Stack.Screen name="MainTabs" component={TabNavigator} />

      {}
      <Stack.Screen name="Plan" component={PlanScreen} />
    </Stack.Navigator>
  );
}
