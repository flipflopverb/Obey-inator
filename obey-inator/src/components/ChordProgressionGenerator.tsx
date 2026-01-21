import React, { useState } from 'react';
import { ChordProgressionControls } from './ChordProgressionControls';
import { ChordProgressionDisplay } from './ChordProgressionDisplay';
import { generateChordProgression } from '../utils/chordTheory';
import { ProgressionParams, ChordProgression } from '../types/chords';

export function ChordProgressionGenerator() {
  const [params, setParams] = useState<ProgressionParams>({
    scaleType: 'Major',
    key: 'C',
    length: 4,
    allowBorrowedSuspended: false,
    firstChord: 'I'
  });

  const [progression, setProgression] = useState<ChordProgression | null>(null);

  const generateSongName = () => {
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'];
    const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
    
    const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    
    return (
      getRandomElement(consonants) +
      getRandomElement(vowels) +
      getRandomElement(consonants) +
      getRandomElement(vowels) +
      getRandomElement(consonants) +
      getRandomElement(vowels) +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10)
    );
  };

  const handleGenerate = () => {
    const generatedChords = generateChordProgression(params);
    const songName = generateSongName();
    setProgression({
      chords: generatedChords,
      params: { ...params },
      songName
    });
  };

  return (
    <div className="container">
      <div className="grid-2" style={{marginTop: '4rem'}}>
        <ChordProgressionControls
          params={params}
          onParamsChange={setParams}
          onGenerate={handleGenerate}
        />

        <ChordProgressionDisplay progression={progression} onGenerate={handleGenerate} />
      </div>
    </div>
  );
}