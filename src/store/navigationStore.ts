import { create } from "zustand";

interface NavigationState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrollToSection: (sectionId: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeSection: "home",
  setActiveSection: (section) => set({ activeSection: section }),
  scrollToSection: (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      set({ activeSection: sectionId });
    }
  },
}));
