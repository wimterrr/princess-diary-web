function describePrincess(ending) {
  if (!ending) {
    return "an unfinished princess";
  }

  const mapping = {
    grace: "a velvet-spoken heir who rules by making every room feel arranged in her favor",
    wit: "a razor-calm heir who keeps three plans hidden inside every polite answer",
    nerve: "a moonlit heir who would rather test the walls herself than trust a comfortable rumor"
  };

  return mapping[ending.dominantStat];
}

export function renderDiaryPage(state) {
  const ending = state.ending;
  const lastEntry = state.journal[state.journal.length - 1];

  return `
    <article class="panel receipt">
      <p class="eyebrow">Receipt 1</p>
      <h2>Week-3 Diary Page</h2>
      <p>
        Tonight I finally sound like ${describePrincess(ending)}.
        The court keeps calling it composure, but it feels more like choosing ${ending.finalChoice.toLowerCase()}
        at exactly the moment everyone expected me to flinch.
      </p>
      <p>
        ${lastEntry?.confidantBeat ?? "Someone close noticed first."}
        I can hear it in the way the halls answer back when I walk them now.
      </p>
    </article>
  `;
}
