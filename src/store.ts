import { create } from 'zustand';

type AnsStore = {
  prevAns: string[]; // Replace with your actual type
  setPrevAns: (items: string[]) => void;
};

export const useAns = create<AnsStore>()((set) => ({
  prevAns: [], // Initial state
  setPrevAns: (items: string[]) => set({ prevAns: items }), // Corrected line
}));