
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Colors from './src/constants/colors';
import AppNavigator from './navigation/AppNavigator';

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: Colors.background },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
