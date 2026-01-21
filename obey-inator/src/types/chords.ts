export interface ChordInfo {
  symbol: string;
  semitones: number[];
}

export interface ProgressionParams {
  scaleType: string;
  key: string;
  length: number;
  allowBorrowedSuspended: boolean;
  firstChord: string;
  upperTempoLimit: number;
  lowerTempoLimit: number;
  songLength: number;
  timeSignature: string;
  fuckMyDytech?: boolean;
}

export interface ChordProgression {
  chords: string[];
  params: ProgressionParams;
  songName: string;
}

export interface SongInfo {
  songName: string;
  songLength: number;
  timeSignature: string;
  tempo: number;
  fourBarSections: number | string;
  timestamp: number;
}