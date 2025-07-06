import React, { useState, useEffect } from 'react';
import { X, Play, Pause } from 'lucide-react';
import { Activity } from '../types';

interface BreathingExerciseProps {
  activity: Activity;
  onClose: () => void;
  onComplete: () => void;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ activity, onClose, onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [seconds, setSeconds] = useState(0);
  const [cycle, setCycle] = useState(0);

  const isBoxBreathing = activity.id === 'breathing-box';
  const phases = isBoxBreathing 
    ? { inhale: 4, hold: 4, exhale: 4, pause: 4 }
    : { inhale: 4, hold: 7, exhale: 8, pause: 0 };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const currentPhaseTime = phases[phase];
          
          if (prev >= currentPhaseTime - 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
            } else if (phase === 'hold') {
              setPhase('exhale');
            } else if (phase === 'exhale') {
              if (isBoxBreathing) {
                setPhase('pause');
              } else {
                setPhase('inhale');
                setCycle(c => c + 1);
              }
            } else if (phase === 'pause') {
              setPhase('inhale');
              setCycle(c => c + 1);
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, phases, isBoxBreathing]);

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Pause';
    }
  };

  const getCircleSize = () => {
    const progress = seconds / phases[phase];
    const baseSize = 120;
    const maxSize = 180;
    
    if (phase === 'inhale') {
      return baseSize + (maxSize - baseSize) * progress;
    } else if (phase === 'exhale') {
      return maxSize - (maxSize - baseSize) * progress;
    }
    return phase === 'hold' ? maxSize : baseSize;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 text-center">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{activity.title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-8">
          <div 
            className="mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000 ease-in-out"
            style={{ 
              width: `${getCircleSize()}px`, 
              height: `${getCircleSize()}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className="text-white font-bold text-lg">
              {phases[phase] - seconds}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-3xl font-bold text-gray-900 mb-2">{getPhaseInstruction()}</p>
          <p className="text-gray-600">Cycle {cycle + 1}</p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isActive ? <Pause size={20} /> : <Play size={20} />}
            <span>{isActive ? 'Pause' : 'Start'}</span>
          </button>
        </div>

        {cycle >= 3 && (
          <div className="bg-green-50 rounded-xl p-4 mb-4">
            <p className="text-green-800 font-semibold">Great job! You've completed the exercise.</p>
            <button
              onClick={handleComplete}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Mark as Complete
            </button>
          </div>
        )}

        <p className="text-gray-500 text-sm">{activity.description}</p>
      </div>
    </div>
  );
};