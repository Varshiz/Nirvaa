import React, { useState, useEffect } from 'react';
import { Send, Heart, MessageCircle, Shield } from 'lucide-react';
import { PeerMessage } from '../types';
import { getPeerMessages, addPeerMessage } from '../utils/storage';

export const PeerSupport: React.FC = () => {
  const [messages, setMessages] = useState<PeerMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMood, setSelectedMood] = useState(3);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    const storedMessages = getPeerMessages();
    setMessages(storedMessages);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: PeerMessage = {
      id: Date.now().toString(),
      message: newMessage,
      timestamp: new Date().toISOString(),
      mood: selectedMood,
      isAnonymous: true
    };

    addPeerMessage(message);
    setMessages(prev => [message, ...prev]);
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getMoodEmoji = (mood: number) => {
    switch (mood) {
      case 1: return '😢';
      case 2: return '😔';
      case 3: return '😐';
      case 4: return '😊';
      case 5: return '🤩';
      default: return '😐';
    }
  };

  const getMoodColor = (mood: number) => {
    switch (mood) {
      case 1: return 'bg-red-100 border-red-200';
      case 2: return 'bg-orange-100 border-orange-200';
      case 3: return 'bg-yellow-100 border-yellow-200';
      case 4: return 'bg-green-100 border-green-200';
      case 5: return 'bg-blue-100 border-blue-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Peer Support</h2>
        <p className="text-pink-100">Share encouragement and connect with others</p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="text-blue-600" size={20} />
          <p className="font-semibold text-blue-900">Anonymous & Safe</p>
        </div>
        <p className="text-blue-800 text-sm">
          All messages are anonymous. Be kind, supportive, and respectful to create a positive space for everyone.
        </p>
      </div>

      {/* Post Message */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Share Your Thoughts</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling right now?
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  selectedMood === mood
                    ? 'bg-blue-500 text-white scale-110'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {getMoodEmoji(mood)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Share something positive, ask for support, or encourage others..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows={3}
          />
          <button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ''}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              newMessage.trim() === ''
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Community Messages</h3>
          <MessageCircle className="text-blue-500" size={24} />
        </div>

        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">💬</div>
              <p className="text-gray-600 mb-2">No messages yet</p>
              <p className="text-sm text-gray-500">Be the first to share something positive!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-xl border-2 ${getMoodColor(message.mood)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getMoodEmoji(message.mood)}</div>
                  <div className="flex-1">
                    <p className="text-gray-900 mb-2">{message.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Anonymous • {formatTime(message.timestamp)}
                      </span>
                      <button className="flex items-center space-x-1 text-pink-500 hover:text-pink-600 transition-colors">
                        <Heart size={14} />
                        <span className="text-xs">Support</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};