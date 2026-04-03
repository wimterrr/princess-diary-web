import test from "node:test";
import assert from "node:assert/strict";

import { restoreSavedState } from "../src/state/restoreState.js";

test("restores a valid save by rebuilding canonical derived fields", () => {
  const restored = restoreSavedState({
    currentWeek: 3,
    totalWeeks: 3,
    screen: "ending",
    choices: [
      { week: 1, id: "archive_study", label: "Archive study" },
      { week: 2, id: "strategy_lesson", label: "Strategy lesson" },
      { week: 3, id: "strategy_lesson", label: "Strategy lesson" }
    ],
    stats: { grace: 99, wit: 0, nerve: -10 },
    confidants: { tutor: 99, guard: 0, maid: 0 },
    tags: ["forged"],
    journal: [],
    ending: { title: "Forged Princess" }
  });

  assert.ok(restored);
  assert.equal(restored.screen, "ending");
  assert.equal(restored.currentWeek, 3);
  assert.deepEqual(restored.tags, ["curious", "ledger-minded", "strategic", "measured"]);
  assert.equal(restored.ending.title, "Glass Quill Regent");
  assert.equal(restored.ending.confidantLead, "tutor");
});

test("rejects a save with an invalid week pick", () => {
  const restored = restoreSavedState({
    currentWeek: 2,
    totalWeeks: 3,
    screen: "week",
    choices: [{ week: 1, id: "stable_escape", label: "Stable escape" }]
  });

  assert.equal(restored, null);
});

test("rejects a save whose progress markers do not match the rebuilt run", () => {
  const restored = restoreSavedState({
    currentWeek: 2,
    totalWeeks: 3,
    screen: "ending",
    choices: [{ week: 1, id: "etiquette_drill", label: "Etiquette drill" }]
  });

  assert.equal(restored, null);
});
