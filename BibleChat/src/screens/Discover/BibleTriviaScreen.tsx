// Bible Chat — Bible Trivia Game Screen

import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, Pressable, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import type { TriviaQuestion } from '../../types';

const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 't1', question: 'How many days did God take to create the world?',
    options: ['5 days', '6 days', '7 days', '40 days'],
    correctAnswer: 1, explanation: 'God created the world in 6 days and rested on the 7th (Genesis 1-2).',
    difficulty: 'easy', category: 'Old Testament', scriptureReference: 'Genesis 1-2',
  },
  {
    id: 't2', question: 'Who built the ark?',
    options: ['Moses', 'Abraham', 'Noah', 'David'],
    correctAnswer: 2, explanation: 'God instructed Noah to build an ark to save his family and animals from the flood.',
    difficulty: 'easy', category: 'Old Testament', scriptureReference: 'Genesis 6-9',
  },
  {
    id: 't3', question: 'How many books are in the Bible?',
    options: ['27', '39', '66', '73'],
    correctAnswer: 2, explanation: 'The Protestant Bible contains 66 books: 39 in the Old Testament and 27 in the New Testament.',
    difficulty: 'easy', category: 'General',
  },
  {
    id: 't4', question: 'Who was swallowed by a great fish?',
    options: ['Jonah', 'Peter', 'Paul', 'Elijah'],
    correctAnswer: 0, explanation: 'Jonah was swallowed by a great fish after fleeing from God\'s command.',
    difficulty: 'easy', category: 'Old Testament', scriptureReference: 'Jonah 1:17',
  },
  {
    id: 't5', question: 'What is the shortest verse in the Bible?',
    options: ['God is love', 'Jesus wept', 'Pray always', 'Be still'],
    correctAnswer: 1, explanation: '"Jesus wept" (John 11:35) is the shortest verse in the King James Bible.',
    difficulty: 'medium', category: 'New Testament', scriptureReference: 'John 11:35',
  },
  {
    id: 't6', question: 'How many apostles did Jesus choose?',
    options: ['7', '10', '12', '70'],
    correctAnswer: 2, explanation: 'Jesus chose 12 apostles to be His closest disciples.',
    difficulty: 'easy', category: 'New Testament', scriptureReference: 'Luke 6:13',
  },
  {
    id: 't7', question: 'Which psalm begins "The Lord is my shepherd"?',
    options: ['Psalm 1', 'Psalm 23', 'Psalm 91', 'Psalm 119'],
    correctAnswer: 1, explanation: 'Psalm 23 is the beloved psalm that begins "The Lord is my shepherd; I shall not want."',
    difficulty: 'easy', category: 'Old Testament', scriptureReference: 'Psalm 23:1',
  },
  {
    id: 't8', question: 'What was Paul\'s name before his conversion?',
    options: ['Simon', 'Saul', 'Samuel', 'Stephen'],
    correctAnswer: 1, explanation: 'Paul was originally named Saul. He persecuted Christians before his dramatic conversion on the road to Damascus.',
    difficulty: 'medium', category: 'New Testament', scriptureReference: 'Acts 9',
  },
];

export default function BibleTriviaScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const question = TRIVIA_QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < TRIVIA_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultScreen}>
          <Ionicons name="trophy" size={64} color={Colors.secondary} />
          <Text style={styles.resultTitle}>Well Done!</Text>
          <Text style={styles.resultScore}>{score} / {TRIVIA_QUESTIONS.length}</Text>
          <Text style={styles.resultSub}>
            {score === TRIVIA_QUESTIONS.length ? 'Perfect score! You know your Bible!' :
             score >= TRIVIA_QUESTIONS.length * 0.7 ? 'Great job! Keep studying!' :
             'Keep learning! God\'s Word is a treasure.'}
          </Text>
          <View style={styles.resultActions}>
            <Pressable style={styles.playAgainBtn} onPress={resetGame}>
              <Text style={styles.playAgainText}>Play Again</Text>
            </Pressable>
            <Pressable style={styles.doneBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.progress}>
          {currentIndex + 1} / {TRIVIA_QUESTIONS.length}
        </Text>
        <View style={styles.scoreBox}>
          <Ionicons name="star" size={16} color={Colors.secondary} />
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentIndex + 1) / TRIVIA_QUESTIONS.length) * 100}%` }]} />
      </View>

      {/* Question */}
      <View style={styles.questionSection}>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{question.difficulty.toUpperCase()}</Text>
        </View>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsSection}>
        {question.options.map((option, index) => {
          let optionStyle = styles.option;
          let textStyle = styles.optionText;
          if (showResult) {
            if (index === question.correctAnswer) {
              optionStyle = { ...styles.option, ...styles.optionCorrect };
              textStyle = { ...styles.optionText, ...styles.optionTextCorrect };
            } else if (index === selectedAnswer && !isCorrect) {
              optionStyle = { ...styles.option, ...styles.optionWrong };
              textStyle = { ...styles.optionText, ...styles.optionTextWrong };
            }
          }

          return (
            <Pressable
              key={index}
              style={[optionStyle, selectedAnswer === index && !showResult && styles.optionSelected]}
              onPress={() => handleAnswer(index)}
            >
              <Text style={textStyle}>{option}</Text>
              {showResult && index === question.correctAnswer && (
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Explanation */}
      {showResult && (
        <View style={styles.explanationBox}>
          <Ionicons name="information-circle" size={18} color={Colors.primary} />
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}

      {/* Next Button */}
      {showResult && (
        <Pressable style={styles.nextBtn} onPress={nextQuestion}>
          <Text style={styles.nextBtnText}>
            {currentIndex < TRIVIA_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </Pressable>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: Spacing.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Spacing.md },
  progress: { ...Typography.body, color: Colors.textSecondary, fontWeight: '600' },
  scoreBox: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  scoreText: { ...Typography.body, color: Colors.secondary, fontWeight: '700' },
  progressBar: { height: 4, backgroundColor: '#E8E8E8', borderRadius: 2, marginTop: Spacing.lg },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 2 },
  questionSection: { marginTop: Spacing.xxxl, alignItems: 'center' },
  difficultyBadge: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary + '12', marginBottom: Spacing.lg,
  },
  difficultyText: { ...Typography.caption, color: Colors.primary, fontWeight: '600', letterSpacing: 1 },
  questionText: { ...Typography.h2, color: Colors.textPrimary, textAlign: 'center', lineHeight: 30 },
  optionsSection: { marginTop: Spacing.xxxl, gap: Spacing.md },
  option: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.xl,
    borderWidth: 2, borderColor: 'transparent', ...Shadows.sm,
  },
  optionSelected: { borderColor: Colors.primary + '40' },
  optionCorrect: { borderColor: Colors.success, backgroundColor: Colors.success + '08' },
  optionWrong: { borderColor: Colors.error, backgroundColor: Colors.error + '08' },
  optionText: { ...Typography.body, color: Colors.textPrimary, fontWeight: '500' },
  optionTextCorrect: { color: Colors.success },
  optionTextWrong: { color: Colors.error },
  explanationBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: Colors.primary + '08', borderRadius: BorderRadius.md,
    padding: Spacing.lg, marginTop: Spacing.xl,
  },
  explanationText: { ...Typography.bodySmall, color: Colors.textSecondary, flex: 1, lineHeight: 20 },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primary, borderRadius: BorderRadius.full,
    paddingVertical: Spacing.lg, marginTop: Spacing.xl,
  },
  nextBtnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  resultScreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  resultTitle: { ...Typography.h1, color: Colors.textPrimary, marginTop: Spacing.xl },
  resultScore: { fontSize: 48, fontWeight: '700', color: Colors.primary, marginTop: Spacing.md },
  resultSub: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.md, paddingHorizontal: Spacing.xxl },
  resultActions: { flexDirection: 'row', gap: Spacing.lg, marginTop: Spacing.xxxl },
  playAgainBtn: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.xxl, paddingVertical: Spacing.lg, borderRadius: BorderRadius.full },
  playAgainText: { color: '#fff', fontWeight: '600' },
  doneBtn: { backgroundColor: Colors.surfaceElevated, paddingHorizontal: Spacing.xxl, paddingVertical: Spacing.lg, borderRadius: BorderRadius.full },
  doneText: { color: Colors.textSecondary, fontWeight: '600' },
});
