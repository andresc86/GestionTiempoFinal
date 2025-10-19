import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a TicTonTo!</Text>
      <Text style={styles.subtitle}>
        Organiza tus planes, cumple tus metas y desbloquea recompensas
      </Text>

      <TouchableOpacity
        style={styles.ctaButton}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Plan')}
      >
        <Text style={styles.ctaText}>Crear mi plan de hoy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.text, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textMuted, textAlign: 'center', marginBottom: 24 },
  ctaButton: { backgroundColor: '#a73fe3ff', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 16, elevation: 3, },
  ctaText: { color: Colors.textOnPrimary, fontSize: 16, fontWeight: '700' },
});
