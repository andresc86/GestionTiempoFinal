import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/colors';
import { auth } from '../services/firebaseConfig';
import { getUserProgress } from '../utils/xpManager';
import { getStreak } from '../utils/streak';
import { uploadImageToCloudinary } from '../services/cloudinary';


const PURPLE = '#a73fe3ff';
const AVATAR_KEY = '@tictonto_avatar';
const BIO_KEY = '@tictonto_bio';
const BIO_LIMIT = 180;

export default function PerfilScreen() {
  const [email, setEmail] = useState('—');
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);

  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [bio, setBio] = useState('');
  const [savingBio, setSavingBio] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    setEmail(user?.email ?? 'Anónimo');

    (async () => {
      const { xp, level } = await getUserProgress();
      setXP(xp); setLevel(level);
      try { const s = await getStreak(); if (typeof s === 'number') setStreak(s); } catch {}

      const savedAvatar = await AsyncStorage.getItem(AVATAR_KEY);
      if (savedAvatar) setAvatar(savedAvatar);

      const savedBio = await AsyncStorage.getItem(BIO_KEY);
      if (savedBio) setBio(savedBio);

    })();
  }, []);

  const onChangeAvatar = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        return Alert.alert('Permiso requerido', 'Autoriza acceso a tu galería para elegir una foto.');
      }
      const pick = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });
      if (pick.canceled) return;

      setUploading(true);
      const fileUri = pick.assets[0].uri;

      const { secure_url } = await uploadImageToCloudinary(fileUri);

      await AsyncStorage.setItem(AVATAR_KEY, secure_url);
      setAvatar(secure_url);



      Alert.alert('Listo ✅', 'Tu foto de perfil fue actualizada.');
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'No se pudo actualizar tu foto.');
    } finally {
      setUploading(false);
    }
  };

  const saveBio = async () => {
    try {
      setSavingBio(true);
      const trimmed = bio.trim();
      await AsyncStorage.setItem(BIO_KEY, trimmed);



      Alert.alert('Guardado ✅', 'Tu descripción fue actualizada.');
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'No se pudo guardar tu descripción.');
    } finally {
      setSavingBio(false);
    }
  };

  const nextLevelXP = level * 100;
  const progressPct = Math.min(100, Math.round((xp / nextLevelXP) * 100));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Personaliza tu perfil y revisa tu progreso.</Text>

      {}
      <View style={styles.avatarRow}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]} />
        )}

        <TouchableOpacity style={styles.avatarBtn} onPress={onChangeAvatar} disabled={uploading} activeOpacity={0.9}>
          {uploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.avatarBtnText}>Cambiar foto</Text>}
        </TouchableOpacity>
      </View>

      {}
      <View style={styles.card}>
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.hint}>Cuéntanos algo sobre ti.</Text>
        <TextInput
          style={styles.bioInput}
          placeholder="Escribe tu bio..."
          placeholderTextColor={Colors.textMuted}
          multiline
          maxLength={BIO_LIMIT}
          value={bio}
          onChangeText={setBio}
        />
        <View style={styles.bioFooter}>
          <Text style={styles.bioCount}>{bio.length}/{BIO_LIMIT}</Text>
          <TouchableOpacity style={styles.saveBtn} onPress={saveBio} disabled={savingBio}>
            {savingBio ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Guardar</Text>}
          </TouchableOpacity>
        </View>
      </View>

      {}
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
        <View style={styles.bar}><View style={[styles.fill, { width: `${progressPct}%` }]} /></View>
        <Text style={styles.barHint}>{progressPct}% hacia el siguiente nivel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 24, alignItems: 'stretch' },
  title: { fontSize: 28, fontWeight: '800', color: Colors.text, textAlign: 'center', marginTop: 8 },
  subtitle: { fontSize: 16, color: Colors.textMuted, textAlign: 'center', marginBottom: 16 },

  avatarRow: { alignItems: 'center', marginBottom: 16 },
  avatar: { width: 120, height: 120, borderRadius: 80, backgroundColor: '#ddd' },
  avatarPlaceholder: { borderWidth: 2, borderColor: '#eee' },
  avatarBtn: { backgroundColor: PURPLE, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, marginTop: 10 },
  avatarBtnText: { color: '#fff', fontWeight: '700' },

  card: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, padding: 14, marginBottom: 12 },
  label: { color: Colors.textMuted, fontSize: 13, marginBottom: 4 },
  hint: { color: Colors.textMuted, fontSize: 12, marginBottom: 8 },

  bioInput: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 10,
    color: Colors.text,
    backgroundColor: Colors.surface,
    textAlignVertical: 'top',
  },
  bioFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  bioCount: { color: Colors.textMuted, fontSize: 12 },
  saveBtn: { backgroundColor: PURPLE, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 },
  saveText: { color: '#fff', fontWeight: '700' },

  value: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  bar: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 10, overflow: 'hidden', marginTop: 8 },
  fill: { height: '100%', backgroundColor: PURPLE },
  barHint: { marginTop: 6, fontSize: 12, color: Colors.textMuted, textAlign: 'right' },
});
