import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { InputForm } from '../components/InputForm';
import { LoadingFeedback } from '../components/LoadingFeedback';
import { saveRecord } from '../services/storageService';
import { HealthRecord } from '../types';
import { MoodLevel } from '../enums';

import { Colors } from '../theme/colors';

interface Props {
  userId: string;
}

const MOODS: MoodLevel[] = [MoodLevel.GREAT, MoodLevel.GOOD, MoodLevel.NEUTRAL, MoodLevel.BAD];

export const TrackScreen: React.FC<Props> = ({ userId }) => {
  const [heartRate, setHeartRate] = useState<string>('');
  const [steps, setSteps] = useState<string>('');
  const [water, setWater] = useState<string>('');
  const [mood, setMood] = useState<MoodLevel>(MoodLevel.GOOD);
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const validate = (): boolean => {
    if (!heartRate || !steps || !water) {
      setError('Preencha frequência cardíaca, passos e água.');
      return false;
    }
    const hr = Number(heartRate);
    const st = Number(steps);
    const wt = Number(water);
    if (isNaN(hr) || hr <= 0 || hr > 300) {
      setError('Frequência cardíaca inválida (1–300 bpm).');
      return false;
    }
    if (isNaN(st) || st < 0) {
      setError('Número de passos inválido.');
      return false;
    }
    if (isNaN(wt) || wt < 0) {
      setError('Quantidade de água inválida.');
      return false;
    }
    return true;
  };

  const handleSave = async (): Promise<void> => {
    setError('');
    setSuccess('');
    if (!validate()) return;

    setLoading(true);
    try {
      const record: HealthRecord = {
        id: Date.now().toString(),
        userId,
        date: new Date().toISOString(),
        heartRate: Number(heartRate),
        steps: Number(steps),
        water: Number(water),
        mood,
        notes,
      };
      await saveRecord(record);
      setSuccess('Registro salvo com sucesso!');
      setHeartRate('');
      setSteps('');
      setWater('');
      setNotes('');
      setMood(MoodLevel.GOOD);
    } catch {
      setError('Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>DADOS DO DIA</Text>

          <InputForm
            label="Frequência Cardíaca (bpm)"
            value={heartRate}
            onChangeText={setHeartRate}
            placeholder="Ex: 72"
            keyboardType="numeric"
          />
          <InputForm
            label="Passos"
            value={steps}
            onChangeText={setSteps}
            placeholder="Ex: 8000"
            keyboardType="numeric"
          />
          <InputForm
            label="Água ingerida (ml)"
            value={water}
            onChangeText={setWater}
            placeholder="Ex: 2000"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Humor</Text>
          <View style={styles.moodRow}>
            {MOODS.map(m => (
              <TouchableOpacity
                key={m}
                style={[styles.moodBtn, mood === m && styles.moodBtnActive]}
                onPress={() => setMood(m)}
              >
                <Text style={[styles.moodText, mood === m && styles.moodTextActive]}>
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <InputForm
            label="Observações (opcional)"
            value={notes}
            onChangeText={setNotes}
            placeholder="Como você se sentiu hoje?"
            multiline
          />

          <LoadingFeedback loading={loading} error={error} success={success} />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Salvar Registro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.surface },
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    color: Colors.primary, fontSize: 12, fontWeight: '800',
    marginBottom: 20, letterSpacing: 1.5,
  },
  label: { color: Colors.secondary, fontSize: 14, fontWeight: '600', marginBottom: 12 },
  moodRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  moodBtn: {
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: Colors.surface,
  },
  moodBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  moodText: { color: Colors.textSecondary, fontSize: 14, fontWeight: '500' },
  moodTextActive: { color: Colors.white, fontWeight: '700' },
  button: {
    backgroundColor: Colors.primary, borderRadius: 12,
    padding: 18, alignItems: 'center', marginTop: 12,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: Colors.white, fontWeight: '700', fontSize: 18 },
});
