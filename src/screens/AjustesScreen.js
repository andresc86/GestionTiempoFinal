// src/screens/AjustesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const PURPLE = '#a73fe3ff';

// Claves de storage usadas por la app
const KEYS = {
  plans: 'userPlans',
  avatar: '@tictonto_avatar',
  xp: '@tictonto_xp',
  level: '@tictonto_level',
  reminder: '@tictonto_daily_reminder',
};

export default function AjustesScreen({ navigation }) {
  const [dailyReminder, setDailyReminder] = useState(false);

  // Cargar estado del recordatorio
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(KEYS.reminder);
      if (saved) setDailyReminder(saved === '1');
    })();

    // (Opcional recomendado) Configurar canal en Android
    (async () => {
      await Notifications.setNotificationChannelAsync?.('default', {
        name: 'default',
        importance: Notifications.AndroidImportance?.MAX ?? 4,
      });
    })();
  }, []);

  // Programa/cancela el recordatorio
  const toggleDailyReminder = async (value) => {
    try {
      if (value) {
        // pedir permisos
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permiso requerido', 'Habilita notificaciones para los recordatorios.');
          return;
        }
        // cancelar previos
        await Notifications.cancelAllScheduledNotificationsAsync();
        // programar uno diario a las 9:00
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'TicTonTo ⏰',
            body: '¡Crea tu plan de hoy y gana XP! 💪',
          },
          trigger: { hour: 9, minute: 0, repeats: true },
        });
        await AsyncStorage.setItem(KEYS.reminder, '1');
        setDailyReminder(true);
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await AsyncStorage.setItem(KEYS.reminder, '0');
        setDailyReminder(false);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'No se pudo actualizar el recordatorio.');
    }
  };

  // Borrar datos locales
  const handleClearData = () => {
    Alert.alert(
      'Borrar datos locales',
      'Esto eliminará tus planes guardados, XP y avatar de este dispositivo. ¿Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([KEYS.plans, KEYS.avatar, KEYS.xp, KEYS.level]);
              Alert.alert('Listo', 'Se borraron los datos locales.');
            } catch (e) {
              console.log(e);
              Alert.alert('Error', 'No se pudo borrar. Intenta de nuevo.');
            }
          },
        },
      ]
    );
  };

  // Cerrar sesión (con reset de navegación a Login)
  const handleLogout = async () => {
    Alert.alert('Cerrar sesión', '¿Seguro que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut(auth);

            // (Opcional) limpiar datos locales al salir:
            // await AsyncStorage.multiRemove([KEYS.plans, KEYS.avatar, KEYS.xp, KEYS.level]);

            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
          }
        },
      },
    ]);
  };

  const appVersion = Constants?.expoConfig?.version ?? '1.0.0';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>
      <Text style={styles.subtitle}>Personaliza tu experiencia.</Text>

      {/* Editar perfil */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Perfil')}
        activeOpacity={0.9}
      >
        <Ionicons name="create" size={20} color="#fff" />
        <Text style={styles.primaryText}>Editar perfil</Text>
      </TouchableOpacity>

      {/* Recordatorio diario */}
      <View style={styles.cardRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Recordatorio diario</Text>
          <Text style={styles.cardHint}>Notificación cada día a las 9:00 a.m.</Text>
        </View>
        <Switch
          trackColor={{ false: '#ddd', true: '#caa8ff' }}
          thumbColor={dailyReminder ? PURPLE : '#f4f3f4'}
          value={dailyReminder}
          onValueChange={toggleDailyReminder}
        />
      </View>

      {/* Borrar datos locales */}
      <TouchableOpacity style={styles.dangerButton} onPress={handleClearData} activeOpacity={0.9}>
        <Ionicons name="trash" size={20} color="#fff" />
        <Text style={styles.dangerText}>Borrar datos locales</Text>
      </TouchableOpacity>

      {/* Cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.9}>
        <Ionicons name="log-out" size={20} color="#fff" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* Acerca de */}
      <View style={styles.aboutCard}>
        <Text style={styles.aboutTitle}>Acerca de</Text>
        <Text style={styles.aboutText}>TicTonTo · v{appVersion}</Text>
        <Text style={styles.aboutTextMuted}>Recuerda poner en orden tus días!!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'flex-start', padding: 24 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.text, marginBottom: 6 },
  subtitle: { fontSize: 16, color: Colors.textMuted, marginBottom: 16, textAlign: 'center' },

  primaryButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: PURPLE,
    paddingVertical: 12, paddingHorizontal: 18, borderRadius: 14, elevation: 3,
    width: '100%', justifyContent: 'center', marginBottom: 12,
  },
  primaryText: { color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 8 },

  cardRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    borderRadius: 12, padding: 14, width: '100%', marginBottom: 12,
  },
  cardTitle: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  cardHint: { color: Colors.textMuted, fontSize: 12 },

  dangerButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#ef4444',
    paddingVertical: 12, paddingHorizontal: 18, borderRadius: 14, elevation: 3,
    width: '100%', justifyContent: 'center', marginBottom: 10,
  },
  dangerText: { color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 8 },

  logoutButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#dc2626',
    paddingVertical: 12, paddingHorizontal: 18, borderRadius: 14, elevation: 3,
    width: '100%', justifyContent: 'center',
  },
  logoutText: { color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 8 },

  aboutCard: {
    marginTop: 18, width: '100%',
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    borderRadius: 12, padding: 14, alignItems: 'center',
  },
  aboutTitle: { color: Colors.text, fontWeight: '800', fontSize: 16, marginBottom: 4 },
  aboutText: { color: Colors.text, fontWeight: '700' },
  aboutTextMuted: { color: Colors.textMuted, fontSize: 12 },
});
