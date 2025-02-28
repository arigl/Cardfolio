import React, { useState } from "react";
import SkillCard from "./SkillCard";

const SkillCategory = ({ category }) => {
  const [fanned, setFanned] = useState(false);

  const getColorClass = (color) => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-500",
          border: "border-green-500",
          text: "text-green-500",
        };
      case "purple":
        return {
          bg: "bg-purple-500",
          border: "border-purple-500",
          text: "text-purple-500",
        };
      case "yellow":
        return {
          bg: "bg-yellow-500",
          border: "border-yellow-500",
          text: "text-yellow-500",
        };
      default:
        return {
          bg: "bg-blue-500",
          border: "border-blue-500",
          text: "text-blue-500",
        };
    }
  };

  const colors = getColorClass(category.color);

  return (
    <div className="mb-8">
      <h3 className={`text-2xl font-bold mb-6 text-center ${colors.text}`}>
        {category.category}
      </h3>

      <div
        className="relative h-80 flex justify-center"
        onClick={() => setFanned(!fanned)}
      >
        {category.skills.map((skill, index) => (
          <SkillCard
            key={index}
            skill={skill}
            index={index}
            total={category.skills.length}
            fanned={fanned}
            colors={colors}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
