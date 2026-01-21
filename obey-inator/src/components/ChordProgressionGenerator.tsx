import React, { useState, useEffect } from 'react';
import { ChordProgressionControls } from './ChordProgressionControls';
import { ChordProgressionDisplay } from './ChordProgressionDisplay';
import { SongSettingsControls } from './SongSettingsControls';
import { SongInfoDisplay } from './SongInfoDisplay';
import { ToolSelection } from './ToolSelection';
import { generateChordProgression } from '../utils/chordTheory';
import { ProgressionParams, ChordProgression, SongInfo } from '../types/chords';

interface ChordProgressionGeneratorProps {
  showDevCheckbox?: boolean;
  onDevCheckboxShow?: (show: boolean) => void;
  onParamsChange?: (params: ProgressionParams) => void;
  externalParams?: ProgressionParams;
}

export function ChordProgressionGenerator({ 
  showDevCheckbox: externalShowDevCheckbox = false,
  onDevCheckboxShow,
  onParamsChange,
  externalParams
}: ChordProgressionGeneratorProps) {
  const [params, setParams] = useState<ProgressionParams>({
    scaleType: 'Major',
    key: 'C',
    length: 4,
    allowBorrowedSuspended: false,
    firstChord: 'I',
    upperTempoLimit: 120,
    lowerTempoLimit: 80,
    songLength: 4,
    timeSignature: '4/4',
    fuckMyDytech: false
  });

  const [progression, setProgression] = useState<ChordProgression | null>(null);

  const handleParamsChange = (newParams: ProgressionParams) => {
    setParams(newParams);
    onParamsChange?.(newParams);
  };
  const [generatedSongInfo, setGeneratedSongInfo] = useState<SongInfo | null>(null);
  const [showSongTools, setShowSongTools] = useState<boolean>(true);
  const [showChordTools, setShowChordTools] = useState<boolean>(true);
  const [internalShowFuckMyDytech, setInternalShowFuckMyDytech] = useState<boolean>(false);
  const [fuckMyDytechEnabled, setFuckMyDytechEnabled] = useState<boolean>(false);
  
  // Use external state if provided, otherwise use internal state
  const showFuckMyDytech = externalShowDevCheckbox || internalShowFuckMyDytech;
  const fuckMyDytechEnabled2 = params.fuckMyDytech;
  
  // Sync internal state when external showDevCheckbox changes
  useEffect(() => {
    if (externalShowDevCheckbox && !internalShowFuckMyDytech) {
      setInternalShowFuckMyDytech(true);
    }
  }, [externalShowDevCheckbox, internalShowFuckMyDytech]);
  
  // Sync fuckMyDytechEnabled with params.fuckMyDytech
  useEffect(() => {
    setFuckMyDytechEnabled(params.fuckMyDytech);
  }, [params.fuckMyDytech]);
  
  // Sync with external params (from App.tsx) - only sync fuckMyDytech to avoid overriding other changes
  useEffect(() => {
    if (externalParams && externalParams.fuckMyDytech !== params.fuckMyDytech) {
      setParams(prev => ({ ...prev, fuckMyDytech: externalParams.fuckMyDytech }));
    }
  }, [externalParams, params.fuckMyDytech]);
  

  
  const handleFuckMyDytechChange = (enabled: boolean) => {
    console.log('handleFuckMyDytechChange called with:', enabled);
    setParams(prev => ({ ...prev, fuckMyDytech: enabled }));
    setFuckMyDytechEnabled(enabled);
    onParamsChange?.({ ...params, fuckMyDytech: enabled });
  };

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
    const fourBarSections = params.timeSignature === '4/4' 
      ? Math.ceil((params.songLength * tempo) / 16)
      : "N/A";
    
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
        showFuckMyDytech={showFuckMyDytech}
        fuckMyDytechEnabled={fuckMyDytechEnabled2}
        onFuckMyDytechChange={handleFuckMyDytechChange}
        onFuckMyDytechShow={setInternalShowFuckMyDytech}
      />
      {/* Debug: {console.log('Rendering - params.fuckMyDytech:', params.fuckMyDytech, 'fuckMyDytechEnabled2:', fuckMyDytechEnabled2)} */}
      
      <div className="grid-2x2" style={{marginTop: '4rem'}}>
        {showSongTools && (
          <>
            <SongSettingsControls
              params={params}
              onParamsChange={handleParamsChange}
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
              onParamsChange={handleParamsChange}
              onGenerate={handleGenerate}
            />

            <ChordProgressionDisplay progression={progression} onGenerate={handleGenerate} />
          </>
        )}
      </div>
    </div>
  );
}