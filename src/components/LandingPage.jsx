import React, { useState } from "react";
import { motion } from "framer-motion";
import CardGame from "./CardGame";
import projectData from "../data/projectData";
import { useTheme } from "../context/ThemeContext";
import "../styles/fonts.css";

const MenuButton = ({ onClick, children, variant = "blue" }) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "blue":
        return "bg-blue-600 hover:bg-blue-700 border-blue-400";
      case "orange":
        return "bg-orange-600 hover:bg-orange-700 border-orange-400";
      case "red":
        return "bg-red-600 hover:bg-red-700 border-red-400";
      case "green":
        return "bg-emerald-600 hover:bg-emerald-700 border-emerald-400";
      default:
        return "bg-gray-600 hover:bg-gray-700 border-gray-400";
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        px-8 py-2 rounded font-bold text-xl uppercase
        text-white shadow-lg
        border-b-4 transition-colors duration-200
        ${getButtonStyle()}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

const CenterCard = () => {
  return (
    <motion.div
      className="w-32 h-48 bg-gray-800 rounded-lg shadow-2xl
        border-2 border-blue-400 transform perspective-1000"
      initial={{ rotateY: 180 }}
      animate={{
        rotateY: 0,
        boxShadow: [
          "0 0 20px rgba(59, 130, 246, 0.5)",
          "0 0 40px rgba(59, 130, 246, 0.5)",
          "0 0 20px rgba(59, 130, 246, 0.5)",
        ],
      }}
      transition={{
        rotateY: { duration: 0.6 },
        boxShadow: { duration: 2, repeat: Infinity },
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-6xl transform -rotate-12">🎮</span>
      </div>
    </motion.div>
  );
};

const LandingPage = ({ openPack, onGameStart, onGameEnd }) => {
  const [showGame, setShowGame] = useState(false);
  const { isDark } = useTheme();

  const handleGameStart = () => {
    setShowGame(true);
    onGameStart();
  };

  const handleGameEnd = () => {
    setShowGame(false);
    onGameEnd();
  };

  if (showGame) {
    return <CardGame data={projectData} onBack={handleGameEnd} />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Animated Background */}
      <div
        className={`absolute inset-0 opacity-10 ${
          isDark
            ? "bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900"
            : "bg-gradient-to-br from-blue-100 via-white to-purple-100"
        }`}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="flex items-center gap-8">
            <motion.h1
              className={`text-8xl font-bold tracking-wider ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                textShadow: isDark
                  ? "0 0 20px rgba(255,255,255,0.3)"
                  : "0 0 20px rgba(0,0,0,0.1)",
                fontFamily: "system-ui",
              }}
            >
              ALEX
            </motion.h1>

            <CenterCard />

            <motion.h1
              className={`text-8xl font-bold tracking-wider ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                textShadow: isDark
                  ? "0 0 20px rgba(255,255,255,0.3)"
                  : "0 0 20px rgba(0,0,0,0.1)",
                fontFamily: "system-ui",
              }}
            >
              RIGL
            </motion.h1>
          </div>

          <motion.h2
            className={`pixel-font text-xl ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Full-Stack Developer | Currently open for Freelance work.
          </motion.h2>
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-row gap-6 items-center">
          <MenuButton onClick={handleGameStart} variant="blue">
            Play
          </MenuButton>
          <MenuButton
            onClick={() => window.open("/resume.pdf", "_blank")}
            variant="orange"
          >
            Resume
          </MenuButton>
          <MenuButton
            onClick={() =>
              window.open("https://github.com/yourusername", "_blank")
            }
            variant="green"
          >
            Projects
          </MenuButton>
          <MenuButton
            onClick={() =>
              window.open("mailto:your.email@example.com", "_blank")
            }
            variant="red"
          >
            Contact
          </MenuButton>
        </div>
      </div>

      {/* Version Number */}
      <motion.div
        className={`absolute bottom-4 right-4 text-sm ${
          isDark ? "text-white/50" : "text-gray-600"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        v1.0.0
      </motion.div>
    </div>
  );
};

export default LandingPage;
