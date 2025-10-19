import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Colors from '../constants/colors';
import { touchStreak } from '../utils/streak';
import { getUserProgress } from '../utils/xpManager';

const PURPLE = '#a73fe3ff';

export default function HomeScreen({ navigation }) {
  const [streak, setStreak] = useState(0);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [progressAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    (async () => {
      const s = await touchStreak();
      setStreak(s);
      const { xp, level } = await getUserProgress();
      setXP(xp);
      setLevel(level);
      animateProgress(xp, level);
    })();
  }, []);

  const animateProgress = (xp, level) => {
    const nextLevelXP = level * 100;
    const progress = Math.max(0, Math.min(1, xp / nextLevelXP));
    Animated.timing(progressAnim, { toValue: progress, duration: 800, useNativeDriver: false }).start();
  };

  const progressWidth = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a TicTonTo!</Text>
      <Text style={styles.streak}>🔥 Racha: {streak} día(s)</Text>

      {/* Progreso de nivel */}
      <Text style={styles.levelText}>Nivel {level} 🧠 | {xp} XP</Text>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      <Text style={styles.subtitle}>
        Organiza tus planes, cumple tus metas y desbloquea recompensas
      </Text>

      {/* CTA principal */}
      <TouchableOpacity
        style={styles.ctaButton}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Plan')}
      >
        <Text style={styles.ctaText}>Crear mi plan de hoy</Text>
      </TouchableOpacity>

      {/* Botón secundario (menos destacado) */}
      <TouchableOpacity
        style={styles.secondaryButton}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Historial')}
      >
        <Text style={styles.secondaryText}>Ver historial</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.text, textAlign: 'center', marginBottom: 8 },
  streak: { fontSize: 16, fontWeight: '700', color: PURPLE, textAlign: 'center', marginBottom: 8 },
  levelText: { fontSize: 16, fontWeight: '700', color: Colors.text, textAlign: 'center', marginBottom: 4 },
  progressBar: { width: '80%', height: 10, backgroundColor: '#ddd', borderRadius: 10, overflow: 'hidden', marginBottom: 20 },
  progressFill: { height: '100%', backgroundColor: PURPLE },
  subtitle: { fontSize: 16, color: Colors.textMuted, textAlign: 'center', marginBottom: 24 },

  ctaButton: { backgroundColor: PURPLE, paddingVertical: 14, paddingHorizontal: 24, borderRadius: 16, elevation: 3, width: '80%', alignItems: 'center' },
  ctaText: { color: Colors.textOnPrimary, fontSize: 16, fontWeight: '700' },

  secondaryButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: PURPLE,
    width: '80%',
    alignItems: 'center',
  },
  secondaryText: { color: PURPLE, fontSize: 15, fontWeight: '700' },
});

