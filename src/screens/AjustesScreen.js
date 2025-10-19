import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from '../constants/colors';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

export default function AjustesScreen({ navigation }) {

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Seguro que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>
      <Text style={styles.subtitle}>Aquí podrás personalizar tu experiencia.</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const PURPLE = '#a73fe3ff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textMuted,
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: PURPLE,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    elevation: 3,
  },
  logoutText: {
    color: Colors.textOnPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
});
