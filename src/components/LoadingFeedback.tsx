import React from 'react';
import { Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

interface Props {
  loading?: boolean;
  error?: string;
  success?: string;
}

export const LoadingFeedback: React.FC<Props> = ({ loading, error, success }) => {
  if (loading) return <ActivityIndicator size="small" color={Colors.primary} style={{ marginVertical: 12 }} />;
  if (error) return <Text style={styles.error}>⚠️ {error}</Text>;
  if (success) return <Text style={styles.success}>✅ {success}</Text>;
  return null;
};

const styles = StyleSheet.create({
  error: { color: Colors.error, textAlign: 'center', marginVertical: 12, fontWeight: '600' },
  success: { color: Colors.success, textAlign: 'center', marginVertical: 12, fontWeight: '600' },
});