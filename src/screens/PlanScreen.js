import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function PlanScreen({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState('');

  const addPlan = () => {
    if (newPlan.trim() === '') return;
    const newItem = { id: Date.now().toString(), text: newPlan };
    setPlans([...plans, newItem]);
    setNewPlan('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Tu plan de hoy</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu plan..."
          value={newPlan}
          onChangeText={setNewPlan}
        />
        <TouchableOpacity style={styles.addButton} onPress={addPlan}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={plans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.planItem}>
            <Text style={styles.planText}>• {item.text}</Text>
          </View>
        )}
        style={styles.list}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeTab')}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.backText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 24 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.text, marginBottom: 16 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: Colors.surface,
  },
  addButton: {
    backgroundColor: '#a73fe3ff',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: { marginTop: 8, flex: 1 },
  planItem: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: Colors.surface,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  planText: { fontSize: 16, color: Colors.text },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a73fe3ff',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  backText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
  },
});
