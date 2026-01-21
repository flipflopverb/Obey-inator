import React, { useState, useEffect } from 'react';
import { ProgressionParams } from '../types/chords';

interface SongSettingsControlsProps {
  params: ProgressionParams;
  onParamsChange: (params: ProgressionParams) => void;
}

export function SongSettingsControls({ params, onParamsChange }: SongSettingsControlsProps) {
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const timeSignatures = ['4/4', '3/4', '5/7', '3/2', '9/17'];

  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => {
        setShowWarning(false);
        setWarningMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  const updateParam = <K extends keyof ProgressionParams>(key: K, value: ProgressionParams[K]) => {
    let newParams = { ...params, [key]: value };

    // Enforce tempo range constraints
    if (key === 'upperTempoLimit' && typeof value === 'number') {
      const minUpper = params.lowerTempoLimit + 10;
      if (value < minUpper) {
        newParams.upperTempoLimit = minUpper;
        newParams.lowerTempoLimit = value - 10;
      }
    } else if (key === 'lowerTempoLimit' && typeof value === 'number') {
      const maxLower = params.upperTempoLimit - 10;
      if (value > maxLower) {
        newParams.lowerTempoLimit = maxLower;
        newParams.upperTempoLimit = value + 10;
      }
    }

    // Remove time signature restrictions when FUCK MYDYTECH is enabled
    if (key === 'timeSignature' && value !== '4/4' && !params.fuckMyDytech) {
      setWarningMessage('[ time signature request not approved ]');
      setShowWarning(true);
      newParams.timeSignature = '4/4';
    }

    onParamsChange(newParams);
  };

  return (
    <div className="space-y-6">
      <div className="cyberpunk-card cyberpunk-card-small">
        <h2 className="cyberpunk-title" style={{textAlign: 'left'}}>Song Settings</h2>
        
        <div className="settings-grid">
          {/* Upper Tempo Limit */}
          <div>
            <label className="cyberpunk-label">
              Upper Tempo Limit: {params.upperTempoLimit} BPM
            </label>
            <input
              type="range"
              min="80"
              max="240"
              value={params.upperTempoLimit}
              onChange={(e) => updateParam('upperTempoLimit', parseInt(e.target.value))}
              className="w-full slider-aligned"
            />
          </div>

          {/* Lower Tempo Limit */}
          <div>
            <label className="cyberpunk-label">
              Lower Tempo Limit: {params.lowerTempoLimit} BPM
            </label>
            <input
              type="range"
              min="40"
              max="200"
              value={params.lowerTempoLimit}
              onChange={(e) => updateParam('lowerTempoLimit', parseInt(e.target.value))}
              className="w-full slider-aligned"
            />
          </div>

          {/* Song Length */}
          <div>
            <label className="cyberpunk-label">
              Song Length: {params.songLength} {params.songLength === 1 ? 'minute' : 'minutes'}
            </label>
            <input
              type="range"
              min="1"
              max="16"
              value={params.songLength}
              onChange={(e) => updateParam('songLength', parseInt(e.target.value))}
              className="w-full slider-aligned"
            />
          </div>

          {/* Time Signature */}
          <div className="flex items-center">
            <label className="cyberpunk-label inline">Time Signature</label>
            <select
              value={params.timeSignature}
              onChange={(e) => updateParam('timeSignature', e.target.value)}
              className="cyberpunk-select flex-1"
            >
              {timeSignatures.map(signature => (
                <option key={`sig-${signature}`} value={signature}>{signature}</option>
              ))}
            </select>
          </div>

          {/* FUCK MYDYTECH checkbox removed - moved to Tool Selection */}

          {/* Warning Message */}
          {showWarning && (
            <div className="cyberpunk-warning" style={{
              color: '#FF1744',
              fontSize: '14px',
              fontWeight: '600',
              textAlign: 'center',
              marginTop: '12px',
              padding: '8px',
              border: '1px solid rgba(255, 23, 68, 0.3)',
              backgroundColor: 'rgba(255, 23, 68, 0.1)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {warningMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}