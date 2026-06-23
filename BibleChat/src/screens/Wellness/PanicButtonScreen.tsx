// Bible Chat — Panic Button Screen (Anxiety relief with breathing + Scripture)

import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, Pressable, Animated, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

const COMFORT_VERSES = [
  { text: 'God has not given us a spirit of fear, but of power, love, and a sound mind.', ref: '2 Timothy 1:7' },
  { text: 'When I am afraid, I put my trust in you.', ref: 'Psalm 56:3' },
  { text: 'Cast all your anxiety on him because he cares for you.', ref: '1 Peter 5:7' },
  { text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.', ref: 'Psalm 34:18' },
  { text: 'Peace I leave with you; my peace I give you. Do not let your hearts be troubled.', ref: 'John 14:27' },
  { text: 'Be still, and know that I am God.', ref: 'Psalm 46:10' },
];

type Phase = 'initial' | 'grounding' | 'breathing' | 'verse' | 'complete';

export default function PanicButtonScreen({ navigation }: any) {
  const [phase, setPhase] = useState<Phase>('initial');
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [groundingStep, setGroundingStep] = useState(0);
  const [currentVerse, setCurrentVerse] = useState(0);
  const pulseAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');

  const GROUNDING_STEPS = [
    { num: 5, sense: 'SEE', prompt: 'Name 5 things you can see right now.' },
    { num: 4, sense: 'TOUCH', prompt: 'Name 4 things you can touch.' },
    { num: 3, sense: 'HEAR', prompt: 'Name 3 things you can hear.' },
    { num: 2, sense: 'SMELL', prompt: 'Name 2 things you can smell.' },
    { num: 1, sense: 'TASTE', prompt: 'Name 1 thing you can taste.' },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, [phase]);

  useEffect(() => {
    if (phase === 'breathing') {
      const runBreathCycle = () => {
        // Inhale 4s
        setBreathPhase('inhale');
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 4000, useNativeDriver: true }).start();
        
        setTimeout(() => {
          // Hold 7s
          setBreathPhase('hold');
          setTimeout(() => {
            // Exhale 8s
            setBreathPhase('exhale');
            Animated.timing(pulseAnim, { toValue: 0.8, duration: 8000, useNativeDriver: true }).start();
            
            setTimeout(() => {
              setBreathCount((c) => {
                if (c + 1 >= 4) {
                  setPhase('verse');
                  return 0;
                }
                return c + 1;
              });
            }, 8000);
          }, 7000);
        }, 4000);
      };

      if (breathCount < 4) {
        runBreathCycle();
      }
    }
  }, [phase, breathCount]);

  const startHelp = () => setPhase('grounding');

  const nextGroundingStep = () => {
    if (groundingStep < GROUNDING_STEPS.length - 1) {
      setGroundingStep(groundingStep + 1);
    } else {
      setPhase('breathing');
    }
  };

  const nextVerse = () => {
    if (currentVerse < COMFORT_VERSES.length - 1) {
      setCurrentVerse(currentVerse + 1);
    } else {
      setPhase('complete');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Close button */}
      <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={28} color="#fff" />
      </Pressable>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* INITIAL PHASE */}
        {phase === 'initial' && (
          <View style={styles.centered}>
            <Text style={styles.mainText}>You are safe.</Text>
            <Text style={styles.subText}>God is with you right now.</Text>
            <Text style={styles.subText}>Let's take this one step at a time.</Text>
            <Pressable style={styles.startBtn} onPress={startHelp}>
              <Text style={styles.startBtnText}>Begin Calming Exercise</Text>
            </Pressable>
          </View>
        )}

        {/* GROUNDING PHASE (5-4-3-2-1) */}
        {phase === 'grounding' && (
          <View style={styles.centered}>
            <Text style={styles.phaseLabel}>GROUNDING</Text>
            <View style={styles.groundingCircle}>
              <Text style={styles.groundingNum}>{GROUNDING_STEPS[groundingStep].num}</Text>
              <Text style={styles.groundingSense}>{GROUNDING_STEPS[groundingStep].sense}</Text>
            </View>
            <Text style={styles.groundingPrompt}>{GROUNDING_STEPS[groundingStep].prompt}</Text>
            <Pressable style={styles.nextBtn} onPress={nextGroundingStep}>
              <Text style={styles.nextBtnText}>
                {groundingStep < GROUNDING_STEPS.length - 1 ? 'Next' : 'Continue to Breathing'}
              </Text>
            </Pressable>
          </View>
        )}

        {/* BREATHING PHASE (4-7-8) */}
        {phase === 'breathing' && (
          <View style={styles.centered}>
            <Text style={styles.phaseLabel}>BREATHE</Text>
            <Animated.View style={[styles.breathCircle, { transform: [{ scale: pulseAnim }] }]}>
              <Text style={styles.breathText}>
                {breathPhase === 'inhale' ? 'Breathe In' : breathPhase === 'hold' ? 'Hold' : 'Breathe Out'}
              </Text>
              <Text style={styles.breathSubtext}>
                {breathPhase === 'inhale' ? '4 seconds' : breathPhase === 'hold' ? '7 seconds' : '8 seconds'}
              </Text>
            </Animated.View>
            <Text style={styles.breathCount}>Breath {breathCount + 1} of 4</Text>
          </View>
        )}

        {/* VERSE PHASE */}
        {phase === 'verse' && (
          <View style={styles.centered}>
            <Text style={styles.phaseLabel}>GOD'S WORD FOR YOU</Text>
            <Ionicons name="heart" size={32} color="#E87E6C" style={{ marginBottom: Spacing.xl }} />
            <Text style={styles.verseText}>"{COMFORT_VERSES[currentVerse].text}"</Text>
            <Text style={styles.verseRef}>{COMFORT_VERSES[currentVerse].ref}</Text>
            <Pressable style={styles.nextBtn} onPress={nextVerse}>
              <Text style={styles.nextBtnText}>
                {currentVerse < COMFORT_VERSES.length - 1 ? 'Another Verse' : 'Finish'}
              </Text>
            </Pressable>
          </View>
        )}

        {/* COMPLETE PHASE */}
        {phase === 'complete' && (
          <View style={styles.centered}>
            <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
            <Text style={styles.mainText}>Well done.</Text>
            <Text style={styles.subText}>You made it through. God is proud of you.</Text>
            <Text style={styles.subText}>Remember: you are never alone.</Text>
            <Pressable style={styles.startBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.startBtnText}>Return Home</Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  closeBtn: { position: 'absolute', top: 60, right: Spacing.xl, zIndex: 10, padding: Spacing.sm },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xxl },
  centered: { alignItems: 'center' },
  phaseLabel: { ...Typography.label, color: 'rgba(255,255,255,0.5)', marginBottom: Spacing.xxl, letterSpacing: 3 },
  mainText: { ...Typography.h1, color: '#fff', textAlign: 'center', marginBottom: Spacing.lg },
  subText: { ...Typography.body, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: Spacing.sm },
  startBtn: {
    backgroundColor: '#7ECEC1', paddingHorizontal: Spacing.xxxl, paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.full, marginTop: Spacing.xxxl,
  },
  startBtnText: { color: '#1A1A2E', fontWeight: '600', fontSize: 16 },
  groundingCircle: {
    width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(126,206,193,0.15)',
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xxl,
  },
  groundingNum: { fontSize: 48, fontWeight: '700', color: '#7ECEC1' },
  groundingSense: { ...Typography.label, color: '#7ECEC1', marginTop: Spacing.xs },
  groundingPrompt: { ...Typography.body, color: 'rgba(255,255,255,0.8)', textAlign: 'center', paddingHorizontal: Spacing.xl },
  nextBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: Spacing.xxl, paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full, marginTop: Spacing.xxxl, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  nextBtnText: { color: '#fff', fontWeight: '500', fontSize: 15 },
  breathCircle: {
    width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(74,111,165,0.3)',
    alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(74,111,165,0.5)',
  },
  breathText: { ...Typography.h2, color: '#fff' },
  breathSubtext: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.6)', marginTop: Spacing.xs },
  breathCount: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.5)', marginTop: Spacing.xxl },
  verseText: {
    ...Typography.scripture, color: '#fff', textAlign: 'center', fontSize: 20,
    lineHeight: 32, fontStyle: 'italic', paddingHorizontal: Spacing.lg, marginBottom: Spacing.xl,
  },
  verseRef: { ...Typography.bodySmall, color: '#C5A55A', fontWeight: '600' },
});
