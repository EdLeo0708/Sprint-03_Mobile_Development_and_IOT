import AsyncStorage from '@react-native-async-storage/async-storage';
import { HealthRecord, User } from '../types';
import { StorageKeys } from '../enums';

export const saveUser = async (user: User): Promise<void> => {
  await AsyncStorage.setItem(StorageKeys.USER, JSON.stringify(user));
};

export const getUser = async (): Promise<User | null> => {
  const data = await AsyncStorage.getItem(StorageKeys.USER);
  return data ? JSON.parse(data) : null;
};

export const removeUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(StorageKeys.USER);
};

export const saveRecord = async (record: HealthRecord): Promise<void> => {
  const existing = await getRecords();
  const updated = [record, ...existing];
  await AsyncStorage.setItem(StorageKeys.RECORDS, JSON.stringify(updated));
};

export const getRecords = async (): Promise<HealthRecord[]> => {
  const data = await AsyncStorage.getItem(StorageKeys.RECORDS);
  return data ? JSON.parse(data) : [];
};