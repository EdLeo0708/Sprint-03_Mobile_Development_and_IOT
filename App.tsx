import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LoginScreen } from './src/screens/LoginScreen';
import { AppNavigator } from './src/navigation/AppNavigator';
import { getUser } from './src/services/storageService';
import { logout } from './src/services/authService';
import { User, AuthState } from './src/types';

import { Colors } from './src/theme/colors';

export default function App() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isChecking: true,
  });

  useEffect(() => {
    getUser().then(u => {
      setAuth({
        user: u,
        isAuthenticated: !!u,
        isChecking: false,
      });
    });
  }, []);

  const handleLogout = async (): Promise<void> => {
    await logout();
    setAuth({
      user: null,
      isAuthenticated: false,
      isChecking: false,
    });
  };

  const handleLogin = (user: User) => {
    setAuth({
      user,
      isAuthenticated: true,
      isChecking: false,
    });
  };

  if (auth.isChecking) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      {auth.user
        ? <AppNavigator user={auth.user} onLogout={handleLogout} />
        : <LoginScreen onLogin={handleLogin} />
      }
    </>
  );
}