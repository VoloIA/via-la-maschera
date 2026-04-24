import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getLocalItem(key: string) {
  return AsyncStorage.getItem(key);
}

export async function setLocalItem(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function removeLocalItem(key: string) {
  await AsyncStorage.removeItem(key);
}
