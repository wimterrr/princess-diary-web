export function renderEndingCausePage(state) {
  const ending = state.ending;

  return `
    <article class="panel receipt">
      <p class="eyebrow">Receipt 2</p>
      <h2>Ending Cause Page</h2>
      <p class="ending-title">${ending.title}</p>
      <p>
        This run resolves into <strong>${ending.title}</strong> because your highest stat is
        <strong>${ending.dominantStat}</strong>, your strongest ally is <strong>${ending.confidantLead}</strong>,
        and the closing choice was <strong>${ending.finalChoice}</strong>.
      </p>
      <p>
        The decisive tag trail is ${ending.decisiveTags.join(", ")}. Those tags point to the same princess voice as the diary:
        poised choices yield a soft court player, strategic choices yield a calculating regent, and bold choices yield a night-walking heir.
      </p>
    </article>
  `;
}
