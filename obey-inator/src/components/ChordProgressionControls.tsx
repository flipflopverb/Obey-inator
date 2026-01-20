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
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Chord Progression Generator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scale Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Scale Type
          </label>
          <select
            value={params.scaleType}
            onChange={(e) => updateParam('scaleType', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {scaleTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Key */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Key
          </label>
          <select
            value={params.key}
            onChange={(e) => updateParam('key', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {keys.map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        {/* First Chord */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First Chord
          </label>
          <select
            value={params.firstChord}
            onChange={(e) => updateParam('firstChord', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {firstChordOptions.map(chord => (
              <option key={chord} value={chord}>{chord}</option>
            ))}
          </select>
        </div>

        {/* Length */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Progression Length: {params.length}
          </label>
          <input
            type="range"
            min="2"
            max="16"
            value={params.length}
            onChange={(e) => updateParam('length', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>2</span>
            <span>16</span>
          </div>
        </div>
      </div>

      {/* Borrowed/Suspended Chords Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="borrowedSuspended"
          checked={params.allowBorrowedSuspended}
          onChange={(e) => updateParam('allowBorrowedSuspended', e.target.checked)}
          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="borrowedSuspended" className="text-sm font-medium text-gray-300">
          Allow borrowed and suspended chords (5% probability)
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200"
      >
        Generate Chord Progression
      </button>
    </div>
  );
}