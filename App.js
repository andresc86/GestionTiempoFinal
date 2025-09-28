import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from './src/constants/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a TiempoQuest!</Text>
      <Text style={styles.subtitle}>
        Organiza tu día, cumple tus metas y desbloquea recompensas 🎯
      </Text>

      <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85}>
        <Text style={styles.ctaText}>Crear mi plan de hoy</Text>
      </TouchableOpacity>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Racha: 0 🔥</Text>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

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
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  ctaText: {
    color: Colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: 56,
    right: 24,
    backgroundColor: Colors.accent,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  badgeText: {
    color: '#1F2937',
    fontWeight: '700',
  },
});
