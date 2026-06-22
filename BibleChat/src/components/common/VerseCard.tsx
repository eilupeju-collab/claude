// Bible Chat — Verse Display Card (used on Home, Lock Screen Widget preview, etc.)

import React from 'react';
import { View, Text, StyleSheet, Pressable, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import type { BibleVerse } from '../../types';

interface VerseCardProps {
  verse: BibleVerse;
  showActions?: boolean;
  onBookmark?: () => void;
  onShare?: () => void;
  compact?: boolean;
}

export default function VerseCard({ verse, showActions = true, onBookmark, onShare, compact = false }: VerseCardProps) {
  const handleShare = async () => {
    if (onShare) {
      onShare();
      return;
    }
    await Share.share({
      message: `"${verse.text}"\n\n— ${verse.book} ${verse.chapter}:${verse.verse} (${verse.translation})\n\nShared via Bible Chat`,
    });
  };

  return (
    <View style={[styles.container, compact && styles.compact]}>
      <Text style={[styles.verseText, compact && styles.compactText]}>
        "{verse.text}"
      </Text>
      <Text style={styles.reference}>
        {verse.book} {verse.chapter}:{verse.verse} ({verse.translation})
      </Text>
      {showActions && (
        <View style={styles.actions}>
          <Pressable onPress={onBookmark} style={styles.actionButton}>
            <Ionicons name="bookmark-outline" size={20} color={Colors.textTertiary} />
          </Pressable>
          <Pressable onPress={handleShare} style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color={Colors.textTertiary} />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Ionicons name="heart-outline" size={20} color={Colors.textTertiary} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    ...Shadows.md,
  },
  compact: {
    padding: Spacing.lg,
  },
  verseText: {
    ...Typography.scripture,
    color: Colors.scriptureText,
    fontStyle: 'italic',
    marginBottom: Spacing.md,
  },
  compactText: {
    fontSize: 16,
    lineHeight: 24,
  },
  reference: {
    ...Typography.bodySmall,
    color: Colors.secondary,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.lg,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    padding: Spacing.xs,
  },
});
