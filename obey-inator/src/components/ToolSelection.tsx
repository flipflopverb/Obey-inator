import React from 'react';

interface ToolSelectionProps {
  showSongTools: boolean;
  showChordTools: boolean;
  onSongToolsChange: (enabled: boolean) => void;
  onChordToolsChange: (enabled: boolean) => void;
  showDevCheckbox?: boolean;
  devModeEnabled?: boolean;
  onDevModeChange?: (enabled: boolean) => void;
  onDevCheckboxShow?: (show: boolean) => void;
}

export function ToolSelection({ 
  showSongTools, 
  showChordTools, 
  onSongToolsChange, 
  onChordToolsChange,
  showDevCheckbox = false,
  devModeEnabled = false,
  onDevModeChange,
  onDevCheckboxShow
}: ToolSelectionProps) {
  return (
    <div className="tool-selection-card">
      <h3 className="tool-selection-title">Tool Selection</h3>
      
      <div className="tool-checkbox-group">
        <label className="tool-checkbox">
          <input
            type="checkbox"
            checked={showSongTools}
            onChange={(e) => onSongToolsChange(e.target.checked)}
          />
          <span>Song Settings & Data</span>
        </label>
        
        <label className="tool-checkbox">
          <input
            type="checkbox"
            checked={showChordTools}
            onChange={(e) => onChordToolsChange(e.target.checked)}
          />
          <span>Chord Settings & Data</span>
        </label>
        
        {showDevCheckbox && (
          <label className="tool-checkbox dev-checkbox">
            <input
              type="checkbox"
              checked={devModeEnabled}
              onChange={(e) => onDevModeChange?.(e.target.checked)}
            />
            <span>Developer Mode</span>
          </label>
        )}
      </div>
    </div>
  );
}