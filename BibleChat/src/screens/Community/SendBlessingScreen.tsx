// Bible Chat — Send a Blessing Screen (pick verse + message + share)

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
  TextInput, Alert, Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Button from '../../components/common/Button';

const BLESSING_VERSES = [
  { text: 'The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you.', ref: 'Numbers 6:24-25' },
  { text: 'May the God of hope fill you with all joy and peace as you trust in him.', ref: 'Romans 15:13' },
  { text: 'I pray that out of his glorious riches he may strengthen you with power through his Spirit.', ref: 'Ephesians 3:16' },
  { text: 'The Lord is my strength and my shield; my heart trusts in him, and he helps me.', ref: 'Psalm 28:7' },
  { text: 'For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you.', ref: 'Jeremiah 29:11' },
  { text: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you.', ref: 'Joshua 1:9' },
  { text: 'Cast all your anxiety on him because he cares for you.', ref: '1 Peter 5:7' },
  { text: 'And we know that in all things God works for the good of those who love him.', ref: 'Romans 8:28' },
  { text: 'The LORD is close to the brokenhearted and saves those who are crushed in spirit.', ref: 'Psalm 34:18' },
  { text: 'I can do all this through him who gives me strength.', ref: 'Philippians 4:13' },
];

const THEMES = [
  { id: 'encouragement', label: 'Encouragement', icon: 'sunny-outline' as const, color: '#FFB74D' },
  { id: 'healing', label: 'Healing', icon: 'heart-outline' as const, color: '#E87E6C' },
  { id: 'peace', label: 'Peace', icon: 'leaf-outline' as const, color: '#7ECEC1' },
  { id: 'strength', label: 'Strength', icon: 'fitness-outline' as const, color: Colors.primary },
  { id: 'gratitude', label: 'Gratitude', icon: 'star-outline' as const, color: '#C5A55A' },
  { id: 'love', label: 'Love', icon: 'heart-circle-outline' as const, color: '#E87E6C' },
];

const DECORATIONS = ['❤️', '🙏', '✝️', '🕊️', '🌿', '☀️', '⭐', '🌈'];

export default function SendBlessingScreen({ navigation }: any) {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [personalMessage, setPersonalMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [selectedDecoration, setSelectedDecoration] = useState('🙏');
  const [step, setStep] = useState<'verse' | 'message' | 'preview'>('verse');

  const handleShare = async () => {
    if (selectedVerse === null) return;
    const verse = BLESSING_VERSES[selectedVerse];
    const message = `${selectedDecoration} A Blessing for ${recipientName || 'You'} ${selectedDecoration}\n\n"${verse.text}"\n— ${verse.ref}\n\n${personalMessage ? `${personalMessage}\n\n` : ''}Sent with love from Bible Chat 📖`;

    try {
      await Share.share({ message, title: 'A Blessing for You' });
      Alert.alert('Blessing Sent!', 'May your words encourage their heart today.');
      navigation.goBack();
    } catch (error) {
      // User cancelled
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => {
            if (step === 'verse') navigation.goBack();
            else if (step === 'message') setStep('verse');
            else setStep('message');
          }}>
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Send a Blessing</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Step Indicator */}
        <View style={styles.steps}>
          {['Pick Verse', 'Add Message', 'Preview'].map((label, i) => (
            <View key={label} style={styles.stepItem}>
              <View style={[
                styles.stepDot,
                i === ['verse', 'message', 'preview'].indexOf(step) && styles.stepDotActive,
                i < ['verse', 'message', 'preview'].indexOf(step) && styles.stepDotComplete,
              ]}>
                {i < ['verse', 'message', 'preview'].indexOf(step) ? (
                  <Ionicons name="checkmark" size={12} color="#fff" />
                ) : (
                  <Text style={[styles.stepNum, i === ['verse', 'message', 'preview'].indexOf(step) && styles.stepNumActive]}>
                    {i + 1}
                  </Text>
                )}
              </View>
              <Text style={styles.stepLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* STEP 1: Pick Verse */}
        {step === 'verse' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Choose a verse to bless someone</Text>
            <View style={styles.versesList}>
              {BLESSING_VERSES.map((verse, i) => (
                <Pressable
                  key={i}
                  style={[styles.verseOption, selectedVerse === i && styles.verseOptionSelected]}
                  onPress={() => setSelectedVerse(i)}
                >
                  <Text style={[styles.verseText, selectedVerse === i && styles.verseTextSelected]}>
                    "{verse.text}"
                  </Text>
                  <Text style={[styles.verseRef, selectedVerse === i && styles.verseRefSelected]}>
                    — {verse.ref}
                  </Text>
                  {selectedVerse === i && (
                    <View style={styles.selectedCheck}>
                      <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
            <Button
              title="Next: Add Message"
              onPress={() => setStep('message')}
              fullWidth
              size="lg"
              disabled={selectedVerse === null}
            />
          </View>
        )}

        {/* STEP 2: Personal Message */}
        {step === 'message' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Make it personal</Text>

            <Text style={styles.inputLabel}>WHO IS THIS FOR?</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Their name (optional)"
              placeholderTextColor={Colors.textTertiary}
              value={recipientName}
              onChangeText={setRecipientName}
            />

            <Text style={styles.inputLabel}>YOUR MESSAGE (OPTIONAL)</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Add a personal note..."
              placeholderTextColor={Colors.textTertiary}
              value={personalMessage}
              onChangeText={setPersonalMessage}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              maxLength={200}
            />
            <Text style={styles.charCount}>{personalMessage.length}/200</Text>

            <Text style={styles.inputLabel}>ADD A DECORATION</Text>
            <View style={styles.decorationsRow}>
              {DECORATIONS.map((dec) => (
                <Pressable
                  key={dec}
                  style={[styles.decoItem, selectedDecoration === dec && styles.decoItemSelected]}
                  onPress={() => setSelectedDecoration(dec)}
                >
                  <Text style={styles.decoEmoji}>{dec}</Text>
                </Pressable>
              ))}
            </View>

            <Button title="Preview Blessing" onPress={() => setStep('preview')} fullWidth size="lg" />
          </View>
        )}

        {/* STEP 3: Preview */}
        {step === 'preview' && selectedVerse !== null && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Preview your blessing</Text>

            <View style={styles.previewCard}>
              <Text style={styles.previewDecoration}>{selectedDecoration}</Text>
              <Text style={styles.previewFor}>
                A Blessing for {recipientName || 'You'}
              </Text>
              <Text style={styles.previewVerse}>
                "{BLESSING_VERSES[selectedVerse].text}"
              </Text>
              <Text style={styles.previewRef}>
                — {BLESSING_VERSES[selectedVerse].ref}
              </Text>
              {personalMessage ? (
                <Text style={styles.previewMessage}>{personalMessage}</Text>
              ) : null}
              <Text style={styles.previewFooter}>Sent with love from Bible Chat 📖</Text>
            </View>

            <Button title="Share Blessing" onPress={handleShare} fullWidth size="lg" icon="share-outline" />
          </View>
        )}
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
  steps: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.xxl, marginTop: Spacing.lg, marginBottom: Spacing.xl },
  stepItem: { alignItems: 'center', gap: Spacing.xs },
  stepDot: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  stepDotActive: { backgroundColor: Colors.primary },
  stepDotComplete: { backgroundColor: Colors.success },
  stepNum: { ...Typography.caption, color: Colors.textTertiary, fontWeight: '700' },
  stepNumActive: { color: '#fff' },
  stepLabel: { ...Typography.caption, color: Colors.textTertiary },
  content: { marginTop: Spacing.lg },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.xl },
  versesList: { gap: Spacing.md, marginBottom: Spacing.xl },
  verseOption: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, borderWidth: 2, borderColor: 'transparent', ...Shadows.sm,
  },
  verseOptionSelected: { borderColor: Colors.primary, backgroundColor: Colors.primary + '05' },
  verseText: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22, fontStyle: 'italic' },
  verseTextSelected: { color: Colors.textPrimary },
  verseRef: { ...Typography.bodySmall, color: Colors.textTertiary, marginTop: Spacing.sm, fontWeight: '500' },
  verseRefSelected: { color: Colors.primary },
  selectedCheck: { position: 'absolute', top: Spacing.md, right: Spacing.md },
  inputLabel: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.sm, marginTop: Spacing.lg },
  nameInput: {
    ...Typography.body, color: Colors.textPrimary, backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md, padding: Spacing.lg, ...Shadows.sm,
  },
  messageInput: {
    ...Typography.body, color: Colors.textPrimary, backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md, padding: Spacing.lg, minHeight: 80, ...Shadows.sm,
  },
  charCount: { ...Typography.caption, color: Colors.textTertiary, textAlign: 'right', marginTop: Spacing.xs },
  decorationsRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xxl, flexWrap: 'wrap' },
  decoItem: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  decoItemSelected: { backgroundColor: Colors.primary + '15', borderWidth: 2, borderColor: Colors.primary },
  decoEmoji: { fontSize: 20 },
  previewCard: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, padding: Spacing.xxl,
    alignItems: 'center', ...Shadows.md, marginBottom: Spacing.xl,
    borderWidth: 1, borderColor: Colors.primary + '20',
  },
  previewDecoration: { fontSize: 36, marginBottom: Spacing.md },
  previewFor: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.lg },
  previewVerse: { ...Typography.body, color: Colors.textPrimary, textAlign: 'center', lineHeight: 24, fontStyle: 'italic' },
  previewRef: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '600', marginTop: Spacing.md },
  previewMessage: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.xl, lineHeight: 22 },
  previewFooter: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.xl },
});
