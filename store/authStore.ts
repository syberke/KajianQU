import { create } from 'zustand';
import { User } from '../types/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: (user: User, token: string) => {
    // Store token in secure storage
    set({ user, isAuthenticated: true, isLoading: false });
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
  
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));