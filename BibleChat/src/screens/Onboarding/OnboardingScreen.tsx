// Bible Chat — Onboarding Flow

import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useAppStore } from '../../store/useAppStore';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

const ONBOARDING_SLIDES = [
  {
    id: '1',
    icon: 'book-outline' as const,
    title: 'God\'s Word, Every Day',
    description: 'Fresh Bible verses on your lock screen, multiple translations, and audio Bible for your busy life.',
    color: Colors.primary,
  },
  {
    id: '2',
    icon: 'leaf-outline' as const,
    title: 'Meditate & Be Still',
    description: 'Christian meditation sessions, breathing exercises with Scripture, and guided relaxation rooted in God\'s Word.',
    color: '#7ECEC1',
  },
  {
    id: '3',
    icon: 'heart-outline' as const,
    title: 'Prayer & Community',
    description: 'Keep a prayer journal, track answered prayers, and join a community lifting each other up in prayer.',
    color: '#E87E6C',
  },
  {
    id: '4',
    icon: 'chatbubbles-outline' as const,
    title: 'Ask the Bible',
    description: 'AI-powered answers grounded in Scripture. Ask anything and get clear, verse-referenced guidance.',
    color: '#7B68AE',
  },
  {
    id: '5',
    icon: 'sunny-outline' as const,
    title: 'Your Faith Journey',
    description: 'Study plans, daily rhythms, mood tracking, and a Panic Button for when you need God most. Let\'s begin.',
    color: Colors.secondary,
  },
];

const DENOMINATIONS = [
  'Non-denominational', 'Baptist', 'Catholic', 'Methodist', 'Presbyterian',
  'Pentecostal', 'Lutheran', 'Anglican', 'Orthodox', 'Other', 'Prefer not to say',
];

const GOALS = [
  { id: 'grow', label: 'Grow in faith', icon: 'trending-up-outline' as const },
  { id: 'peace', label: 'Find peace', icon: 'leaf-outline' as const },
  { id: 'study', label: 'Study deeper', icon: 'book-outline' as const },
  { id: 'community', label: 'Build community', icon: 'people-outline' as const },
  { id: 'meditate', label: 'Learn to meditate', icon: 'flower-outline' as const },
  { id: 'habit', label: 'Build daily habits', icon: 'calendar-outline' as const },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [phase, setPhase] = useState<'slides' | 'denomination' | 'goals' | 'complete'>('slides');
  const [selectedDenomination, setSelectedDenomination] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const { setOnboardingComplete } = useAppStore();

  const handleNextSlide = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlide + 1, animated: true });
      setCurrentSlide(currentSlide + 1);
    } else {
      setPhase('denomination');
    }
  };

  const handleSkip = () => setPhase('denomination');

  const handleDenominationNext = () => setPhase('goals');

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    setOnboardingComplete();
    setPhase('complete');
  };

  // SLIDES PHASE
  if (phase === 'slides') {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>

        <FlatList
          ref={flatListRef}
          data={ONBOARDING_SLIDES}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width }]}>
              <View style={[styles.slideIcon, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={56} color={item.color} />
              </View>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideDesc}>{item.description}</Text>
            </View>
          )}
        />

        {/* Dots */}
        <View style={styles.dots}>
          {ONBOARDING_SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentSlide && styles.dotActive]} />
          ))}
        </View>

        <View style={styles.slideActions}>
          <Button
            title={currentSlide === ONBOARDING_SLIDES.length - 1 ? "Get Started" : "Next"}
            onPress={handleNextSlide}
            fullWidth
            size="lg"
          />
        </View>
      </SafeAreaView>
    );
  }

  // DENOMINATION PHASE
  if (phase === 'denomination') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.phaseContent}>
          <Text style={styles.phaseTitle}>What's your background?</Text>
          <Text style={styles.phaseSub}>This helps us personalize your experience.</Text>
          <View style={styles.denomGrid}>
            {DENOMINATIONS.map((d) => (
              <Pressable
                key={d}
                style={[styles.denomChip, selectedDenomination === d && styles.denomChipSelected]}
                onPress={() => setSelectedDenomination(d)}
              >
                <Text style={[styles.denomText, selectedDenomination === d && styles.denomTextSelected]}>
                  {d}
                </Text>
              </Pressable>
            ))}
          </View>
          <Button title="Continue" onPress={handleDenominationNext} fullWidth size="lg" />
        </View>
      </SafeAreaView>
    );
  }

  // GOALS PHASE
  if (phase === 'goals') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.phaseContent}>
          <Text style={styles.phaseTitle}>What are your goals?</Text>
          <Text style={styles.phaseSub}>Select all that apply.</Text>
          <View style={styles.goalsGrid}>
            {GOALS.map((goal) => (
              <Pressable
                key={goal.id}
                style={[styles.goalCard, selectedGoals.includes(goal.id) && styles.goalCardSelected]}
                onPress={() => toggleGoal(goal.id)}
              >
                <Ionicons
                  name={goal.icon}
                  size={24}
                  color={selectedGoals.includes(goal.id) ? Colors.primary : Colors.textSecondary}
                />
                <Text style={[styles.goalLabel, selectedGoals.includes(goal.id) && styles.goalLabelSelected]}>
                  {goal.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <Button title="Start My Journey" onPress={handleComplete} fullWidth size="lg" />
        </View>
      </SafeAreaView>
    );
  }

  // COMPLETE
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.completeContent}>
        <Ionicons name="checkmark-circle" size={72} color={Colors.success} />
        <Text style={styles.completeTitle}>You're all set!</Text>
        <Text style={styles.completeSub}>
          Welcome to Bible Chat. Your faith journey starts now.
        </Text>
        <Button title="Enter Bible Chat" onPress={() => navigation.replace('MainTabs')} fullWidth size="lg" />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  skipBtn: { position: 'absolute', top: 60, right: Spacing.xl, zIndex: 10 },
  skipText: { ...Typography.body, color: Colors.textTertiary, fontWeight: '500' },
  slide: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: Spacing.xxxl },
  slideIcon: {
    width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xxl,
  },
  slideTitle: { ...Typography.h1, color: Colors.textPrimary, textAlign: 'center', marginBottom: Spacing.lg },
  slideDesc: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24, paddingHorizontal: Spacing.lg },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.sm, marginBottom: Spacing.xl },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E0E0E0' },
  dotActive: { width: 24, backgroundColor: Colors.primary },
  slideActions: { paddingHorizontal: Spacing.xxl, paddingBottom: Spacing.xxxl },
  phaseContent: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.xxl },
  phaseTitle: { ...Typography.h1, color: Colors.textPrimary, textAlign: 'center', marginBottom: Spacing.sm },
  phaseSub: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xxl },
  denomGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, justifyContent: 'center', marginBottom: Spacing.xxxl },
  denomChip: {
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceElevated, borderWidth: 1.5, borderColor: 'transparent',
  },
  denomChipSelected: { borderColor: Colors.primary, backgroundColor: Colors.primary + '10' },
  denomText: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  denomTextSelected: { color: Colors.primary },
  goalsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.xxxl },
  goalCard: {
    width: '47%', padding: Spacing.lg, borderRadius: BorderRadius.lg, backgroundColor: Colors.surface,
    alignItems: 'center', gap: Spacing.sm, borderWidth: 2, borderColor: 'transparent', ...Shadows.sm,
  },
  goalCardSelected: { borderColor: Colors.primary, backgroundColor: Colors.primary + '08' },
  goalLabel: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500', textAlign: 'center' },
  goalLabelSelected: { color: Colors.primary },
  completeContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: Spacing.xxl },
  completeTitle: { ...Typography.h1, color: Colors.textPrimary, marginTop: Spacing.xl },
  completeSub: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.md, marginBottom: Spacing.xxxl },
});
