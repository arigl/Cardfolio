import * as THREE from "three";

export const generateTexture = (width, height, color) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  // Fill with solid color
  context.fillStyle = color;
  context.fillRect(0, 0, width, height);

  return canvas.toDataURL();
};

export const generateCardTextures = (type = "standard") => {
  let mainColor;
  switch (type) {
    case "premium":
      mainColor = "#FFD700";
      break;
    case "limited":
      mainColor = "#FF1493";
      break;
    default:
      mainColor = "#4169E1";
  }

  return {
    front: generateTexture(512, 712, mainColor),
    back: generateTexture(512, 712, "#2a2a2a"),
    side: generateTexture(128, 712, "#1a1a1a"),
  };
};
