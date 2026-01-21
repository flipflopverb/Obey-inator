import { ChordInfo, ProgressionParams } from '../types/chords';

// Scale chord definitions based on user specifications
export const SCALE_CHORDS = {
  'Any': ['i', 'I', 'ii', 'ii°', 'iii', 'III', 'III+', 'iv', 'IV', 'v', 'V', 'vi', 'vi°', 'VI', 'vii°', 'VII'],
  'Major': ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  'Natural minor': ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
  'Harmonic minor': ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°'],
  'Melodic minor': ['i', 'ii', 'iii+', 'IV', 'V', 'vi°', 'vii°']
};

// Complete chord semitone mappings (relative to tonic)
export const CHORD_SEMITONES: Record<string, number[]> = {
  // Basic chords
  'i': [0, 3, 7],
  'I': [0, 4, 7],
  'ii': [2, 5, 9],
  'ii°': [2, 5, 8],
  'iii': [4, 7, 11],
  'III': [3, 7, 10],
  'III+': [3, 7, 11],
  'iv': [5, 8, 12],
  'IV': [5, 9, 12],
  'v': [7, 10, 14],
  'V': [7, 11, 14],
  'vi': [9, 12, 16],
  'vi°': [9, 12, 15],
  'VI': [8, 12, 15],
  'vii°': [11, 14, 17],
  'VII': [10, 14, 17],

  // Suspended chords
  'Isus2': [0, 2, 7],
  'Isus4': [0, 5, 7],
  'iisus2': [2, 4, 9],
  'iisus4': [2, 7, 9],
  'ii°sus2': [2, 4, 8],
  'ii°sus4': [2, 7, 8],
  'iiisus2': [4, 6, 11],
  'iiisus4': [4, 9, 11],
  'IIIsus2': [3, 5, 10],
  'IIIsus4': [3, 8, 10],
  'III+sus2': [3, 5, 11],
  'III+sus4': [3, 8, 11],
  'ivsus2': [5, 7, 12],
  'ivsus4': [5, 10, 12],
  'IVsus2': [5, 7, 12],
  'IVsus4': [5, 10, 12],
  'vsus2': [7, 9, 14],
  'vsus4': [7, 12, 14],
  'Vsus2': [7, 9, 14],
  'Vsus4': [7, 12, 14],
  'visus2': [9, 11, 16],
  'visus4': [9, 14, 16],
  'vi°sus2': [9, 11, 15],
  'vi°sus4': [9, 14, 15],
  'VIsus2': [8, 10, 15],
  'VIsus4': [8, 13, 15],
  'vii°sus2': [11, 13, 17],
  'vii°sus4': [11, 16, 17],
  'VIIsus2': [10, 12, 17],
  'VIIsus4': [10, 15, 17],
  
  // Tritone substitution chord (subV7) - diad as specified
  'subV7': [0, 6]
};

// Key to MIDI note offset (for absolute MIDI note calculation)
export const KEY_TO_MIDI_OFFSET: Record<string, number> = {
  'C': 60,  // Middle C
  'C#': 61,
  'D': 62,
  'D#': 63,
  'E': 64,
  'F': 65,
  'F#': 66,
  'G': 67,
  'G#': 68,
  'A': 69,
  'A#': 70,
  'B': 71
};

export function generateChordProgression(params: ProgressionParams): string[] {
  const availableChords = SCALE_CHORDS[params.scaleType];
  
  // If first chord is "Any", randomly select from available chords
  const firstChord = params.firstChord === "Any" 
    ? availableChords[Math.floor(Math.random() * availableChords.length)]
    : params.firstChord;
    
  const progression: string[] = [firstChord];
  
  // Create list of borrowed/suspended chords
  const borrowedSuspendedChords = Object.keys(CHORD_SEMITONES).filter(
    chord => chord.includes('sus') && 
    availableChords.some(base => chord.startsWith(base))
  );

  for (let i = 1; i < params.length; i++) {
    let chordOptions = [...availableChords];
    
    // 5% chance for borrowed/suspended chords if enabled
    if (params.allowBorrowedSuspended && Math.random() < 0.05 && borrowedSuspendedChords.length > 0) {
      chordOptions = borrowedSuspendedChords.filter(chord => 
        chordOptions.some(base => chord.startsWith(base))
      );
    }
    
    // 5% chance for subV7 chord if FUCK MYDYTECH is enabled and borrowed/suspended is active
    if (params.fuckMyDytech && params.allowBorrowedSuspended && Math.random() < 0.05) {
      chordOptions.push('subV7');
    }
    
    // Filter out immediate repetition
    const previousChord = progression[i - 1];
    const filteredOptions = chordOptions.filter(chord => chord !== previousChord);
    
    // If all options would cause repetition (unlikely), use original set
    const finalOptions = filteredOptions.length > 0 ? filteredOptions : chordOptions;
    
    const randomChord = finalOptions[Math.floor(Math.random() * finalOptions.length)];
    progression.push(randomChord);
  }
  
  return progression;
}

export function getFirstChordOptions(scaleType: string): string[] {
  return SCALE_CHORDS[scaleType] || [];
}