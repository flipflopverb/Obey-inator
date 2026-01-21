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
}

export interface ChordProgression {
  chords: string[];
  params: ProgressionParams;
  songName: string;
}