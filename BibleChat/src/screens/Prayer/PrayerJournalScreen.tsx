// Bible Chat — Prayer Journal Screen

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, ScrollView, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useAppStore } from '../../store/useAppStore';
import type { PrayerCategory } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const CATEGORIES: { id: PrayerCategory; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'praise', label: 'Praise', icon: 'musical-notes-outline' },
  { id: 'thanksgiving', label: 'Thanks', icon: 'gift-outline' },
  { id: 'confession', label: 'Confession', icon: 'heart-half-outline' },
  { id: 'intercession', label: 'Others', icon: 'people-outline' },
  { id: 'petition', label: 'Request', icon: 'hand-left-outline' },
  { id: 'general', label: 'General', icon: 'chatbubble-outline' },
];

export default function PrayerJournalScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PrayerCategory>('general');
  const { addPrayerEntry, prayerEntries, updateStreak } = useAppStore();

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Please fill in both title and prayer content');
      return;
    }
    addPrayerEntry({
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      status: 'praying',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      isPrivate: true,
    });
    updateStreak('prayer');
    Alert.alert('Prayer Saved', 'Your prayer has been added to your journal.');
    setTitle('');
    setContent('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Prayer Journal</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* New Entry */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NEW PRAYER</Text>

          <TextInput
            style={styles.titleInput}
            placeholder="Prayer title..."
            placeholderTextColor={Colors.textTertiary}
            value={title}
            onChangeText={setTitle}
          />

          {/* Category Picker */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={[styles.catChip, category === cat.id && styles.catChipActive]}
                onPress={() => setCategory(cat.id)}
              >
                <Ionicons
                  name={cat.icon}
                  size={14}
                  color={category === cat.id ? '#fff' : Colors.textSecondary}
                />
                <Text style={[styles.catText, category === cat.id && styles.catTextActive]}>
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <TextInput
            style={styles.contentInput}
            placeholder="Write your prayer here..."
            placeholderTextColor={Colors.textTertiary}
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <Button title="Save Prayer" onPress={handleSave} fullWidth size="lg" />
        </View>

        {/* Existing Entries */}
        {prayerEntries.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>YOUR PRAYERS ({prayerEntries.length})</Text>
            {prayerEntries.slice().reverse().map((entry) => (
              <Card key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <View style={[
                    styles.statusBadge,
                    entry.status === 'answered' && styles.statusAnswered,
                  ]}>
                    <Text style={styles.statusText}>{entry.status}</Text>
                  </View>
                </View>
                <Text style={styles.entryContent} numberOfLines={3}>{entry.content}</Text>
                <Text style={styles.entryDate}>
                  {new Date(entry.createdAt).toLocaleDateString()}
                </Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg, paddingBottom: Spacing.md,
  },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.massive },
  section: { marginTop: Spacing.xl },
  sectionTitle: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.md },
  titleInput: {
    ...Typography.body, color: Colors.textPrimary,
    backgroundColor: Colors.surface, borderRadius: BorderRadius.md,
    padding: Spacing.lg, marginBottom: Spacing.md, ...Shadows.sm,
  },
  categories: { marginBottom: Spacing.md },
  catChip: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceElevated,
    marginRight: Spacing.sm,
  },
  catChipActive: { backgroundColor: Colors.primary },
  catText: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  catTextActive: { color: '#fff' },
  contentInput: {
    ...Typography.body, color: Colors.textPrimary,
    backgroundColor: Colors.surface, borderRadius: BorderRadius.md,
    padding: Spacing.lg, marginBottom: Spacing.xl, minHeight: 140, ...Shadows.sm,
  },
  entryCard: { marginBottom: Spacing.md },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  entryTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary, flex: 1 },
  statusBadge: {
    paddingHorizontal: Spacing.sm, paddingVertical: 2,
    borderRadius: BorderRadius.full, backgroundColor: Colors.primary + '15',
  },
  statusAnswered: { backgroundColor: Colors.success + '15' },
  statusText: { ...Typography.caption, color: Colors.primary, fontWeight: '500', textTransform: 'capitalize' },
  entryContent: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: Spacing.sm },
  entryDate: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.sm },
});
