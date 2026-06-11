export type GalleryItem = {
  title: string;
  url: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type SiteContent = {
  hero: {
    title: string;
    tagline: string;
    description: string;
    backgroundUrl: string;
  };
  about: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
    imageUrl: string;
  };
  story: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
    imageUrl: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    items: GalleryItem[];
  };
  trailer: {
    title: string;
    subtitle: string;
    thumbnailUrl: string;
    videoUrl: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  download: {
    title: string;
    subtitle: string;
    demoUrl: string;
    steamUrl: string;
  };
  footer: {
    credits: string;
  };
};

export const defaultSiteContent: SiteContent = {
  hero: {
    title: "SUBJECT 14",
    tagline: "The darkness remembers what you forgot.",
    description:
      "A first-person psychological horror experience set in a decaying experimental facility. Survive the entity that hunts you and uncover the truth behind the failed experiments.",
    backgroundUrl: "/site-images/LabPic1.png",
  },
  about: {
    title: "The Facility Awaits",
    p1: "You wake up in a cold, sterile room with no memory of how you arrived. The air is thick with the smell of ozone and decay. Something went wrong here-terribly wrong.",
    p2: "Subject 14 is a realistic, story-driven horror game built in Unreal Engine 5. Explore a decent-sized environment with multiple rooms and connected sections, each holding a piece of a disturbing puzzle.",
    p3: "This isn't just a game of hide and seek. You must restore power, unlock doors, and solve intricate puzzles while being stalked by an AI-driven villain that adapts to your every move.",
    imageUrl: "/site-images/LABpic2.png",
  },
  story: {
    title: "A Legacy of Pain",
    p1: "The halls of the facility whisper with the voices of those who came before. Blood-stained walls and abandoned experiments tell a story of ambition turned into madness.",
    p2: "Confusion and fear are your only companions as you navigate through flickering lights and locked sections. Every clue you find brings you closer to the truth-and closer to the inhuman presence hunting you.",
    p3: "Escape is your only goal, but the facility doesn't want to let you go. Will you uncover the secret of Subject 14, or become just another failed experiment?",
    imageUrl: "/site-images/labpic3.png",
  },
  gallery: {
    title: "Visual Nightmares",
    subtitle: "Captured from the abyss",
    items: [
      {
        title: "New Map Corridor",
        url: "/site-images/labpic4.png",
      },
      {
        title: "Containment Hall",
        url: "/site-images/labpic5.png",
      },
      {
        title: "Laboratory Access",
        url: "/site-images/labpic6.png",
      },
      {
        title: "Research Wing",
        url: "/site-images/labpic7.png",
      },
      {
        title: "Facility Depths",
        url: "/site-images/labpic8.png",
      },
      {
        title: "Emergency Sector",
        url: "/site-images/LabPic9.png",
      },
      {
        title: "Silent Passage",
        url: "/site-images/labpic10.png",
      },
      {
        title: "Observation Route",
        url: "/site-images/labpic11.png",
      },
      {
        title: "Final Threshold",
        url: "/site-images/Labpic12.png",
      },
    ],
  },
  trailer: {
    title: "Official Trailer",
    subtitle: "Experience the terror in motion",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    videoUrl: "",
  },
  features: {
    title: "Engineered for Terror",
    subtitle: "Unparalleled immersion in a world of shadows",
    items: [
      {
        title: "Intense First-Person Horror",
        description: "Experience the terror through the eyes of a survivor in a hyper-realistic setting.",
      },
      {
        title: "Stalking AI Villain",
        description: "A major threat that can chase and catch you. It learns your patterns and hunts you relentlessly.",
      },
      {
        title: "Puzzle-Solving & Exploration",
        description: "Restore power, manage generators, and unlock the secrets of the facility to progress.",
      },
      {
        title: "Environmental Storytelling",
        description: "The world itself tells the story. Hidden clues and disturbing evidence are everywhere.",
      },
      {
        title: "Immersive Sound Design",
        description: "Binaural audio and whisper-based fear that makes you question every sound behind you.",
      },
      {
        title: "Unreal Engine 5 Visuals",
        description: "Cutting-edge graphics that bring the oppressive atmosphere of the facility to life.",
      },
    ],
  },
  download: {
    title: "Face the Unknown",
    subtitle: "The facility is waiting. Experience the first 60 minutes of the nightmare that everyone is talking about.",
    demoUrl: "",
    steamUrl: "",
  },
  footer: {
    credits: "Developed by Ahmad Uwaida",
  },
};
