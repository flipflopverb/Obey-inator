import React, { useState } from 'react';
import { ChordProgressionControls } from './ChordProgressionControls';
import { ChordProgressionDisplay } from './ChordProgressionDisplay';
import { SongSettingsControls } from './SongSettingsControls';
import { SongInfoDisplay } from './SongInfoDisplay';
import { ToolSelection } from './ToolSelection';
import { generateChordProgression } from '../utils/chordTheory';
import { ProgressionParams, ChordProgression, SongInfo } from '../types/chords';

export function ChordProgressionGenerator() {
  const [params, setParams] = useState<ProgressionParams>({
    scaleType: 'Major',
    key: 'C',
    length: 4,
    allowBorrowedSuspended: false,
    firstChord: 'I',
    upperTempoLimit: 120,
    lowerTempoLimit: 80,
    songLength: 4,
    timeSignature: '4/4'
  });

  const [progression, setProgression] = useState<ChordProgression | null>(null);
  const [generatedSongInfo, setGeneratedSongInfo] = useState<SongInfo | null>(null);
  const [showSongTools, setShowSongTools] = useState<boolean>(true);
  const [showChordTools, setShowChordTools] = useState<boolean>(true);

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

  const handleGenerateSongInfo = () => {
    const tempo = Math.floor(Math.random() * (params.upperTempoLimit - params.lowerTempoLimit + 1)) + params.lowerTempoLimit;
    const fourBarSections = Math.ceil((params.songLength * tempo) / 16);
    
    // Generate song name
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'];
    const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
    
    const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    
    const songName = (
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

    setGeneratedSongInfo({
      songName,
      songLength: params.songLength,
      timeSignature: params.timeSignature,
      tempo,
      fourBarSections,
      timestamp: Date.now()
    });
  };

  return (
    <div className="container">
      <ToolSelection
        showSongTools={showSongTools}
        showChordTools={showChordTools}
        onSongToolsChange={setShowSongTools}
        onChordToolsChange={setShowChordTools}
      />
      
      <div className="grid-2x2" style={{marginTop: '4rem'}}>
        {showSongTools && (
          <>
            <SongSettingsControls
              params={params}
              onParamsChange={setParams}
            />

            <SongInfoDisplay 
              params={params} 
              generatedSongInfo={generatedSongInfo} 
              onGenerateSongInfo={handleGenerateSongInfo}
            />
          </>
        )}

        {showChordTools && (
          <>
            <ChordProgressionControls
              params={params}
              onParamsChange={setParams}
              onGenerate={handleGenerate}
            />

            <ChordProgressionDisplay progression={progression} onGenerate={handleGenerate} />
          </>
        )}
      </div>
    </div>
  );
}