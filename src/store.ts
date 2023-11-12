import { create } from 'zustand';

type AnsStore = {
  prevMsgs: string[]; // Replace with your actual type
  setPrevMsgs: (items: string[]) => void;
};

export const useAns = create<AnsStore>()((set) => ({
  prevMsgs: [], // Initial state
  setPrevMsgs: (items: string[]) => set({ prevMsgs: items }), // Corrected line
}));