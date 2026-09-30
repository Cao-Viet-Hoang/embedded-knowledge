/* ============================================================
   Question bank — search & filter UI for LX11.
   Data comes from assets/js/qbank/*.js (window.QBANK). All cards
   are rendered once, before app.js boots, so app.js still adds
   code highlighting + copy buttons; filtering only toggles them.
   ============================================================ */
(function () {
  "use strict";

  const TOPICS = {
    intro:     "Intro & Behavioral",
    hm:        "Hiring Manager",
    project:   "Project deep-dive",
    autosar:   "AUTOSAR Classic",
    embedded:  "Embedded C / MCU",
    protocols: "Protocols",
    debug:     "Debug & Tools",
    testing:   "Testing",
    process:   "ASPICE · Process · CM",
    cicd:      "CI/CD & Infra",
    linux:     "Linux / QNX"
  };
  const TYPES = { theory: "Theory", practical: "Practical", behavioral: "Behavioral" };
  const FILL_RE = /\[fill:[^\]]*\]/g;
  const HAS_FILL = /\[fill:/;

  const DATA = (window.QBANK || []).slice().sort((a, b) =>
    Object.keys(TOPICS).indexOf(a.topic) - Object.keys(TOPICS).indexOf(b.topic));

  const host = document.getElementById("qbList");
  if (!host) return;

  const state = { q: "", topic: "all", type: "all", bridge: false, fill: false, all: false };
  const LIMIT = 8;       // while searching, show at most this many results...
  const CUTOFF = 0.4;    // ...and only those scoring within 40% of the best one

  /* ---------- Helpers ---------- */
  // Lower-case and strip Vietnamese diacritics so "tu dong" matches "tự động".
  const normChar = ch => ch.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0111/g, "d");
  const norm = s => Array.from(s || "", normChar).join("");
  // Normalized text plus, for each normalized char, its index in the raw string
  // (diacritic stripping changes lengths, so highlight offsets need mapping back).
  function normMap(raw) {
    let low = "";
    const map = [];
    for (let i = 0; i < raw.length; i++) {
      const n = normChar(raw[i]);
      for (let k = 0; k < n.length; k++) map.push(i);
      low += n;
    }
    map.push(raw.length);
    return { low, map };
  }
  // Fields and queries are split into words the same way, so "mc/dc", "bus-off"
  // and "tự động" compare word by word; " word word " lets includes(" " + t) test word starts.
  const words = s => norm(s).split(/[^a-z0-9]+/).filter(Boolean);
  const field = s => " " + words(s).join(" ") + " ";
  // Same, but keeping diacritics, so a typed "lương" can outrank "luồng".
  const rawWords = s => (s || "").toLowerCase().normalize("NFC").split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const hasMarks = s => norm(s) !== s.toLowerCase().normalize("NFC");
  const esc = s => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const stripTags = s => (s || "").replace(/<[^>]+>/g, " ");
  const markFill = html => html.replace(FILL_RE, m => `<span class="qb-fill">${m}</span>`);

  /* ---------- Render all cards once ---------- */
  function cardHtml(it) {
    const keys = it.key.map(k => `<li>${markFill(esc(k))}</li>`).join("");
    const code = it.code ? `<pre><code class="language-${it.lang}">${esc(it.code)}</code></pre>` : "";
    const fu = it.followups ? `<div class="qa__followups"><div class="qa__followups-label">Follow-up</div><ul>${it.followups.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>` : "";
    return `
      <article class="qb-card" id="${it.id}" data-id="${it.id}">
        <div class="qb-card__head">
          <span class="qb-tag qb-tag--${it.type}">${TYPES[it.type]}</span>
          <span class="chip">${TOPICS[it.topic]}</span>
          ${it.bridge ? `<span class="qb-tag qb-tag--bridge" title="Tool chưa dùng trong dự án: trả lời kiểu bắc cầu, trung thực">Bridge</span>` : ""}
          <a class="qb-card__id" href="#${it.id}" title="Link tới câu này">${it.id}</a>
        </div>
        <h3 class="qb-card__q" data-hl>${esc(it.q)}</h3>
        ${it.vi ? `<p class="qb-card__vi" lang="vi" data-hl>${esc(it.vi)}</p>` : ""}
        <ul class="qb-card__key" data-hl>${keys}</ul>
        <button class="btn btn--sm qb-card__toggle" type="button">Model answer ▾</button>
        <div class="qb-card__answer">
          <p data-hl>${markFill(it.answer)}</p>
          ${code}${fu}
        </div>
      </article>`;
  }

  host.innerHTML = DATA.map(cardHtml).join("");

  const cards = DATA.map(it => {
    const el = document.getElementById(it.id);
    const hl = Array.from(el.querySelectorAll("[data-hl]"));
    return {
      it, el, hl,
      orig: hl.map(n => n.innerHTML),
      hasFill: HAS_FILL.test(it.key.join(" ") + it.answer),
      // Weighted search fields: question and tags count more than body text.
      // The Vietnamese question/tags are search aids and weigh like their English twins.
      f: {
        q: field(it.q + " " + (it.vi || "")),
        tags: field(it.tags.join(" ") + " " + (it.viTags || []).join(" ") + " " + it.id + " " + TOPICS[it.topic]),
        key: field(it.key.join(" ")),
        body: field(stripTags(it.answer) + " " + (it.followups || []).join(" ") + " " + (it.code || "")),
        vi: " " + rawWords((it.vi || "") + " " + (it.viTags || []).join(" ") + " " + it.tags.join(" ")).join(" ") + " "
      }
    };
  });

  /* ---------- Filter chips ---------- */
  function chipRow(hostId, name, entries) {
    const el = document.getElementById(hostId);
    el.innerHTML = entries.map(([v, label]) =>
      `<button type="button" class="qb-chip${state[name] === v ? " active" : ""}" data-f="${name}" data-v="${v}">${label} <span class="qb-chip__n" data-count="${name}:${v}"></span></button>`).join("");
  }
  chipRow("qbTypes", "type", [["all", "All"], ...Object.entries(TYPES)]);
  chipRow("qbTopics", "topic", [["all", "All topics"], ...Object.entries(TOPICS).filter(([k]) => DATA.some(d => d.topic === k))]);

  /* ---------- Search ---------- */
  function score(c, terms, marked) {
    let s = 0;
    for (let i = 0; i < terms.length; i++) {
      const t = terms[i], p = " " + t;   // word-start match: "os" hits "OS", not "cost"
      let w = (c.f.q.includes(p) ? 8 : 0) + (c.f.tags.includes(p) ? 6 : 0) + (c.f.key.includes(p) ? 3 : 0) +
              (t.length > 2 && c.f.body.includes(p) ? 1 : 0);
      if (!w) return 0;                  // every term must match somewhere (AND)
      // A term typed with diacritics that only matches after stripping them ("luồng" for "lương") counts a quarter.
      if (marked[i] && !c.f.vi.includes(" " + marked[i])) w = Math.ceil(w / 4);
      s += w;
    }
    if (terms.length > 1) {          // the whole query as a phrase ranks highest
      const ph = " " + terms.join(" ");
      if (c.f.q.includes(ph)) s += 12;
      else if (c.f.tags.includes(ph)) s += 8;
    }
    return s;
  }

  function passes(c, ignore) {
    return (ignore === "topic" || state.topic === "all" || c.it.topic === state.topic) &&
           (ignore === "type" || state.type === "all" || c.it.type === state.type) &&
           (!state.bridge || c.it.bridge) &&
           (!state.fill || c.hasFill);
  }

  function highlight(c, terms) {
    c.hl.forEach((n, i) => { n.innerHTML = c.orig[i]; });
    c.marked = terms.length > 0;
    if (!terms.length) return;
    const walker = document.createTreeWalker(c.el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (n.parentElement.closest("[data-hl]")) nodes.push(n);
    }
    nodes.forEach(n => {
      const raw = n.nodeValue, { low, map } = normMap(raw);
      const ranges = [];
      terms.forEach(t => {
        let i = low.indexOf(t);
        while (i !== -1) {
          if (i === 0 || !/[a-z0-9]/.test(low[i - 1])) ranges.push([map[i], map[i + t.length]]);   // word starts only, like score()
          i = low.indexOf(t, i + t.length);
        }
      });
      if (!ranges.length) return;
      ranges.sort((a, b) => a[0] - b[0]);
      const frag = document.createDocumentFragment();
      let pos = 0;
      ranges.forEach(([a, b]) => {
        if (a < pos) return;
        frag.appendChild(document.createTextNode(raw.slice(pos, a)));
        const m = document.createElement("mark"); m.textContent = raw.slice(a, b); frag.appendChild(m);
        pos = b;
      });
      frag.appendChild(document.createTextNode(raw.slice(pos)));
      n.parentNode.replaceChild(frag, n);
    });
  }

  /* ---------- Result cursor (↑/↓ while typing) ---------- */
  let shown = [], sel = -1;
  function select(i, scroll) {
    if (shown[sel]) shown[sel].el.classList.remove("qb-card--sel");
    sel = i;
    const c = shown[sel];
    if (!c) return;
    c.el.classList.add("qb-card--sel");
    if (scroll) c.el.scrollIntoView({ block: "nearest" });
  }

  function apply() {
    const terms = words(state.q);
    // Raw typed word per term when it carries diacritics (null otherwise); see score().
    const raw = rawWords(state.q);
    const marked = terms.map((t, i) => raw.length === terms.length && hasMarks(raw[i]) ? raw[i] : null);
    const matched = [];
    cards.forEach(c => {
      c.s = terms.length ? score(c, terms, marked) : 1;
      if (c.s > 0 && passes(c)) matched.push(c);
    });
    // Best matches first while searching; natural topic order otherwise.
    if (terms.length) matched.sort((a, b) => b.s - a.s);
    // While searching, keep only the strong head of the list so the answer is quick to spot.
    const min = terms.length && matched.length ? matched[0].s * CUTOFF : 0;
    const next = terms.length && !state.all ? matched.filter((c, i) => i < LIMIT && c.s >= min) : matched;

    select(-1);
    const vis = new Set(next);
    cards.forEach(c => {
      c.el.hidden = !vis.has(c);
      if (c.el.hidden && c.marked) { c.hl.forEach((n, i) => { n.innerHTML = c.orig[i]; }); c.marked = false; }
    });
    next.forEach(c => host.appendChild(c.el));
    next.forEach(c => highlight(c, terms));
    shown = next;
    host.classList.toggle("qb-list--compact", terms.length > 0);
    if (terms.length) select(0);

    const more = document.getElementById("qbMore");
    more.hidden = next.length === matched.length;
    more.textContent = `Hiện thêm ${matched.length - next.length} câu khớp yếu hơn`;
    document.getElementById("qbCount").textContent = terms.length
      ? `${next.length} / ${matched.length} khớp · ${cards.length} câu`
      : `${next.length} / ${cards.length} câu`;
    document.getElementById("qbEmpty").hidden = next.length > 0;

    // Chip counts reflect the search + the *other* filters.
    document.querySelectorAll("[data-count]").forEach(el => {
      const [name, v] = el.getAttribute("data-count").split(":");
      const n = cards.filter(c => (terms.length ? score(c, terms, marked) > 0 : true) && passes(c, name) &&
        (v === "all" || c.it[name] === v)).length;
      el.textContent = n;
    });
    document.querySelectorAll(".qb-chip").forEach(b => b.classList.toggle("active", state[b.dataset.f] === b.dataset.v));
    document.getElementById("qbBridge").classList.toggle("active", state.bridge);
    document.getElementById("qbFillBtn").classList.toggle("active", state.fill);
  }

  /* ---------- Wiring ---------- */
  const input = document.getElementById("qbSearch");
  let t;
  input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { state.q = input.value; state.all = false; apply(); }, 80); });
  input.addEventListener("keydown", e => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {   // move the cursor, keep typing focus
      if (!shown.length) return;
      e.preventDefault();
      select(Math.max(0, Math.min(shown.length - 1, sel + (e.key === "ArrowDown" ? 1 : -1))), true);
    }
    if (e.key === "Escape") {   // first close open answers, then clear the search
      const open = host.querySelectorAll(".qb-card.open");
      if (open.length) open.forEach(c => c.classList.remove("open"));
      else { input.value = ""; state.q = ""; state.all = false; apply(); }
    }
    if (e.key === "Enter") {    // open/close the selected (or best) match
      const c = shown[sel] || shown[0];
      if (c) { c.el.classList.toggle("open"); c.el.scrollIntoView({ block: "start", behavior: "smooth" }); }
    }
  });

  document.addEventListener("click", e => {
    const chip = e.target.closest(".qb-chip");
    if (chip) { state[chip.dataset.f] = chip.dataset.v; apply(); return; }
    if (e.target.closest("#qbBridge")) { state.bridge = !state.bridge; apply(); return; }
    if (e.target.closest("#qbFillBtn")) { state.fill = !state.fill; apply(); return; }
    if (e.target.closest("#qbMore")) { state.all = true; apply(); return; }
    if (e.target.closest("#qbExpand")) { host.querySelectorAll(".qb-card:not([hidden])").forEach(c => c.classList.add("open")); return; }
    if (e.target.closest("#qbCollapse")) { host.querySelectorAll(".qb-card").forEach(c => c.classList.remove("open")); return; }
    if (e.target.closest("#qbReset")) {
      Object.assign(state, { q: "", topic: "all", type: "all", bridge: false, fill: false, all: false });
      input.value = ""; apply(); input.focus(); return;
    }
    if (e.target.closest("#qbRandom")) {
      const vis = Array.from(host.querySelectorAll(".qb-card:not([hidden])"));
      if (!vis.length) return;
      host.querySelectorAll(".qb-card").forEach(c => c.classList.remove("open", "qb-card--pick"));
      const pick = vis[Math.floor(Math.random() * vis.length)];
      pick.classList.add("qb-card--pick");
      pick.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    const tog = e.target.closest(".qb-card__toggle");
    if (tog) { tog.closest(".qb-card").classList.toggle("open"); return; }
    // Compact results: clicking a card's header or question selects and opens it,
    // then hands focus back to the search box so ↑/↓ keep working.
    const card = e.target.closest(".qb-list--compact .qb-card");
    if (card && !e.target.closest(".qb-card__answer, a, button")) {
      select(shown.findIndex(c => c.el === card));
      card.classList.toggle("open");
      input.focus({ preventScroll: true });
    }
  });

  // "/" focuses the bank search on this page (app.js skips its lesson-search modal here).
  document.addEventListener("keydown", e => {
    if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) {
      e.preventDefault(); input.focus(); input.select();
    }
  });

  // Deep link: #autosar-07 opens that card.
  function openFromHash() {
    const el = location.hash && document.getElementById(location.hash.slice(1));
    if (el && el.classList.contains("qb-card")) { el.hidden = false; el.classList.add("open"); }
  }

  document.getElementById("qbTotal").textContent = cards.length;
  apply();
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
