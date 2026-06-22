// Bible Chat — Bible Home Screen (Book/Chapter Browser)

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { BIBLE_BOOKS, TRANSLATIONS } from '../../constants/bibleData';
import { useAppStore } from '../../store/useAppStore';

export default function BibleScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'old' | 'new'>('old');
  const { currentTranslation, setTranslation } = useAppStore();
  const [showTranslations, setShowTranslations] = useState(false);

  const filteredBooks = BIBLE_BOOKS.filter((book) => {
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = book.testament === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleBookPress = (book: typeof BIBLE_BOOKS[0]) => {
    navigation.navigate('BibleReader', { bookId: book.id, bookName: book.name, chapter: 1 });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Bible</Text>
        <Pressable
          style={styles.translationButton}
          onPress={() => setShowTranslations(!showTranslations)}
        >
          <Text style={styles.translationText}>{currentTranslation}</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.primary} />
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={Colors.textTertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books, verses, topics..."
          placeholderTextColor={Colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
          </Pressable>
        )}
      </View>

      {/* Translation Picker */}
      {showTranslations && (
        <View style={styles.translationPicker}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {TRANSLATIONS.map((t) => (
              <Pressable
                key={t.id}
                style={[
                  styles.translationChip,
                  currentTranslation === t.id && styles.translationChipActive,
                ]}
                onPress={() => {
                  setTranslation(t.id as any);
                  setShowTranslations(false);
                }}
              >
                <Text
                  style={[
                    styles.translationChipText,
                    currentTranslation === t.id && styles.translationChipTextActive,
                  ]}
                >
                  {t.id}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Testament Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'old' && styles.tabActive]}
          onPress={() => setActiveTab('old')}
        >
          <Text style={[styles.tabText, activeTab === 'old' && styles.tabTextActive]}>
            Old Testament
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'new' && styles.tabActive]}
          onPress={() => setActiveTab('new')}
        >
          <Text style={[styles.tabText, activeTab === 'new' && styles.tabTextActive]}>
            New Testament
          </Text>
        </Pressable>
      </View>

      {/* Book List */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bookList}
        renderItem={({ item }) => (
          <Pressable style={styles.bookItem} onPress={() => handleBookPress(item)}>
            <View style={styles.bookInfo}>
              <Text style={styles.bookName}>{item.name}</Text>
              <Text style={styles.bookChapters}>{item.chapters} chapters</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
  },
  translationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '12',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  translationText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    marginHorizontal: Spacing.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  translationPicker: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  translationChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceElevated,
    marginRight: Spacing.sm,
  },
  translationChipActive: {
    backgroundColor: Colors.primary,
  },
  translationChipText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  translationChipTextActive: {
    color: Colors.textInverse,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceElevated,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: Colors.textInverse,
  },
  bookList: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  bookInfo: {},
  bookName: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  bookChapters: {
    ...Typography.caption,
    color: Colors.textTertiary,
    marginTop: Spacing.xxs,
  },
});
