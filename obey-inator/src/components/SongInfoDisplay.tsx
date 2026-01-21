import React from 'react';
import { ProgressionParams, SongInfo } from '../types/chords';

interface SongInfoDisplayProps {
  params: ProgressionParams;
  generatedSongInfo: SongInfo | null;
  onGenerateSongInfo: () => void;
}

export function SongInfoDisplay({ params, generatedSongInfo, onGenerateSongInfo }: SongInfoDisplayProps) {
  const handleCopyToClipboard = async () => {
    const text = songInfo ? `Song: ${songInfo.songName}
Song Length: ${songInfo.songLength} ${songInfo.songLength === 1 ? 'minute' : 'minutes'}
Time Signature: ${songInfo.timeSignature}
Tempo: ${songInfo.tempo} BPM
4-Bar Sections: ${songInfo.fourBarSections}` : 'No song info to copy';
    
    try {
      await navigator.clipboard.writeText(text);
      alert('Song info copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };

  const handleDownloadText = () => {
    if (!songInfo) return;
    
    const text = `Song: ${songInfo.songName}
Song Length: ${songInfo.songLength} ${songInfo.songLength === 1 ? 'minute' : 'minutes'}
Time Signature: ${songInfo.timeSignature}
Tempo: ${songInfo.tempo} BPM
4-Bar Sections: ${songInfo.fourBarSections}

Generated with OBEYINATOR. Reminder: all artistic endeavors that use any MYDYTECH products grant all rights to those artistic outputs to MYDYTECH LLC. 

TERMS WILL BE ENFORCED`;
    
    const filename = `song-info-${songInfo.songName}`;
    
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
  // Function to generate song info
  const generateSongInfo = () => {
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

    return {
      songName,
      songLength: params.songLength,
      timeSignature: params.timeSignature,
      tempo,
      fourBarSections,
      timestamp: Date.now()
    };
  };

  // Use generated song info if available, otherwise generate default
  const songInfo = generatedSongInfo || generateSongInfo();

  return (
    <div className="space-y-6">
      <div className="cyberpunk-card cyberpunk-card-small">
        <h2 className="cyberpunk-title" style={{textAlign: 'left'}}>Song Data</h2>
        
        <div className="cyberpunk-result-display" style={{height: '360px'}}>
          <div className="cyberpunk-info" style={{marginBottom: '24px'}}>
            <span className="cyberpunk-info-label">Song Name:</span>
            <span className="cyberpunk-info-value">{songInfo.songName}</span>
          </div>
          
          <div className="cyberpunk-info" style={{marginBottom: '24px'}}>
            <span className="cyberpunk-info-label">Song Length:</span>
            <span className="cyberpunk-info-value">{songInfo.songLength} {songInfo.songLength === 1 ? 'minute' : 'minutes'}</span>
          </div>
          
          <div className="cyberpunk-info" style={{marginBottom: '24px'}}>
            <span className="cyberpunk-info-label">Time Signature:</span>
            <span className="cyberpunk-info-value">{songInfo.timeSignature}</span>
          </div>
          
          <div className="cyberpunk-info" style={{marginBottom: '24px'}}>
            <span className="cyberpunk-info-label">Tempo:</span>
            <span className="cyberpunk-info-value">{songInfo.tempo} BPM</span>
          </div>
          
          <div className="cyberpunk-info">
            <span className="cyberpunk-info-label">4-Bar Sections:</span>
            <span className="cyberpunk-info-value">{songInfo.fourBarSections}</span>
          </div>
        </div>
        
        {/* Generate Button */}
        <div className="button-group" style={{marginTop: 'auto'}}>
          <button 
            className="cyberpunk-button w-full"
            onClick={onGenerateSongInfo}
          >
            Generate Song Info
          </button>
          
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
        </div>
      </div>
    </div>
  );
}