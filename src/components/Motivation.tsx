import React from 'react';

const videos = [
  {
    title: "5-Minute Meditation for Anxiety",
    url: "https://www.youtube.com/embed/inpok4MKVLM"
  },
  {
    title: "Morning Motivation for a Peaceful Day",
    url: "https://www.youtube.com/embed/qj2rjdtKbWo"
  },
  {
    title: "Guided Sleep Meditation",
    url: "https://www.youtube.com/embed/Zlj5d3KxU8E"
  },
  {
    title: "Relaxing Nature & Focus Music",
    url: "https://www.youtube.com/embed/lFcSrYw-ARY"
  }
];

export const Motivation = () => {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">🌟 Motivation & Mindfulness</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="rounded shadow-md overflow-hidden bg-white dark:bg-gray-800">
            <iframe
              className="w-full h-64"
              src={video.url}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-3 text-center font-medium">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
