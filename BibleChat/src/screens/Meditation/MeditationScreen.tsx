// Bible Chat — Meditation Home Screen

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows, MeditationColors } from '../../constants/theme';
import { MEDITATION_SESSIONS, BREATHING_EXERCISES, MEDITATION_COURSES } from '../../constants/meditationData';
import Card from '../../components/common/Card';
import { useAppStore } from '../../store/useAppStore';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'grid-outline' as const },
  { id: 'peace', label: 'Peace', icon: 'water-outline' as const },
  { id: 'gratitude', label: 'Gratitude', icon: 'sunny-outline' as const },
  { id: 'sleep', label: 'Sleep', icon: 'moon-outline' as const },
  { id: 'morning', label: 'Morning', icon: 'partly-sunny-outline' as const },
  { id: 'healing', label: 'Healing', icon: 'heart-outline' as const },
  { id: 'strength', label: 'Strength', icon: 'fitness-outline' as const },
  { id: 'forgiveness', label: 'Forgive', icon: 'hand-left-outline' as const },
];

export default function MeditationScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState('all');
  const totalMinutes = useAppStore((s) => s.totalMeditationMinutes);
  const meditationStreak = useAppStore((s) => s.streaks.find(st => st.type === 'meditation'));

  const filteredSessions = activeCategory === 'all'
    ? MEDITATION_SESSIONS
    : MEDITATION_SESSIONS.filter((s) => s.category === activeCategory);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Meditate</Text>
          <Text style={styles.subtitle}>Be still and know that He is God</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalMinutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{meditationStreak?.currentStreak || 0}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{meditationStreak?.totalDays || 0}</Text>
            <Text style={styles.statLabel}>Total Days</Text>
          </View>
        </View>

        {/* Breathing Exercises Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BREATHING EXERCISES</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {BREATHING_EXERCISES.map((exercise) => (
              <Pressable
                key={exercise.id}
                style={styles.breathCard}
                onPress={() => navigation.navigate('Breathing', { exercise })}
              >
                <View style={styles.breathIcon}>
                  <Ionicons name="flower-outline" size={24} color="#fff" />
                </View>
                <Text style={styles.breathTitle} numberOfLines={1}>
                  {exercise.name}
                </Text>
                <Text style={styles.breathSub}>{formatDuration(exercise.duration)}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Courses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MEDITATION COURSES</Text>
          {MEDITATION_COURSES.map((course) => (
            <Card key={course.id} style={styles.courseCard}>
              <View style={styles.courseContent}>
                <View style={[styles.courseIcon, {
                  backgroundColor: (MeditationColors as any)[course.category] || Colors.accent
                }]}>
                  <Ionicons name="leaf" size={22} color="#fff" />
                </View>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseSub}>
                    {course.totalDays} days{course.isPremium ? ' · Premium' : ''}
                  </Text>
                </View>
                {course.isPremium && (
                  <Ionicons name="lock-closed" size={16} color={Colors.secondary} />
                )}
              </View>
            </Card>
          ))}
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GUIDED SESSIONS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={[
                  styles.categoryChip,
                  activeCategory === cat.id && styles.categoryChipActive,
                ]}
                onPress={() => setActiveCategory(cat.id)}
              >
                <Ionicons
                  name={cat.icon}
                  size={14}
                  color={activeCategory === cat.id ? '#fff' : Colors.textSecondary}
                />
                <Text style={[
                  styles.categoryChipText,
                  activeCategory === cat.id && styles.categoryChipTextActive,
                ]}>
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Sessions List */}
        <View style={styles.sessionsList}>
          {filteredSessions.map((session) => (
            <Card
              key={session.id}
              onPress={() => navigation.navigate('MeditationPlayer', { session })}
              style={styles.sessionCard}
            >
              <View style={styles.sessionContent}>
                <View style={[styles.sessionIcon, {
                  backgroundColor: (MeditationColors as any)[session.category] || Colors.accent
                }]}>
                  <Ionicons name="headset-outline" size={20} color="#fff" />
                </View>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionTitle}>{session.title}</Text>
                  <Text style={styles.sessionDescription} numberOfLines={2}>
                    {session.description}
                  </Text>
                  <Text style={styles.sessionMeta}>
                    {formatDuration(session.duration)} · {session.backgroundSound}
                    {session.isPremium ? ' · Premium' : ''}
                  </Text>
                </View>
                <Ionicons name="play-circle" size={32} color={Colors.primary} />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl },
  title: { ...Typography.h1, color: Colors.textPrimary },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginTop: Spacing.xxs },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  statItem: { alignItems: 'center' },
  statNumber: { ...Typography.h2, color: Colors.primary },
  statLabel: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.xxs },
  statDivider: { width: 1, backgroundColor: '#E8E8E8' },
  section: { marginTop: Spacing.xxl, paddingHorizontal: Spacing.xl },
  sectionTitle: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.md },
  breathCard: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginRight: Spacing.md,
    width: 140,
    alignItems: 'center',
  },
  breathIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  breathTitle: { color: '#fff', fontWeight: '600', fontSize: 12, textAlign: 'center' },
  breathSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: Spacing.xxs },
  courseCard: { marginBottom: Spacing.sm },
  courseContent: { flexDirection: 'row', alignItems: 'center' },
  courseIcon: {
    width: 44, height: 44, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  courseInfo: { flex: 1, marginLeft: Spacing.md },
  courseTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary },
  courseSub: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.xxs },
  categoryScroll: { marginBottom: Spacing.md },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceElevated,
    marginRight: Spacing.sm,
    gap: Spacing.xs,
  },
  categoryChipActive: { backgroundColor: Colors.primary },
  categoryChipText: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  categoryChipTextActive: { color: '#fff' },
  sessionsList: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.massive },
  sessionCard: { marginBottom: Spacing.sm },
  sessionContent: { flexDirection: 'row', alignItems: 'center' },
  sessionIcon: {
    width: 44, height: 44, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  sessionInfo: { flex: 1, marginLeft: Spacing.md, marginRight: Spacing.sm },
  sessionTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary },
  sessionDescription: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
  sessionMeta: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.xs },
});
