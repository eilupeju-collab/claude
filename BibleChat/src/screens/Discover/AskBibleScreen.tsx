// Bible Chat — Ask the Bible (AI Chat) Screen

import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, Pressable, TextInput,
  FlatList, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import type { ChatMessage } from '../../types';

const SAMPLE_RESPONSES: Record<string, string> = {
  default: 'I\'d be happy to help you explore what the Bible says about that. Could you be more specific about what you\'d like to know?',
  anxiety: 'The Bible has much to say about anxiety. In Philippians 4:6-7, Paul writes: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."\n\nAlso see:\n- 1 Peter 5:7 — Cast all your anxiety on Him\n- Isaiah 41:10 — Fear not, for I am with you\n- Matthew 6:25-34 — Do not worry about tomorrow\n- Psalm 94:19 — When anxiety was great within me, your consolation brought me joy',
  love: 'God\'s love is the central theme of Scripture. 1 John 4:8 declares "God is love." Here are key passages:\n\n- John 3:16 — For God so loved the world...\n- Romans 8:38-39 — Nothing can separate us from God\'s love\n- 1 Corinthians 13:4-8 — Love is patient, love is kind...\n- Ephesians 3:17-19 — To know the love of Christ that surpasses knowledge\n- 1 John 4:19 — We love because He first loved us',
  forgiveness: 'Forgiveness is central to the Christian faith. Here\'s what Scripture teaches:\n\n- Ephesians 4:32 — "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you."\n- Matthew 6:14-15 — If you forgive others, your heavenly Father will forgive you\n- Colossians 3:13 — Bear with each other and forgive one another\n- Psalm 103:12 — As far as east is from west, so far has He removed our sins\n- 1 John 1:9 — If we confess our sins, He is faithful to forgive',
  purpose: 'God has a purpose for your life! Here are key verses:\n\n- Jeremiah 29:11 — "For I know the plans I have for you...plans to prosper you"\n- Ephesians 2:10 — "We are God\'s handiwork, created in Christ Jesus to do good works"\n- Romans 8:28 — All things work together for good\n- Psalm 139:13-16 — You were fearfully and wonderfully made\n- Proverbs 3:5-6 — Trust in the Lord and He will direct your paths',
};

export default function AskBibleScreen({ navigation }: any) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m here to help you explore God\'s Word. Ask me anything about the Bible — a passage, a topic, or something you\'re going through. I\'ll share relevant Scripture with references.\n\nTry asking:\n- "What does the Bible say about anxiety?"\n- "Explain John 3:16"\n- "How can I forgive someone who hurt me?"',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = SAMPLE_RESPONSES.default;
      if (lowerInput.includes('anxiety') || lowerInput.includes('worry') || lowerInput.includes('anxious')) {
        response = SAMPLE_RESPONSES.anxiety;
      } else if (lowerInput.includes('love')) {
        response = SAMPLE_RESPONSES.love;
      } else if (lowerInput.includes('forgive') || lowerInput.includes('forgiveness')) {
        response = SAMPLE_RESPONSES.forgiveness;
      } else if (lowerInput.includes('purpose') || lowerInput.includes('plan') || lowerInput.includes('calling')) {
        response = SAMPLE_RESPONSES.purpose;
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageRow, isUser && styles.messageRowUser]}>
        {!isUser && (
          <View style={styles.aiAvatar}>
            <Ionicons name="book" size={16} color={Colors.primary} />
          </View>
        )}
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Ask the Bible</Text>
          <Text style={styles.headerSub}>AI-powered Scripture answers</Text>
        </View>
        <Pressable>
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.textSecondary} />
        </Pressable>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Typing Indicator */}
      {isTyping && (
        <View style={styles.typingRow}>
          <View style={styles.aiAvatar}>
            <Ionicons name="book" size={16} color={Colors.primary} />
          </View>
          <View style={styles.typingBubble}>
            <Text style={styles.typingText}>Searching Scripture...</Text>
          </View>
        </View>
      )}

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything about the Bible..."
            placeholderTextColor={Colors.textTertiary}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
          <Pressable
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={18} color={input.trim() ? '#fff' : Colors.textTertiary} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  headerCenter: { alignItems: 'center' },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  headerSub: { ...Typography.caption, color: Colors.textTertiary },
  messagesList: { padding: Spacing.xl, paddingBottom: Spacing.lg },
  messageRow: { flexDirection: 'row', marginBottom: Spacing.lg, alignItems: 'flex-start' },
  messageRowUser: { justifyContent: 'flex-end' },
  aiAvatar: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary + '15',
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm, marginTop: 2,
  },
  messageBubble: { maxWidth: '80%', borderRadius: BorderRadius.lg, padding: Spacing.lg },
  userBubble: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  aiBubble: { backgroundColor: Colors.surface, ...Shadows.sm, borderBottomLeftRadius: 4 },
  messageText: { ...Typography.body, color: Colors.textPrimary, lineHeight: 22 },
  userMessageText: { color: '#fff' },
  typingRow: { flexDirection: 'row', paddingHorizontal: Spacing.xl, marginBottom: Spacing.md, alignItems: 'center' },
  typingBubble: { backgroundColor: Colors.surfaceElevated, borderRadius: BorderRadius.lg, padding: Spacing.md },
  typingText: { ...Typography.bodySmall, color: Colors.textTertiary, fontStyle: 'italic' },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md, borderTopWidth: 1, borderTopColor: '#F0F0F0',
    backgroundColor: Colors.surface, gap: Spacing.sm,
  },
  input: {
    flex: 1, ...Typography.body, color: Colors.textPrimary,
    backgroundColor: Colors.surfaceElevated, borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, maxHeight: 100,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: Colors.surfaceElevated },
});
