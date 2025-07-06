import { useState, useEffect } from 'react';
import { MoodEntry, UserStats } from '../types';
import { getMoodEntries, getTodaysMoodEntry, getUserStats, updateUserStats, saveMoodEntry } from '../utils/storage';

export const useMoodData = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [todaysMood, setTodaysMood] = useState<MoodEntry | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    currentStreak: 0,
    longestStreak: 0,
    totalCheckIns: 0,
    favoriteActivities: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const entries = getMoodEntries();
    const today = getTodaysMoodEntry();
    const stats = getUserStats();
    
    setMoodEntries(entries);
    setTodaysMood(today);
    setUserStats(stats);
  };

  const addMoodEntry = (entry: MoodEntry) => {
    saveMoodEntry(entry);
    
    // Update stats
    const newStats = { ...userStats };
    newStats.totalCheckIns += 1;
    
    // Calculate streak
    const entries = getMoodEntries();
    let streak = 1;
    const today = new Date();
    
    for (let i = 1; i < entries.length; i++) {
      const entryDate = new Date(entries[i].date);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (entryDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    
    newStats.currentStreak = streak;
    newStats.longestStreak = Math.max(newStats.longestStreak, streak);
    
    updateUserStats(newStats);
    loadData();
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const sum = moodEntries.reduce((acc, entry) => acc + entry.mood, 0);
    return sum / moodEntries.length;
  };

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return 'stable';
    
    const recent = moodEntries.slice(0, 7);
    const older = moodEntries.slice(7, 14);
    
    if (recent.length === 0 || older.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((acc, entry) => acc + entry.mood, 0) / recent.length;
    const olderAvg = older.reduce((acc, entry) => acc + entry.mood, 0) / older.length;
    
    if (recentAvg > olderAvg + 0.3) return 'improving';
    if (recentAvg < olderAvg - 0.3) return 'declining';
    return 'stable';
  };

  return {
    moodEntries,
    todaysMood,
    userStats,
    addMoodEntry,
    getAverageMood,
    getMoodTrend,
    loadData
  };
};