// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Activities } from './components/Activities';
import { MoodHistory } from './components/MoodHistory';
import { PeerSupport } from './components/PeerSupport';
import { MoodCheckIn } from './components/MoodCheckIn';
import { Navigation } from './components/Navigation';
import { useMoodData } from './hooks/useMoodData';
import { Journal } from './components/Journal';
import { Motivation } from './components/Motivation';
import { Gamify } from './components/Gamify';
import { BreathingRoom } from './components/BreathingRoom';
import { ThemeToggle } from './components/ThemeToggle';
import { MoodCalendar } from './components/MoodCalendar';


function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMoodCheckInOpen, setIsMoodCheckInOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    moodEntries,
    todaysMood,
    userStats,
    addMoodEntry,
    getAverageMood,
    getMoodTrend
  } = useMoodData();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            todaysMood={todaysMood}
            userStats={userStats}
            averageMood={getAverageMood()}
            moodTrend={getMoodTrend()}
            onOpenMoodCheckIn={() => setIsMoodCheckInOpen(true)}
          />
        );
      case 'activities':
        return <Activities currentMood={todaysMood?.mood} />;
      case 'history':
        return <MoodHistory moodEntries={moodEntries} />;
      case 'support':
        return <PeerSupport />;
        case 'journal':
        return <Journal />;
        case 'motivation':
        return <Motivation />;
        case 'gamify':
        return <Gamify />;
        case 'breathing':
        return <BreathingRoom />;
        case 'calendar':
        return <MoodCalendar moodEntries={moodEntries} />;


      default:
        return null;
    }
  };

 return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
    {/* Theme Toggle */}
    <ThemeToggle />

    {/* Header */}
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="md:hidden w-10" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nirvaa</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Your mental health companion</p>
            </div>
          </div>
          <button
            onClick={() => setIsMoodCheckInOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Check In
          </button>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="max-w-4xl mx-auto px-4 py-6 pb-32">
      {renderContent()}
    </main>

    {/* Navigation */}
    <Navigation
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isMobileMenuOpen={isMobileMenuOpen}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
    />

    {/* Mood Check-in Modal */}
    <MoodCheckIn
      isOpen={isMoodCheckInOpen}
      onClose={() => setIsMoodCheckInOpen(false)}
      onSubmit={addMoodEntry}
      existingEntry={todaysMood}
    />
  </div>
);

}

export default App;