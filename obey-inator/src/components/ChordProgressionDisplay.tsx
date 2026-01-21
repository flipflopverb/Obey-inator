import React from 'react';
import { ProgressionParams, ChordProgression } from '../types/chords';
import { generateMidiFile, downloadMidiFile } from '../utils/midiGenerator';

interface ChordProgressionDisplayProps {
  progression: ChordProgression | null;
  onGenerate?: () => void;
}

export function ChordProgressionDisplay({ progression, onGenerate }: ChordProgressionDisplayProps) {
  const handleCopyToClipboard = async () => {
    const text = progression ? `Song: ${progression.songName}
Key: ${progression.params.key} ${progression.params.scaleType}
Progression: ${formatProgressionText(progression.chords)}

Generated with Obey-inator` : 'No progression to copy';
    
    try {
      await navigator.clipboard.writeText(text);
      alert('Progression copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };

  const handleDownloadText = () => {
    if (!progression) return;
    
    const text = `Song: ${progression.songName}
Key: ${progression.params.key} ${progression.params.scaleType}
Progression: ${formatProgressionText(progression.chords)}

Generated with Obey-inator`;
    
    const filename = `chord-progression-${progression.params.key}-${progression.params.scaleType.toLowerCase()}`;
    
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
    if (!progression) return;
    
    try {
      const midiDataUri = generateMidiFile(progression.chords, progression.params.key);
      const filename = `${progression.songName}-${progression.params.key}-${progression.params.scaleType.toLowerCase()}`;
      downloadMidiFile(midiDataUri, `${filename}.mid`);
    } catch (err) {
      console.error('Failed to generate MIDI:', err);
      alert('Failed to generate MIDI file');
    }
  };

  if (!progression) {
    return (
      <div className="cyberpunk-card">
        <h2 className="cyberpunk-title mb-4" style={{textAlign: 'left'}}>Generated Progression</h2>
        <div className="cyberpunk-result-display">
          <p className="mb-4" style={{color: 'var(--text-muted)'}}>
            Configure parameters and generate a progression
          </p>
        </div>
        {/* Action Buttons */}
        <div className="button-group">
          {onGenerate && (
            <button
              onClick={onGenerate}
              className="cyberpunk-button w-full"
            >
              Generate Progression
            </button>
          )}
        <button
          onClick={handleCopyToClipboard}
          className="cyberpunk-button mx-auto"
          style={{width: '200px'}}
          disabled
        >
          Copy to Clipboard
        </button>
        
        <button
          onClick={handleDownloadText}
          className="cyberpunk-button mx-auto"
          style={{width: '200px'}}
          disabled
        >
          Download .txt
        </button>
        
        <button
          onClick={handleDownloadMidi}
          className="cyberpunk-button mx-auto"
          style={{width: '200px'}}
          disabled
        >
          Download .mid
        </button>
        </div>
      </div>
    );
  }

  const formatProgressionText = (chords: string[]) => {
    if (chords.length <= 8) {
      return chords.join(' - ');
    }
    
    // For longer progressions, add dash after every chord except the last one
    // but break into lines of 4 chords each
    let formattedText = '';
    for (let i = 0; i < chords.length; i++) {
      formattedText += chords[i];
      if (i < chords.length - 1) {
        formattedText += ' -';
        // Add line break after every 4th chord (including the dash)
        if ((i + 1) % 4 === 0) {
          formattedText += '\n';
        } else {
          formattedText += ' ';
        }
      }
    }
    return formattedText;
  };

  const progressionText = formatProgressionText(progression.chords);
  
  return (
    <div className="cyberpunk-card">
      <h2 className="cyberpunk-title header-glow mb-4" style={{textAlign: 'left'}}>Generated Progression</h2>
      
      {/* Progression Display */}
      <div className="cyberpunk-result-display mb-6">
        <div className="space-y-2 mb-4">
          <div className="cyberpunk-info">
            <span className="cyberpunk-info-label">Song:</span>
            <span className="cyberpunk-info-value" style={{textTransform: 'capitalize'}}>{progression.songName}</span>
          </div>
          <div className="cyberpunk-info">
            <span className="cyberpunk-info-label">Key:</span>
            <span className="cyberpunk-info-value">{progression.params.key} {progression.params.scaleType}</span>
          </div>
          <div className="cyberpunk-info">
            <span className="cyberpunk-info-label">Progression:</span>
          </div>
          <div className="text-white text-left whitespace-pre-line" style={{fontSize: '18px', letterSpacing: '1px', paddingLeft: '80px'}}>
            {progressionText}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="button-group">
        {onGenerate && (
          <button
            onClick={onGenerate}
            className="cyberpunk-button w-full"
          >
            Generate Progression
          </button>
        )}
        <button
          onClick={handleCopyToClipboard}
          className="cyberpunk-button mx-auto"
          style={{width: '200px'}}
        >
          Copy to Clipboard
        </button>
        
        <button
          onClick={handleDownloadText}
          className="cyberpunk-button mx-auto"
          style={{width: '200px'}}
        >
          Download .txt
        </button>
        
        <button
          onClick={handleDownloadMidi}
          className="cyberpunk-button mx-auto"
          style={{width: '200px'}}
        >
          Download .mid
        </button>
      </div>
    </div>
  );
}