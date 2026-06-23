// Bible Chat — Main App Navigator with Bottom Tabs

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import BibleScreen from '../screens/Bible/BibleScreen';
import BibleReaderScreen from '../screens/Bible/BibleReaderScreen';
import AudioBibleScreen from '../screens/Bible/AudioBibleScreen';
import MeditationScreen from '../screens/Meditation/MeditationScreen';
import MeditationPlayerScreen from '../screens/Meditation/MeditationPlayerScreen';
import BreathingScreen from '../screens/Meditation/BreathingScreen';
import PrayerScreen from '../screens/Prayer/PrayerScreen';
import PrayerJournalScreen from '../screens/Prayer/PrayerJournalScreen';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import DailyPlanScreen from '../screens/Discover/DailyPlanScreen';
import StudyPlanScreen from '../screens/Discover/StudyPlanScreen';
import AskBibleScreen from '../screens/Discover/AskBibleScreen';
import BibleTriviaScreen from '../screens/Discover/BibleTriviaScreen';
import CalendarScreen from '../screens/Discover/CalendarScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import PanicButtonScreen from '../screens/Wellness/PanicButtonScreen';
import MoodTrackerScreen from '../screens/Wellness/MoodTrackerScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import LivePrayerScreen from '../screens/Community/LivePrayerScreen';
import SendBlessingScreen from '../screens/Community/SendBlessingScreen';
import KidsBibleScreen from '../screens/Kids/KidsBibleScreen';
import LockScreenWidgetScreen from '../screens/Settings/LockScreenWidgetScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function BibleStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BibleHome" component={BibleScreen} />
      <Stack.Screen name="BibleReader" component={BibleReaderScreen} />
      <Stack.Screen name="AudioBible" component={AudioBibleScreen} />
    </Stack.Navigator>
  );
}

function MeditateStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MeditateHome" component={MeditationScreen} />
      <Stack.Screen name="MeditationPlayer" component={MeditationPlayerScreen} />
      <Stack.Screen name="Breathing" component={BreathingScreen} />
    </Stack.Navigator>
  );
}

function PrayStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PrayHome" component={PrayerScreen} />
      <Stack.Screen name="PrayerJournal" component={PrayerJournalScreen} />
    </Stack.Navigator>
  );
}

function DiscoverStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscoverHome" component={DiscoverScreen} />
      <Stack.Screen name="DailyPlan" component={DailyPlanScreen} />
      <Stack.Screen name="StudyPlan" component={StudyPlanScreen} />
      <Stack.Screen name="AskBible" component={AskBibleScreen} />
      <Stack.Screen name="BibleTrivia" component={BibleTriviaScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: '#E8E8E8',
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = focused ? 'sunny' : 'sunny-outline';
          else if (route.name === 'Bible') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Meditate') iconName = focused ? 'leaf' : 'leaf-outline';
          else if (route.name === 'Pray') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Discover') iconName = focused ? 'compass' : 'compass-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bible" component={BibleStack} />
      <Tab.Screen name="Meditate" component={MeditateStack} />
      <Tab.Screen name="Pray" component={PrayStack} />
      <Tab.Screen name="Discover" component={DiscoverStack} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="PanicButton" component={PanicButtonScreen} />
        <Stack.Screen name="MoodTracker" component={MoodTrackerScreen} />
        <Stack.Screen name="LivePrayer" component={LivePrayerScreen} />
        <Stack.Screen name="SendBlessing" component={SendBlessingScreen} />
        <Stack.Screen name="KidsBible" component={KidsBibleScreen} />
        <Stack.Screen name="LockScreenWidget" component={LockScreenWidgetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
