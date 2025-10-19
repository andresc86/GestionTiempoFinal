import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { auth } from '../services/firebaseConfig';
import { getUserProgress } from '../utils/xpManager';
import { getStreak } from '../utils/streak';

const PURPLE = '#a73fe3ff';

export default function PerfilScreen() {
  const [email, setEmail] = useState('—');
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    setEmail(user?.email ?? 'Anónimo');

    (async () => {
      const { xp, level } = await getUserProgress();
      setXP(xp);
      setLevel(level);

      // getStreak puede no existir en tu util; si sí, úsalo.
      try {
        const s = await getStreak();
        if (typeof s === 'number') setStreak(s);
      } catch {
        // si no existe getStreak, no pasa nada
      }
    })();
  }, []);

  const nextLevelXP = level * 100;
  const progressPct = Math.min(100, Math.round((xp / nextLevelXP) * 100));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Aquí podrás ver tus logros y progreso.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Correo</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Racha</Text>
        <Text style={styles.value}>🔥 {streak} día(s)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nivel & XP</Text>
        <Text style={styles.value}>
          Nivel {level} · {xp}/{nextLevelXP} XP
        </Text>
        <View style={styles.bar}>
          <View style={[styles.fill, { width: `${progressPct}%` }]} />
        </View>
        <Text style={styles.barHint}>{progressPct}% hacia el siguiente nivel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 24, alignItems: 'stretch', justifyContent: 'flex-start' },
  title: { fontSize: 28, fontWeight: '800', color: Colors.text, textAlign: 'center', marginTop: 8 },
  subtitle: { fontSize: 16, color: Colors.textMuted, textAlign: 'center', marginBottom: 20 },

  card: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  label: { color: Colors.textMuted, fontSize: 13, marginBottom: 4 },
  value: { color: Colors.text, fontSize: 16, fontWeight: '700' },

  bar: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 10, overflow: 'hidden', marginTop: 8 },
  fill: { height: '100%', backgroundColor: PURPLE },
  barHint: { marginTop: 6, fontSize: 12, color: Colors.textMuted, textAlign: 'right' },
});

