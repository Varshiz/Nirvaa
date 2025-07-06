import React from 'react';
import { Calendar, TrendingUp, Target, Star } from 'lucide-react';
import type { MoodEntry, UserStats } from '../types';
// import { MoodEntry , UserStats } from '/src/types/index';


interface DashboardProps {
  todaysMood: MoodEntry | null;
  userStats: UserStats;
  averageMood: number;
  moodTrend: string;
  onOpenMoodCheckIn: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  todaysMood,
  userStats,
  averageMood,
  moodTrend,
  onOpenMoodCheckIn
}) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      default: return '➡️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-blue-100">
          {todaysMood ? `Today you're feeling ${todaysMood.moodLabel.toLowerCase()} ${todaysMood.emoji}` : "How are you feeling today?"}
        </p>
      </div>

      {/* Today's Mood */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Today's Check-in</h2>
          <Calendar className="text-blue-500" size={24} />
        </div>
        
        {todaysMood ? (
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{todaysMood.emoji}</div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900">{todaysMood.moodLabel}</p>
              {todaysMood.note && (
                <p className="text-gray-600 text-sm mt-1">{todaysMood.note}</p>
              )}
            </div>
            <button
              onClick={onOpenMoodCheckIn}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Update
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🤔</div>
            <p className="text-gray-600 mb-4">You haven't checked in today yet</p>
            <button
              onClick={onOpenMoodCheckIn}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              Check In Now
            </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="text-orange-600" size={20} />
            </div>
            <span className="text-2xl font-bold text-gray-900">{userStats.currentStreak}</span>
          </div>
          <p className="text-gray-600 text-sm">Current Streak</p>
          <p className="text-xs text-gray-500 mt-1">
            Longest: {userStats.longestStreak} days
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className={`${getTrendColor(moodTrend)}`} size={20} />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {averageMood.toFixed(1)}
            </span>
          </div>
          <p className="text-gray-600 text-sm">Average Mood</p>
          <p className={`text-xs ${getTrendColor(moodTrend)} mt-1`}>
            {getTrendIcon(moodTrend)} {moodTrend}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Star className="text-blue-600" size={20} />
            </div>
            <span className="text-2xl font-bold text-gray-900">{userStats.totalCheckIns}</span>
          </div>
          <p className="text-gray-600 text-sm">Total Check-ins</p>
          <p className="text-xs text-gray-500 mt-1">Keep it up!</p>
        </div>
      </div>
    </div>
  );
};