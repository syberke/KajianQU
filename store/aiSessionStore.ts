import { create } from 'zustand';
import { QuranAISession, QuranAIError } from '../types';

interface AISessionState {
  currentSession: QuranAISession | null;
  errors: QuranAIError[];
  isRecording: boolean;
  currentAyat: number;
  
  startSession: (session: QuranAISession) => void;
  stopSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  addError: (error: QuranAIError) => void;
  setRecording: (recording: boolean) => void;
  setCurrentAyat: (ayat: number) => void;
  clearErrors: () => void;
}

export const useAISessionStore = create<AISessionState>((set) => ({
  currentSession: null,
  errors: [],
  isRecording: false,
  currentAyat: 1,
  
  startSession: (session: QuranAISession) => {
    set({ currentSession: session, errors: [], currentAyat: session.start_ayat });
  },
  
  stopSession: () => {
    set({ 
      currentSession: null, 
      isRecording: false, 
      errors: [], 
      currentAyat: 1 
    });
  },
  
  pauseSession: () => {
    set({ isRecording: false });
  },
  
  resumeSession: () => {
    set({ isRecording: true });
  },
  
  addError: (error: QuranAIError) => {
    set((state) => ({ errors: [...state.errors, error] }));
  },
  
  setRecording: (recording: boolean) => {
    set({ isRecording: recording });
  },
  
  setCurrentAyat: (ayat: number) => {
    set({ currentAyat: ayat });
  },
  
  clearErrors: () => {
    set({ errors: [] });
  },
}));