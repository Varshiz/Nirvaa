export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  moodLabel: string;
  emoji: string;
  note?: string;
  activities?: string[];
}

export interface Activity {
  id: string;
  type: 'breathing' | 'journaling' | 'meditation' | 'exercise';
  title: string;
  description: string;
  duration: number;
  icon: string;
  color: string;
}


export interface PeerMessage {
  id: string;
  message: string;
  timestamp: string;
  mood: number;
  isAnonymous: boolean;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  favoriteActivities: string[];
}