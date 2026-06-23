// Bible Chat — Mood & Spiritual Health Tracker

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, TextInput, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useAppStore } from '../../store/useAppStore';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import type { MoodRating } from '../../types';

const MOOD_EMOJIS: { rating: MoodRating; emoji: string; label: string }[] = [
  { rating: 1, emoji: '😢', label: 'Struggling' },
  { rating: 2, emoji: '😔', label: 'Low' },
  { rating: 3, emoji: '😐', label: 'Okay' },
  { rating: 4, emoji: '🙂', label: 'Good' },
  { rating: 5, emoji: '😊', label: 'Great' },
];

const EMOTIONS = [
  'Peaceful', 'Grateful', 'Anxious', 'Hopeful', 'Lonely',
  'Joyful', 'Overwhelmed', 'Loved', 'Angry', 'Content',
  'Fearful', 'Encouraged', 'Sad', 'Confident', 'Restless',
];

export default function MoodTrackerScreen({ navigation }: any) {
  const [selectedMood, setSelectedMood] = useState<MoodRating | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [closeness, setCloseness] = useState<MoodRating | null>(null);
  const [note, setNote] = useState('');
  const { addMoodEntry, moodEntries } = useAppStore();

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]
    );
  };

  const handleSave = () => {
    if (!selectedMood) {
      Alert.alert('Please select your mood');
      return;
    }
    addMoodEntry({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood: selectedMood,
      emotions: selectedEmotions,
      note: note.trim() || undefined,
      closenessToGod: closeness || undefined,
    });
    Alert.alert('Saved', 'Your mood has been recorded. God sees you.');
    setSelectedMood(null);
    setSelectedEmotions([]);
    setCloseness(null);
    setNote('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>How Are You?</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.subtitle}>God cares about how you feel today.</Text>

        {/* Mood Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR MOOD</Text>
          <View style={styles.moodRow}>
            {MOOD_EMOJIS.map((item) => (
              <Pressable
                key={item.rating}
                style={[styles.moodItem, selectedMood === item.rating && styles.moodItemSelected]}
                onPress={() => setSelectedMood(item.rating)}
              >
                <Text style={styles.moodEmoji}>{item.emoji}</Text>
                <Text style={[styles.moodLabel, selectedMood === item.rating && styles.moodLabelSelected]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Emotions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WHAT ARE YOU FEELING?</Text>
          <View style={styles.emotionsGrid}>
            {EMOTIONS.map((emotion) => (
              <Pressable
                key={emotion}
                style={[styles.emotionChip, selectedEmotions.includes(emotion) && styles.emotionChipSelected]}
                onPress={() => toggleEmotion(emotion)}
              >
                <Text style={[styles.emotionText, selectedEmotions.includes(emotion) && styles.emotionTextSelected]}>
                  {emotion}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Closeness to God */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CLOSENESS TO GOD TODAY</Text>
          <View style={styles.closenessRow}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Pressable
                key={num}
                style={[styles.closenessItem, closeness === num && styles.closenessSelected]}
                onPress={() => setCloseness(num as MoodRating)}
              >
                <Ionicons
                  name={closeness && closeness >= num ? 'heart' : 'heart-outline'}
                  size={24}
                  color={closeness && closeness >= num ? '#E87E6C' : Colors.textTertiary}
                />
              </Pressable>
            ))}
          </View>
          <View style={styles.closenessLabels}>
            <Text style={styles.closenessLabel}>Distant</Text>
            <Text style={styles.closenessLabel}>Very Close</Text>
          </View>
        </View>

        {/* Note */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ANYTHING ELSE? (OPTIONAL)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="How can God help you today?"
            placeholderTextColor={Colors.textTertiary}
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <Button title="Save Check-In" onPress={handleSave} fullWidth size="lg" />

        {/* History */}
        {moodEntries.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RECENT ({moodEntries.length})</Text>
            {moodEntries.slice(-5).reverse().map((entry) => (
              <View key={entry.id} style={styles.historyItem}>
                <Text style={styles.historyEmoji}>
                  {MOOD_EMOJIS.find((m) => m.rating === entry.mood)?.emoji}
                </Text>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyDate}>
                    {new Date(entry.date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.historyEmotions}>
                    {entry.emotions.slice(0, 3).join(', ')}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.massive },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: Spacing.lg, paddingBottom: Spacing.md,
  },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  subtitle: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm },
  section: { marginTop: Spacing.xxl },
  sectionTitle: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.md },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodItem: {
    alignItems: 'center', padding: Spacing.md, borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface, ...Shadows.sm,
  },
  moodItemSelected: { backgroundColor: Colors.primary + '15', borderWidth: 2, borderColor: Colors.primary },
  moodEmoji: { fontSize: 32 },
  moodLabel: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.xs },
  moodLabelSelected: { color: Colors.primary, fontWeight: '600' },
  emotionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  emotionChip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceElevated,
  },
  emotionChipSelected: { backgroundColor: Colors.primary },
  emotionText: { ...Typography.bodySmall, color: Colors.textSecondary },
  emotionTextSelected: { color: '#fff', fontWeight: '500' },
  closenessRow: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.lg },
  closenessItem: { padding: Spacing.sm },
  closenessSelected: {},
  closenessLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.sm },
  closenessLabel: { ...Typography.caption, color: Colors.textTertiary },
  noteInput: {
    ...Typography.body, color: Colors.textPrimary, backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md, padding: Spacing.lg, minHeight: 80, ...Shadows.sm,
  },
  historyItem: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  historyEmoji: { fontSize: 24 },
  historyInfo: {},
  historyDate: { ...Typography.bodySmall, color: Colors.textPrimary, fontWeight: '500' },
  historyEmotions: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
});
