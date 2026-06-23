// Bible Chat — Christian Calendar Screen (Liturgical events, holy days, saints)

import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Card from '../../components/common/Card';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'holy_day' | 'liturgical' | 'saint' | 'season' | 'feast';
  description: string;
  color: string;
  scriptures?: string[];
  traditions?: string[];
}

const CALENDAR_EVENTS: CalendarEvent[] = [
  // Advent & Christmas
  { id: 'c1', title: 'First Sunday of Advent', date: '2025-11-30', type: 'season', description: 'The beginning of the liturgical year. A season of waiting and preparing for the coming of Christ.', color: '#7B68AE', scriptures: ['Isaiah 2:1-5', 'Romans 13:11-14'], traditions: ['Light the first Advent candle', 'Begin an Advent devotional'] },
  { id: 'c2', title: 'Feast of St. Nicholas', date: '2025-12-06', type: 'saint', description: 'Remembering the generous bishop of Myra, known for his secret gift-giving and care for the poor.', color: '#81C784' },
  { id: 'c3', title: 'Immaculate Conception', date: '2025-12-08', type: 'feast', description: 'Celebrating Mary, preserved from original sin to be the mother of Jesus.', color: '#4A6FA5', scriptures: ['Luke 1:28-38'] },
  { id: 'c4', title: 'Christmas Eve', date: '2025-12-24', type: 'holy_day', description: 'The vigil of Christ\'s birth. Families gather for worship, candlelight services, and celebration.', color: '#C5A55A', scriptures: ['Luke 2:1-20', 'Isaiah 9:6'], traditions: ['Attend candlelight service', 'Read the nativity story aloud'] },
  { id: 'c5', title: 'Christmas Day', date: '2025-12-25', type: 'holy_day', description: 'The birth of Jesus Christ — God made flesh, dwelling among us. Emmanuel!', color: '#C5A55A', scriptures: ['John 1:14', 'Matthew 1:18-25', 'Luke 2:1-20'], traditions: ['Morning worship', 'Celebrate God\'s gift to the world'] },
  { id: 'c6', title: 'Epiphany', date: '2026-01-06', type: 'holy_day', description: 'The manifestation of Christ to the Gentiles, represented by the Magi visiting the Christ child.', color: '#C5A55A', scriptures: ['Matthew 2:1-12'], traditions: ['Three Kings celebrations', 'Chalk blessing of the home'] },

  // Lent & Easter
  { id: 'c7', title: 'Ash Wednesday', date: '2026-02-18', type: 'liturgical', description: 'The beginning of Lent — 40 days of fasting, prayer, and repentance leading to Easter.', color: '#7B68AE', scriptures: ['Joel 2:12-13', 'Matthew 6:1-6, 16-18'], traditions: ['Receive ashes', 'Choose a Lenten fast or discipline'] },
  { id: 'c8', title: 'Palm Sunday', date: '2026-03-29', type: 'liturgical', description: 'Jesus\' triumphant entry into Jerusalem. The crowd waved palms and shouted "Hosanna!"', color: '#4A6FA5', scriptures: ['Matthew 21:1-11', 'John 12:12-19'], traditions: ['Palm procession', 'Read the Passion narrative'] },
  { id: 'c9', title: 'Maundy Thursday', date: '2026-04-02', type: 'liturgical', description: 'Jesus washes the disciples\' feet and institutes the Lord\'s Supper on the night before His death.', color: '#7B68AE', scriptures: ['John 13:1-17', 'Luke 22:14-20'] },
  { id: 'c10', title: 'Good Friday', date: '2026-04-03', type: 'holy_day', description: 'The crucifixion and death of Jesus Christ. He bore our sins on the cross out of love.', color: '#1A1A2E', scriptures: ['John 19:16-30', 'Isaiah 53:1-12'], traditions: ['Observe silence', 'Stations of the Cross'] },
  { id: 'c11', title: 'Easter Sunday', date: '2026-04-05', type: 'holy_day', description: 'He is risen! The resurrection of Jesus Christ — the foundation of our faith and the source of our hope.', color: '#C5A55A', scriptures: ['Matthew 28:1-10', 'John 20:1-18', '1 Corinthians 15:3-8'], traditions: ['Sunrise service', 'Celebrate with community'] },
  { id: 'c12', title: 'Ascension Day', date: '2026-05-14', type: 'liturgical', description: 'Forty days after Easter, Jesus ascended to heaven, promising to return and send the Holy Spirit.', color: '#4A6FA5', scriptures: ['Acts 1:6-11', 'Luke 24:50-53'] },
  { id: 'c13', title: 'Pentecost', date: '2026-05-24', type: 'holy_day', description: 'The Holy Spirit descends on the apostles with tongues of fire. The birthday of the Church!', color: '#E87E6C', scriptures: ['Acts 2:1-13', 'Joel 2:28-32'], traditions: ['Wear red', 'Celebrate the gifts of the Spirit'] },

  // Saints & Other
  { id: 'c14', title: 'St. Valentine\'s Day', date: '2026-02-14', type: 'saint', description: 'Honoring the martyr Valentine, who showed Christian love and performed marriages in secret.', color: '#E87E6C' },
  { id: 'c15', title: 'St. Patrick\'s Day', date: '2026-03-17', type: 'saint', description: 'Celebrating the patron saint of Ireland, missionary who used the shamrock to explain the Trinity.', color: '#81C784', scriptures: ['Romans 10:14-15'] },
  { id: 'c16', title: 'All Saints\' Day', date: '2026-11-01', type: 'saint', description: 'Honoring all saints, known and unknown, who have lived faithful lives and now rest with God.', color: '#FFB74D', scriptures: ['Revelation 7:9-17', 'Hebrews 12:1-2'] },
  { id: 'c17', title: 'Reformation Day', date: '2025-10-31', type: 'liturgical', description: 'Commemorating Martin Luther\'s 95 Theses and the Protestant Reformation — salvation by grace through faith.', color: '#4A6FA5', scriptures: ['Romans 1:17', 'Ephesians 2:8-9'] },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const EVENT_TYPE_ICONS: Record<string, { icon: keyof typeof Ionicons.glyphMap; label: string }> = {
  holy_day: { icon: 'star', label: 'Holy Day' },
  liturgical: { icon: 'calendar', label: 'Liturgical' },
  saint: { icon: 'person-circle', label: 'Saint' },
  season: { icon: 'leaf', label: 'Season' },
  feast: { icon: 'flower', label: 'Feast' },
};

export default function CalendarScreen({ navigation }: any) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(2026);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = useMemo(() => {
    let events = CALENDAR_EVENTS;
    if (filterType !== 'all') {
      events = events.filter((e) => e.type === filterType);
    }
    // Sort by date
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filterType]);

  const monthEvents = useMemo(() => {
    return filteredEvents.filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === selectedMonth;
    });
  }, [filteredEvents, selectedMonth]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return filteredEvents
      .filter((e) => new Date(e.date) >= now)
      .slice(0, 5);
  }, [filteredEvents]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Christian Calendar</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Month Selector */}
        <View style={styles.monthSelector}>
          <Pressable onPress={() => setSelectedMonth((selectedMonth - 1 + 12) % 12)}>
            <Ionicons name="chevron-back" size={20} color={Colors.textSecondary} />
          </Pressable>
          <Text style={styles.monthText}>{MONTHS[selectedMonth]} {selectedYear}</Text>
          <Pressable onPress={() => setSelectedMonth((selectedMonth + 1) % 12)}>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>
        </View>

        {/* Type Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filtersContent}>
          <Pressable
            style={[styles.filterChip, filterType === 'all' && styles.filterChipActive]}
            onPress={() => setFilterType('all')}
          >
            <Text style={[styles.filterText, filterType === 'all' && styles.filterTextActive]}>All</Text>
          </Pressable>
          {Object.entries(EVENT_TYPE_ICONS).map(([type, info]) => (
            <Pressable
              key={type}
              style={[styles.filterChip, filterType === type && styles.filterChipActive]}
              onPress={() => setFilterType(type)}
            >
              <Ionicons name={info.icon} size={14} color={filterType === type ? '#fff' : Colors.textSecondary} />
              <Text style={[styles.filterText, filterType === type && styles.filterTextActive]}>
                {info.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Upcoming Events */}
        {filterType === 'all' && selectedMonth === new Date().getMonth() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>COMING UP</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {upcomingEvents.map((event) => (
                <View key={event.id} style={[styles.upcomingCard, { borderTopColor: event.color }]}>
                  <Text style={styles.upcomingDate}>
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Text>
                  <Text style={styles.upcomingTitle} numberOfLines={2}>{event.title}</Text>
                  <View style={[styles.upcomingBadge, { backgroundColor: event.color + '15' }]}>
                    <Text style={[styles.upcomingType, { color: event.color }]}>{event.type.replace('_', ' ')}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Month Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {MONTHS[selectedMonth].toUpperCase()} ({monthEvents.length} events)
          </Text>
          {monthEvents.length === 0 ? (
            <View style={styles.emptyMonth}>
              <Ionicons name="calendar-outline" size={40} color={Colors.textTertiary} />
              <Text style={styles.emptyText}>No events this month</Text>
              <Text style={styles.emptySubtext}>Try another month or change the filter</Text>
            </View>
          ) : (
            monthEvents.map((event) => {
              const isExpanded = expandedEvent === event.id;
              const typeInfo = EVENT_TYPE_ICONS[event.type];
              return (
                <View key={event.id}>
                  <Pressable
                    style={styles.eventCard}
                    onPress={() => setExpandedEvent(isExpanded ? null : event.id)}
                  >
                    <View style={[styles.eventDateCol, { backgroundColor: event.color + '12' }]}>
                      <Text style={[styles.eventDay, { color: event.color }]}>
                        {new Date(event.date).getDate()}
                      </Text>
                      <Text style={[styles.eventMonth, { color: event.color }]}>
                        {MONTHS[new Date(event.date).getMonth()].slice(0, 3)}
                      </Text>
                    </View>
                    <View style={styles.eventInfo}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <View style={styles.eventTypeRow}>
                        <Ionicons name={typeInfo.icon} size={12} color={Colors.textTertiary} />
                        <Text style={styles.eventType}>{typeInfo.label}</Text>
                      </View>
                    </View>
                    <View style={[styles.eventDot, { backgroundColor: event.color }]} />
                  </Pressable>

                  {isExpanded && (
                    <View style={styles.eventExpanded}>
                      <Text style={styles.eventDesc}>{event.description}</Text>

                      {event.scriptures && event.scriptures.length > 0 && (
                        <View style={styles.eventSection}>
                          <Text style={styles.eventSectionLabel}>SCRIPTURE READINGS</Text>
                          {event.scriptures.map((s, i) => (
                            <View key={i} style={styles.scriptureRow}>
                              <Ionicons name="book-outline" size={14} color={Colors.primary} />
                              <Text style={styles.scriptureRef}>{s}</Text>
                            </View>
                          ))}
                        </View>
                      )}

                      {event.traditions && event.traditions.length > 0 && (
                        <View style={styles.eventSection}>
                          <Text style={styles.eventSectionLabel}>TRADITIONS & PRACTICES</Text>
                          {event.traditions.map((t, i) => (
                            <View key={i} style={styles.traditionRow}>
                              <Ionicons name="checkmark-circle-outline" size={14} color={Colors.success} />
                              <Text style={styles.traditionText}>{t}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>
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
  monthSelector: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, marginTop: Spacing.md, ...Shadows.sm,
  },
  monthText: { ...Typography.h3, color: Colors.textPrimary },
  filters: { marginTop: Spacing.lg, marginBottom: Spacing.md },
  filtersContent: { gap: Spacing.sm },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceElevated,
  },
  filterChipActive: { backgroundColor: Colors.primary },
  filterText: { ...Typography.bodySmall, color: Colors.textSecondary, fontWeight: '500' },
  filterTextActive: { color: '#fff' },
  section: { marginTop: Spacing.xl },
  sectionTitle: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.md },
  upcomingCard: {
    width: 140, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, marginRight: Spacing.md, borderTopWidth: 3, ...Shadows.sm,
  },
  upcomingDate: { ...Typography.caption, color: Colors.textTertiary, fontWeight: '600' },
  upcomingTitle: { ...Typography.bodySmall, color: Colors.textPrimary, fontWeight: '600', marginTop: Spacing.sm },
  upcomingBadge: { marginTop: Spacing.sm, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: BorderRadius.sm, alignSelf: 'flex-start' },
  upcomingType: { ...Typography.caption, fontWeight: '500', textTransform: 'capitalize' },
  emptyMonth: { alignItems: 'center', paddingVertical: Spacing.xxxl },
  emptyText: { ...Typography.body, color: Colors.textSecondary, marginTop: Spacing.md },
  emptySubtext: { ...Typography.bodySmall, color: Colors.textTertiary, marginTop: Spacing.xs },
  eventCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.lg, marginBottom: Spacing.sm, ...Shadows.sm,
  },
  eventDateCol: {
    width: 48, height: 48, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  eventDay: { fontSize: 18, fontWeight: '700' },
  eventMonth: { ...Typography.caption, fontWeight: '500', textTransform: 'uppercase' },
  eventInfo: { flex: 1 },
  eventTitle: { ...Typography.body, color: Colors.textPrimary, fontWeight: '600' },
  eventTypeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginTop: 2 },
  eventType: { ...Typography.caption, color: Colors.textTertiary, textTransform: 'capitalize' },
  eventDot: { width: 10, height: 10, borderRadius: 5 },
  eventExpanded: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.xl, marginBottom: Spacing.md, marginTop: -Spacing.xs, ...Shadows.sm,
  },
  eventDesc: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22 },
  eventSection: { marginTop: Spacing.lg },
  eventSectionLabel: { ...Typography.label, color: Colors.textTertiary, marginBottom: Spacing.sm },
  scriptureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xs },
  scriptureRef: { ...Typography.body, color: Colors.primary, fontWeight: '500' },
  traditionRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xs },
  traditionText: { ...Typography.body, color: Colors.textSecondary },
});
