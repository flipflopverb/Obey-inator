import React from 'react';
import { ProgressionParams } from '../types/chords';
import { getFirstChordOptions } from '../utils/chordTheory';

interface ChordProgressionControlsProps {
  params: ProgressionParams;
  onParamsChange: (params: ProgressionParams) => void;
  onGenerate: () => void;
}

export function ChordProgressionControls({ params, onParamsChange, onGenerate }: ChordProgressionControlsProps) {
  const scaleTypes = ['Any', 'Major', 'Natural minor', 'Harmonic minor', 'Melodic minor'];
  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  const firstChordOptions = getFirstChordOptions(params.scaleType);

  const updateParam = <K extends keyof ProgressionParams>(key: K, value: ProgressionParams[K]) => {
    const newParams = { ...params, [key]: value };
    
    // Reset first chord if it's no longer valid for the new scale type
    if (key === 'scaleType' && !getFirstChordOptions(value as string).includes(newParams.firstChord)) {
      newParams.firstChord = getFirstChordOptions(value as string)[0] || '';
    }
    
    onParamsChange(newParams);
  };

  return (
    <div className="space-y-6">
      <div className="cyberpunk-card">
        <h2 className="cyberpunk-title" style={{textAlign: 'left'}}>Chord Settings</h2>

        
        <div className="settings-grid">
          {/* Scale Type */}
          <div className="flex items-center">
            <label className="cyberpunk-label inline">Scale Type</label>
            <select
              value={params.scaleType}
              onChange={(e) => updateParam('scaleType', e.target.value)}
              className="cyberpunk-select flex-1"
            >
              {scaleTypes.map(type => (
                <option key={`scale-${type}`} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Key */}
          <div className="flex items-center">
            <label className="cyberpunk-label inline">Key</label>
            <select
              value={params.key}
              onChange={(e) => updateParam('key', e.target.value)}
              className="cyberpunk-select flex-1"
            >
              {keys.map(key => (
                <option key={`key-${key}`} value={key}>{key}</option>
              ))}
            </select>
          </div>

          {/* First Chord */}
          <div className="flex items-center">
            <label className="cyberpunk-label inline">First Chord</label>
            <select
              value={params.firstChord}
              onChange={(e) => updateParam('firstChord', e.target.value)}
              className="cyberpunk-select flex-1"
            >
              <option value="Any">Any</option>
              {firstChordOptions.map(chord => (
                <option key={`chord-${chord}`} value={chord}>{chord}</option>
              ))}
            </select>
          </div>

          {/* Length */}
          <div>
            <label className="cyberpunk-label">Progression Length: {params.length}</label>
            <input
              type="range"
              min="2"
              max="16"
              value={params.length}
              onChange={(e) => updateParam('length', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Borrowed/Suspended Chords Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="borrowedSuspended"
              checked={params.allowBorrowedSuspended}
              onChange={(e) => updateParam('allowBorrowedSuspended', e.target.checked)}
              aria-label="Allow borrowed and suspended chords"
            />
            <label htmlFor="borrowedSuspended" className="text-sm cursor-pointer" style={{color: 'var(--text-secondary)'}}>
              Allow borrowed and suspended chords (5% probability)
            </label>
          </div>
        </div>
    </div>
  </div>
  );
}