import React, { useState } from 'react';

const emotions = ['😊', '😢', '😠', '😨', '😌', '🥱'];

export const Journal = () => {
  const [entry, setEntry] = useState('');
  const [emotion, setEmotion] = useState('');
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [];
  });

  const saveEntry = () => {
    const newEntry = { text: entry, emotion, date: new Date().toISOString() };
    const updated = [...entries, newEntry];
    setEntries(updated);
    localStorage.setItem('journalEntries', JSON.stringify(updated));
    setEntry('');
    setEmotion('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">📝 Daily Journal</h2>
      <textarea
        className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring"
        rows={4}
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write about your day..."
      />
      <div className="mb-3 flex gap-2 items-center">
        {emotions.map((emo) => (
          <button
            key={emo}
            onClick={() => setEmotion(emo)}
            className={`text-2xl p-1 border rounded hover:scale-110 transition ${emotion === emo ? 'bg-blue-200' : ''}`}
          >
            {emo}
          </button>
        ))}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={saveEntry}
        disabled={!entry || !emotion}
      >
        Save Entry
      </button>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">📖 Previous Entries</h3>
        <ul className="space-y-3 max-h-64 overflow-y-auto">
          {entries.map((e, idx) => (
            <li key={idx} className="p-3 border rounded shadow-sm bg-white">
              <div className="text-sm text-gray-500">{new Date(e.date).toLocaleString()}</div>
              <div className="text-lg">{e.text}</div>
              <div className="text-xl mt-1">{e.emotion}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
