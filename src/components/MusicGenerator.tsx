import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface EnvironmentalData {
  deforestationRate: number;
  endangeredSpecies: number;
  airQualityIndex: number;
}

interface Props {
  data: EnvironmentalData;
}

const MusicGenerator: React.FC<Props> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    const generateMusic = () => {
      const musicString = `Environmental Symphony: 
        Deforestation Rhythm: ${data.deforestationRate * 10} bpm
        Endangered Species Melody: ${data.endangeredSpecies} notes
        Air Quality Harmony: Scale of ${data.airQualityIndex}`;
      setGeneratedMusic(musicString);
    };

    generateMusic();
  }, [data]);

  const createAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;

    oscillatorRef.current = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillatorRef.current.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Use environmental data to influence the sound
    const baseFrequency = 220; // A3 note
    oscillatorRef.current.frequency.setValueAtTime(
      baseFrequency + data.deforestationRate * 10,
      ctx.currentTime
    );

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    oscillatorRef.current.start();

    // Create a simple melody based on endangered species count
    const melodyInterval = setInterval(() => {
      if (oscillatorRef.current) {
        oscillatorRef.current.frequency.setValueAtTime(
          baseFrequency + Math.random() * data.endangeredSpecies,
          ctx.currentTime
        );
      }
    }, 500);

    return () => clearInterval(melodyInterval);
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      createAudio();
    } else {
      oscillatorRef.current?.stop();
      oscillatorRef.current = null;
    }
    setIsPlaying(!isPlaying);
  };

  const handleRegenerate = () => {
    if (isPlaying) {
      oscillatorRef.current?.stop();
    }
    setIsPlaying(false);
    oscillatorRef.current = null;
    // Here you would regenerate the music based on current data
    console.log('Regenerating music...');
    createAudio();
    setIsPlaying(true);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">AI-Generated Environmental Music</h2>
      <div className="mb-4">
        <pre className="bg-gray-100 p-2 rounded">{generatedMusic}</pre>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePlayPause}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={handleRegenerate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <RotateCcw className="mr-2" />
          Regenerate
        </button>
      </div>
    </div>
  );
};

export default MusicGenerator;