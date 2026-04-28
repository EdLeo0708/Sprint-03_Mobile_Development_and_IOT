import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image,
} from 'react-native';
import { LoadingFeedback } from '../components/LoadingFeedback';
import { InputForm } from '../components/InputForm';
import { login } from '../services/authService';
import { User } from '../types';

import { Colors } from '../theme/colors';

interface Props {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      onLogin(user);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.imageLogo} 
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>CarePlus</Text>
          <Text style={styles.subtitle}>Viva mais, melhor e feliz</Text>

          <InputForm
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            keyboardType="email-address"
          />
          <InputForm
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
          />

          <LoadingFeedback loading={loading} error={error} />

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  inner: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 450, // Fix the overly expanded width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  logoContainer: { alignItems: 'center', marginBottom: 16 },
  imageLogo: { width: 100, height: 100 },
  title: { color: Colors.secondary, fontSize: 32, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: Colors.textSecondary, fontSize: 16, textAlign: 'center', marginBottom: 32 },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: { color: Colors.white, fontWeight: '700', fontSize: 18 },
});