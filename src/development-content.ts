export type DevelopmentArticleSlug = "facility-design" | "puzzle-exploration" | "horror-atmosphere";

export type DevelopmentArticle = {
  slug: DevelopmentArticleSlug;
  title: string;
  deck: string;
  metaDescription: string;
  readingLabel: string;
  imageUrl: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
};

export const developmentArticles: DevelopmentArticle[] = [
  {
    slug: "facility-design",
    title: "Designing the Abandoned Research Facility",
    deck:
      "How the rooms, corridors, and locked sections are being shaped so the facility feels like a place with a past instead of a simple maze.",
    metaDescription:
      "Development notes on Subject 14's abandoned research facility, connected rooms, environmental clues, and horror level design.",
    readingLabel: "Level notes",
    imageUrl: "/site-images/labpic8.png",
    sections: [
      {
        heading: "Starting With a Place That Feels Used",
        paragraphs: [
          "Subject 14 is built around an experimental facility, so the first job is making that location feel like it had a function before the player arrived. The rooms are not meant to be random horror spaces. A lab, a storage area, a corridor, an observation desk, a stairwell, and a locked section should each suggest why they exist and why they were left in such a bad state.",
          "The screenshots already show a mix of practical areas: research rooms, chemical storage, containment, medical spaces, and service routes. That range is useful because the facility can change mood without changing identity. A clean white room can feel wrong after a bloodied lab. A long access corridor can feel unsafe even when nothing is visible. The goal is to let the player read the building before the game explains it.",
        ],
      },
      {
        heading: "Connected Rooms Matter",
        paragraphs: [
          "The site describes Subject 14 as a first-person horror game with multiple rooms and connected sections. That connection is important. A horror map becomes easier to believe when the player can build a mental picture of it. If a corridor leads to a lab, and that lab leads back toward a locked door, the player starts making plans. When the lights flicker or the entity interrupts that plan, the fear comes from losing control of something the player almost understood.",
          "The facility is also designed around returning to places with new information. A door that means nothing early on can become a landmark later. A generator room can start as a simple objective and become a place the player dreads revisiting. This keeps the map from feeling like a set of disposable scenes.",
        ],
      },
      {
        heading: "Environmental Storytelling Without Overexplaining",
        paragraphs: [
          "The story on the site points to failed experiments, abandoned work, and evidence left in the environment. I want those details to work quietly. A desk, a broken monitor, a blood trail, or a sealed room can say enough if it is placed with care. The player should not need a long note every few steps to understand that something happened here.",
          "That does not mean the facility has no written clues. It means the writing has to support the room instead of replacing it. When text appears, it should help the player connect pieces they already noticed: why power matters, why certain doors are locked, or why a section feels more dangerous than the last one.",
          "The overall direction is simple: make the facility readable, hostile, and believable. If players remember a hallway because of what happened there, the level is doing its job.",
        ],
      },
    ],
  },
  {
    slug: "puzzle-exploration",
    title: "Building Puzzles Around Exploration",
    deck:
      "A look at how power, locked doors, generators, and route planning support the horror instead of slowing the game down.",
    metaDescription:
      "Development notes on Subject 14's puzzle design, exploration flow, power restoration, locked doors, and player routing.",
    readingLabel: "Gameplay notes",
    imageUrl: "/site-images/labpic10.png",
    sections: [
      {
        heading: "Puzzles Should Give the Player a Reason to Move",
        paragraphs: [
          "Subject 14 is not being treated as a game where puzzles sit apart from the horror. The site already describes restoring power, unlocking doors, managing generators, and searching connected rooms. Those actions work best when they give the player a reason to cross unsafe ground. A puzzle is not just a code or a switch. It is the excuse that sends you back through a corridor you did not want to enter again.",
          "That is why the exploration loop matters. The player finds a locked path, looks for the missing piece, checks side rooms, and slowly learns the shape of the facility. Progress should feel earned through observation. If a room has a generator, a damaged panel, or a restricted door, the player should be able to understand that it belongs to the same system.",
        ],
      },
      {
        heading: "Keeping Objectives Clear",
        paragraphs: [
          "Horror can become frustrating when the player is lost for the wrong reason. Confusion is useful when it belongs to the story, but objectives still need enough clarity. The player can feel nervous, rushed, or unsure what is waiting nearby without being completely unsure what the game wants.",
          "The puzzle design is built around physical tasks that fit the facility: restoring electricity, opening locked sections, finding evidence, and moving through blocked routes. These are simple ideas, but they allow tension to build naturally. If power comes back on, the building changes. If a door opens, a new section is available. If the entity is nearby, even a small trip can become risky.",
        ],
      },
      {
        heading: "Exploration Creates Memory",
        paragraphs: [
          "Good exploration leaves marks in the player's memory. A locker service hall, a stairwell access point, or an observation desk should become more than scenery. The player should remember where they saw a useful route, where they heard something, and where they made a mistake.",
          "That memory is useful for pacing. Early exploration can be slower and more curious. Later, the same space can become urgent because the player knows the route and knows what can go wrong. The puzzle does not need to become bigger every time. Sometimes it only needs to ask the player to go back through a familiar place under worse conditions.",
          "I also want the puzzle pieces to feel like they belong in the building. A key item should not feel dropped into a room because a game needed a key item. It should sit near equipment, damage, or evidence that explains why it was left there.",
          "The aim is to make each objective feel grounded in the building. When the player solves something, the reward is not only a door opening. It is a better understanding of the facility and one step closer to escaping it.",
        ],
      },
    ],
  },
  {
    slug: "horror-atmosphere",
    title: "Designing the Horror Atmosphere and Encounters",
    deck:
      "Notes on using lighting, sound, first-person tension, and the stalking entity without turning every moment into a jump scare.",
    metaDescription:
      "Development notes on Subject 14's horror atmosphere, lighting, sound design, and AI-driven enemy encounters.",
    readingLabel: "Atmosphere notes",
    imageUrl: "/site-images/03-story.jpg",
    sections: [
      {
        heading: "Let the Room Work First",
        paragraphs: [
          "Subject 14 uses a dark research facility because it gives the horror a practical frame. A broken lab light, a sealed door, an empty observation area, or a stained wall can create tension before anything moves. I would rather let the player sit with those details than cover every second with noise.",
          "The site already points to flickering lights, environmental clues, binaural audio, and a presence that hunts the player. Those parts need space. If every hallway screams for attention, the player stops listening. Quiet moments make the next sound matter more.",
        ],
      },
      {
        heading: "Sound as a Warning System",
        paragraphs: [
          "The sound direction is meant to make the player question distance and safety. A whisper, a generator, a door, or a footstep can change how a room feels. Binaural audio is useful here because first-person horror depends on the player believing something may be behind them or just outside the frame.",
          "Sound also gives the entity a presence before a chase starts. The player should learn to listen for trouble. A bad decision can be loud. Running at the wrong time, forcing a route, or staying too long near an objective can turn a warning into pressure. That kind of encounter is more interesting than a threat that simply appears on a timer.",
        ],
      },
      {
        heading: "The Entity Needs Rules",
        paragraphs: [
          "The website describes an AI-driven villain that can chase, catch, and adapt to the player's movement. For that to feel fair, the entity needs behavior the player can partly read. It can still be frightening, but it should not feel random. If players believe their choices matter, fear becomes more active.",
          "That is why encounters are tied to route planning and noise. The player is not only hiding. They are deciding when to move, when to wait, and whether the next objective is worth the risk. A corridor can be safe one minute and dangerous the next because the player's actions changed the situation.",
          "The facility layout supports that idea. A familiar room can become a temporary refuge, then become a bad choice later if the player keeps treating it the same way. Encounters work better when the player can explain what they did wrong, even if they only understand it after the danger passes.",
          "The goal is not constant panic. The goal is pressure that rises and falls. Subject 14 works best when the player has just enough time to think, then realizes the facility has not been quiet for their benefit. That pause is part of the scare.",
        ],
      },
    ],
  },
];

export function findDevelopmentArticle(slug: string): DevelopmentArticle | undefined {
  return developmentArticles.find((article) => article.slug === slug);
}

export function getDevelopmentArticleWordCount(article: DevelopmentArticle): number {
  return article.sections
    .flatMap((section) => section.paragraphs)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
