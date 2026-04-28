import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

interface HealthCardProps {
  title: string;
  value: string | number;
  unit: string;
  color: string;
  emoji: string;
}

export const HealthCard: React.FC<HealthCardProps> = ({ title, value, unit, color, emoji }) => (
  <View style={[styles.card, { borderLeftColor: color }]}>
    <View style={styles.iconBox}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>
        {value} <Text style={styles.unit}>{unit}</Text>
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 6,
    gap: 16,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBox: {
    backgroundColor: Colors.surface,
    padding: 10,
    borderRadius: 12,
  },
  emoji: { fontSize: 32 },
  title: { color: Colors.textSecondary, fontSize: 14, fontWeight: '600', marginBottom: 4 },
  value: { fontSize: 26, fontWeight: '800' },
  unit: { fontSize: 16, fontWeight: '500', color: Colors.textSecondary },
});