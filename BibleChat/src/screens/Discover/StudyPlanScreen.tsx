// Bible Chat — Study Plan Detail Screen

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { STUDY_PLANS } from '../../constants/studyData';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function StudyPlanScreen({ route, navigation }: any) {
  const planId = route?.params?.planId || 'plan-anxiety';
  const plan = STUDY_PLANS.find((p) => p.id === planId) || STUDY_PLANS[0];
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const markComplete = (day: number) => {
    if (!completedDays.includes(day)) {
      setCompletedDays([...completedDays, day]);
    }
  };

  const progress = completedDays.length / plan.totalDays;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Study Plan</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Plan Info */}
        <View style={styles.planInfo}>
          <Text style={styles.planTitle}>{plan.title}</Text>
          <Text style={styles.planDesc}>{plan.description}</Text>
          <View style={styles.planMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color={Colors.textTertiary} />
              <Text style={styles.metaText}>{plan.totalDays} days</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="bookmark-outline" size={16} color={Colors.textTertiary} />
              <Text style={styles.metaText}>{plan.topic}</Text>
            </View>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressSub}>
            {completedDays.length} of {plan.totalDays} days completed
          </Text>
        </View>

        {/* Days List */}
        <View style={styles.daysSection}>
          {plan.days.map((day) => {
            const isExpanded = expandedDay === day.day;
            const isComplete = completedDays.includes(day.day);

            return (
              <View key={day.day}>
                <Pressable
                  style={[styles.dayHeader, isComplete && styles.dayHeaderComplete]}
                  onPress={() => toggleDay(day.day)}
                >
                  <View style={styles.dayLeft}>
                    <View style={[styles.dayBadge, isComplete && styles.dayBadgeComplete]}>
                      {isComplete ? (
                        <Ionicons name="checkmark" size={14} color="#fff" />
                      ) : (
                        <Text style={styles.dayBadgeText}>{day.day}</Text>
                      )}
                    </View>
                    <View>
                      <Text style={styles.dayTitle}>{day.title}</Text>
                      <Text style={styles.dayReading}>{day.reading}</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={Colors.textTertiary}
                  />
                </Pressable>

                {isExpanded && (
                  <View style={styles.dayContent}>
                    <View style={styles.daySection}>
                      <Text style={styles.daySectionLabel}>REFLECTION</Text>
                      <Text style={styles.daySectionText}>{day.reflection}</Text>
                    </View>
                    <View style={styles.daySection}>
                      <Text style={styles.daySectionLabel}>PRAYER</Text>
                      <Text style={[styles.daySectionText, { fontStyle: 'italic' }]}>{day.prayer}</Text>
                    </View>
                    <View style={styles.daySection}>
                      <Text style={styles.daySectionLabel}>ACTION STEP</Text>
                      <Text style={styles.daySectionText}>{day.actionStep}</Text>
                    </View>
                    {!isComplete && (
                      <Button
                        title="Mark Day Complete"
                        onPress={() => markComplete(day.day)}
                        fullWidth
                        size="md"
                      />
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
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
  planInfo: { marginTop: Spacing.lg },
  planTitle: { ...Typography.h1, color: Colors.textPrimary },
  planDesc: { ...Typography.body, color: Colors.textSecondary, marginTop: Spacing.sm, lineHeight: 22 },
  planMeta: { flexDirection: 'row', gap: Spacing.xl, marginTop: Spacing.lg },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  metaText: { ...Typography.bodySmall, color: Colors.textTertiary },
  progressSection: { marginTop: Spacing.xxl },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  progressLabel: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  progressPercent: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '700' },
  progressBar: { height: 8, backgroundColor: '#E8E8E8', borderRadius: 4 },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  progressSub: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.sm },
  daysSection: { marginTop: Spacing.xxl },
  dayHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: BorderRadius.md,
    padding: Spacing.lg, marginBottom: Spacing.sm, ...Shadows.sm,
  },
  dayHeaderComplete: { opacity: 0.7 },
  dayLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  dayBadge: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  dayBadgeComplete: { backgroundColor: Colors.success },
  dayBadgeText: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '700' },
  dayTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary },
  dayReading: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  dayContent: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.md,
    padding: Spacing.xl, marginBottom: Spacing.md, marginTop: -Spacing.xs, ...Shadows.sm,
  },
  daySection: { marginBottom: Spacing.lg },
  daySectionLabel: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.sm },
  daySectionText: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22 },
});
