import "./styles.css";
import { WEEKS } from "./content/weeks.js";
import { createInitialState } from "./state/gameState.js";
import { applyWeekChoice } from "./state/weekReducer.js";
import { InvalidSaveError, clearSave, loadSave, writeSave } from "./storage/saveSlot.js";
import { renderWeekScreen } from "./ui/renderWeekScreen.js";
import { renderDiaryPage } from "./ui/renderDiaryPage.js";
import { renderEndingCausePage } from "./ui/renderEndingCausePage.js";

const app = document.querySelector("#app");

let state = createInitialState();
let statusMessage = "Loading save slot...";
let interactionLocked = false;

function render() {
  const completionMarkup =
    state.screen === "ending"
      ? `
        <section class="layout-grid">
          ${renderDiaryPage(state)}
          ${renderEndingCausePage(state)}
        </section>
      `
      : "";

  app.innerHTML = `
    <main class="shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">Three-week same-princess proof</p>
          <p class="status">${statusMessage}</p>
        </div>
        <div class="topbar__actions">
          <button data-action="restart" class="ghost">Restart run</button>
        </div>
      </header>
      ${state.screen === "week" ? renderWeekScreen(state) : ""}
      ${completionMarkup}
      <section class="panel panel--history">
        <h2>Diary trail</h2>
        <ol class="history">
          ${state.journal
            .map(
              (entry) => `
                <li>
                  <strong>Week ${entry.week}:</strong> ${entry.activity}
                  <span>${entry.note}</span>
                </li>
              `
            )
            .join("")}
        </ol>
      </section>
    </main>
  `;

  bindEvents();
}

function bindEvents() {
  for (const button of app.querySelectorAll("[data-activity-id]")) {
    button.addEventListener("click", async () => {
      if (interactionLocked) {
        return;
      }

      const activityId = button.getAttribute("data-activity-id");
      interactionLocked = true;
      button.disabled = true;

      const restart = app.querySelector("[data-action='restart']");
      if (restart) {
        restart.disabled = true;
      }

      try {
        state = applyWeekChoice(state, activityId);
        await writeSave(state);
        const nextWeek = WEEKS[state.currentWeek - 1];
        statusMessage =
          state.screen === "ending"
            ? "Saved final proof to IndexedDB."
            : `Saved week ${state.currentWeek - 1}. Next up: week ${nextWeek.week}.`;
      } catch (error) {
        console.error(error);
        statusMessage = "Could not save that choice. The last valid run is still loaded.";
      } finally {
        interactionLocked = false;
        render();
      }
    });
  }

  const restart = app.querySelector("[data-action='restart']");
  restart?.addEventListener("click", async () => {
    if (interactionLocked) {
      return;
    }

    interactionLocked = true;
    restart.disabled = true;

    try {
      state = createInitialState();
      await clearSave();
      statusMessage = "Started a fresh run and cleared the save slot.";
    } catch (error) {
      console.error(error);
      statusMessage = "Could not clear the save slot. The current run is still loaded.";
    } finally {
      interactionLocked = false;
      render();
    }
  });
}

async function boot() {
  try {
    const savedState = await loadSave();
    if (savedState) {
      state = savedState;
      statusMessage = `Loaded week ${savedState.currentWeek} from IndexedDB.`;
    } else {
      statusMessage = "Fresh run ready. Pick one court pressure.";
    }
  } catch (error) {
    console.error(error);
    if (error instanceof InvalidSaveError) {
      state = createInitialState();
      try {
        await clearSave();
      } catch (clearError) {
        console.error(clearError);
      }
      statusMessage = "Discarded an invalid save and restarted the three-week proof.";
    } else {
      statusMessage = "IndexedDB failed; running unsaved local session.";
    }
  }

  render();
}

boot();
