import { create } from "zustand";

interface ContactState {
  isOpen: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  openModal: () => void;
  closeModal: () => void;
  setSuccess: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export const useContactStore = create<ContactState>((set) => ({
  isOpen: false,
  isSuccess: false,
  isLoading: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, isSuccess: false }),
  setSuccess: (value) => set({ isSuccess: value }),
  setLoading: (value) => set({ isLoading: value }),
}));
