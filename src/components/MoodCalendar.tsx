import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface MoodEntry {
  date: string;
  mood: string;
}

interface MoodCalendarProps {
  moodEntries: MoodEntry[];
}

const moodColors: { [key: string]: string } = {
  happy: 'bg-yellow-300',
  sad: 'bg-blue-300',
  angry: 'bg-red-300',
  calm: 'bg-green-300',
  anxious: 'bg-purple-300',
  neutral: 'bg-gray-300',
};

export const MoodCalendar: React.FC<MoodCalendarProps> = ({ moodEntries }) => {
  const moodMap = moodEntries.reduce((map, entry) => {
    const dateKey = new Date(entry.date).toDateString();
    map[dateKey] = entry.mood;
    return map;
  }, {} as { [date: string]: string });

  const tileClassName = ({ date }: { date: Date }) => {
    const mood = moodMap[date.toDateString()];
    return mood ? `rounded-full ${moodColors[mood] || ''}` : '';
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">📅 Mood Calendar</h2>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};
