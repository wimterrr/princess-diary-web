import { WEEKS, ACTIVITY_LIBRARY } from "../content/weeks.js";

function renderMeters(record) {
  return Object.entries(record)
    .map(([key, value]) => `<li><strong>${key}</strong><span>${value}</span></li>`)
    .join("");
}

export function renderWeekScreen(state) {
  const weekCard = WEEKS[state.currentWeek - 1];
  const picksMarkup = weekCard.picks
    .map((activityId) => {
      const activity = ACTIVITY_LIBRARY[activityId];
      return `
        <button class="choice-card" data-activity-id="${activityId}">
          <span class="choice-card__label">${activity.label}</span>
          <span class="choice-card__meta">+1 ${activity.stat}, +1 ${activity.confidant}</span>
          <span class="choice-card__note">${activity.note}</span>
        </button>
      `;
    })
    .join("");

  return `
    <section class="panel hero">
      <p class="eyebrow">Week ${weekCard.week} of ${state.totalWeeks}</p>
      <h1>Princess Diary</h1>
      <p class="lede">${weekCard.prompt}</p>
      <p class="beat">${weekCard.confidantBeat}</p>
    </section>
    <section class="layout-grid">
      <article class="panel">
        <h2>Choose one pressure</h2>
        <div class="choice-list">${picksMarkup}</div>
      </article>
      <article class="panel panel--stack">
        <div>
          <h2>Stats</h2>
          <ul class="meter-list">${renderMeters(state.stats)}</ul>
        </div>
        <div>
          <h2>Confidants</h2>
          <ul class="meter-list">${renderMeters(state.confidants)}</ul>
        </div>
        <div>
          <h2>Tag ledger</h2>
          <p class="tags">${state.tags.length ? state.tags.join(" / ") : "No tags yet."}</p>
        </div>
      </article>
    </section>
  `;
}
