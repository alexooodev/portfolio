export const scrollToSection = (sectionId: string, setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  }
};
