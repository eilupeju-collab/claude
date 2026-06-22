// Bible Chat — Daily Plan Screen (Today's spiritual rhythm)

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { SAMPLE_DAILY_PLAN } from '../../constants/studyData';
import Card from '../../components/common/Card';
import VerseCard from '../../components/common/VerseCard';

export default function DailyPlanScreen({ navigation }: any) {
  const plan = SAMPLE_DAILY_PLAN;
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const toggleStep = (step: string) => {
    setCompletedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const steps = [
    { id: 'verse', icon: 'book-outline' as const, title: 'Morning Verse', color: Colors.primary },
    { id: 'devotional', icon: 'document-text-outline' as const, title: 'Reflection', color: '#7ECEC1' },
    { id: 'prayer', icon: 'heart-outline' as const, title: 'Prayer', color: '#E87E6C' },
    { id: 'meditation', icon: 'leaf-outline' as const, title: 'Meditation', color: '#7B68AE' },
    { id: 'gratitude', icon: 'star-outline' as const, title: 'Evening Gratitude', color: '#FFB74D' },
  ];

  const progress = completedSteps.length / steps.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Today's Plan</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Date */}
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {completedSteps.length}/{steps.length} completed
          </Text>
        </View>

        {/* Steps */}
        <View style={styles.stepsSection}>
          {steps.map((step, index) => {
            const isComplete = completedSteps.includes(step.id);
            return (
              <Pressable
                key={step.id}
                style={[styles.stepCard, isComplete && styles.stepCardComplete]}
                onPress={() => toggleStep(step.id)}
              >
                <View style={styles.stepLeft}>
                  <View style={[styles.stepIcon, { backgroundColor: step.color + '15' }]}>
                    {isComplete ? (
                      <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
                    ) : (
                      <Ionicons name={step.icon} size={20} color={step.color} />
                    )}
                  </View>
                  <View style={styles.stepInfo}>
                    <Text style={[styles.stepTitle, isComplete && styles.stepTitleComplete]}>
                      {step.title}
                    </Text>
                    <Text style={styles.stepHint}>Tap to mark complete</Text>
                  </View>
                </View>
                <View style={[styles.stepNumber, { backgroundColor: step.color + '20' }]}>
                  <Text style={[styles.stepNumberText, { color: step.color }]}>{index + 1}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Morning Verse */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MORNING VERSE</Text>
          <VerseCard verse={plan.morningVerse} />
        </View>

        {/* Devotional */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>REFLECTION</Text>
          <Card>
            <Text style={styles.devotionalText}>{plan.devotional}</Text>
          </Card>
        </View>

        {/* Prayer Prompt */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRAYER PROMPT</Text>
          <Card style={styles.prayerCard}>
            <Ionicons name="heart" size={20} color="#E87E6C" />
            <Text style={styles.prayerText}>{plan.prayerPrompt}</Text>
          </Card>
        </View>

        {/* Meditation Suggestion */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MEDITATION</Text>
          <Card style={styles.meditationCard} onPress={() => navigation.navigate('Meditate')}>
            <View style={styles.meditationContent}>
              <View style={styles.meditationIcon}>
                <Ionicons name="leaf" size={20} color="#fff" />
              </View>
              <Text style={styles.meditationText}>{plan.meditationSuggestion}</Text>
            </View>
          </Card>
        </View>

        {/* Evening Gratitude */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EVENING GRATITUDE</Text>
          <Card>
            <View style={styles.gratitudeContent}>
              <Ionicons name="star" size={20} color="#FFB74D" />
              <Text style={styles.gratitudeText}>{plan.eveningGratitude}</Text>
            </View>
          </Card>
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
  date: { ...Typography.body, color: Colors.textSecondary, marginTop: Spacing.sm },
  progressSection: { marginTop: Spacing.xl },
  progressBar: { height: 6, backgroundColor: '#E8E8E8', borderRadius: 3 },
  progressFill: { height: '100%', backgroundColor: Colors.success, borderRadius: 3 },
  progressText: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.sm, textAlign: 'right' },
  stepsSection: { marginTop: Spacing.xl, gap: Spacing.md },
  stepCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, ...Shadows.sm,
  },
  stepCardComplete: { opacity: 0.7 },
  stepLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  stepIcon: { width: 44, height: 44, borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center' },
  stepInfo: { marginLeft: Spacing.md },
  stepTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary },
  stepTitleComplete: { textDecorationLine: 'line-through', color: Colors.textTertiary },
  stepHint: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  stepNumber: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { fontWeight: '700', fontSize: 13 },
  section: { marginTop: Spacing.xxl },
  sectionTitle: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.md },
  devotionalText: { ...Typography.body, color: Colors.textSecondary, lineHeight: 24 },
  prayerCard: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  prayerText: { ...Typography.body, color: Colors.textSecondary, flex: 1, fontStyle: 'italic', lineHeight: 24 },
  meditationCard: {},
  meditationContent: { flexDirection: 'row', alignItems: 'center' },
  meditationIcon: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#7B68AE',
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  meditationText: { ...Typography.bodySmall, color: Colors.textSecondary, flex: 1 },
  gratitudeContent: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  gratitudeText: { ...Typography.body, color: Colors.textSecondary, flex: 1, lineHeight: 24 },
});
