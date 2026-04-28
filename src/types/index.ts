import { MoodLevel } from '../enums';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

export interface HealthRecord {
  id: string;
  userId: string;
  date: string;
  heartRate: number;
  steps: number;
  water: number;
  mood: MoodLevel;
  notes: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isChecking: boolean;
}