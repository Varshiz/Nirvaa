import { MoodEntry, UserStats, PeerMessage } from '../types';

const MOOD_ENTRIES_KEY = 'mood-entries';
const USER_STATS_KEY = 'user-stats';
const PEER_MESSAGES_KEY = 'peer-messages';

export const saveMoodEntry = (entry: MoodEntry): void => {
  const entries = getMoodEntries();
  const existingIndex = entries.findIndex(e => e.date === entry.date);
  
  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }
  
  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  localStorage.setItem(MOOD_ENTRIES_KEY, JSON.stringify(entries));
};

export const getMoodEntries = (): MoodEntry[] => {
  const stored = localStorage.getItem(MOOD_ENTRIES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getTodaysMoodEntry = (): MoodEntry | null => {
  const today = new Date().toISOString().split('T')[0];
  const entries = getMoodEntries();
  return entries.find(entry => entry.date === today) || null;
};

export const getUserStats = (): UserStats => {
  const stored = localStorage.getItem(USER_STATS_KEY);
  return stored ? JSON.parse(stored) : {
    currentStreak: 0,
    longestStreak: 0,
    totalCheckIns: 0,
    favoriteActivities: []
  };
};

export const updateUserStats = (stats: UserStats): void => {
  localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats));
};

export const getPeerMessages = (): PeerMessage[] => {
  const stored = localStorage.getItem(PEER_MESSAGES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addPeerMessage = (message: PeerMessage): void => {
  const messages = getPeerMessages();
  messages.unshift(message);
  // Keep only last 100 messages
  if (messages.length > 100) {
    messages.splice(100);
  }
  localStorage.setItem(PEER_MESSAGES_KEY, JSON.stringify(messages));
};