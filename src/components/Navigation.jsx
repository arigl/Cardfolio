import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 backdrop-blur-md ${
        isDark ? "bg-gray-900/80 text-white" : "bg-white/80 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center">
            <div
              className={`px-6 py-2 rounded-full ${
                isDark ? "bg-gray-800/50" : "bg-gray-100/50"
              }`}
            >
              <div className="flex items-center space-x-8">
                <Link
                  to="/"
                  className={`hover:text-blue-500 transition-colors duration-200`}
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className={`hover:text-blue-500 transition-colors duration-200`}
                >
                  Projects
                </Link>
                <Link
                  to="/about"
                  className={`hover:text-blue-500 transition-colors duration-200`}
                >
                  About Me
                </Link>
                <Link
                  to="/skills"
                  className={`hover:text-blue-500 transition-colors duration-200`}
                >
                  Skills
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-none">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
