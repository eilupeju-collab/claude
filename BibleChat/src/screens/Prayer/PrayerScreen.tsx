// Bible Chat — Prayer Home Screen

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useAppStore } from '../../store/useAppStore';
import Card from '../../components/common/Card';

const GUIDED_PRAYERS = [
  { id: '1', title: 'Morning Prayer', icon: 'sunny-outline' as const, description: 'Start your day with God' },
  { id: '2', title: 'Evening Prayer', icon: 'moon-outline' as const, description: 'Rest in His peace tonight' },
  { id: '3', title: 'Prayer of Gratitude', icon: 'heart-outline' as const, description: 'Thank God for His blessings' },
  { id: '4', title: 'Prayer for Healing', icon: 'medkit-outline' as const, description: 'Ask for God\'s healing touch' },
  { id: '5', title: 'Prayer for Guidance', icon: 'compass-outline' as const, description: 'Seek God\'s direction' },
  { id: '6', title: 'Prayer for Peace', icon: 'leaf-outline' as const, description: 'When your heart is anxious' },
];

export default function PrayerScreen({ navigation }: any) {
  const prayerEntries = useAppStore((s) => s.prayerEntries);
  const prayerStreak = useAppStore((s) => s.streaks.find(st => st.type === 'prayer'));
  const updateStreak = useAppStore((s) => s.updateStreak);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Pray</Text>
          <Text style={styles.subtitle}>Pour out your heart to God</Text>
        </View>

        {/* Prayer Streak */}
        <Card style={styles.streakCard}>
          <View style={styles.streakContent}>
            <View style={styles.streakIconBox}>
              <Ionicons name="flame" size={28} color="#E87E6C" />
            </View>
            <View style={styles.streakInfo}>
              <Text style={styles.streakNumber}>
                {prayerStreak?.currentStreak || 0} day streak
              </Text>
              <Text style={styles.streakSub}>
                {prayerStreak?.totalDays || 0} total prayer days
              </Text>
            </View>
          </View>
        </Card>

        {/* Quick Prayer Actions */}
        <View style={styles.quickActions}>
          <Pressable
            style={styles.quickAction}
            onPress={() => navigation.navigate('PrayerJournal')}
          >
            <View style={[styles.quickIcon, { backgroundColor: '#E87E6C15' }]}>
              <Ionicons name="journal-outline" size={24} color="#E87E6C" />
            </View>
            <Text style={styles.quickLabel}>Journal</Text>
          </Pressable>
          <Pressable style={styles.quickAction}>
            <View style={[styles.quickIcon, { backgroundColor: '#4A6FA515' }]}>
              <Ionicons name="people-outline" size={24} color={Colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Community</Text>
          </Pressable>
          <Pressable style={styles.quickAction}>
            <View style={[styles.quickIcon, { backgroundColor: '#7ECEC115' }]}>
              <Ionicons name="checkmark-done-outline" size={24} color="#7ECEC1" />
            </View>
            <Text style={styles.quickLabel}>Answered</Text>
          </Pressable>
        </View>

        {/* Guided Prayers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GUIDED PRAYERS</Text>
          {GUIDED_PRAYERS.map((prayer) => (
            <Card key={prayer.id} style={styles.prayerCard} onPress={() => {}}>
              <View style={styles.prayerCardContent}>
                <View style={styles.prayerIcon}>
                  <Ionicons name={prayer.icon} size={20} color={Colors.primary} />
                </View>
                <View style={styles.prayerInfo}>
                  <Text style={styles.prayerTitle}>{prayer.title}</Text>
                  <Text style={styles.prayerDesc}>{prayer.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
              </View>
            </Card>
          ))}
        </View>

        {/* Live Prayer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LIVE PRAYER</Text>
          <Card style={styles.liveCard}>
            <View style={styles.liveContent}>
              <View style={styles.liveDot} />
              <View style={styles.liveInfo}>
                <Text style={styles.liveTitle}>Prayer Room is Open</Text>
                <Text style={styles.liveSub}>
                  138 people praying now
                </Text>
              </View>
              <Pressable style={styles.joinBtn}>
                <Text style={styles.joinBtnText}>Join</Text>
              </Pressable>
            </View>
          </Card>
        </View>

        {/* Recent Prayer Entries */}
        {prayerEntries.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RECENT PRAYERS</Text>
            {prayerEntries.slice(0, 3).map((entry) => (
              <Card key={entry.id} style={styles.entryCard}>
                <Text style={styles.entryTitle}>{entry.title}</Text>
                <Text style={styles.entryContent} numberOfLines={2}>{entry.content}</Text>
                <View style={styles.entryMeta}>
                  <Text style={styles.entryStatus}>{entry.status}</Text>
                  <Text style={styles.entryDate}>
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </Text>
                </View>
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
  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.massive },
  header: { paddingTop: Spacing.xl },
  title: { ...Typography.h1, color: Colors.textPrimary },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginTop: Spacing.xxs },
  streakCard: { marginTop: Spacing.xl },
  streakContent: { flexDirection: 'row', alignItems: 'center' },
  streakIconBox: {
    width: 52, height: 52, borderRadius: BorderRadius.md,
    backgroundColor: '#E87E6C12', alignItems: 'center', justifyContent: 'center',
  },
  streakInfo: { marginLeft: Spacing.md },
  streakNumber: { ...Typography.h3, color: Colors.textPrimary },
  streakSub: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  quickActions: {
    flexDirection: 'row', justifyContent: 'space-around', marginTop: Spacing.xl,
  },
  quickAction: { alignItems: 'center', gap: Spacing.sm },
  quickIcon: {
    width: 56, height: 56, borderRadius: BorderRadius.lg,
    alignItems: 'center', justifyContent: 'center',
  },
  quickLabel: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  section: { marginTop: Spacing.xxl },
  sectionTitle: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.md },
  prayerCard: { marginBottom: Spacing.sm },
  prayerCardContent: { flexDirection: 'row', alignItems: 'center' },
  prayerIcon: {
    width: 40, height: 40, borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary + '12', alignItems: 'center', justifyContent: 'center',
  },
  prayerInfo: { flex: 1, marginLeft: Spacing.md },
  prayerTitle: { ...Typography.body, fontWeight: '500', color: Colors.textPrimary },
  prayerDesc: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  liveCard: {},
  liveContent: { flexDirection: 'row', alignItems: 'center' },
  liveDot: {
    width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.success,
  },
  liveInfo: { flex: 1, marginLeft: Spacing.md },
  liveTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary },
  liveSub: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  joinBtn: {
    backgroundColor: Colors.primary, paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm, borderRadius: BorderRadius.full,
  },
  joinBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  entryCard: { marginBottom: Spacing.sm },
  entryTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary },
  entryContent: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: Spacing.xs },
  entryMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.md },
  entryStatus: {
    ...Typography.caption, color: Colors.primary, fontWeight: '500', textTransform: 'capitalize',
  },
  entryDate: { ...Typography.caption, color: Colors.textTertiary },
});
