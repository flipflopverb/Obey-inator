import React from 'react';
import { ProgressionParams, ChordProgression } from '../types/chords';
import { generateMidiFile, downloadMidiFile } from '../utils/midiGenerator';

interface ChordProgressionDisplayProps {
  progression: ChordProgression | null;
}

export function ChordProgressionDisplay({ progression }: ChordProgressionDisplayProps) {
  if (!progression) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Generated Progression</h2>
        <p className="text-gray-400 text-center py-8">
          No progression generated yet. Set your parameters and click "Generate".
        </p>
      </div>
    );
  }

  const progressionText = progression.chords.join(' - ');
  const filename = `chord-progression-${progression.params.key}-${progression.params.scaleType.toLowerCase()}`;
  
  const handleCopyToClipboard = async () => {
    const text = `Key: ${progression.params.key} ${progression.params.scaleType}
Scale: ${progression.params.scaleType}
Progression: ${progressionText}

Generated with Obey-inator`;
    
    try {
      await navigator.clipboard.writeText(text);
      alert('Progression copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };

  const handleDownloadText = () => {
    const text = `Key: ${progression.params.key} ${progression.params.scaleType}
Scale: ${progression.params.scaleType}
Progression: ${progressionText}

Generated with Obey-inator`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMidi = () => {
    try {
      const midiDataUri = generateMidiFile(progression.chords, progression.params.key);
      downloadMidiFile(midiDataUri, `${filename}.mid`);
    } catch (err) {
      console.error('Failed to generate MIDI:', err);
      alert('Failed to generate MIDI file');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Generated Progression</h2>
      
      {/* Progression Info */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Key:</span>
          <span className="text-white font-medium">{progression.params.key} {progression.params.scaleType}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Length:</span>
          <span className="text-white font-medium">{progression.chords.length} chords</span>
        </div>
      </div>

      {/* Progression Display */}
      <div className="bg-gray-900 rounded-md p-4 mb-6">
        <p className="text-xl font-mono text-center text-white">
          {progressionText}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={handleCopyToClipboard}
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Copy to Clipboard
        </button>
        
        <button
          onClick={handleDownloadText}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Download .txt
        </button>
        
        <button
          onClick={handleDownloadMidi}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Download .mid
        </button>
      </div>
    </div>
  );
}