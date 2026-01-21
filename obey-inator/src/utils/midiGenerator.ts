import MidiWriter from 'midi-writer-js';
import { CHORD_SEMITONES, KEY_TO_MIDI_OFFSET } from './chordTheory';

export function generateMidiFile(chordProgression: string[], key: string): Uint8Array {
  const track = new MidiWriter.Track();
  const keyOffset = KEY_TO_MIDI_OFFSET[key];
  
  // Set instrument to piano
  track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 0}));
  
  // Add each chord as quarter notes (4 notes = 1 measure in 4/4)
  chordProgression.forEach(chord => {
    const chordSemitones = CHORD_SEMITONES[chord];
    
    if (chordSemitones) {
      // Convert relative semitones to absolute MIDI notes
      const midiNotes = chordSemitones.map(semitone => {
        const midiNote = keyOffset + semitone;
        // Ensure MIDI note stays in valid range (0-127)
        return Math.max(0, Math.min(127, midiNote));
      });
      
       // Add chord event (four beats duration - whole note)
       const chordEvent = new MidiWriter.NoteEvent({
         pitch: midiNotes,
         duration: '1',
         velocity: 80 // Moderate velocity
       });
      
      track.addEvent(chordEvent);
    }
  });
  
  // Create writer and return MIDI data
  const write = new MidiWriter.Writer(track);
  return write.dataUri();
}

export function downloadMidiFile(midiDataUri: string, filename: string) {
  const link = document.createElement('a');
  link.href = midiDataUri;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}