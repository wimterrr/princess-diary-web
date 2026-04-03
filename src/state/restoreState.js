import { ACTIVITY_LIBRARY, WEEKS } from "../content/weeks.js";
import { createInitialState } from "./gameState.js";
import { applyWeekChoice } from "./weekReducer.js";

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isValidChoice(rawChoice, index) {
  if (!isPlainObject(rawChoice)) {
    return false;
  }

  const expectedWeek = index + 1;
  const weekCard = WEEKS[index];
  return (
    rawChoice.week === expectedWeek &&
    typeof rawChoice.id === "string" &&
    weekCard.picks.includes(rawChoice.id) &&
    ACTIVITY_LIBRARY[rawChoice.id]?.label === rawChoice.label
  );
}

export function restoreSavedState(rawState) {
  if (!isPlainObject(rawState)) {
    return null;
  }

  const rawChoices = rawState.choices;
  if (!Array.isArray(rawChoices) || rawChoices.length > WEEKS.length) {
    return null;
  }

  if (!rawChoices.every(isValidChoice)) {
    return null;
  }

  let restoredState = createInitialState();
  for (const choice of rawChoices) {
    restoredState = applyWeekChoice(restoredState, choice.id);
  }

  const expectedScreen = rawChoices.length >= WEEKS.length ? "ending" : "week";
  if (rawState.screen !== expectedScreen) {
    return null;
  }

  if (
    !Number.isInteger(rawState.currentWeek) ||
    rawState.currentWeek !== restoredState.currentWeek ||
    rawState.totalWeeks !== restoredState.totalWeeks
  ) {
    return null;
  }

  return restoredState;
}
