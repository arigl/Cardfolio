import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ProjectsPage from "./components/ProjectsPage";
import AboutPage from "./components/AboutPage";
import SkillsPage from "./components/SkillsPage";

const AppContent = () => {
  const [packOpened, setPackOpened] = useState({
    projects: false,
    about: false,
    skills: false,
  });
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    const path = location.pathname.slice(1);
    if (path && path !== "") {
      setPackOpened((prev) => ({
        ...prev,
        [path]: true,
      }));
    }
  }, [location.pathname]);

  const openPack = (packName) => {
    setPackOpened((prev) => ({ ...prev, [packName]: true }));
    navigate(`/${packName}`);
  };

  const isLandingPage = location.pathname === "/";

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0f172a]" : "bg-gray-50"}`}>
      {!isPlayingGame && <Navigation />}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                openPack={openPack}
                onGameStart={() => setIsPlayingGame(true)}
                onGameEnd={() => setIsPlayingGame(false)}
              />
            }
          />
          <Route
            path="/projects"
            element={
              <ProjectsPage isOpened={packOpened.projects || !isLandingPage} />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage isOpened={packOpened.about || !isLandingPage} />
            }
          />
          <Route
            path="/skills"
            element={
              <SkillsPage isOpened={packOpened.skills || !isLandingPage} />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
