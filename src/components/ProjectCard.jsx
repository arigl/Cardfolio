import React, { useState } from "react";

const ProjectCard = ({ project }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="h-96 w-full perspective-1000"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden border-2 border-red-500 rounded-lg bg-white shadow-xl">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{project.name}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 border-2 border-red-500 rounded-lg bg-red-500 shadow-xl text-white p-6 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold mb-4">{project.name}</h3>
          <p className="text-center mb-4 text-sm">{project.long_desc}</p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {project.tools.map((tool, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white text-red-500 text-xs rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-red-500 rounded-full font-bold hover:bg-gray-100 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
