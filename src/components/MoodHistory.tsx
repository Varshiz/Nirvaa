import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import { MoodEntry } from '../types';

interface MoodHistoryProps {
  moodEntries: MoodEntry[];
}

export const MoodHistory: React.FC<MoodHistoryProps> = ({ moodEntries }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getMoodColor = (mood: number) => {
    switch (mood) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      case 5: return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const recentEntries = moodEntries.slice(0, 30);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Mood History</h2>
        <p className="text-purple-100">Track your emotional journey over time</p>
      </div>

      {recentEntries.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-600 mb-4">No mood entries yet</p>
          <p className="text-sm text-gray-500">Start tracking your mood to see your progress!</p>
        </div>
      ) : (
        <>
          {/* Mood Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Mood Trend</h3>
              <TrendingUp className="text-blue-500" size={24} />
            </div>
            
            <div className="h-40 flex items-end space-x-2 mb-4">
              {recentEntries.slice(0, 14).reverse().map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex-1 flex flex-col items-center"
                >
                  <div
                    className={`w-full rounded-t-lg ${getMoodColor(entry.mood)} transition-all duration-200 hover:opacity-80`}
                    style={{ height: `${(entry.mood / 5) * 100}%` }}
                    title={`${entry.moodLabel} on ${formatDate(entry.date)}`}
                  />
                  <div className="text-xs text-gray-500 mt-1 rotate-45 origin-bottom-left">
                    {formatDate(entry.date).split(' ')[1]}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>2 weeks ago</span>
              <span>Today</span>
            </div>
          </div>

          {/* Recent Entries */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Entries</h3>
              <Calendar className="text-blue-500" size={24} />
            </div>
            
            <div className="space-y-4">
              {recentEntries.slice(0, 7).map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="text-2xl">{entry.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900">{entry.moodLabel}</p>
                      <span className="text-sm text-gray-500">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-gray-600 mt-1">{entry.note}</p>
                    )}
                  </div>
                  <div className={`w-4 h-4 rounded-full ${getMoodColor(entry.mood)}`} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};