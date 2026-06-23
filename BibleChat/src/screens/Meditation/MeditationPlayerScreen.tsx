// Bible Chat — Meditation Session Player Screen

import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, Pressable, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, MeditationColors } from '../../constants/theme';
import { useAppStore } from '../../store/useAppStore';
import type { MeditationSession } from '../../types';

export default function MeditationPlayerScreen({ route, navigation }: any) {
  const { session } = route.params as { session: MeditationSession };
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const addMeditationLog = useAppStore((s) => s.addMeditationLog);
  const updateStreak = useAppStore((s) => s.updateStreak);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && elapsed < session.duration) {
      interval = setInterval(() => {
        setElapsed((prev) => {
          if (prev + 1 >= session.duration) {
            setIsPlaying(false);
            handleComplete();
            return session.duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 3000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isPlaying]);

  // Rotate through scriptures
  useEffect(() => {
    if (isPlaying && session.scriptures.length > 1) {
      const interval = setInterval(() => {
        setCurrentVerseIndex((prev) => (prev + 1) % session.scriptures.length);
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleComplete = () => {
    addMeditationLog({
      id: Date.now().toString(),
      sessionId: session.id,
      duration: session.duration,
      completedAt: new Date().toISOString(),
    });
    updateStreak('meditation');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = elapsed / session.duration;
  const bgColor = (MeditationColors as any)[session.category] || Colors.accent;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor + '15' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>{session.category.toUpperCase()}</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Pulsing Circle */}
        <Animated.View
          style={[
            styles.pulseCircle,
            { backgroundColor: bgColor + '30', transform: [{ scale: pulseAnim }] },
          ]}
        >
          <View style={[styles.innerCircle, { backgroundColor: bgColor + '50' }]}>
            <Ionicons
              name={isPlaying ? 'leaf' : 'leaf-outline'}
              size={48}
              color={bgColor}
            />
          </View>
        </Animated.View>

        {/* Session Title */}
        <Text style={styles.sessionTitle}>{session.title}</Text>

        {/* Current Scripture */}
        <View style={styles.scriptureBox}>
          <Text style={styles.scriptureText}>
            {session.scriptures[currentVerseIndex]}
          </Text>
        </View>

        {/* Timer */}
        <View style={styles.timerSection}>
          <Text style={styles.elapsed}>{formatTime(elapsed)}</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: bgColor }]} />
          </View>
          <Text style={styles.remaining}>{formatTime(session.duration - elapsed)}</Text>
        </View>

        {/* Background Sound Indicator */}
        <View style={styles.soundIndicator}>
          <Ionicons name="musical-notes-outline" size={14} color={Colors.textTertiary} />
          <Text style={styles.soundText}>{session.backgroundSound}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Pressable style={styles.controlBtn}>
          <Ionicons name="refresh" size={24} color={Colors.textSecondary} />
        </Pressable>
        <Pressable
          style={[styles.playBtn, { backgroundColor: bgColor }]}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="#fff" />
        </Pressable>
        <Pressable style={styles.controlBtn}>
          <Ionicons name="stop" size={24} color={Colors.textSecondary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg,
  },
  closeBtn: { padding: Spacing.xs },
  headerTitle: { ...Typography.label, color: Colors.textTertiary },
  mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  pulseCircle: {
    width: 180, height: 180, borderRadius: 90,
    alignItems: 'center', justifyContent: 'center',
  },
  innerCircle: {
    width: 120, height: 120, borderRadius: 60,
    alignItems: 'center', justifyContent: 'center',
  },
  sessionTitle: {
    ...Typography.h2, color: Colors.textPrimary, marginTop: Spacing.xxl, textAlign: 'center',
  },
  scriptureBox: {
    marginTop: Spacing.lg, paddingHorizontal: Spacing.xxl,
  },
  scriptureText: {
    ...Typography.body, color: Colors.textSecondary, textAlign: 'center', fontStyle: 'italic',
  },
  timerSection: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: Spacing.xxxl, width: '100%', gap: Spacing.md,
  },
  elapsed: { ...Typography.bodySmall, color: Colors.textTertiary, width: 40 },
  progressBarContainer: {
    flex: 1, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2,
  },
  progressBar: { height: '100%', borderRadius: 2 },
  remaining: { ...Typography.bodySmall, color: Colors.textTertiary, width: 40, textAlign: 'right' },
  soundIndicator: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: Spacing.lg,
  },
  soundText: { ...Typography.caption, color: Colors.textTertiary, textTransform: 'capitalize' },
  controls: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingBottom: Spacing.xxxl, gap: Spacing.xxl,
  },
  controlBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  playBtn: {
    width: 72, height: 72, borderRadius: 36,
    alignItems: 'center', justifyContent: 'center',
  },
});
