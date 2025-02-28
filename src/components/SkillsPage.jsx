import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const SkillsPage = ({ navigateTo, isOpened }) => {
  const { isDark } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [categories] = useState([
    {
      id: "languages",
      title: "Languages",
      description: "Programming and markup languages I work with",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 80 },
        { name: "HTML/CSS", level: 90 },
        { name: "SQL", level: 85 },
        { name: "PHP", level: 75 },
        { name: "Swift", level: 70 },
        { name: "C#", level: 75 },
        { name: "Java", level: 70 },
      ],
    },
    {
      id: "frameworks",
      title: "Frameworks & Libraries",
      description:
        "Modern frameworks and libraries I use to build applications",
      skills: [
        { name: "React", level: 95 },
        { name: "Node.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "MySQL", level: 80 },
        { name: "TailwindCSS", level: 90 },
        { name: "GSAP", level: 75 },
      ],
    },
    {
      id: "cloud",
      title: "Cloud & Infrastructure",
      description: "Cloud platforms and infrastructure tools I'm proficient in",
      skills: [
        { name: "AWS (S3, EC2, RDS)", level: 85 },
        { name: "GraphQL", level: 80 },
        { name: "Terraform", level: 75 },
        { name: "Docker", level: 80 },
        { name: "Firebase", level: 85 },
        { name: "Vercel", level: 90 },
        { name: "GKE", level: 75 },
      ],
    },
    {
      id: "tools",
      title: "Tools & Design",
      description: "Development and design tools I use daily",
      skills: [
        { name: "Git", level: 90 },
        { name: "REST APIs", level: 90 },
        { name: "Adobe Suite", level: 80 },
        { name: "Figma", level: 85 },
        { name: "Linux", level: 80 },
        { name: "MongoDB Atlas", level: 85 },
        { name: "Google Tag Manager", level: 75 },
      ],
    },
  ]);

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen">
      <div
        className={`container mx-auto px-4 py-16 mt-8 transition-colors duration-500 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <h2 className="text-3xl font-bold mb-12 text-center">
          Technical Skills
        </h2>

        {!isOpened ? (
          <div className="flex justify-center">
            <div
              className={`animate-pulse w-64 h-96 rounded-lg flex items-center justify-center text-xl
              ${isDark ? "bg-purple-600" : "bg-purple-500"}`}
            >
              Click to Open Skills Pack
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {categories.map((category) => (
              <div key={category.id} className="w-full">
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full p-6 rounded-lg transition-all duration-300 ${
                    expandedCategory === category.id
                      ? isDark
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : isDark
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50 shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <h3 className="text-xl font-bold mb-2">
                        {category.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          expandedCategory === category.id
                            ? "opacity-90"
                            : isDark
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {category.description}
                      </p>
                    </div>
                    <svg
                      className={`w-6 h-6 transform transition-transform ${
                        expandedCategory === category.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    expandedCategory === category.id
                      ? "max-h-[1000px] opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg ${
                      isDark ? "bg-gray-900" : "bg-gray-100"
                    }`}
                  >
                    {category.skills.map((skill, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          isDark ? "bg-gray-800" : "bg-white shadow-sm"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span
                            className={`text-sm ${
                              isDark ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          className={`w-full rounded-full h-2 ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
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

export default SkillsPage;
