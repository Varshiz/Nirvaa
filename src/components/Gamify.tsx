import React, { useEffect, useState } from 'react';

export const Gamify = () => {
  const [points, setPoints] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedPoints = localStorage.getItem('userPoints');
    const savedStreak = localStorage.getItem('userStreak');
    const savedLast = localStorage.getItem('lastCheckIn');

    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedLast) setLastCheckIn(savedLast);

    checkStreak();
  }, []);

  const today = new Date().toLocaleDateString();

  const checkStreak = () => {
    const last = localStorage.getItem('lastCheckIn');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yDate = yesterday.toLocaleDateString();

    if (last === yDate) {
      const newStreak = (parseInt(localStorage.getItem('userStreak') || '0') || 0) + 1;
      setStreak(newStreak);
      localStorage.setItem('userStreak', newStreak.toString());
    } else if (last !== today) {
      setStreak(1);
      localStorage.setItem('userStreak', '1');
    }
  };

  const logActivity = (activity: string) => {
    let earned = 0;
    if (activity === 'mood') earned = 10;
    if (activity === 'journal') earned = 15;
    if (activity === 'support') earned = 5;

    const newPoints = points + earned;
    setPoints(newPoints);
    localStorage.setItem('userPoints', newPoints.toString());
    localStorage.setItem('lastCheckIn', today);
    checkStreak();
  };

  const badges = [];
  if (points >= 100) badges.push('🎖️ 100 Points!');
  if (streak >= 5) badges.push('🔥 5-Day Streak!');

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Your Wellness Rewards</h2>

      <div className="text-center mb-4">
        <p className="text-xl">Points: <span className="font-bold text-blue-600">{points}</span></p>
        <p className="text-xl">Streak: <span className="font-bold text-green-600">{streak} day(s)</span></p>
      </div>

      <div className="bg-gray-100 rounded p-3 mb-4">
        <p className="mb-2 text-sm text-gray-600">Simulate actions:</p>
        <div className="flex gap-2 justify-center">
          <button onClick={() => logActivity('mood')} className="bg-blue-500 text-white px-3 py-1 rounded">+ Mood Check</button>
          <button onClick={() => logActivity('journal')} className="bg-purple-500 text-white px-3 py-1 rounded">+ Journal</button>
          <button onClick={() => logActivity('support')} className="bg-green-500 text-white px-3 py-1 rounded">+ Peer Support</button>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">🎉 Achievements</h3>
          <ul className="space-y-1">
            {badges.map((b, idx) => <li key={idx} className="text-xl">{b}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};
