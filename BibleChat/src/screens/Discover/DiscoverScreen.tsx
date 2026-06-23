// Bible Chat — Discover Screen (Study Plans, Trivia, Bible Profiles, AI)

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Card from '../../components/common/Card';

const STUDY_PLANS = [
  { id: '1', title: 'Overcoming Anxiety', days: 7, topic: 'peace', color: '#7ECEC1' },
  { id: '2', title: 'The Power of Forgiveness', days: 14, topic: 'forgiveness', color: '#B8A9D4' },
  { id: '3', title: 'Finding Your Purpose', days: 21, topic: 'identity', color: '#64B5F6' },
  { id: '4', title: 'Strength in Hard Times', days: 7, topic: 'strength', color: '#E87E6C' },
  { id: '5', title: 'Praying with Confidence', days: 14, topic: 'prayer', color: '#FFB74D' },
  { id: '6', title: 'Marriage God\'s Way', days: 30, topic: 'marriage', color: '#F48FB1' },
];

const FEATURES = [
  { id: 'ai', title: 'Ask the Bible', desc: 'AI-powered answers from Scripture', icon: 'chatbubbles-outline' as const, color: Colors.primary },
  { id: 'trivia', title: 'Bible Trivia', desc: 'Test your knowledge', icon: 'game-controller-outline' as const, color: '#FFB74D' },
  { id: 'profiles', title: 'Bible Profiles', desc: 'Learn from biblical characters', icon: 'person-outline' as const, color: '#B8A9D4' },
  { id: 'calendar', title: 'Christian Calendar', desc: 'Holy days & liturgical events', icon: 'calendar-outline' as const, color: '#7ECEC1' },
  { id: 'memory', title: 'Memory Verses', desc: 'Memorize Scripture with spaced repetition', icon: 'bulb-outline' as const, color: '#81C784' },
  { id: 'kids', title: 'Kids\' Stories', desc: 'Bible stories for little ones', icon: 'star-outline' as const, color: '#F48FB1' },
];

export default function DiscoverScreen({ navigation }: any) {
  const handleFeaturePress = (id: string) => {
    switch (id) {
      case 'ai': navigation.navigate('AskBible'); break;
      case 'trivia': navigation.navigate('BibleTrivia'); break;
      case 'calendar': navigation.navigate('Calendar'); break;
      case 'kids': navigation.navigate('KidsBible'); break;
      default: break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>Grow deeper in your faith</Text>
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FEATURES</Text>
          <View style={styles.featuresGrid}>
            {FEATURES.map((feature) => (
              <Pressable key={feature.id} style={styles.featureCard} onPress={() => handleFeaturePress(feature.id)}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '15' }]}>
                  <Ionicons name={feature.icon} size={24} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Study Plans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>STUDY PLANS</Text>
            <Pressable>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {STUDY_PLANS.map((plan) => (
              <Pressable key={plan.id} style={styles.planCard} onPress={() => navigation.navigate('StudyPlan', { planId: `plan-${plan.topic}` })}>
                <View style={[styles.planColor, { backgroundColor: plan.color }]} />
                <View style={styles.planContent}>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  <Text style={styles.planDays}>{plan.days} days</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Today's Plan */}
        <View style={styles.section}>
          <Card style={styles.blessingCard} onPress={() => navigation.navigate('DailyPlan')}>
            <View style={styles.blessingContent}>
              <View style={[styles.blessingIcon, { backgroundColor: Colors.primary }]}>
                <Ionicons name="today-outline" size={28} color="#fff" />
              </View>
              <View style={styles.blessingText}>
                <Text style={styles.blessingTitle}>Today's Plan</Text>
                <Text style={styles.blessingDesc}>
                  Your daily spiritual rhythm — verse, prayer, meditation
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
            </View>
          </Card>
        </View>

        {/* Send a Blessing */}
        <View style={styles.section}>
          <Card style={styles.blessingCard} onPress={() => navigation.navigate('SendBlessing')}>
            <View style={styles.blessingContent}>
              <View style={styles.blessingIcon}>
                <Ionicons name="gift-outline" size={28} color="#fff" />
              </View>
              <View style={styles.blessingText}>
                <Text style={styles.blessingTitle}>Send a Blessing</Text>
                <Text style={styles.blessingDesc}>
                  Pick a verse and send encouragement to a friend
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
            </View>
          </Card>
        </View>

        {/* Live Prayer */}
        <View style={styles.section}>
          <Card style={styles.blessingCard} onPress={() => navigation.navigate('LivePrayer')}>
            <View style={styles.blessingContent}>
              <View style={[styles.blessingIcon, { backgroundColor: '#E87E6C' }]}>
                <Ionicons name="people-outline" size={28} color="#fff" />
              </View>
              <View style={styles.blessingText}>
                <Text style={styles.blessingTitle}>Live Prayer Wall</Text>
                <Text style={styles.blessingDesc}>
                  Pray with others and share what's on your heart
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


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: Spacing.massive },
  header: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl },
  title: { ...Typography.h1, color: Colors.textPrimary },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginTop: Spacing.xxs },
  section: { marginTop: Spacing.xxl, paddingHorizontal: Spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  sectionTitle: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.md },
  seeAll: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '600' },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  featureCard: {
    width: '47%', backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, ...Shadows.sm,
  },
  featureIcon: {
    width: 44, height: 44, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm,
  },
  featureTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary },
  featureDesc: { ...Typography.caption, color: Colors.textTertiary, marginTop: 3 },
  planCard: {
    width: 160, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    marginRight: Spacing.md, overflow: 'hidden', ...Shadows.sm,
  },
  planColor: { height: 6 },
  planContent: { padding: Spacing.lg },
  planTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary },
  planDays: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.xs },
  blessingCard: {},
  blessingContent: { flexDirection: 'row', alignItems: 'center' },
  blessingIcon: {
    width: 52, height: 52, borderRadius: BorderRadius.md,
    backgroundColor: Colors.secondary, alignItems: 'center', justifyContent: 'center',
  },
  blessingText: { flex: 1, marginLeft: Spacing.md },
  blessingTitle: { ...Typography.body, fontWeight: '600', color: Colors.textPrimary },
  blessingDesc: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 2 },
});
