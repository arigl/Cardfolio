// Card pack texture definitions
export const cardPackTypes = {
  standard: {
    id: "standard",
    name: "Standard Pack",
    textures: {
      front: "/textures/standard_front.jpg",
      back: "/textures/standard_back.jpg",
      side: "/textures/standard_side.jpg",
    },
  },
  premium: {
    id: "premium",
    name: "Premium Pack",
    textures: {
      front: "/textures/premium_front.jpg",
      back: "/textures/premium_back.jpg",
      side: "/textures/premium_side.jpg",
    },
  },
  limited: {
    id: "limited",
    name: "Limited Edition",
    textures: {
      front: "/textures/limited_front.jpg",
      back: "/textures/limited_back.jpg",
      side: "/textures/limited_side.jpg",
    },
  },
};

// Helper function to get texture paths for a pack type
export const getPackTextures = (packType) => {
  return cardPackTypes[packType]?.textures || cardPackTypes.standard.textures;
};
