// Bible Chat — Home Screen (Today's Dashboard)

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { DAILY_VERSES } from '../../constants/bibleData';
import { useAppStore } from '../../store/useAppStore';
import VerseCard from '../../components/common/VerseCard';
import Card from '../../components/common/Card';

export default function HomeScreen({ navigation }: any) {
  const streaks = useAppStore((s) => s.streaks);

  // Get a daily verse based on the date
  const todayVerse = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const readingStreak = streaks.find(s => s.type === 'reading');
  const prayerStreak = streaks.find(s => s.type === 'prayer');
  const meditationStreak = streaks.find(s => s.type === 'meditation');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.subtitle}>Walk with God today</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileButton}
          >
            <Ionicons name="person-circle-outline" size={36} color={Colors.primary} />
          </Pressable>
        </View>

        {/* Daily Verse */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verse of the Day</Text>
          <VerseCard verse={todayVerse} />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Plan</Text>
          <View style={styles.quickActions}>
            <QuickAction
              icon="book-outline"
              label="Read"
              color={Colors.primary}
              onPress={() => navigation.navigate('Bible')}
            />
            <QuickAction
              icon="leaf-outline"
              label="Meditate"
              color="#7ECEC1"
              onPress={() => navigation.navigate('Meditate')}
            />
            <QuickAction
              icon="heart-outline"
              label="Pray"
              color="#E87E6C"
              onPress={() => navigation.navigate('Pray')}
            />
            <QuickAction
              icon="flash-outline"
              label="Panic"
              color="#FFB74D"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Streaks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Streaks</Text>
          <View style={styles.streaksRow}>
            <StreakBadge
              icon="book"
              label="Reading"
              streak={readingStreak?.currentStreak || 0}
              color={Colors.primary}
            />
            <StreakBadge
              icon="heart"
              label="Prayer"
              streak={prayerStreak?.currentStreak || 0}
              color="#E87E6C"
            />
            <StreakBadge
              icon="leaf"
              label="Meditate"
              streak={meditationStreak?.currentStreak || 0}
              color="#7ECEC1"
            />
          </View>
        </View>

        {/* Daily Meditation Suggestion */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meditation for You</Text>
          <Card
            onPress={() => navigation.navigate('Meditate')}
            elevated
            style={styles.meditationCard}
          >
            <View style={styles.meditationCardContent}>
              <View style={styles.meditationCardIcon}>
                <Ionicons name="leaf" size={28} color="#fff" />
              </View>
              <View style={styles.meditationCardText}>
                <Text style={styles.meditationCardTitle}>Be Still & Know</Text>
                <Text style={styles.meditationCardSub}>
                  10 min · Peace · Psalm 46:10
                </Text>
              </View>
              <Ionicons name="play-circle" size={40} color={Colors.primary} />
            </View>
          </Card>
        </View>

        {/* Community */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Prayer</Text>
          <Card style={styles.communityCard}>
            <View style={styles.communityContent}>
              <Ionicons name="people-outline" size={24} color={Colors.primary} />
              <View style={{ flex: 1, marginLeft: Spacing.md }}>
                <Text style={styles.communityText}>
                  247 people are praying right now
                </Text>
                <Text style={styles.communitySubtext}>
                  Join the live prayer community
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// Sub-components

function QuickAction({ icon, label, color, onPress }: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </Pressable>
  );
}

function StreakBadge({ icon, label, streak, color }: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  streak: number;
  color: string;
}) {
  return (
    <View style={styles.streakBadge}>
      <View style={[styles.streakIcon, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.streakNumber}>{streak}</Text>
      <Text style={styles.streakLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  greeting: {
    ...Typography.h1,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xxs,
  },
  profileButton: {
    padding: Spacing.xs,
  },
  section: {
    marginTop: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.textTertiary,
    marginBottom: Spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  streaksRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    ...Shadows.sm,
  },
  streakBadge: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  streakIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakNumber: {
    ...Typography.h2,
    color: Colors.textPrimary,
  },
  streakLabel: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  meditationCard: {
    overflow: 'hidden',
  },
  meditationCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meditationCardIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: '#7ECEC1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meditationCardText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  meditationCardTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  meditationCardSub: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    marginTop: Spacing.xxs,
  },
  communityCard: {},
  communityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  communitySubtext: {
    ...Typography.bodySmall,
    color: Colors.textTertiary,
    marginTop: Spacing.xxs,
  },
});
