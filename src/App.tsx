import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import WorkExperience from "./components/WorkExperience";
import ProjectsSection from "./components/ProjectsSection";
import AboutMe from "./components/AboutMe";
import Footer from "./components/Footer";
import ExperienceModal from "./components/ExperienceModal";
import { useSidebarStore } from "./store/sidebarStore";

function App() {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Navbar />
      <Sidebar />
      <ExperienceModal />

      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "ml-0"}`}>
        <Hero />
        <WorkExperience />
        <ProjectsSection />
        <AboutMe />
      </main>

      <Footer />
    </div>
  );
}

export default App;
