import React, { useState } from "react";

const SkillCard = ({ skill, index, total, fanned, colors }) => {
  const [flipped, setFlipped] = useState(false);

  // Calculate the rotation and offset for fanned cards
  const fanAngle = fanned ? (index - (total - 1) / 2) * 10 : 0;
  const fanTranslateY = fanned ? -Math.abs((index - (total - 1) / 2) * 5) : 0;

  return (
    <div
      className="absolute w-48 h-64 cursor-pointer transition-all duration-500"
      style={{
        transform: `rotate(${fanAngle}deg) translateY(${fanTranslateY}px)`,
        zIndex: flipped ? 20 : index,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setFlipped(!flipped);
      }}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-lg bg-white shadow-lg border-2 ${colors.border} flex items-center justify-center`}
        >
          <h4 className={`text-xl font-bold ${colors.text}`}>{skill.name}</h4>
        </div>

        {/* Back of card */}
        <div
          className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-lg ${colors.bg} shadow-lg text-white p-6 flex flex-col items-center justify-center`}
        >
          <h4 className="text-xl font-bold mb-4">{skill.name}</h4>
          <div className="w-full bg-white bg-opacity-30 h-4 rounded-full mb-2">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
          <span className="text-sm font-bold">{skill.level}%</span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
