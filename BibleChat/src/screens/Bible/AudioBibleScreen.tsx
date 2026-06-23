// Bible Chat — Audio Bible Player with Playlist/Queue Management

import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
  FlatList, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Card from '../../components/common/Card';

interface AudioChapter {
  id: string;
  book: string;
  chapter: number;
  title: string;
  duration: string;
  durationSeconds: number;
  narrator: string;
  isPlaying?: boolean;
}

interface Playlist {
  id: string;
  name: string;
  chapters: AudioChapter[];
  totalDuration: string;
}

const NARRATORS = [
  { id: 'narrator-1', name: 'David Thompson', voice: 'Deep & Warm', accent: 'American' },
  { id: 'narrator-2', name: 'Grace Williams', voice: 'Gentle & Clear', accent: 'British' },
  { id: 'narrator-3', name: 'Samuel Johnson', voice: 'Rich & Dramatic', accent: 'American' },
];

const AUDIO_CHAPTERS: AudioChapter[] = [
  { id: 'a1', book: 'Genesis', chapter: 1, title: 'The Creation', duration: '5:32', durationSeconds: 332, narrator: 'David Thompson' },
  { id: 'a2', book: 'Genesis', chapter: 2, title: 'The Garden of Eden', duration: '4:18', durationSeconds: 258, narrator: 'David Thompson' },
  { id: 'a3', book: 'Genesis', chapter: 3, title: 'The Fall', duration: '4:45', durationSeconds: 285, narrator: 'David Thompson' },
  { id: 'a4', book: 'Psalms', chapter: 23, title: 'The Lord Is My Shepherd', duration: '2:10', durationSeconds: 130, narrator: 'Grace Williams' },
  { id: 'a5', book: 'Psalms', chapter: 91, title: 'Shelter of the Most High', duration: '3:22', durationSeconds: 202, narrator: 'Grace Williams' },
  { id: 'a6', book: 'Psalms', chapter: 139, title: 'Fearfully & Wonderfully Made', duration: '4:05', durationSeconds: 245, narrator: 'Grace Williams' },
  { id: 'a7', book: 'Proverbs', chapter: 3, title: 'Trust in the Lord', duration: '4:30', durationSeconds: 270, narrator: 'Samuel Johnson' },
  { id: 'a8', book: 'Isaiah', chapter: 40, title: 'Comfort My People', duration: '6:15', durationSeconds: 375, narrator: 'Samuel Johnson' },
  { id: 'a9', book: 'Matthew', chapter: 5, title: 'The Sermon on the Mount', duration: '7:42', durationSeconds: 462, narrator: 'David Thompson' },
  { id: 'a10', book: 'Matthew', chapter: 6, title: 'The Lord\'s Prayer', duration: '5:55', durationSeconds: 355, narrator: 'David Thompson' },
  { id: 'a11', book: 'John', chapter: 1, title: 'The Word Became Flesh', duration: '6:30', durationSeconds: 390, narrator: 'Samuel Johnson' },
  { id: 'a12', book: 'John', chapter: 3, title: 'You Must Be Born Again', duration: '5:48', durationSeconds: 348, narrator: 'Samuel Johnson' },
  { id: 'a13', book: 'Romans', chapter: 8, title: 'No Condemnation', duration: '7:20', durationSeconds: 440, narrator: 'Grace Williams' },
  { id: 'a14', book: 'Philippians', chapter: 4, title: 'Rejoice in the Lord', duration: '4:55', durationSeconds: 295, narrator: 'Grace Williams' },
  { id: 'a15', book: 'Revelation', chapter: 21, title: 'A New Heaven & Earth', duration: '5:10', durationSeconds: 310, narrator: 'Samuel Johnson' },
];

const PLAYLISTS: Playlist[] = [
  {
    id: 'pl-1', name: 'Morning Comfort', totalDuration: '15 min',
    chapters: AUDIO_CHAPTERS.filter(c => ['a4', 'a5', 'a6', 'a14'].includes(c.id)),
  },
  {
    id: 'pl-2', name: 'The Life of Jesus', totalDuration: '25 min',
    chapters: AUDIO_CHAPTERS.filter(c => ['a9', 'a10', 'a11', 'a12'].includes(c.id)),
  },
  {
    id: 'pl-3', name: 'In the Beginning', totalDuration: '14 min',
    chapters: AUDIO_CHAPTERS.filter(c => ['a1', 'a2', 'a3'].includes(c.id)),
  },
  {
    id: 'pl-4', name: 'Hope & Strength', totalDuration: '18 min',
    chapters: AUDIO_CHAPTERS.filter(c => ['a7', 'a8', 'a13', 'a15'].includes(c.id)),
  },
];

export default function AudioBibleScreen({ navigation }: any) {
  const [currentTrack, setCurrentTrack] = useState<AudioChapter | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [queue, setQueue] = useState<AudioChapter[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'playlists' | 'queue'>('browse');
  const [selectedNarrator, setSelectedNarrator] = useState(NARRATORS[0].id);

  const playTrack = (track: AudioChapter) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  const addToQueue = (track: AudioChapter) => {
    if (!queue.find(q => q.id === track.id)) {
      setQueue([...queue, track]);
    }
  };

  const removeFromQueue = (id: string) => {
    setQueue(queue.filter(q => q.id !== id));
  };

  const toggleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
    const idx = speeds.indexOf(playbackSpeed);
    setPlaybackSpeed(speeds[(idx + 1) % speeds.length]);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Audio Bible</Text>
        <Pressable>
          <Ionicons name="settings-outline" size={22} color={Colors.textSecondary} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['browse', 'playlists', 'queue'] as const).map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'queue' ? `Queue (${queue.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* BROWSE TAB */}
        {activeTab === 'browse' && (
          <>
            {/* Narrator Selection */}
            <Text style={styles.sectionLabel}>NARRATOR</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.narratorRow}>
              {NARRATORS.map((n) => (
                <Pressable
                  key={n.id}
                  style={[styles.narratorCard, selectedNarrator === n.id && styles.narratorCardActive]}
                  onPress={() => setSelectedNarrator(n.id)}
                >
                  <View style={styles.narratorAvatar}>
                    <Ionicons name="mic" size={18} color={selectedNarrator === n.id ? '#fff' : Colors.primary} />
                  </View>
                  <Text style={[styles.narratorName, selectedNarrator === n.id && styles.narratorNameActive]}>
                    {n.name}
                  </Text>
                  <Text style={styles.narratorVoice}>{n.voice}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Chapters */}
            <Text style={styles.sectionLabel}>ALL CHAPTERS</Text>
            {AUDIO_CHAPTERS.map((chapter) => (
              <Pressable
                key={chapter.id}
                style={[styles.chapterRow, currentTrack?.id === chapter.id && styles.chapterRowActive]}
                onPress={() => playTrack(chapter)}
              >
                <View style={styles.chapterLeft}>
                  <View style={[styles.playIcon, currentTrack?.id === chapter.id && styles.playIconActive]}>
                    <Ionicons
                      name={currentTrack?.id === chapter.id && isPlaying ? 'pause' : 'play'}
                      size={14}
                      color={currentTrack?.id === chapter.id ? '#fff' : Colors.primary}
                    />
                  </View>
                  <View>
                    <Text style={styles.chapterTitle}>{chapter.book} {chapter.chapter}</Text>
                    <Text style={styles.chapterSub}>{chapter.title} · {chapter.narrator}</Text>
                  </View>
                </View>
                <View style={styles.chapterRight}>
                  <Text style={styles.chapterDuration}>{chapter.duration}</Text>
                  <Pressable onPress={() => addToQueue(chapter)} hitSlop={8}>
                    <Ionicons name="add-circle-outline" size={20} color={Colors.textTertiary} />
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </>
        )}

        {/* PLAYLISTS TAB */}
        {activeTab === 'playlists' && (
          <>
            <Text style={styles.sectionLabel}>CURATED PLAYLISTS</Text>
            {PLAYLISTS.map((playlist) => (
              <Card key={playlist.id} style={styles.playlistCard} onPress={() => {
                setQueue(playlist.chapters);
                playTrack(playlist.chapters[0]);
                setActiveTab('queue');
              }}>
                <View style={styles.playlistHeader}>
                  <View style={styles.playlistIcon}>
                    <Ionicons name="musical-notes" size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.playlistInfo}>
                    <Text style={styles.playlistName}>{playlist.name}</Text>
                    <Text style={styles.playlistMeta}>
                      {playlist.chapters.length} chapters · {playlist.totalDuration}
                    </Text>
                  </View>
                  <Ionicons name="play-circle" size={36} color={Colors.primary} />
                </View>
                <View style={styles.playlistTracks}>
                  {playlist.chapters.slice(0, 3).map((ch, i) => (
                    <Text key={ch.id} style={styles.playlistTrack}>
                      {i + 1}. {ch.book} {ch.chapter} — {ch.title}
                    </Text>
                  ))}
                  {playlist.chapters.length > 3 && (
                    <Text style={styles.playlistMore}>
                      +{playlist.chapters.length - 3} more
                    </Text>
                  )}
                </View>
              </Card>
            ))}
          </>
        )}

        {/* QUEUE TAB */}
        {activeTab === 'queue' && (
          <>
            <Text style={styles.sectionLabel}>UP NEXT</Text>
            {queue.length === 0 ? (
              <View style={styles.emptyQueue}>
                <Ionicons name="musical-notes-outline" size={48} color={Colors.textTertiary} />
                <Text style={styles.emptyText}>Your queue is empty</Text>
                <Text style={styles.emptySubtext}>Add chapters from Browse or pick a Playlist</Text>
              </View>
            ) : (
              queue.map((chapter, i) => (
                <View key={chapter.id} style={styles.queueItem}>
                  <Text style={styles.queueNum}>{i + 1}</Text>
                  <View style={styles.queueInfo}>
                    <Text style={styles.queueTitle}>{chapter.book} {chapter.chapter}</Text>
                    <Text style={styles.queueSub}>{chapter.title} · {chapter.duration}</Text>
                  </View>
                  <Pressable onPress={() => removeFromQueue(chapter.id)}>
                    <Ionicons name="close-circle-outline" size={22} color={Colors.textTertiary} />
                  </Pressable>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>

      {/* Now Playing Bar */}
      {currentTrack && (
        <View style={styles.nowPlaying}>
          <View style={styles.nowPlayingProgress}>
            <View style={[styles.nowPlayingProgressFill, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.nowPlayingContent}>
            <View style={styles.nowPlayingLeft}>
              <View style={styles.nowPlayingIcon}>
                <Ionicons name="musical-note" size={16} color="#fff" />
              </View>
              <View>
                <Text style={styles.nowPlayingTitle} numberOfLines={1}>
                  {currentTrack.book} {currentTrack.chapter}
                </Text>
                <Text style={styles.nowPlayingSub}>{currentTrack.title}</Text>
              </View>
            </View>
            <View style={styles.nowPlayingControls}>
              <Pressable onPress={toggleSpeed} style={styles.speedBtn}>
                <Text style={styles.speedText}>{playbackSpeed}x</Text>
              </Pressable>
              <Pressable onPress={() => setProgress(Math.max(0, progress - 0.1))}>
                <Ionicons name="play-back" size={22} color={Colors.textPrimary} />
              </Pressable>
              <Pressable
                style={styles.playPauseBtn}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#fff" />
              </Pressable>
              <Pressable onPress={() => setProgress(Math.min(1, progress + 0.1))}>
                <Ionicons name="play-forward" size={22} color={Colors.textPrimary} />
              </Pressable>
            </View>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>
              {formatTime(currentTrack.durationSeconds * progress)}
            </Text>
            <Text style={styles.timeText}>{currentTrack.duration}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
  },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  tabs: { flexDirection: 'row', paddingHorizontal: Spacing.xl, gap: Spacing.sm, marginBottom: Spacing.md },
  tab: { flex: 1, paddingVertical: Spacing.sm, alignItems: 'center', borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceElevated },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  tabTextActive: { color: '#fff' },
  content: { paddingHorizontal: Spacing.xl, paddingBottom: 200 },
  sectionLabel: { ...Typography.label, color: Colors.textTertiary, marginTop: Spacing.xl, marginBottom: Spacing.md },
  narratorRow: { marginBottom: Spacing.md },
  narratorCard: {
    width: 130, padding: Spacing.lg, borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface, marginRight: Spacing.md, alignItems: 'center', ...Shadows.sm,
    borderWidth: 2, borderColor: 'transparent',
  },
  narratorCardActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '08' },
  narratorAvatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm,
  },
  narratorName: { ...Typography.bodySmall, color: Colors.textPrimary, fontWeight: '600', textAlign: 'center' },
  narratorNameActive: { color: Colors.primary },
  narratorVoice: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  chapterRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: Spacing.lg, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  chapterRowActive: { backgroundColor: Colors.primary + '05', marginHorizontal: -Spacing.md, paddingHorizontal: Spacing.md, borderRadius: BorderRadius.md },
  chapterLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: Spacing.md },
  playIcon: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  playIconActive: { backgroundColor: Colors.primary },
  chapterTitle: { ...Typography.body, color: Colors.textPrimary, fontWeight: '600' },
  chapterSub: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  chapterRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  chapterDuration: { ...Typography.bodySmall, color: Colors.textTertiary },
  playlistCard: { marginBottom: Spacing.md },
  playlistHeader: { flexDirection: 'row', alignItems: 'center' },
  playlistIcon: {
    width: 44, height: 44, borderRadius: BorderRadius.md, backgroundColor: Colors.primary + '12',
    alignItems: 'center', justifyContent: 'center',
  },
  playlistInfo: { flex: 1, marginLeft: Spacing.md },
  playlistName: { ...Typography.body, color: Colors.textPrimary, fontWeight: '600' },
  playlistMeta: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  playlistTracks: { marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  playlistTrack: { ...Typography.bodySmall, color: Colors.textSecondary, marginBottom: Spacing.xs },
  playlistMore: { ...Typography.caption, color: Colors.primary, fontWeight: '500', marginTop: Spacing.xs },
  emptyQueue: { alignItems: 'center', paddingVertical: Spacing.massive },
  emptyText: { ...Typography.h3, color: Colors.textSecondary, marginTop: Spacing.lg },
  emptySubtext: { ...Typography.body, color: Colors.textTertiary, marginTop: Spacing.sm },
  queueItem: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingVertical: Spacing.lg, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  queueNum: { ...Typography.body, color: Colors.textTertiary, fontWeight: '600', width: 24 },
  queueInfo: { flex: 1 },
  queueTitle: { ...Typography.body, color: Colors.textPrimary, fontWeight: '500' },
  queueSub: { ...Typography.caption, color: Colors.textTertiary, marginTop: 2 },
  nowPlaying: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.surface, ...Shadows.lg, paddingBottom: Spacing.xl,
  },
  nowPlayingProgress: { height: 3, backgroundColor: '#E8E8E8' },
  nowPlayingProgressFill: { height: '100%', backgroundColor: Colors.primary },
  nowPlayingContent: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.md,
  },
  nowPlayingLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
  nowPlayingIcon: {
    width: 36, height: 36, borderRadius: 8, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  nowPlayingTitle: { ...Typography.bodySmall, color: Colors.textPrimary, fontWeight: '600' },
  nowPlayingSub: { ...Typography.caption, color: Colors.textTertiary },
  nowPlayingControls: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  speedBtn: { paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: BorderRadius.sm, backgroundColor: Colors.surfaceElevated },
  speedText: { ...Typography.caption, color: Colors.textSecondary, fontWeight: '600' },
  playPauseBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, marginTop: Spacing.xs },
  timeText: { ...Typography.caption, color: Colors.textTertiary },
});
