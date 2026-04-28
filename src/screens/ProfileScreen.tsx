import React, { useCallback, useState } from 'react';
import {
  View, Text, FlatList,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getRecords } from '../services/storageService';
import { HealthRecord, User } from '../types';

import { Colors } from '../theme/colors';

interface Props {
  user: User;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<Props> = ({ user, onLogout }) => {
  const [records, setRecords] = useState<HealthRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      getRecords().then(setRecords);
    }, [])
  );

  const renderItem = ({ item }: { item: HealthRecord }) => (
    <View style={styles.record}>
      <View style={styles.recordHeader}>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'short',
          })}
        </Text>
        <Text style={styles.moodBadge}>{item.mood}</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>❤️</Text>
          <Text style={styles.statValue}>{item.heartRate}</Text>
          <Text style={styles.statLabel}>bpm</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>🚶</Text>
          <Text style={styles.statValue}>{item.steps}</Text>
          <Text style={styles.statLabel}>passos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statEmoji}>💧</Text>
          <Text style={styles.statValue}>{item.water}</Text>
          <Text style={styles.statLabel}>ml</Text>
        </View>
      </View>

      {item.notes ? (
        <View style={styles.notesContainer}>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Navy Header Section */}
      <View style={styles.navyHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>HISTÓRICO DE SAÚDE</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{records.length}</Text>
          </View>
        </View>

        <FlatList
          data={records}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>📋</Text>
              <Text style={styles.empty}>Nenhum registro ainda.</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  navyHeader: {
    backgroundColor: Colors.secondary,
    paddingTop: 1,
    paddingBottom: 10,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 12,
  },
  avatarContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 14,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  avatar: { fontSize: 40 },
  userInfo: { marginLeft: 20 },
  name: { color: Colors.white, fontSize: 24, fontWeight: '800' },
  email: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 14, marginTop: 2 },

  content: { flex: 1, paddingHorizontal: 20, marginTop: 24 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: { color: Colors.secondary, fontSize: 14, fontWeight: '800', letterSpacing: 1.2 },
  badge: { backgroundColor: Colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: Colors.white, fontSize: 12, fontWeight: '800' },

  record: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  date: { color: Colors.secondary, fontWeight: '800', fontSize: 16 },
  moodBadge: {
    backgroundColor: Colors.surface,
    color: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '700'
  },

  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  statItem: { alignItems: 'center', flex: 1 },
  statEmoji: { fontSize: 18, marginBottom: 4 },
  statValue: { color: Colors.secondary, fontSize: 18, fontWeight: '800' },
  statLabel: { color: Colors.textSecondary, fontSize: 11, fontWeight: '600' },

  notesContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  notesText: { color: Colors.textSecondary, fontSize: 13, fontStyle: 'italic', lineHeight: 18 },

  emptyBox: { alignItems: 'center', marginTop: 60, padding: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 16, opacity: 0.5 },
  empty: { color: Colors.textSecondary, fontSize: 16, fontWeight: '600' },

});
