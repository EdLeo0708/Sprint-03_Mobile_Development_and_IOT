import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { HealthCard } from '../components/HealthCard';
import { LoadingFeedback } from '../components/LoadingFeedback';
import { getRecords } from '../services/storageService';
import { HealthRecord } from '../types';

import { Colors } from '../theme/colors';

interface Props {
  userName: string;
}

export const HomeScreen: React.FC<Props> = ({ userName }) => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadData = async (): Promise<void> => {
    const data = await getRecords();
    setRecords(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadData();
    }, [])
  );

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const latest = records[0];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {userName}! 👋</Text>
        <Text style={styles.sub}>Seu resumo de hoje</Text>
      </View>

      <LoadingFeedback loading={loading} />

      {!loading && latest ? (
        <>
          <Text style={styles.sectionTitle}>ÚLTIMO REGISTRO</Text>
          <HealthCard title="Frequência Cardíaca" value={latest.heartRate} unit="bpm" color="#E53935" emoji="❤️" />
          <HealthCard title="Passos" value={latest.steps} unit="passos" color="#43A047" emoji="🚶" />
          <HealthCard title="Água" value={latest.water} unit="ml" color="#1E88E5" emoji="💧" />
          <HealthCard title="Humor" value={latest.mood} unit="" color="#FB8C00" emoji="😊" />
          <Text style={styles.total}>Total de registros: {records.length}</Text>
        </>
      ) : !loading && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>🌱</Text>
          <Text style={styles.empty}>Nenhum registro ainda.</Text>
          <Text style={styles.emptySub}>Vá em "Registrar" para começar sua jornada!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  header: { padding: 20, paddingTop: 30 },
  greeting: { color: Colors.secondary, fontSize: 28, fontWeight: '800', marginBottom: 4 },
  sub: { color: Colors.textSecondary, fontSize: 16, marginBottom: 24 },
  sectionTitle: { color: Colors.primary, fontSize: 12, fontWeight: '800', marginBottom: 16, letterSpacing: 1.5, marginLeft: 20 },
  total: { color: Colors.textSecondary, fontSize: 13, textAlign: 'center', marginTop: 16, marginBottom: 30 },
  emptyBox: { alignItems: 'center', marginTop: 80, padding: 40 },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  empty: { color: Colors.secondary, fontSize: 18, fontWeight: '700' },
  emptySub: { color: Colors.textSecondary, fontSize: 14, marginTop: 8, textAlign: 'center' },
});