import React, { useState } from "react";

const AboutCard = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="h-64 perspective-1000 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden border-2 border-blue-500 rounded-lg bg-white shadow-lg flex items-center justify-center">
          <h3 className="text-2xl font-bold text-blue-500">{card.title}</h3>
        </div>

        {/* Back of card */}

        <div className="absolute w-full h-full backface-hidden rotate-y-180 border-2 border-blue-500 rounded-lg bg-blue-500 shadow-lg text-white p-6 flex items-center justify-center">
          <p className="text-center">{card.content}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
