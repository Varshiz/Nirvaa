import React, { useEffect, useRef, useState } from 'react';

const sounds = [
  { label: "Rain", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { label: "Forest", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { label: "Ocean", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];

export const BreathingRoom = () => {
  const [step, setStep] = useState("Inhale");
  const [sound, setSound] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const cycle = ["Inhale", "Hold", "Exhale", "Hold"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % cycle.length;
      setStep(cycle[index]);
    }, 4000); // Change step every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (sound) {
        audioRef.current.src = sound;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [sound]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
      <h2 className="text-3xl font-bold mb-6">🌬️ Breathing Room</h2>
      <div className="relative w-48 h-48 mb-6">
        <div
          className={`absolute top-0 left-0 w-full h-full rounded-full bg-blue-300 opacity-80 animate-pulse scale-105 transition-all duration-1000 ease-in-out ${
            step === "Inhale" ? "scale-110" :
            step === "Exhale" ? "scale-90" : "scale-100"
          }`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-white">
          {step}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700">Let this guide your breath. Inhale… Hold… Exhale…</p>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">Play Relaxing Sound:</label>
        <select
          value={sound}
          onChange={(e) => setSound(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">-- None --</option>
          {sounds.map((s, idx) => (
            <option key={idx} value={s.src}>{s.label}</option>
          ))}
        </select>
      </div>

      <audio ref={audioRef} loop />
    </div>
  );
};
