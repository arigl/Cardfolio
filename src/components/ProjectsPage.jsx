import React from "react";
import { useTheme } from "../context/ThemeContext";
import projectData from "../data/projectData";

const ProjectsPage = ({ navigateTo, isOpened }) => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 mt-8">
        <h2
          className={`text-3xl font-bold mb-12 text-center transition-colors duration-200
          ${isDark ? "text-white" : "text-gray-900"}`}
        >
          My Projects
        </h2>

        {!isOpened ? (
          <div className="flex justify-center">
            <div
              className={`animate-pulse w-64 h-96 rounded-lg flex items-center justify-center text-xl
              ${isDark ? "bg-blue-600" : "bg-blue-500"} text-white`}
            >
              Click to Open Projects Pack
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105
                  ${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-700 shadow-lg shadow-gray-900/30"
                      : "bg-white hover:bg-gray-50 shadow-lg shadow-gray-200/50"
                  }`}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-2 transition-colors duration-200
                    ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mb-4 transition-colors duration-200
                    ${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-sm transition-colors duration-200
                          ${
                            isDark
                              ? "bg-gray-700 text-blue-400"
                              : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
                          ${
                            isDark
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                      >
                        <span>Live Demo</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
                          ${
                            isDark
                              ? "bg-gray-700 hover:bg-gray-600 text-white"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                          }`}
                      >
                        <span>GitHub</span>
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
