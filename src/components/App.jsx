import React, { useState } from "react";
import LandingPage from "./LandingPage";
import ProjectsPage from "./ProjectsPage";
import AboutPage from "./AboutPage";
import SkillsPage from "./SkillsPage";
import Navigation from "./Navigation";

const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [openedPacks, setOpenedPacks] = useState({
    projects: false,
    about: false,
    skills: false,
  });

  const openPack = (packName) => {
    setOpenedPacks({ ...openedPacks, [packName]: true });
    setCurrentPage(packName);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {currentPage === "landing" && (
        <LandingPage navigateTo={setCurrentPage} openPack={openPack} />
      )}
      {currentPage === "projects" && (
        <ProjectsPage
          navigateTo={setCurrentPage}
          isOpened={openedPacks.projects}
        />
      )}
      {currentPage === "about" && (
        <AboutPage navigateTo={setCurrentPage} isOpened={openedPacks.about} />
      )}
      {currentPage === "skills" && (
        <SkillsPage navigateTo={setCurrentPage} isOpened={openedPacks.skills} />
      )}
      <Navigation currentPage={currentPage} navigateTo={setCurrentPage} />
    </div>
  );
};

export default App;
