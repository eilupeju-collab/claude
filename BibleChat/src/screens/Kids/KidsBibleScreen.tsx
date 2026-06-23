// Bible Chat — Kids Bible Stories Screen

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

interface KidsStory {
  id: string;
  title: string;
  subtitle: string;
  ageRange: string;
  duration: string;
  emoji: string;
  color: string;
  category: 'creation' | 'heroes' | 'miracles' | 'parables' | 'christmas' | 'easter';
  scripture: string;
  summary: string;
  moralLesson: string;
  hasVideo: boolean;
  hasAudio: boolean;
}

const KIDS_STORIES: KidsStory[] = [
  {
    id: 'ks-1', title: 'God Made Everything!', subtitle: 'The Creation Story',
    ageRange: '3-6', duration: '4 min', emoji: '🌍', color: '#7ECEC1', category: 'creation',
    scripture: 'Genesis 1-2',
    summary: 'In the beginning, God made the sky, the sea, the animals, and YOU! Learn about each amazing day of creation.',
    moralLesson: 'God made everything with love — including you! You are special and wonderful.',
    hasVideo: true, hasAudio: true,
  },
  {
    id: 'ks-2', title: 'Noah\'s Big Boat', subtitle: 'The Flood & the Rainbow',
    ageRange: '3-6', duration: '5 min', emoji: '🌈', color: '#FFB74D', category: 'heroes',
    scripture: 'Genesis 6-9',
    summary: 'God asked Noah to build a really big boat and fill it with animals — two of every kind! Then came the rain...',
    moralLesson: 'When God asks us to do something, we can trust Him even when it seems hard.',
    hasVideo: true, hasAudio: true,
  },
  {
    id: 'ks-3', title: 'David & the Giant', subtitle: 'A Boy Who Trusted God',
    ageRange: '5-10', duration: '6 min', emoji: '⚔️', color: '#4A6FA5', category: 'heroes',
    scripture: '1 Samuel 17',
    summary: 'Everyone was afraid of the big giant Goliath — except a young shepherd boy named David who trusted God.',
    moralLesson: 'With God on your side, you can face any challenge — no matter how big it seems!',
    hasVideo: true, hasAudio: true,
  },
  {
    id: 'ks-4', title: 'Daniel & the Lions', subtitle: 'Brave in the Den',
    ageRange: '5-10', duration: '5 min', emoji: '🦁', color: '#E87E6C', category: 'heroes',
    scripture: 'Daniel 6',
    summary: 'Daniel prayed to God even when it was against the rules. They threw him to the lions, but God had a plan!',
    moralLesson: 'Always talk to God, no matter what. He protects those who love Him.',
    hasVideo: true, hasAudio: true,
  },
  {
    id: 'ks-5', title: 'Jonah & the Big Fish', subtitle: 'Running from God',
    ageRange: '3-8', duration: '5 min', emoji: '🐋', color: '#7B68AE', category: 'heroes',
    scripture: 'Jonah 1-4',
    summary: 'God told Jonah to go one way, but Jonah ran the other way! He ended up inside a BIG fish...',
    moralLesson: 'God always gives us second chances. It\'s best to listen to Him the first time!',
    hasVideo: true, hasAudio: true,
  },
  {
    id: 'ks-6', title: 'Baby Jesus is Born!', subtitle: 'The Christmas Story',
    ageRange: '3-6', duration: '4 min', emoji: '⭐', color: '#C5A55A', category: 'christmas',
    scripture: 'Luke 2:1-20',
    summary: 'In a little stable in Bethlehem, the most special baby in the world was born. Angels sang and shepherds came to see!',
    moralLesson: 'Jesus came because God loves every single person — He loves YOU!',
    hasVideo: true, hasAudio: true,
  },
  {
    id: 'ks-7', title: 'Jesus Walks on Water', subtitle: 'An Amazing Miracle',
    ageRange: '5-10', duration: '4 min', emoji: '🌊', color: '#4A6FA5', category: 'miracles',
    scripture: 'Matthew 14:22-33',
    summary: 'The disciples were in a boat during a scary storm. Then they saw Jesus — walking on top of the water!',
    moralLesson: 'When you feel scared, keep your eyes on Jesus. He won\'t let you sink.',
    hasVideo: false, hasAudio: true,
  },
  {
    id: 'ks-8', title: 'The Good Samaritan', subtitle: 'Loving Your Neighbor',
    ageRange: '5-10', duration: '5 min', emoji: '🤝', color: '#81C784', category: 'parables',
    scripture: 'Luke 10:25-37',
    summary: 'A man was hurt and lying on the road. Many people walked past — but one kind stranger stopped to help.',
    moralLesson: 'Be kind to everyone, even people who are different from you. That\'s how we show God\'s love.',
    hasVideo: true, hasAudio: true,
  },
  {
    id: 'ks-9', title: 'Jesus is Alive!', subtitle: 'The Easter Story',
    ageRange: '4-10', duration: '6 min', emoji: '✨', color: '#C5A55A', category: 'easter',
    scripture: 'Matthew 28:1-10',
    summary: 'Something sad happened to Jesus on Friday. But on Sunday morning — the most amazing surprise was waiting!',
    moralLesson: 'Because Jesus is alive, we never have to be afraid. He is with us always!',
    hasVideo: true, hasAudio: true,
  },
  {
    id: 'ks-10', title: 'The Lost Sheep', subtitle: 'God Looks for You',
    ageRange: '3-6', duration: '3 min', emoji: '🐑', color: '#E8D5B7', category: 'parables',
    scripture: 'Luke 15:1-7',
    summary: 'A shepherd had 100 sheep, but one little sheep wandered away. Did the shepherd give up? Never!',
    moralLesson: 'God will never stop looking for you. You matter so much to Him!',
    hasVideo: true, hasAudio: true,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '📖' },
  { id: 'creation', label: 'Creation', icon: '🌍' },
  { id: 'heroes', label: 'Heroes', icon: '⚔️' },
  { id: 'miracles', label: 'Miracles', icon: '✨' },
  { id: 'parables', label: 'Parables', icon: '📜' },
  { id: 'christmas', label: 'Christmas', icon: '⭐' },
  { id: 'easter', label: 'Easter', icon: '🌅' },
];

export default function KidsBibleScreen({ navigation }: any) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const filteredStories = selectedCategory === 'all'
    ? KIDS_STORIES
    : KIDS_STORIES.filter((s) => s.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Kids Bible</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>📖✨</Text>
          <Text style={styles.heroTitle}>Bible Adventures!</Text>
          <Text style={styles.heroSub}>
            Fun stories about God's love, brave heroes, and amazing miracles.
          </Text>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categoryContent}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={[styles.categoryChip, selectedCategory === cat.id && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={styles.categoryEmoji}>{cat.icon}</Text>
              <Text style={[styles.categoryLabel, selectedCategory === cat.id && styles.categoryLabelActive]}>
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Stories Grid */}
        <View style={styles.storiesGrid}>
          {filteredStories.map((story) => {
            const isExpanded = expandedStory === story.id;
            return (
              <View key={story.id}>
                <Pressable
                  style={[styles.storyCard, { borderLeftColor: story.color, borderLeftWidth: 4 }]}
                  onPress={() => setExpandedStory(isExpanded ? null : story.id)}
                >
                  <View style={styles.storyHeader}>
                    <Text style={styles.storyEmoji}>{story.emoji}</Text>
                    <View style={styles.storyInfo}>
                      <Text style={styles.storyTitle}>{story.title}</Text>
                      <Text style={styles.storySub}>{story.subtitle}</Text>
                    </View>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={Colors.textTertiary}
                    />
                  </View>

                  <View style={styles.storyMeta}>
                    <View style={styles.metaBadge}>
                      <Ionicons name="people-outline" size={12} color={Colors.textTertiary} />
                      <Text style={styles.metaText}>Ages {story.ageRange}</Text>
                    </View>
                    <View style={styles.metaBadge}>
                      <Ionicons name="time-outline" size={12} color={Colors.textTertiary} />
                      <Text style={styles.metaText}>{story.duration}</Text>
                    </View>
                    {story.hasVideo && (
                      <View style={[styles.metaBadge, { backgroundColor: '#E87E6C15' }]}>
                        <Ionicons name="videocam-outline" size={12} color="#E87E6C" />
                        <Text style={[styles.metaText, { color: '#E87E6C' }]}>Video</Text>
                      </View>
                    )}
                    {story.hasAudio && (
                      <View style={[styles.metaBadge, { backgroundColor: Colors.primary + '12' }]}>
                        <Ionicons name="headset-outline" size={12} color={Colors.primary} />
                        <Text style={[styles.metaText, { color: Colors.primary }]}>Audio</Text>
                      </View>
                    )}
                  </View>
                </Pressable>

                {isExpanded && (
                  <View style={styles.storyExpanded}>
                    <Text style={styles.expandedLabel}>THE STORY</Text>
                    <Text style={styles.expandedText}>{story.summary}</Text>

                    <Text style={styles.expandedLabel}>WHAT WE LEARN</Text>
                    <View style={styles.lessonBox}>
                      <Ionicons name="bulb-outline" size={18} color={Colors.secondary} />
                      <Text style={styles.lessonText}>{story.moralLesson}</Text>
                    </View>

                    <Text style={styles.expandedLabel}>SCRIPTURE</Text>
                    <Text style={styles.scriptureText}>{story.scripture}</Text>

                    <View style={styles.actionRow}>
                      {story.hasAudio && (
                        <Pressable style={[styles.actionBtn, { backgroundColor: Colors.primary }]}>
                          <Ionicons name="headset" size={16} color="#fff" />
                          <Text style={styles.actionBtnText}>Listen</Text>
                        </Pressable>
                      )}
                      {story.hasVideo && (
                        <Pressable style={[styles.actionBtn, { backgroundColor: '#E87E6C' }]}>
                          <Ionicons name="play" size={16} color="#fff" />
                          <Text style={styles.actionBtnText}>Watch</Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Parent Tip */}
        <Card style={styles.tipCard}>
          <View style={styles.tipContent}>
            <Ionicons name="information-circle" size={22} color={Colors.primary} />
            <View style={styles.tipTextWrap}>
              <Text style={styles.tipTitle}>Parent Tip</Text>
              <Text style={styles.tipText}>
                After each story, ask your child: "What was your favorite part?" and "How does this show us God's love?" This builds faith conversations naturally.
              </Text>
            </View>
          </View>
        </Card>
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
  hero: { alignItems: 'center', marginTop: Spacing.lg, marginBottom: Spacing.xl },
  heroEmoji: { fontSize: 40, marginBottom: Spacing.md },
  heroTitle: { ...Typography.h1, color: Colors.textPrimary, fontSize: 26 },
  heroSub: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.sm, lineHeight: 22 },
  categoryScroll: { marginBottom: Spacing.xl },
  categoryContent: { gap: Spacing.sm },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceElevated,
  },
  categoryChipActive: { backgroundColor: Colors.primary + '15' },
  categoryEmoji: { fontSize: 16 },
  categoryLabel: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  categoryLabelActive: { color: Colors.primary, fontWeight: '600' },
  storiesGrid: { gap: Spacing.md },
  storyCard: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, ...Shadows.sm,
  },
  storyHeader: { flexDirection: 'row', alignItems: 'center' },
  storyEmoji: { fontSize: 36, marginRight: Spacing.md },
  storyInfo: { flex: 1 },
  storyTitle: { ...Typography.body, color: Colors.textPrimary, fontWeight: '700' },
  storySub: { ...Typography.bodySmall, color: Colors.textTertiary, marginTop: 2 },
  storyMeta: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md, flexWrap: 'wrap' },
  metaBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: Spacing.sm, paddingVertical: 3,
    borderRadius: BorderRadius.sm, backgroundColor: Colors.surfaceElevated,
  },
  metaText: { ...Typography.caption, color: Colors.textTertiary },
  storyExpanded: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.xl, marginTop: -Spacing.xs, ...Shadows.sm,
  },
  expandedLabel: { ...Typography.label, color: Colors.textTertiary, marginTop: Spacing.lg, marginBottom: Spacing.sm },
  expandedText: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22 },
  lessonBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: Colors.secondary + '08', borderRadius: BorderRadius.md, padding: Spacing.lg,
  },
  lessonText: { ...Typography.body, color: Colors.textPrimary, flex: 1, lineHeight: 22, fontWeight: '500' },
  scriptureText: { ...Typography.body, color: Colors.primary, fontWeight: '500' },
  actionRow: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.xl },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: BorderRadius.full,
  },
  actionBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  tipCard: { marginTop: Spacing.xxl },
  tipContent: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  tipTextWrap: { flex: 1 },
  tipTitle: { ...Typography.body, color: Colors.textPrimary, fontWeight: '600', marginBottom: Spacing.xs },
  tipText: { ...Typography.bodySmall, color: Colors.textSecondary, lineHeight: 20 },
});
