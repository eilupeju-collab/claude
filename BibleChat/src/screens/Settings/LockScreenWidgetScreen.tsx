// Bible Chat — Lock Screen Widget Configuration Screen

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
  Dimensions, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

interface WidgetStyle {
  id: string;
  name: string;
  background: string;
  textColor: string;
  fontStyle: string;
  isPremium: boolean;
  preview: {
    verse: string;
    ref: string;
  };
}

const WIDGET_STYLES: WidgetStyle[] = [
  {
    id: 'classic', name: 'Classic White', background: '#FFFFFF', textColor: '#1A1A2E',
    fontStyle: 'serif', isPremium: false,
    preview: { verse: 'Be still, and know that I am God.', ref: 'Psalm 46:10' },
  },
  {
    id: 'midnight', name: 'Midnight', background: '#1A1A2E', textColor: '#FFFFFF',
    fontStyle: 'serif', isPremium: false,
    preview: { verse: 'The Lord is my light and my salvation.', ref: 'Psalm 27:1' },
  },
  {
    id: 'sunrise', name: 'Sunrise Gold', background: '#FFF8E1', textColor: '#5D4E37',
    fontStyle: 'serif', isPremium: false,
    preview: { verse: 'His mercies are new every morning.', ref: 'Lamentations 3:23' },
  },
  {
    id: 'ocean', name: 'Ocean Calm', background: '#E3F2FD', textColor: '#1565C0',
    fontStyle: 'modern', isPremium: true,
    preview: { verse: 'Peace I leave with you; my peace I give you.', ref: 'John 14:27' },
  },
  {
    id: 'forest', name: 'Forest Rest', background: '#E8F5E9', textColor: '#2E7D32',
    fontStyle: 'modern', isPremium: true,
    preview: { verse: 'He makes me lie down in green pastures.', ref: 'Psalm 23:2' },
  },
  {
    id: 'royal', name: 'Royal Purple', background: '#EDE7F6', textColor: '#4A148C',
    fontStyle: 'elegant', isPremium: true,
    preview: { verse: 'I am fearfully and wonderfully made.', ref: 'Psalm 139:14' },
  },
  {
    id: 'fire', name: 'Holy Fire', background: '#FBE9E7', textColor: '#BF360C',
    fontStyle: 'bold', isPremium: true,
    preview: { verse: 'Our God is a consuming fire.', ref: 'Hebrews 12:29' },
  },
  {
    id: 'minimal', name: 'Minimal', background: '#FAFAFA', textColor: '#424242',
    fontStyle: 'sans', isPremium: false,
    preview: { verse: 'Trust in the Lord with all your heart.', ref: 'Proverbs 3:5' },
  },
];

const REFRESH_OPTIONS = [
  { id: 'every_unlock', label: 'Every Unlock', description: 'New verse each time you check your phone' },
  { id: 'hourly', label: 'Every Hour', description: 'Fresh verse on the hour' },
  { id: 'daily', label: 'Once Daily', description: 'One verse to meditate on all day' },
  { id: 'manual', label: 'Manual', description: 'Change only when you tap refresh' },
];

const VERSE_CATEGORIES = [
  { id: 'all', label: 'All Verses', icon: 'book-outline' as const },
  { id: 'comfort', label: 'Comfort & Peace', icon: 'heart-outline' as const },
  { id: 'strength', label: 'Strength & Courage', icon: 'fitness-outline' as const },
  { id: 'wisdom', label: 'Wisdom & Guidance', icon: 'bulb-outline' as const },
  { id: 'praise', label: 'Praise & Worship', icon: 'musical-notes-outline' as const },
  { id: 'hope', label: 'Hope & Promise', icon: 'sunny-outline' as const },
];

export default function LockScreenWidgetScreen({ navigation }: any) {
  const [selectedStyle, setSelectedStyle] = useState('classic');
  const [refreshRate, setRefreshRate] = useState('every_unlock');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [showTranslation, setShowTranslation] = useState(true);
  const [widgetEnabled, setWidgetEnabled] = useState(true);

  const activeStyle = WIDGET_STYLES.find((s) => s.id === selectedStyle)!;

  const toggleCategory = (id: string) => {
    if (id === 'all') {
      setSelectedCategories(['all']);
    } else {
      const without = selectedCategories.filter((c) => c !== 'all' && c !== id);
      if (selectedCategories.includes(id)) {
        setSelectedCategories(without.length === 0 ? ['all'] : without);
      } else {
        setSelectedCategories([...without, id]);
      }
    }
  };

  const handleSave = () => {
    Alert.alert(
      'Widget Updated!',
      'Your lock screen verse widget has been configured. A new Bible verse will appear on your lock screen based on your settings.',
      [{ text: 'Great!', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Lock Screen Widget</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Widget Preview */}
        <View style={styles.previewSection}>
          <Text style={styles.sectionLabel}>PREVIEW</Text>
          <View style={[styles.phonePreview]}>
            <View style={[styles.lockScreen, { backgroundColor: activeStyle.background }]}>
              <Text style={styles.previewTime}>9:41</Text>
              <View style={styles.previewWidget}>
                <Text style={[styles.previewVerse, { color: activeStyle.textColor }]}>
                  "{activeStyle.preview.verse}"
                </Text>
                <Text style={[styles.previewRef, { color: activeStyle.textColor + 'AA' }]}>
                  — {activeStyle.preview.ref}
                </Text>
                {showTranslation && (
                  <Text style={[styles.previewTranslation, { color: activeStyle.textColor + '60' }]}>
                    NIV
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Widget Styles */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WIDGET STYLE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {WIDGET_STYLES.map((style) => (
              <Pressable
                key={style.id}
                style={[styles.styleCard, selectedStyle === style.id && styles.styleCardSelected]}
                onPress={() => {
                  if (style.isPremium) {
                    Alert.alert('Premium Style', 'This design is available with Bible Chat Premium. Start your free trial!');
                  } else {
                    setSelectedStyle(style.id);
                  }
                }}
              >
                <View style={[styles.stylePreview, { backgroundColor: style.background }]}>
                  <Text style={[styles.stylePreviewText, { color: style.textColor }]}>Aa</Text>
                  {style.isPremium && (
                    <View style={styles.premiumBadge}>
                      <Ionicons name="diamond" size={10} color="#fff" />
                    </View>
                  )}
                </View>
                <Text style={[styles.styleName, selectedStyle === style.id && styles.styleNameActive]}>
                  {style.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Refresh Rate */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>REFRESH RATE</Text>
          {REFRESH_OPTIONS.map((option) => (
            <Pressable
              key={option.id}
              style={[styles.refreshOption, refreshRate === option.id && styles.refreshOptionActive]}
              onPress={() => setRefreshRate(option.id)}
            >
              <View style={styles.refreshLeft}>
                <View style={[styles.radioOuter, refreshRate === option.id && styles.radioOuterActive]}>
                  {refreshRate === option.id && <View style={styles.radioInner} />}
                </View>
                <View>
                  <Text style={styles.refreshLabel}>{option.label}</Text>
                  <Text style={styles.refreshDesc}>{option.description}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Verse Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>VERSE CATEGORIES</Text>
          <Text style={styles.sectionHint}>Choose which types of verses appear on your lock screen</Text>
          <View style={styles.categoriesGrid}>
            {VERSE_CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={[styles.categoryChip, selectedCategories.includes(cat.id) && styles.categoryChipActive]}
                onPress={() => toggleCategory(cat.id)}
              >
                <Ionicons
                  name={cat.icon}
                  size={16}
                  color={selectedCategories.includes(cat.id) ? '#fff' : Colors.textSecondary}
                />
                <Text style={[styles.categoryText, selectedCategories.includes(cat.id) && styles.categoryTextActive]}>
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Options */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>OPTIONS</Text>
          <View style={styles.optionRow}>
            <View>
              <Text style={styles.optionLabel}>Show Translation</Text>
              <Text style={styles.optionDesc}>Display the Bible translation (NIV, ESV, etc.)</Text>
            </View>
            <Pressable
              style={[styles.toggle, showTranslation && styles.toggleActive]}
              onPress={() => setShowTranslation(!showTranslation)}
            >
              <View style={[styles.toggleThumb, showTranslation && styles.toggleThumbActive]} />
            </Pressable>
          </View>
          <View style={styles.optionRow}>
            <View>
              <Text style={styles.optionLabel}>Widget Enabled</Text>
              <Text style={styles.optionDesc}>Show Bible verses on your lock screen</Text>
            </View>
            <Pressable
              style={[styles.toggle, widgetEnabled && styles.toggleActive]}
              onPress={() => setWidgetEnabled(!widgetEnabled)}
            >
              <View style={[styles.toggleThumb, widgetEnabled && styles.toggleThumbActive]} />
            </Pressable>
          </View>
        </View>

        {/* Setup Instructions */}
        <Card style={styles.instructionsCard}>
          <View style={styles.instructionsHeader}>
            <Ionicons name="information-circle" size={20} color={Colors.primary} />
            <Text style={styles.instructionsTitle}>How to Set Up</Text>
          </View>
          <View style={styles.instructionsList}>
            <Text style={styles.instructionStep}>1. Long-press your lock screen</Text>
            <Text style={styles.instructionStep}>2. Tap "Customize" → "Add Widgets"</Text>
            <Text style={styles.instructionStep}>3. Find "Bible Chat" and add the verse widget</Text>
            <Text style={styles.instructionStep}>4. Your settings here will be applied automatically</Text>
          </View>
        </Card>

        <Button title="Save Widget Settings" onPress={handleSave} fullWidth size="lg" />
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
  previewSection: { marginTop: Spacing.lg },
  sectionLabel: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.md },
  sectionHint: { ...Typography.bodySmall, color: Colors.textTertiary, marginBottom: Spacing.md, marginTop: -Spacing.sm },
  phonePreview: { alignItems: 'center' },
  lockScreen: {
    width: width * 0.6, height: 200, borderRadius: BorderRadius.xl,
    padding: Spacing.xl, justifyContent: 'center', ...Shadows.md,
    borderWidth: 2, borderColor: '#E0E0E0',
  },
  previewTime: { ...Typography.h1, textAlign: 'center', marginBottom: Spacing.lg, opacity: 0.4 },
  previewWidget: { alignItems: 'center' },
  previewVerse: { ...Typography.body, textAlign: 'center', fontStyle: 'italic', lineHeight: 22, fontSize: 13 },
  previewRef: { ...Typography.caption, marginTop: Spacing.sm, fontWeight: '500' },
  previewTranslation: { ...Typography.caption, marginTop: Spacing.xs },
  section: { marginTop: Spacing.xxl },
  styleCard: {
    alignItems: 'center', marginRight: Spacing.md, padding: Spacing.sm,
    borderRadius: BorderRadius.md, borderWidth: 2, borderColor: 'transparent',
  },
  styleCardSelected: { borderColor: Colors.primary },
  stylePreview: {
    width: 56, height: 56, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center', ...Shadows.sm,
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  stylePreviewText: { fontSize: 18, fontWeight: '600' },
  premiumBadge: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: Colors.secondary, width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  styleName: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.xs, textAlign: 'center', width: 60 },
  styleNameActive: { color: Colors.primary, fontWeight: '600' },
  refreshOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: Spacing.lg, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  refreshOptionActive: {},
  refreshLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  radioOuter: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: Colors.textTertiary,
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuterActive: { borderColor: Colors.primary },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.primary },
  refreshLabel: { ...Typography.body, color: Colors.textPrimary, fontWeight: '500' },
  refreshDesc: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceElevated,
  },
  categoryChipActive: { backgroundColor: Colors.primary },
  categoryText: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  categoryTextActive: { color: '#fff' },
  optionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: Spacing.lg, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  optionLabel: { ...Typography.body, color: Colors.textPrimary, fontWeight: '500' },
  optionDesc: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  toggle: {
    width: 48, height: 28, borderRadius: 14, backgroundColor: '#E0E0E0',
    padding: 3, justifyContent: 'center',
  },
  toggleActive: { backgroundColor: Colors.primary },
  toggleThumb: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff', ...Shadows.sm,
  },
  toggleThumbActive: { alignSelf: 'flex-end' },
  instructionsCard: { marginTop: Spacing.xxl, marginBottom: Spacing.xl },
  instructionsHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  instructionsTitle: { ...Typography.body, color: Colors.textPrimary, fontWeight: '600' },
  instructionsList: { gap: Spacing.sm },
  instructionStep: { ...Typography.bodySmall, color: Colors.textSecondary, lineHeight: 20 },
});
