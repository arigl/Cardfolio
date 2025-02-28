import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const TimelineItem = ({ year, title, description, isActive, onClick }) => {
  const { isDark } = useTheme();
  return (
    <div className="mb-6">
      <div
        onClick={onClick}
        className={`cursor-pointer transition-all duration-300 ${
          isActive ? "scale-105" : "hover:scale-102"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-24 text-sm font-mono pt-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {year}
          </div>
          <div
            className={`flex-1 p-4 rounded-lg transition-all duration-300 ${
              isActive
                ? isDark
                  ? "bg-blue-600"
                  : "bg-blue-500 text-white"
                : isDark
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-50 shadow-md"
            }`}
          >
            <h3 className="font-bold mb-2">{title}</h3>
            <p
              className={`text-sm ${
                isActive
                  ? "text-white"
                  : isDark
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InterestBadge = ({ icon, label }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
        isDark
          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
          : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

const AboutPage = ({ navigateTo, isOpened }) => {
  const { isDark } = useTheme();
  const [activeTimelineItem, setActiveTimelineItem] = useState(null);

  const timeline = [
    {
      year: "1999",
      title: "Born in Marburg, Germany",
      description:
        "My journey began in the historic university city of Marburg, Germany.",
    },
    {
      year: "Early 2000s",
      title: "Move to United States",
      description:
        "Relocated to the United States at a young age, beginning a new chapter in my life.",
    },
    {
      year: "2012",
      title: "First Line of Code",
      description:
        "Discovered programming in middle school, marking the beginning of my passion for technology.",
    },
    {
      year: "2017",
      title: "University Journey Begins",
      description:
        "Started at Chapman University, pursuing Computer Science with a focus on Game Development.",
    },
    {
      year: "2021",
      title: "Graduation & Career Launch",
      description:
        "Graduated with a B.S. in Computer Science and began my professional journey in full-stack development.",
    },
    {
      year: "Present",
      title: "Full Stack Developer",
      description:
        "Creating innovative digital experiences and pushing the boundaries of web development.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 mt-8">
        <h2
          className={`text-3xl font-bold mb-12 text-center transition-colors duration-200 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          About Me
        </h2>

        {!isOpened ? (
          <div className="flex justify-center">
            <div
              className={`animate-pulse w-64 h-96 rounded-lg flex items-center justify-center text-xl
              ${isDark ? "bg-blue-600" : "bg-blue-500"} text-white`}
            >
              Click to Open About Pack
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Introduction Section */}
            <div
              className={`mb-16 p-6 rounded-lg transition-colors duration-300 ${
                isDark ? "bg-gray-800" : "bg-white shadow-lg"
              }`}
            >
              <div className="prose max-w-none">
                <p
                  className={`text-lg leading-relaxed mb-6 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  I'm a creative-driven full-stack developer with a passion for
                  building elegant digital experiences. My journey with
                  computers began in middle school, where I wrote my first lines
                  of code. Since then, I've evolved into a developer who
                  combines technical expertise with design sensibility.
                </p>
                <p
                  className={`text-lg leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Born in Marburg, Germany, and later moving to the United
                  States, I bring a unique perspective to my work. My early
                  exposure to different cultures has shaped my approach to
                  problem-solving and design, allowing me to create solutions
                  that resonate across cultural boundaries.
                </p>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="mb-16">
              <h3
                className={`text-2xl font-bold mb-8 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                My Journey
              </h3>
              <div className="space-y-2">
                {timeline.map((item, index) => (
                  <TimelineItem
                    key={index}
                    {...item}
                    isActive={activeTimelineItem === index}
                    onClick={() =>
                      setActiveTimelineItem(
                        activeTimelineItem === index ? null : index
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* Interests Section */}
            <div className="mb-16">
              <h3
                className={`text-2xl font-bold mb-8 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Interests & Hobbies
              </h3>
              <div className="flex flex-wrap gap-4">
                <InterestBadge
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  }
                  label="Gaming"
                />
                <InterestBadge
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  label="Esports"
                />
                <InterestBadge
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  }
                  label="Anime"
                />
                <InterestBadge
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  }
                  label="Card Games"
                />
                <InterestBadge
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  label="Programming"
                />
                <InterestBadge
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                  }
                  label="Design"
                />
              </div>
            </div>

            {/* Skills Overview */}
            <div>
              <h3
                className={`text-2xl font-bold mb-8 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                What Drives Me
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-6 rounded-lg transition-colors duration-300 ${
                    isDark ? "bg-gray-800" : "bg-white shadow-lg"
                  }`}
                >
                  <h4
                    className={`text-xl font-bold mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Creative Development
                  </h4>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    I believe in pushing the boundaries of what's possible on
                    the web, combining technical excellence with creative design
                    to build memorable experiences.
                  </p>
                </div>
                <div
                  className={`p-6 rounded-lg transition-colors duration-300 ${
                    isDark ? "bg-gray-800" : "bg-white shadow-lg"
                  }`}
                >
                  <h4
                    className={`text-xl font-bold mb-4 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Problem-Solving
                  </h4>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    I enjoy tackling complex problems and finding creative
                    solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
