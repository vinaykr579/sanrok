import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw error;
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
};

export const clear = async () => {
  try {
    AsyncStorage.clear();
  } catch (error) {
    throw error;
  }
};
