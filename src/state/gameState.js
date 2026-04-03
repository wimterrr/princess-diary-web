export const INITIAL_STATS = {
  grace: 1,
  wit: 1,
  nerve: 1
};

export const INITIAL_CONFIDANTS = {
  tutor: 0,
  guard: 0,
  maid: 0
};

export function createInitialState() {
  return {
    currentWeek: 1,
    totalWeeks: 3,
    stats: { ...INITIAL_STATS },
    confidants: { ...INITIAL_CONFIDANTS },
    tags: [],
    journal: [],
    choices: [],
    ending: null,
    screen: "week"
  };
}
