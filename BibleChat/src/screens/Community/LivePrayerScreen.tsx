// Bible Chat — Live Prayer / Community Screen

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
  TextInput, FlatList, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

interface PrayerRequest {
  id: string;
  author: string;
  content: string;
  category: string;
  prayerCount: number;
  timeAgo: string;
  hasPrayed: boolean;
}

const SAMPLE_REQUESTS: PrayerRequest[] = [
  {
    id: '1', author: 'Sarah M.', content: 'Please pray for my mom\'s surgery tomorrow. She\'s scared and so am I. God is our healer.',
    category: 'Health', prayerCount: 47, timeAgo: '12 min ago', hasPrayed: false,
  },
  {
    id: '2', author: 'David K.', content: 'I lost my job last week. Praying for provision and open doors. God knows my needs.',
    category: 'Work', prayerCount: 83, timeAgo: '1 hour ago', hasPrayed: false,
  },
  {
    id: '3', author: 'Anonymous', content: 'Struggling with addiction. I want to be free. Please pray for strength and deliverance.',
    category: 'Personal', prayerCount: 124, timeAgo: '2 hours ago', hasPrayed: false,
  },
  {
    id: '4', author: 'Maria L.', content: 'My marriage is falling apart. We need God\'s love to restore what feels broken.',
    category: 'Relationships', prayerCount: 96, timeAgo: '3 hours ago', hasPrayed: false,
  },
  {
    id: '5', author: 'James P.', content: 'Thank you Lord! My test results came back clear. God answers prayers! 🙏',
    category: 'Praise', prayerCount: 201, timeAgo: '5 hours ago', hasPrayed: false,
  },
  {
    id: '6', author: 'Grace W.', content: 'Starting a new chapter in my life. Pray for wisdom and courage as I step into the unknown.',
    category: 'Guidance', prayerCount: 62, timeAgo: '6 hours ago', hasPrayed: false,
  },
];

const CATEGORIES = ['All', 'Health', 'Work', 'Relationships', 'Personal', 'Guidance', 'Praise'];

export default function LivePrayerScreen({ navigation }: any) {
  const [requests, setRequests] = useState<PrayerRequest[]>(SAMPLE_REQUESTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSubmit, setShowSubmit] = useState(false);
  const [newRequest, setNewRequest] = useState('');
  const [newCategory, setNewCategory] = useState('Personal');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const filteredRequests = selectedCategory === 'All'
    ? requests
    : requests.filter((r) => r.category === selectedCategory);

  const prayerCount = requests.reduce((sum, r) => sum + r.prayerCount, 0);

  const handlePray = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => r.id === id ? { ...r, prayerCount: r.prayerCount + 1, hasPrayed: true } : r)
    );
  };

  const handleSubmit = () => {
    if (!newRequest.trim()) return;
    const request: PrayerRequest = {
      id: Date.now().toString(),
      author: isAnonymous ? 'Anonymous' : 'You',
      content: newRequest.trim(),
      category: newCategory,
      prayerCount: 0,
      timeAgo: 'Just now',
      hasPrayed: false,
    };
    setRequests([request, ...requests]);
    setNewRequest('');
    setShowSubmit(false);
    Alert.alert('Prayer Shared', 'Your prayer request has been shared with the community. Others are lifting you up.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Live Prayer</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>{prayerCount.toLocaleString()} prayers lifted</Text>
          </View>
        </View>
        <Pressable onPress={() => setShowSubmit(true)}>
          <Ionicons name="add-circle-outline" size={28} color={Colors.primary} />
        </Pressable>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories} contentContainerStyle={styles.categoriesContent}>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Prayer Requests */}
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <View style={styles.requestAuthor}>
                <View style={styles.authorAvatar}>
                  <Ionicons name="person" size={14} color={Colors.primary} />
                </View>
                <Text style={styles.authorName}>{item.author}</Text>
              </View>
              <View style={styles.requestMeta}>
                <View style={[styles.categoryBadge, item.category === 'Praise' && { backgroundColor: Colors.secondary + '15' }]}>
                  <Text style={[styles.categoryBadgeText, item.category === 'Praise' && { color: Colors.secondary }]}>
                    {item.category}
                  </Text>
                </View>
                <Text style={styles.timeText}>{item.timeAgo}</Text>
              </View>
            </View>
            <Text style={styles.requestContent}>{item.content}</Text>
            <View style={styles.requestFooter}>
              <Text style={styles.prayerCountText}>
                {item.prayerCount} {item.prayerCount === 1 ? 'person' : 'people'} praying
              </Text>
              <Pressable
                style={[styles.prayBtn, item.hasPrayed && styles.prayBtnPrayed]}
                onPress={() => !item.hasPrayed && handlePray(item.id)}
              >
                <Ionicons
                  name={item.hasPrayed ? 'heart' : 'heart-outline'}
                  size={16}
                  color={item.hasPrayed ? '#fff' : Colors.primary}
                />
                <Text style={[styles.prayBtnText, item.hasPrayed && styles.prayBtnTextPrayed]}>
                  {item.hasPrayed ? 'Prayed' : 'Pray'}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* Submit Modal */}
      {showSubmit && (
        <View style={styles.submitOverlay}>
          <View style={styles.submitCard}>
            <View style={styles.submitHeader}>
              <Text style={styles.submitTitle}>Share Your Prayer</Text>
              <Pressable onPress={() => setShowSubmit(false)}>
                <Ionicons name="close" size={24} color={Colors.textSecondary} />
              </Pressable>
            </View>
            <TextInput
              style={styles.submitInput}
              placeholder="What's on your heart today?"
              placeholderTextColor={Colors.textTertiary}
              value={newRequest}
              onChangeText={setNewRequest}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={300}
            />
            <View style={styles.submitOptions}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {CATEGORIES.filter(c => c !== 'All').map((cat) => (
                  <Pressable
                    key={cat}
                    style={[styles.categoryChip, newCategory === cat && styles.categoryChipActive]}
                    onPress={() => setNewCategory(cat)}
                  >
                    <Text style={[styles.categoryText, newCategory === cat && styles.categoryTextActive]}>
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            <Pressable
              style={styles.anonymousToggle}
              onPress={() => setIsAnonymous(!isAnonymous)}
            >
              <Ionicons
                name={isAnonymous ? 'checkbox' : 'square-outline'}
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.anonymousText}>Post anonymously</Text>
            </Pressable>
            <Button title="Share Prayer Request" onPress={handleSubmit} fullWidth size="lg" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
  },
  headerCenter: { alignItems: 'center' },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: 2 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success },
  liveText: { ...Typography.caption, color: Colors.textTertiary },
  categories: { maxHeight: 44, marginBottom: Spacing.sm },
  categoriesContent: { paddingHorizontal: Spacing.xl, gap: Spacing.sm },
  categoryChip: {
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceElevated,
  },
  categoryChipActive: { backgroundColor: Colors.primary },
  categoryText: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  categoryTextActive: { color: '#fff' },
  list: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.massive },
  requestCard: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.xl, marginBottom: Spacing.md, ...Shadows.sm,
  },
  requestHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  requestAuthor: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  authorAvatar: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  authorName: { ...Typography.bodySmall, color: Colors.textPrimary, fontWeight: '600' },
  requestMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  categoryBadge: {
    paddingHorizontal: Spacing.sm, paddingVertical: 2,
    borderRadius: BorderRadius.sm, backgroundColor: Colors.primary + '12',
  },
  categoryBadgeText: { ...Typography.caption, color: Colors.primary, fontWeight: '500' },
  timeText: { ...Typography.caption, color: Colors.textTertiary },
  requestContent: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22, marginBottom: Spacing.lg },
  requestFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  prayerCountText: { ...Typography.caption, color: Colors.textTertiary },
  prayBtn: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full, borderWidth: 1.5, borderColor: Colors.primary,
  },
  prayBtnPrayed: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  prayBtnText: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '600' },
  prayBtnTextPrayed: { color: '#fff' },
  submitOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end',
  },
  submitCard: {
    backgroundColor: Colors.surface, borderTopLeftRadius: BorderRadius.xl, borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.xl, paddingBottom: Spacing.massive,
  },
  submitHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
  submitTitle: { ...Typography.h3, color: Colors.textPrimary },
  submitInput: {
    ...Typography.body, color: Colors.textPrimary, backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.md, padding: Spacing.lg, minHeight: 100, marginBottom: Spacing.lg,
  },
  submitOptions: { marginBottom: Spacing.lg },
  anonymousToggle: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xl },
  anonymousText: { ...Typography.body, color: Colors.textSecondary },
});
