import wikikeebsImg from "../assets/images/Hero.png";
import wikikeebs3dImg from "../assets/images/wikikeebs3d.png";
import playerxImg from "../assets/images/px1.png";
import playerxStreamingImg from "../assets/images/ps1.png";
import lofiHavenImg from "../assets/images/LH1.png";
import valorantTrackerImg from "../assets/images/vt.png";
import brainInstituteImg from "../assets/images/sb.png";
import witchFoodImg from "../assets/images/wf1.png";

const projectData = [
  {
    title: "PlayerX.GG",
    description:
      "A fantasy Esports platform with live data integration, user management, and tournament automation. Scaled from 500 to over 50,000 users.",
    image: playerxImg,
    technologies: ["React", "NextJS", "GraphQL", "AWS", "Contentful"],
    demoUrl: "https://playerx.gg",
    githubUrl: null,
  },
  {
    title: "PlayerX Streaming",
    description:
      "Live streaming platform with real-time data integration, video playback, and highlight functionality. Features WebSocket connections and ad-server integrations.",
    image: playerxStreamingImg,
    technologies: [
      "React",
      "WebSocket",
      "AWS Lambda",
      "Video Streaming",
      "GraphQL",
    ],
    demoUrl: "https://stream.playerx.gg",
    githubUrl: null,
  },
  {
    title: "WikiKeebs",
    description:
      "The ultimate mechanical keyboard buying guide with 3D customization, extensive filtering, and vendor integration. Features over 400 colorways and 10,000 configurations.",
    image: wikikeebsImg,
    technologies: ["MERN Stack", "NextJS", "ThreeJS", "AWS S3", "NextUI"],
    demoUrl: "https://wikikeebs.com",
    githubUrl: "https://github.com/yourusername/wikikeebs",
  },
  {
    title: "WikiKeebs 3D",
    description:
      "Interactive 3D keyboard customization platform with hundreds of colorways and configurations.",
    image: wikikeebs3dImg,
    technologies: ["React", "ThreeJS", "R3F", "NextJS", "TailwindCSS"],
    demoUrl: "https://3d.wikikeebs.com",
    githubUrl: null,
  },
  {
    title: "Lofi Haven",
    description:
      "Immersive 3D Lofi music experience with interactive scenes, weather modes, and ambient sounds.",
    image: lofiHavenImg,
    technologies: ["React", "ThreeJS", "R3F", "Blender", "TailwindCSS"],
    demoUrl: "https://lofi-haven.vercel.app",
    githubUrl: null,
  },
  {
    title: "Valorant Tracker",
    description:
      "Comprehensive game statistics tracker with match history, ranked data, and detailed performance analytics.",
    image: valorantTrackerImg,
    technologies: [
      "TypeScript",
      "REST API",
      "Shadcn",
      "Radix UI",
      "TailwindCSS",
    ],
    demoUrl: null,
    githubUrl: null,
  },
  {
    title: "Brain Institute Research App",
    description:
      "Scientific experiment application for testing mental suggestion, featuring custom WordPress theme and comprehensive data collection.",
    image: brainInstituteImg,
    technologies: ["Swift", "UIKit", "Firebase", "WordPress", "REST APIs"],
    demoUrl: null,
    githubUrl: null,
  },
  {
    title: "Witch Food",
    description:
      "iOS application that helps users decide what to eat using a fun, magic-themed interface with location services.",
    image: witchFoodImg,
    technologies: ["Swift", "UIKit", "Maps API", "Core Data", "TestFlight"],
    demoUrl: "https://apps.apple.com/us/app/witch-food/id1634313239",
    githubUrl: null,
  },
];

export default projectData;
