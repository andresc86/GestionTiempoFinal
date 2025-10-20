import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const PURPLE = '#a73fe3ff';

export default function HistorialScreen({ navigation }) {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('userPlans');
        const all = stored ? JSON.parse(stored) : [];
        const done = all
          .filter(p => p.completed)
          .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
        setCompleted(done);
      } catch (e) {
        console.log('Error cargando historial:', e);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const totalPlans = completed.length;
    const totalHours = completed.reduce((acc, p) => acc + Number(p.hours || 0), 0);
    return { totalPlans, totalHours };
  }, [completed]);

  const formatDate = (ms) => {
    if (!ms) return '—';
    const d = new Date(ms);
    return d.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      {}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Historial</Text>
      <Text style={styles.subtitle}>
        ✅ {stats.totalPlans} planes completados · ⏱ {stats.totalHours} hora(s)
      </Text>

      <FlatList
        data={completed}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Aún no has completado planes. ¡Vamos! 💪</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.planText}>• {item.text}</Text>
              <Text style={styles.meta}>
                ⏱ {item.hours} hora(s) · 🗓 {formatDate(item.completedAt)}
              </Text>
            </View>
          </View>
        )}
        style={{ marginTop: 12 }}
      />

      {}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 24 },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: PURPLE,
    padding: 8,
    borderRadius: 12,
    elevation: 3,
    zIndex: 10,
  },
  title: { fontSize: 26, fontWeight: '800', color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: 14, color: Colors.textMuted, textAlign: 'center', marginTop: 6 },
  empty: { color: Colors.textMuted, textAlign: 'center', marginTop: 28 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: 10, padding: 12, marginBottom: 10,
  },
  planText: { fontSize: 16, color: Colors.text, fontWeight: '600' },
  meta: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },

  backBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  backBottomText: { color: '#fff', fontWeight: '700', marginLeft: 8, fontSize: 16 },
});
