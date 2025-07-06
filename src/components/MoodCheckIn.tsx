import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { MoodEntry } from '../types';

interface MoodCheckInProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: MoodEntry) => void;
  existingEntry?: MoodEntry | null;
}

const moodOptions = [
  { value: 1, label: 'Terrible', emoji: '😢', color: 'bg-red-500' },
  { value: 2, label: 'Bad', emoji: '😔', color: 'bg-orange-500' },
  { value: 3, label: 'Okay', emoji: '😐', color: 'bg-yellow-500' },
  { value: 4, label: 'Good', emoji: '😊', color: 'bg-green-500' },
  { value: 5, label: 'Amazing', emoji: '🤩', color: 'bg-blue-500' }
];

export const MoodCheckIn: React.FC<MoodCheckInProps> = ({ isOpen, onClose, onSubmit, existingEntry }) => {
  const [selectedMood, setSelectedMood] = useState<number>(existingEntry?.mood || 0);
  const [note, setNote] = useState(existingEntry?.note || '');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedMood === 0) return;

    const moodOption = moodOptions.find(option => option.value === selectedMood)!;
    const entry: MoodEntry = {
      id: existingEntry?.id || Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      moodLabel: moodOption.label,
      emoji: moodOption.emoji,
      note,
      activities: existingEntry?.activities || []
    };

    onSubmit(entry);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">How are you feeling?</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMood(option.value)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedMood === option.value
                  ? 'border-blue-500 bg-blue-50 scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{option.emoji}</span>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">{option.label}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
            Add a note (optional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows={3}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={selectedMood === 0}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
            selectedMood === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle size={20} />
            <span>{existingEntry ? 'Update Check-in' : 'Save Check-in'}</span>
          </div>
        </button>
      </div>
    </div>
  );
};