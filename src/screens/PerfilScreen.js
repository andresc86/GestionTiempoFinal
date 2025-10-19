import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Perfil</Text>
      <Text style={styles.subtitle}>Aquí podras ver tus logros y progreso.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textMuted },
});
