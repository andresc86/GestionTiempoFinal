import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { addXP } from '../utils/xpManager';

export default function PlanScreen({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState('');
  const [hours, setHours] = useState('');

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const stored = await AsyncStorage.getItem('userPlans');
      if (stored) setPlans(JSON.parse(stored));
    } catch (error) {
      console.log('Error al cargar planes:', error);
    }
  };

  const savePlans = async (updatedPlans) => {
    try {
      await AsyncStorage.setItem('userPlans', JSON.stringify(updatedPlans));
    } catch (error) {
      console.log('Error al guardar planes:', error);
    }
  };

  const addPlan = () => {
    if (newPlan.trim() === '' || hours.trim() === '') {
      return Alert.alert('Faltan datos', 'Por favor escribe tu plan y las horas.');
    }

    const newItem = {
      id: Date.now().toString(),
      text: newPlan,
      hours,
      completed: false,
      createdAt: Date.now(),
      completedAt: null,
    };

    const updated = [...plans, newItem];
    setPlans(updated);
    savePlans(updated);

    setNewPlan('');
    setHours('');
  };

  const completePlan = async (id) => {
    
    const found = plans.find(p => p.id === id);
    if (!found) return;
    if (found.completed) {
      return Alert.alert('Ya completado', 'Este plan ya fue marcado como completado.');
    }

    const updated = plans.map((item) =>
      item.id === id ? { ...item, completed: true, completedAt: Date.now() } : item
    );
    setPlans(updated);
    savePlans(updated);

    await addXP(20);
    Alert.alert('¡Excelente trabajo! 💪', 'Has completado un plan y ganaste +20 XP.');
  };

  const deletePlan = (id) => {
    const updated = plans.filter((item) => item.id !== id);
    setPlans(updated);
    savePlans(updated);
  };

  const fmt = (ms) => {
    if (!ms) return '—';
    const d = new Date(ms);
    return d.toLocaleDateString();
  };

  
  const sortedPlans = [...plans].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const da = a.completed ? a.completedAt || 0 : a.createdAt || 0;
    const db = b.completed ? b.completedAt || 0 : b.createdAt || 0;
    return db - da;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu plan de hoy</Text>
      <Text style={styles.subtitle}>
        Crea tus metas, guárdalas y márcalas cuando las completes
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="¿Qué vas a hacer?"
          placeholderTextColor="#999"
          value={newPlan}
          onChangeText={setNewPlan}
        />
        <TextInput
          style={[styles.input, { flex: 1, marginLeft: 6 }]}
          placeholder="Horas"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
        />
        <TouchableOpacity style={styles.addButton} onPress={addPlan}>
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {}
      <FlatList
        data={sortedPlans}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: Colors.textMuted, textAlign: 'center', marginTop: 30 }}>
            No tienes planes todavía. ¡Crea uno nuevo! 🌟
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.planItem,
              item.completed && {
                backgroundColor: '#f3e8ff',
                borderColor: '#a73fe3ff',
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.planText,
                  item.completed && { textDecorationLine: 'line-through', opacity: 0.6 },
                ]}
              >
                • {item.text}
              </Text>
              <Text style={styles.meta}>
                ⏱ {item.hours} hora(s) · 🗓 Creado: {fmt(item.createdAt)}
              </Text>
              {item.completed && (
                <Text style={styles.metaDone}>
                  ✅ Completado: {fmt(item.completedAt)}
                </Text>
              )}
            </View>

            {!item.completed ? (
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => completePlan(item.id)}
              >
                <Ionicons name="checkmark-circle" size={26} color="#fff" />
              </TouchableOpacity>
            ) : (
              <Ionicons name="checkmark-done" size={26} color="#a73fe3ff" />
            )}

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deletePlan(item.id)}
            >
              <Ionicons name="trash" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.backText}>Menú principal</Text>
      </TouchableOpacity>
    </View>
  );
}

const PURPLE = '#a73fe3ff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    color: Colors.text,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: PURPLE,
    padding: 10,
    borderRadius: 8,
    marginLeft: 6,
    elevation: 3,
  },
  list: { flex: 1 },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
    backgroundColor: Colors.surface,
  },
  planText: { fontSize: 16, color: Colors.text, fontWeight: '600' },
  meta: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  metaDone: { fontSize: 13, color: PURPLE, marginTop: 2, fontWeight: '700' },
  doneButton: {
    backgroundColor: PURPLE,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#e63946',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  backText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
  },
});
