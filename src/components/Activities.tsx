import React, { useState } from 'react';
import { Play, Clock, CheckCircle } from 'lucide-react';
import type { Activity } from '../types';

import { activities, getRecommendedActivities } from '../utils/activities';
import { BreathingExercise } from './BreathingExercise';
import { JournalingPrompt } from './JournalingPrompt';

// interface ActivitiesProps {
//   currentMood?: number;
// }
interface ActivitiesProps {
  currentMood: string;
  recommendedActivities: Activity[];
}

export const Activities: React.FC<ActivitiesProps> = ({ currentMood }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const recommendedActivities = currentMood ? getRecommendedActivities(currentMood) : activities;

  const handleActivityComplete = (activityId: string) => {
    setCompletedActivities(prev => [...prev, activityId]);
    setSelectedActivity(null);
  };

  const renderActivityModal = () => {
    if (!selectedActivity) return null;

    switch (selectedActivity.type) {
      case 'breathing':
        return (
          <BreathingExercise
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
            onComplete={() => handleActivityComplete(selectedActivity.id)}
          />
        );
      case 'journaling':
        return (
          <JournalingPrompt
            activity={selectedActivity}
            onClose={() => setSelectedActivity(null)}
            onComplete={() => handleActivityComplete(selectedActivity.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Self-Care Activities</h2>
        <p className="text-green-100">
          {currentMood ? 'Here are some activities tailored to your mood' : 'Choose an activity to boost your wellbeing'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedActivities.map((activity) => {
          const isCompleted = completedActivities.includes(activity.id);
          
          return (
            <div
              key={activity.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md ${
                isCompleted ? 'bg-green-50 border-green-200' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${activity.color} bg-opacity-10`}>
                  <div className={`w-6 h-6 ${activity.color.replace('bg-', 'text-')}`}>
                    {activity.icon === 'Wind' && <div className="text-2xl">💨</div>}
                    {activity.icon === 'Zap' && <div className="text-2xl">⚡</div>}
                    {activity.icon === 'Heart' && <div className="text-2xl">💖</div>}
                    {activity.icon === 'BookOpen' && <div className="text-2xl">📖</div>}
                    {activity.icon === 'Brain' && <div className="text-2xl">🧠</div>}
                    {activity.icon === 'Smile' && <div className="text-2xl">😊</div>}
                  </div>
                </div>
                {isCompleted && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{activity.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock size={16} />
                  <span className="text-sm">{activity.duration} min</span>
                </div>
                <button
                  onClick={() => setSelectedActivity(activity)}
                  disabled={isCompleted}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isCompleted
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                  }`}
                >
                  <Play size={16} />
                  <span>{isCompleted ? 'Completed' : 'Start'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {renderActivityModal()}
    </div>
  );
};