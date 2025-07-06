import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Activity } from '../types';

interface JournalingPromptProps {
  activity: Activity;
  onClose: () => void;
  onComplete: () => void;
}

const prompts = {
  'journal-gratitude': [
    'What are three things you\'re grateful for today?',
    'Who is someone that made you smile recently?',
    'What is a small moment from today that brought you joy?'
  ],
  'journal-reflection': [
    'How did you grow as a person today?',
    'What challenge did you overcome today?',
    'What would you like to focus on tomorrow?'
  ]
};

export const JournalingPrompt: React.FC<JournalingPromptProps> = ({ activity, onClose, onComplete }) => {
  const [responses, setResponses] = useState<string[]>(['', '', '']);
  const [currentPrompt, setCurrentPrompt] = useState(0);

  const currentPrompts = prompts[activity.id as keyof typeof prompts] || prompts['journal-gratitude'];

  const handleResponse = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleComplete = () => {
    // Save responses to localStorage
    const journalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      activity: activity.id,
      responses: responses.filter(r => r.trim() !== '')
    };

    const existingEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');
    existingEntries.push(journalEntry);
    localStorage.setItem('journal-entries', JSON.stringify(existingEntries));

    onComplete();
    onClose();
  };

  const isCompleted = responses.some(r => r.trim() !== '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{activity.title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">{activity.description}</p>
        </div>

        <div className="space-y-6">
          {currentPrompts.map((prompt, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {prompt}
              </label>
              <textarea
                value={responses[index]}
                onChange={(e) => handleResponse(index, e.target.value)}
                placeholder="Write your thoughts here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                rows={3}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleComplete}
            disabled={!isCompleted}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isCompleted
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save size={20} />
            <span>Save & Complete</span>
          </button>
        </div>
      </div>
    </div>
  );
};