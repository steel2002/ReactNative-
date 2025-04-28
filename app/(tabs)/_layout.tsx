import React from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, Trophy, Calendar, User } from 'lucide-react-native';

export default function TabLayout() {
  return 
  (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00AEEF',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 60,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color, size }) => (
            <Trophy size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}