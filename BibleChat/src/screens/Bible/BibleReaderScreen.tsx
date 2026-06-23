// Bible Chat — Bible Reader Screen (Read chapters with audio controls)

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { GENESIS_1, PSALM_23 } from '../../constants/bibleData';
import { useAppStore } from '../../store/useAppStore';

export default function BibleReaderScreen({ route, navigation }: any) {
  const { bookName = 'Genesis', chapter = 1 } = route?.params || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const { currentTranslation } = useAppStore();

  // Demo: show Genesis 1 or Psalm 23
  const verses = bookName === 'Psalms' ? PSALM_23 : GENESIS_1;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{bookName} {chapter}</Text>
          <Text style={styles.headerSub}>{currentTranslation}</Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.iconBtn} onPress={() => setFontSize(Math.min(fontSize + 2, 28))}>
            <Ionicons name="text" size={20} color={Colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="search-outline" size={20} color={Colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      {/* Scripture Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentPadding}
      >
        {verses.map((verse) => (
          <Pressable key={verse.id} style={styles.verseRow}>
            <Text style={[styles.verseNumber, { fontSize: fontSize - 6 }]}>
              {verse.verse}
            </Text>
            <Text style={[styles.verseText, { fontSize, lineHeight: fontSize * 1.7 }]}>
              {verse.text}{' '}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Audio Player Bar */}
      <View style={styles.audioBar}>
        <Pressable style={styles.audioBtn}>
          <Ionicons name="play-skip-back" size={20} color={Colors.textSecondary} />
        </Pressable>
        <Pressable
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color="#fff"
          />
        </Pressable>
        <Pressable style={styles.audioBtn}>
          <Ionicons name="play-skip-forward" size={20} color={Colors.textSecondary} />
        </Pressable>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '35%' }]} />
        </View>
        <Text style={styles.audioTime}>2:14 / 6:30</Text>
      </View>

      {/* Chapter Navigation */}
      <View style={styles.chapterNav}>
        <Pressable style={styles.chapterBtn}>
          <Ionicons name="chevron-back" size={16} color={Colors.primary} />
          <Text style={styles.chapterBtnText}>Prev</Text>
        </Pressable>
        <Text style={styles.chapterInfo}>Chapter {chapter} of 50</Text>
        <Pressable style={styles.chapterBtn}>
          <Text style={styles.chapterBtnText}>Next</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: { padding: Spacing.xs },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  headerSub: { ...Typography.caption, color: Colors.textTertiary },
  headerRight: { flexDirection: 'row', gap: Spacing.md },
  iconBtn: { padding: Spacing.xs },
  content: { flex: 1 },
  contentPadding: { padding: Spacing.xl, paddingBottom: Spacing.massive },
  verseRow: { flexDirection: 'row', marginBottom: Spacing.xs },
  verseNumber: {
    color: Colors.verseNumber,
    fontWeight: '700',
    marginRight: Spacing.sm,
    marginTop: 3,
    minWidth: 20,
  },
  verseText: {
    flex: 1,
    color: Colors.scriptureText,
    fontFamily: 'Georgia',
  },
  audioBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: Spacing.md,
  },
  audioBtn: { padding: Spacing.xs },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  audioTime: { ...Typography.caption, color: Colors.textTertiary },
  chapterNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  chapterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  chapterBtnText: {
    color: Colors.primary,
    fontWeight: '500',
    fontSize: 14,
  },
  chapterInfo: { ...Typography.bodySmall, color: Colors.textTertiary },
});
