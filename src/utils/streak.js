import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'tictonto_daily_streak';
const DATE_KEY = 'tictonto_last_open_date';

const fmt = (d) => d.toISOString().slice(0,10); // YYYY-MM-DD

export async function touchStreak() {
  try {
    const today = new Date();
    const todayStr = fmt(today);
    const lastDate = await AsyncStorage.getItem(DATE_KEY);
    let streak = parseInt(await AsyncStorage.getItem(KEY) || '0', 10);

    if (!lastDate) {
      streak = 1;
    } else {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const isYesterday = lastDate === fmt(yesterday);
      const isToday = lastDate === todayStr;

      if (isToday) {
        // already counted
      } else if (isYesterday) {
        streak += 1;
      } else {
        streak = 1; // reset
      }
    }

    await AsyncStorage.setItem(KEY, String(streak));
    await AsyncStorage.setItem(DATE_KEY, todayStr);
    return streak;
  } catch (e) {
    return 0;
  }
}

export async function getStreak() {
  try {
    return parseInt(await AsyncStorage.getItem(KEY) || '0', 10);
  } catch {
    return 0;
  }
}
