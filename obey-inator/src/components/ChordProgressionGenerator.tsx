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

  const handleGenerate = () => {
    const generatedChords = generateChordProgression(params);
    setProgression({
      chords: generatedChords,
      params: { ...params }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Chord Progression Generator</h1>
        <p className="text-gray-400">Generate random chord progressions with custom parameters</p>
      </div>

      <ChordProgressionControls
        params={params}
        onParamsChange={setParams}
        onGenerate={handleGenerate}
      />

      <ChordProgressionDisplay progression={progression} />
    </div>
  );
}