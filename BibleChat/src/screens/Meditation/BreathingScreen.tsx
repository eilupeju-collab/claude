// Bible Chat — Breathing Exercise Screen with animated circle and scripture

import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, Pressable, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import type { BreathingExercise } from '../../types';
import { useAppStore } from '../../store/useAppStore';

type Phase = 'inhale' | 'holdIn' | 'exhale' | 'holdOut';

export default function BreathingScreen({ route, navigation }: any) {
  const { exercise } = route.params as { exercise: BreathingExercise };
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('inhale');
  const [currentCycle, setCurrentCycle] = useState(1);
  const [phaseTimer, setPhaseTimer] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const circleScale = useRef(new Animated.Value(0.6)).current;
  const updateStreak = useAppStore((s) => s.updateStreak);
  const addMeditationLog = useAppStore((s) => s.addMeditationLog);

  const { pattern } = exercise;

  const phaseConfig: Record<Phase, { duration: number; text: string; next: Phase }> = {
    inhale: {
      duration: pattern.inhale,
      text: pattern.inhaleText || 'Breathe in...',
      next: 'holdIn',
    },
    holdIn: {
      duration: pattern.holdIn,
      text: pattern.holdInText || 'Hold...',
      next: 'exhale',
    },
    exhale: {
      duration: pattern.exhale,
      text: pattern.exhaleText || 'Breathe out...',
      next: 'holdOut',
    },
    holdOut: {
      duration: pattern.holdOut,
      text: pattern.holdOutText || 'Rest...',
      next: 'inhale',
    },
  };

  useEffect(() => {
    if (!isActive) return;

    // Animate circle based on phase
    const targetScale = currentPhase === 'inhale' ? 1.0
      : currentPhase === 'exhale' ? 0.6
      : currentPhase === 'holdIn' ? 1.0 : 0.6;

    Animated.timing(circleScale, {
      toValue: targetScale,
      duration: phaseConfig[currentPhase].duration * 1000,
      useNativeDriver: true,
    }).start();

    const phaseDuration = phaseConfig[currentPhase].duration;
    if (phaseDuration === 0) {
      // Skip zero-duration phases
      const nextPhase = phaseConfig[currentPhase].next;
      if (nextPhase === 'inhale') {
        if (currentCycle >= pattern.cycles) {
          handleComplete();
          return;
        }
        setCurrentCycle((c) => c + 1);
      }
      setCurrentPhase(nextPhase);
      return;
    }

    setPhaseTimer(phaseDuration);
    const interval = setInterval(() => {
      setPhaseTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          const nextPhase = phaseConfig[currentPhase].next;
          if (nextPhase === 'inhale') {
            if (currentCycle >= pattern.cycles) {
              handleComplete();
              return 0;
            }
            setCurrentCycle((c) => c + 1);
          }
          setCurrentPhase(nextPhase);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentPhase, currentCycle]);

  const handleComplete = () => {
    setIsActive(false);
    setIsComplete(true);
    addMeditationLog({
      id: Date.now().toString(),
      sessionId: exercise.id,
      duration: exercise.duration,
      completedAt: new Date().toISOString(),
    });
    updateStreak('meditation');
  };

  const handleStart = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setCurrentCycle(1);
    setIsComplete(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setCurrentCycle(1);
    setPhaseTimer(0);
    setIsComplete(false);
    circleScale.setValue(0.6);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Breathing</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>

        {/* Breathing Circle */}
        <View style={styles.circleContainer}>
          <Animated.View
            style={[
              styles.outerCircle,
              { transform: [{ scale: circleScale }] },
            ]}
          >
            <View style={styles.innerCircle}>
              {isActive ? (
                <>
                  <Text style={styles.phaseText}>
                    {phaseConfig[currentPhase].text}
                  </Text>
                  <Text style={styles.timerText}>{phaseTimer}</Text>
                </>
              ) : isComplete ? (
                <>
                  <Ionicons name="checkmark-circle" size={48} color={Colors.success} />
                  <Text style={styles.completeText}>Well done</Text>
                </>
              ) : (
                <>
                  <Ionicons name="flower-outline" size={48} color={Colors.accent} />
                  <Text style={styles.readyText}>Ready?</Text>
                </>
              )}
            </View>
          </Animated.View>
        </View>

        {/* Cycle Counter */}
        {isActive && (
          <Text style={styles.cycleText}>
            Cycle {currentCycle} of {pattern.cycles}
          </Text>
        )}

        {/* Scripture */}
        <View style={styles.scriptureBox}>
          <Text style={styles.scriptureText}>"{exercise.scripture}"</Text>
          <Text style={styles.scriptureRef}>{exercise.scriptureReference}</Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          {!isActive && !isComplete && (
            <Pressable style={styles.startBtn} onPress={handleStart}>
              <Text style={styles.startBtnText}>Begin</Text>
            </Pressable>
          )}
          {isActive && (
            <Pressable style={styles.stopBtn} onPress={handleReset}>
              <Text style={styles.stopBtnText}>Stop</Text>
            </Pressable>
          )}
          {isComplete && (
            <Pressable style={styles.startBtn} onPress={handleReset}>
              <Text style={styles.startBtnText}>Again</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg,
  },
  headerTitle: { ...Typography.label, color: Colors.textTertiary },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  exerciseName: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.xxl },
  circleContainer: {
    width: 240, height: 240, alignItems: 'center', justifyContent: 'center',
  },
  outerCircle: {
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: Colors.accent + '25',
    alignItems: 'center', justifyContent: 'center',
  },
  innerCircle: {
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: Colors.surface,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 4,
  },
  phaseText: {
    ...Typography.body, color: Colors.accent, fontWeight: '600',
    textAlign: 'center', paddingHorizontal: Spacing.md,
  },
  timerText: { ...Typography.h1, color: Colors.textPrimary, marginTop: Spacing.sm },
  completeText: { ...Typography.body, color: Colors.success, marginTop: Spacing.sm },
  readyText: { ...Typography.body, color: Colors.textSecondary, marginTop: Spacing.sm },
  cycleText: { ...Typography.bodySmall, color: Colors.textTertiary, marginTop: Spacing.xl },
  scriptureBox: {
    marginTop: Spacing.xxxl, paddingHorizontal: Spacing.xxl, alignItems: 'center',
  },
  scriptureText: {
    ...Typography.scripture, fontSize: 16, color: Colors.scriptureText,
    textAlign: 'center', fontStyle: 'italic',
  },
  scriptureRef: {
    ...Typography.bodySmall, color: Colors.secondary, fontWeight: '600', marginTop: Spacing.sm,
  },
  controls: { marginTop: Spacing.xxxl },
  startBtn: {
    backgroundColor: Colors.accent, paddingHorizontal: Spacing.xxxl, paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.full,
  },
  startBtnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  stopBtn: {
    backgroundColor: Colors.surfaceElevated, paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.lg, borderRadius: BorderRadius.full,
  },
  stopBtnText: { color: Colors.textSecondary, fontWeight: '600', fontSize: 16 },
});
