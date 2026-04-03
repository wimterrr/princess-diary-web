(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={etiquette_drill:{label:`Etiquette drill`,stat:`grace`,statDelta:1,confidant:`tutor`,confidantDelta:1,tags:[`poised`,`court-polish`],note:`You hold your smile through the full court rehearsal.`},archive_study:{label:`Archive study`,stat:`wit`,statDelta:1,confidant:`maid`,confidantDelta:1,tags:[`curious`,`ledger-minded`],note:`Dusty letters turn into clues about the court's old bargains.`},night_patrol:{label:`Night patrol`,stat:`nerve`,statDelta:1,confidant:`guard`,confidantDelta:1,tags:[`bold`,`watchful`],note:`You walk the walls long enough to spot where the lanterns fail.`},tea_audience:{label:`Tea audience`,stat:`grace`,statDelta:1,confidant:`maid`,confidantDelta:1,tags:[`soft-power`,`listening`],note:`Guests leave thinking you told them exactly what they wanted.`},strategy_lesson:{label:`Strategy lesson`,stat:`wit`,statDelta:1,confidant:`tutor`,confidantDelta:1,tags:[`strategic`,`measured`],note:`You map three outcomes before anyone else names the first.`},stable_escape:{label:`Stable escape`,stat:`nerve`,statDelta:1,confidant:`guard`,confidantDelta:1,tags:[`restless`,`untamed`],note:`You ride past the last watchtower just to prove you can.`}},t=[{week:1,prompt:`The court expects a tidy debut week. What kind of princess do they meet first?`,confidantBeat:`The household starts placing quiet bets on your future temperament.`,picks:[`etiquette_drill`,`archive_study`,`night_patrol`]},{week:2,prompt:`Rumors thicken around the spring treaty dinner. Which pressure do you lean into?`,confidantBeat:`Someone close to you notices what you practice when nobody is watching.`,picks:[`tea_audience`,`strategy_lesson`,`stable_escape`]},{week:3,prompt:`On the eve of the treaty, you only have time to sharpen one final instinct.`,confidantBeat:`Your closest ally decides whether to steady you or simply get out of your way.`,picks:[`strategy_lesson`,`tea_audience`,`night_patrol`]}],n={grace:1,wit:1,nerve:1},r={tutor:0,guard:0,maid:0};function i(){return{currentWeek:1,totalWeeks:3,stats:{...n},confidants:{...r},tags:[],journal:[],choices:[],ending:null,screen:`week`}}function a(e,t){let n=new Set(e);for(let e of t)n.add(e);return Array.from(n)}function o(e){return Object.entries(e).sort((e,t)=>t[1]===e[1]?e[0].localeCompare(t[0]):t[1]-e[1])[0][0]}function s(e){let t=o(e.stats),n=o(e.confidants),r=e.choices[e.choices.length-1];return{title:{grace:`Velvet Heir`,wit:`Glass Quill Regent`,nerve:`Midnight Standard-Bearer`}[t],dominantStat:t,confidantLead:n,decisiveTags:e.tags.slice(-3),finalChoice:r?.label??`an unreadable silence`}}function c(n,r){let i=t[n.currentWeek-1];if(!i)throw Error(`Unknown week: ${n.currentWeek}`);if(!i.picks.includes(r))throw Error(`Invalid activity for week ${n.currentWeek}: ${r}`);let o=e[r];if(!o)throw Error(`Unknown activity: ${r}`);let c={...n,stats:{...n.stats,[o.stat]:n.stats[o.stat]+o.statDelta},confidants:{...n.confidants,[o.confidant]:n.confidants[o.confidant]+o.confidantDelta},tags:a(n.tags,o.tags),journal:[...n.journal,{week:i.week,prompt:i.prompt,activity:o.label,note:o.note,confidantBeat:i.confidantBeat}],choices:[...n.choices,{week:i.week,id:r,label:o.label}]};return n.currentWeek>=n.totalWeeks?(c.currentWeek=n.totalWeeks,c.screen=`ending`,c.ending=s(c),c):(c.currentWeek=n.currentWeek+1,c.screen=`week`,c)}function l(e){return!!e&&typeof e==`object`&&!Array.isArray(e)}function u(n,r){if(!l(n))return!1;let i=r+1,a=t[r];return n.week===i&&typeof n.id==`string`&&a.picks.includes(n.id)&&e[n.id]?.label===n.label}function d(e){if(!l(e))return null;let n=e.choices;if(!Array.isArray(n)||n.length>t.length||!n.every(u))return null;let r=i();for(let e of n)r=c(r,e.id);let a=n.length>=t.length?`ending`:`week`;return e.screen!==a||!Number.isInteger(e.currentWeek)||e.currentWeek!==r.currentWeek||e.totalWeeks!==r.totalWeeks?null:r}var f=`princess-diary-web`,p=`save-slots`,m=`slot-1`,h=class extends Error{constructor(e){super(e),this.name=`InvalidSaveError`}};function g(){return new Promise((e,t)=>{let n=indexedDB.open(f,1);n.onupgradeneeded=()=>{let e=n.result;e.objectStoreNames.contains(p)||e.createObjectStore(p)},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error??Error(`Failed to open IndexedDB`))})}async function _(){let e=await g();return await new Promise((t,n)=>{let r=e.transaction(p,`readonly`).objectStore(p).get(m);r.onsuccess=()=>{if(!r.result){t(null);return}let e=d(r.result);if(!e){n(new h(`Saved run does not match the fixed three-week contract.`));return}t(e)},r.onerror=()=>n(r.error??Error(`Failed to load save`))})}async function v(e){let t=await g();return await new Promise((n,r)=>{let i=t.transaction(p,`readwrite`);i.oncomplete=()=>n(),i.onerror=()=>r(i.error??Error(`Failed to write save`)),i.objectStore(p).put(e,m)})}async function y(){let e=await g();return await new Promise((t,n)=>{let r=e.transaction(p,`readwrite`);r.oncomplete=()=>t(),r.onerror=()=>n(r.error??Error(`Failed to clear save`)),r.objectStore(p).delete(m)})}function b(e){return Object.entries(e).map(([e,t])=>`<li><strong>${e}</strong><span>${t}</span></li>`).join(``)}function x(n){let r=t[n.currentWeek-1],i=r.picks.map(t=>{let n=e[t];return`
        <button class="choice-card" data-activity-id="${t}">
          <span class="choice-card__label">${n.label}</span>
          <span class="choice-card__meta">+1 ${n.stat}, +1 ${n.confidant}</span>
          <span class="choice-card__note">${n.note}</span>
        </button>
      `}).join(``);return`
    <section class="panel hero">
      <p class="eyebrow">Week ${r.week} of ${n.totalWeeks}</p>
      <h1>Princess Diary</h1>
      <p class="lede">${r.prompt}</p>
      <p class="beat">${r.confidantBeat}</p>
    </section>
    <section class="layout-grid">
      <article class="panel">
        <h2>Choose one pressure</h2>
        <div class="choice-list">${i}</div>
      </article>
      <article class="panel panel--stack">
        <div>
          <h2>Stats</h2>
          <ul class="meter-list">${b(n.stats)}</ul>
        </div>
        <div>
          <h2>Confidants</h2>
          <ul class="meter-list">${b(n.confidants)}</ul>
        </div>
        <div>
          <h2>Tag ledger</h2>
          <p class="tags">${n.tags.length?n.tags.join(` / `):`No tags yet.`}</p>
        </div>
      </article>
    </section>
  `}function S(e){return e?{grace:`a velvet-spoken heir who rules by making every room feel arranged in her favor`,wit:`a razor-calm heir who keeps three plans hidden inside every polite answer`,nerve:`a moonlit heir who would rather test the walls herself than trust a comfortable rumor`}[e.dominantStat]:`an unfinished princess`}function C(e){let t=e.ending,n=e.journal[e.journal.length-1];return`
    <article class="panel receipt">
      <p class="eyebrow">Receipt 1</p>
      <h2>Week-3 Diary Page</h2>
      <p>
        Tonight I finally sound like ${S(t)}.
        The court keeps calling it composure, but it feels more like choosing ${t.finalChoice.toLowerCase()}
        at exactly the moment everyone expected me to flinch.
      </p>
      <p>
        ${n?.confidantBeat??`Someone close noticed first.`}
        I can hear it in the way the halls answer back when I walk them now.
      </p>
    </article>
  `}function w(e){let t=e.ending;return`
    <article class="panel receipt">
      <p class="eyebrow">Receipt 2</p>
      <h2>Ending Cause Page</h2>
      <p class="ending-title">${t.title}</p>
      <p>
        This run resolves into <strong>${t.title}</strong> because your highest stat is
        <strong>${t.dominantStat}</strong>, your strongest ally is <strong>${t.confidantLead}</strong>,
        and the closing choice was <strong>${t.finalChoice}</strong>.
      </p>
      <p>
        The decisive tag trail is ${t.decisiveTags.join(`, `)}. Those tags point to the same princess voice as the diary:
        poised choices yield a soft court player, strategic choices yield a calculating regent, and bold choices yield a night-walking heir.
      </p>
    </article>
  `}var T=document.querySelector(`#app`),E=i(),D=`Loading save slot...`,O=!1;function k(){let e=E.screen===`ending`?`
        <section class="layout-grid">
          ${C(E)}
          ${w(E)}
        </section>
      `:``;T.innerHTML=`
    <main class="shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">Three-week same-princess proof</p>
          <p class="status">${D}</p>
        </div>
        <div class="topbar__actions">
          <button data-action="restart" class="ghost">Restart run</button>
        </div>
      </header>
      ${E.screen===`week`?x(E):``}
      ${e}
      <section class="panel panel--history">
        <h2>Diary trail</h2>
        <ol class="history">
          ${E.journal.map(e=>`
                <li>
                  <strong>Week ${e.week}:</strong> ${e.activity}
                  <span>${e.note}</span>
                </li>
              `).join(``)}
        </ol>
      </section>
    </main>
  `,A()}function A(){for(let e of T.querySelectorAll(`[data-activity-id]`))e.addEventListener(`click`,async()=>{if(O)return;let n=e.getAttribute(`data-activity-id`);O=!0,e.disabled=!0;let r=T.querySelector(`[data-action='restart']`);r&&(r.disabled=!0);try{E=c(E,n),await v(E);let e=t[E.currentWeek-1];D=E.screen===`ending`?`Saved final proof to IndexedDB.`:`Saved week ${E.currentWeek-1}. Next up: week ${e.week}.`}catch(e){console.error(e),D=`Could not save that choice. The last valid run is still loaded.`}finally{O=!1,k()}});let e=T.querySelector(`[data-action='restart']`);e?.addEventListener(`click`,async()=>{if(!O){O=!0,e.disabled=!0;try{E=i(),await y(),D=`Started a fresh run and cleared the save slot.`}catch(e){console.error(e),D=`Could not clear the save slot. The current run is still loaded.`}finally{O=!1,k()}}})}async function j(){try{let e=await _();e?(E=e,D=`Loaded week ${e.currentWeek} from IndexedDB.`):D=`Fresh run ready. Pick one court pressure.`}catch(e){if(console.error(e),e instanceof h){E=i();try{await y()}catch(e){console.error(e)}D=`Discarded an invalid save and restarted the three-week proof.`}else D=`IndexedDB failed; running unsaved local session.`}k()}j();