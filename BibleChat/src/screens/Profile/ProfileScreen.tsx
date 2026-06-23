// Bible Chat — Profile & Settings Screen

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useAppStore } from '../../store/useAppStore';
import Card from '../../components/common/Card';

export default function ProfileScreen({ navigation }: any) {
  const { settings, updateSettings, isPremium, streaks } = useAppStore();
  const totalDays = streaks.reduce((sum, s) => sum + s.totalDays, 0);
  const longestStreak = Math.max(...streaks.map(s => s.longestStreak));

  const settingsItems = [
    { icon: 'moon-outline' as const, label: 'Dark Mode', type: 'toggle', value: settings.theme === 'dark' },
    { icon: 'notifications-outline' as const, label: 'Notifications', type: 'toggle', value: settings.notificationsEnabled },
    { icon: 'text-outline' as const, label: 'Font Size', type: 'nav', value: `${settings.fontSize}px` },
    { icon: 'language-outline' as const, label: 'Language', type: 'nav', value: 'English' },
    { icon: 'download-outline' as const, label: 'Offline Content', type: 'nav', value: '' },
    { icon: 'time-outline' as const, label: 'Prayer Reminders', type: 'nav', value: settings.morningPrayerTime },
    { icon: 'shield-checkmark-outline' as const, label: 'Privacy', type: 'nav', value: '' },
    { icon: 'help-circle-outline' as const, label: 'Help & Support', type: 'nav', value: '' },
    { icon: 'star-outline' as const, label: 'Rate Bible Chat', type: 'nav', value: '' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={36} color={Colors.primary} />
          </View>
          <Text style={styles.userName}>Faithful User</Text>
          <Text style={styles.userEmail}>user@example.com</Text>
        </View>

        {/* Premium Banner */}
        {!isPremium && (
          <Card style={styles.premiumCard} onPress={() => {}}>
            <View style={styles.premiumContent}>
              <Ionicons name="diamond-outline" size={24} color={Colors.secondary} />
              <View style={styles.premiumText}>
                <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                <Text style={styles.premiumDesc}>
                  Unlock all meditations, translations & more
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
            </View>
          </Card>
        )}

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalDays}</Text>
            <Text style={styles.statLabel}>Total Days</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{longestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{useAppStore.getState().totalMeditationMinutes}</Text>
            <Text style={styles.statLabel}>Meditate Min</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
          {settingsItems.map((item, index) => (
            <View key={index} style={styles.settingItem}>
              <Ionicons name={item.icon} size={20} color={Colors.textSecondary} />
              <Text style={styles.settingLabel}>{item.label}</Text>
              {item.type === 'toggle' ? (
                <Switch
                  value={item.value as boolean}
                  onValueChange={(val) => {
                    if (item.label === 'Dark Mode') updateSettings({ theme: val ? 'dark' : 'light' });
                    if (item.label === 'Notifications') updateSettings({ notificationsEnabled: val });
                  }}
                  trackColor={{ true: Colors.primary }}
                />
              ) : (
                <View style={styles.settingRight}>
                  <Text style={styles.settingValue}>{item.value}</Text>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Version */}
        <Text style={styles.version}>Bible Chat v1.0.0</Text>
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
  userSection: { alignItems: 'center', marginTop: Spacing.xl },
  avatar: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  userName: { ...Typography.h2, color: Colors.textPrimary, marginTop: Spacing.md },
  userEmail: { ...Typography.bodySmall, color: Colors.textTertiary, marginTop: 2 },
  premiumCard: { marginTop: Spacing.xl },
  premiumContent: { flexDirection: 'row', alignItems: 'center' },
  premiumText: { flex: 1, marginLeft: Spacing.md },
  premiumTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary },
  premiumDesc: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  statsRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.xl, marginTop: Spacing.xl, ...Shadows.sm,
  },
  statItem: { alignItems: 'center' },
  statNumber: { ...Typography.h2, color: Colors.primary },
  statLabel: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  settingsSection: { marginTop: Spacing.xxl },
  sectionTitle: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.md },
  settingItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: Spacing.lg, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
    gap: Spacing.md,
  },
  settingLabel: { ...Typography.body, color: Colors.textPrimary, flex: 1 },
  settingRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  settingValue: { ...Typography.bodySmall, color: Colors.textTertiary },
  version: { ...Typography.caption, color: Colors.textTertiary, textAlign: 'center', marginTop: Spacing.xxl },
});
