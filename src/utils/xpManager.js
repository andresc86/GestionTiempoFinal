import AsyncStorage from '@react-native-async-storage/async-storage';

const XP_KEY = '@user_xp';
const LEVEL_KEY = '@user_level';

export const addXP = async (amount = 10) => {
  try {
    const xp = parseInt(await AsyncStorage.getItem(XP_KEY)) || 0;
    const level = parseInt(await AsyncStorage.getItem(LEVEL_KEY)) || 1;

    const newXP = xp + amount;
    const nextLevelXP = level * 100;

    let newLevel = level;
    if (newXP >= nextLevelXP) {
      newLevel += 1;
      await AsyncStorage.setItem(LEVEL_KEY, newLevel.toString());
    }

    await AsyncStorage.setItem(XP_KEY, newXP.toString());
  } catch (error) {
    console.error('Error al agregar XP:', error);
  }
};

export const getUserProgress = async () => {
  try {
    const xp = parseInt(await AsyncStorage.getItem(XP_KEY)) || 0;
    const level = parseInt(await AsyncStorage.getItem(LEVEL_KEY)) || 1;
    return { xp, level };
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    return { xp: 0, level: 1 };
  }
};

export const resetProgress = async () => {
  await AsyncStorage.removeItem(XP_KEY);
  await AsyncStorage.removeItem(LEVEL_KEY);
};
