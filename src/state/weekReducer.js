import { WEEKS, ACTIVITY_LIBRARY } from "../content/weeks.js";

function pushUniqueTags(existingTags, nextTags) {
  const set = new Set(existingTags);
  for (const tag of nextTags) {
    set.add(tag);
  }
  return Array.from(set);
}

function pickDominantKey(record) {
  return Object.entries(record).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }
    return a[0].localeCompare(b[0]);
  })[0][0];
}

export function buildEnding(state) {
  const dominantStat = pickDominantKey(state.stats);
  const confidantLead = pickDominantKey(state.confidants);
  const lastChoice = state.choices[state.choices.length - 1];
  const endingTitleByStat = {
    grace: "Velvet Heir",
    wit: "Glass Quill Regent",
    nerve: "Midnight Standard-Bearer"
  };

  return {
    title: endingTitleByStat[dominantStat],
    dominantStat,
    confidantLead,
    decisiveTags: state.tags.slice(-3),
    finalChoice: lastChoice?.label ?? "an unreadable silence"
  };
}

export function applyWeekChoice(state, activityId) {
  const weekCard = WEEKS[state.currentWeek - 1];
  if (!weekCard) {
    throw new Error(`Unknown week: ${state.currentWeek}`);
  }

  if (!weekCard.picks.includes(activityId)) {
    throw new Error(`Invalid activity for week ${state.currentWeek}: ${activityId}`);
  }

  const activity = ACTIVITY_LIBRARY[activityId];
  if (!activity) {
    throw new Error(`Unknown activity: ${activityId}`);
  }

  const nextState = {
    ...state,
    stats: {
      ...state.stats,
      [activity.stat]: state.stats[activity.stat] + activity.statDelta
    },
    confidants: {
      ...state.confidants,
      [activity.confidant]: state.confidants[activity.confidant] + activity.confidantDelta
    },
    tags: pushUniqueTags(state.tags, activity.tags),
    journal: [
      ...state.journal,
      {
        week: weekCard.week,
        prompt: weekCard.prompt,
        activity: activity.label,
        note: activity.note,
        confidantBeat: weekCard.confidantBeat
      }
    ],
    choices: [
      ...state.choices,
      {
        week: weekCard.week,
        id: activityId,
        label: activity.label
      }
    ]
  };

  if (state.currentWeek >= state.totalWeeks) {
    nextState.currentWeek = state.totalWeeks;
    nextState.screen = "ending";
    nextState.ending = buildEnding(nextState);
    return nextState;
  }

  nextState.currentWeek = state.currentWeek + 1;
  nextState.screen = "week";
  return nextState;
}
