export const ACTIVITY_LIBRARY = {
  etiquette_drill: {
    label: "Etiquette drill",
    stat: "grace",
    statDelta: 1,
    confidant: "tutor",
    confidantDelta: 1,
    tags: ["poised", "court-polish"],
    note: "You hold your smile through the full court rehearsal."
  },
  archive_study: {
    label: "Archive study",
    stat: "wit",
    statDelta: 1,
    confidant: "maid",
    confidantDelta: 1,
    tags: ["curious", "ledger-minded"],
    note: "Dusty letters turn into clues about the court's old bargains."
  },
  night_patrol: {
    label: "Night patrol",
    stat: "nerve",
    statDelta: 1,
    confidant: "guard",
    confidantDelta: 1,
    tags: ["bold", "watchful"],
    note: "You walk the walls long enough to spot where the lanterns fail."
  },
  tea_audience: {
    label: "Tea audience",
    stat: "grace",
    statDelta: 1,
    confidant: "maid",
    confidantDelta: 1,
    tags: ["soft-power", "listening"],
    note: "Guests leave thinking you told them exactly what they wanted."
  },
  strategy_lesson: {
    label: "Strategy lesson",
    stat: "wit",
    statDelta: 1,
    confidant: "tutor",
    confidantDelta: 1,
    tags: ["strategic", "measured"],
    note: "You map three outcomes before anyone else names the first."
  },
  stable_escape: {
    label: "Stable escape",
    stat: "nerve",
    statDelta: 1,
    confidant: "guard",
    confidantDelta: 1,
    tags: ["restless", "untamed"],
    note: "You ride past the last watchtower just to prove you can."
  }
};

export const WEEKS = [
  {
    week: 1,
    prompt: "The court expects a tidy debut week. What kind of princess do they meet first?",
    confidantBeat: "The household starts placing quiet bets on your future temperament.",
    picks: ["etiquette_drill", "archive_study", "night_patrol"]
  },
  {
    week: 2,
    prompt: "Rumors thicken around the spring treaty dinner. Which pressure do you lean into?",
    confidantBeat: "Someone close to you notices what you practice when nobody is watching.",
    picks: ["tea_audience", "strategy_lesson", "stable_escape"]
  },
  {
    week: 3,
    prompt: "On the eve of the treaty, you only have time to sharpen one final instinct.",
    confidantBeat: "Your closest ally decides whether to steady you or simply get out of your way.",
    picks: ["strategy_lesson", "tea_audience", "night_patrol"]
  }
];
