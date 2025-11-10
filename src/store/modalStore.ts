import { create } from "zustand";

interface ExperienceDetails {
  company: string;
  position: string;
  duration: string;
  description: string;
  companyDescription: string;
  technologies: string[];
}

interface ModalState {
  isOpen: boolean;
  experienceDetails: ExperienceDetails | null;
  openModal: (details: ExperienceDetails) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  experienceDetails: null,
  openModal: (details) => set({ isOpen: true, experienceDetails: details }),
  closeModal: () => set({ isOpen: false, experienceDetails: null }),
}));
