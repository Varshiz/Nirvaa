import { Activity } from '../types';

export const activities: Activity[] = [
  {
    id: 'breathing-box',
    type: 'breathing',
    title: 'Box Breathing',
    description: 'A simple 4-4-4-4 breathing technique to calm your mind',
    duration: 5,
    icon: 'Wind',
    color: 'bg-blue-500'
  },
  {
    id: 'breathing-478',
    type: 'breathing',
    title: '4-7-8 Breathing',
    description: 'Inhale for 4, hold for 7, exhale for 8 seconds',
    duration: 3,
    icon: 'Zap',
    color: 'bg-purple-500'
  },
  {
    id: 'journal-gratitude',
    type: 'journaling',
    title: 'Gratitude Journal',
    description: 'Write down three things you\'re grateful for today',
    duration: 10,
    icon: 'Heart',
    color: 'bg-pink-500'
  },
  {
    id: 'journal-reflection',
    type: 'journaling',
    title: 'Daily Reflection',
    description: 'Reflect on your day and identify growth opportunities',
    duration: 15,
    icon: 'BookOpen',
    color: 'bg-green-500'
  },
  {
    id: 'meditation-mindful',
    type: 'meditation',
    title: 'Mindful Meditation',
    description: 'Focus on the present moment and observe your thoughts',
    duration: 10,
    icon: 'Brain',
    color: 'bg-indigo-500'
  },
  {
    id: 'exercise-stretch',
    type: 'exercise',
    title: 'Gentle Stretching',
    description: 'Simple stretches to release tension and improve mood',
    duration: 8,
    icon: 'Smile',
    color: 'bg-orange-500'
  }
];

export const getRecommendedActivities = (mood: number): Activity[] => {
  if (mood <= 2) {
    // Low mood - calming activities
    return activities.filter(a => a.type === 'breathing' || a.type === 'meditation');
  } else if (mood <= 3) {
    // Moderate mood - reflective activities
    return activities.filter(a => a.type === 'journaling' || a.type === 'meditation');
  } else {
    // Good mood - any activities
    return activities;
  }
};