/* ============================================================
   Interview Study App — Shared application script
   Drives sidebar, theme, progress, code highlighting, quizzes,
   flashcards, accordions, scroll-spy. Loaded by every page so
   the whole app behaves and looks the same.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Lesson manifest (single source of truth) ---------- */
  const LESSONS = [
    { id: "A", file: "A-career-star.html",     title: "Câu chuyện sự nghiệp & STAR", prio: "must",   group: "Vòng 1 — Phải kể được", desc: "Pitch 90 giây, 3 giai đoạn, bộ STAR behavioral." },
    { id: "D", file: "D-sent-automation.html",  title: "SENT Automation Case Study",  prio: "must",   group: "Vòng 1 — Phải kể được", desc: "Thành tựu lớn nhất: 1–2 tháng → 2–3 ngày." },
    { id: "B", file: "B-autosar.html",          title: "AUTOSAR Classic & Adaptive",  prio: "must",   group: "Vòng 1 — Phải kể được", desc: "Kiến trúc tầng, BSW/MCAL, RTE, ARA, SOME/IP." },
    { id: "B1a", file: "B1a-mcal-io.html",      title: "MCAL I/O — PORT/DIO/ADC",       prio: "core",   group: "AUTOSAR — Module (đào sâu)", desc: "PORT (mux/dir/pull), DIO (channel/port/group), ADC (group/streaming/trigger/priority)." },
    { id: "B1b", file: "B1b-mcal-timer.html",   title: "MCAL Timer — GPT/PWM/ICU",      prio: "core",   group: "AUTOSAR — Module (đào sâu)", desc: "GPT (mode/tick), PWM (class/duty/edge), ICU (4 mode, đo SENT)." },
    { id: "B1c", file: "B1c-mcal-system.html",  title: "MCAL System — MCU/WDG/SPI/Fls", prio: "core",   group: "AUTOSAR — Module (đào sâu)", desc: "MCU (clock/PLL/reset), WDG (window/WdgM), SPI (job/sequence), Fls (sector/erase)." },
    { id: "B2", file: "B2-memory.html",         title: "Memory Stack (NvM→Fls)",       prio: "core",   group: "AUTOSAR — Module (đào sâu)", desc: "NvM, MemIf, Fee/Ea, Fls/Eep — block, write strategy, wear-leveling." },
    { id: "B3", file: "B3-communication.html",  title: "Communication Stack",          prio: "core",   group: "AUTOSAR — Module (đào sâu)", desc: "COM, PduR, CanIf, CanTp, CanSM, CanNm, ComM." },
    { id: "B4", file: "B4-diagnostics.html",    title: "Diagnostics (Dcm/Dem/UDS)",    prio: "core",   group: "AUTOSAR — Module (đào sâu)", desc: "UDS dispatch, session, security, DTC, debounce/aging." },
    { id: "B5", file: "B5-os.html",             title: "AUTOSAR OS",                   prio: "core",   group: "AUTOSAR — Module (đào sâu)", desc: "Task, Alarm, Event, Resource/OCPP, Schedule Table, MPU." },
    { id: "B6", file: "B6-mode-management.html", title: "Mode Management (EcuM/BswM)",  prio: "core",   group: "AUTOSAR — Module (đào sâu)", desc: "EcuM state/startup/sleep/wakeup, BswM rule→action, immediate/deferred." },
    { id: "C", file: "C-testing.html",          title: "Testing Methodology & Tools", prio: "must",   group: "Vòng 1 — Phải kể được", desc: "Test levels, coverage MC/DC, Cantata, ECU-Test." },
    { id: "E", file: "E-protocols.html",        title: "Communication Protocols",     prio: "core",   group: "Vòng 2 — Core embedded", desc: "UART, SPI, I2C, CAN, SENT, UDS, LIN." },
    { id: "F", file: "F-mcu-peripherals.html",  title: "MCU Peripherals & HW Debug",  prio: "core",   group: "Vòng 2 — Core embedded", desc: "GPIO, Timer, ADC, WDG, RH850, TRACE32, UDE." },
    { id: "G", file: "G-embedded-c.html",       title: "Embedded C/C++ Fundamentals", prio: "core",   group: "Vòng 2 — Core embedded", desc: "Memory layout, volatile, ISR, padding, linker, MISRA C." },
    { id: "K", file: "K-vecu-sil.html",         title: "vECU · MIL/SIL/HIL · SIL Kit", prio: "core",   group: "Vòng 2.5 — vECU & Mô phỏng (JD)", desc: "Virtual ECU, PoC, xIL, Vector SIL Kit, co-simulation bus." },
    { id: "L", file: "L-fmi-fmu.html",          title: "FMI / FMU (Co-Simulation)",   prio: "core",   group: "Vòng 2.5 — vECU & Mô phỏng (JD)", desc: "FMI 2.0/3.0, Model Exchange vs Co-Sim, đóng gói .fmu." },
    { id: "M", file: "M-host-runtime.html",     title: "Host Runtime — Win/POSIX & Build", prio: "core", group: "Vòng 2.5 — vECU & Mô phỏng (JD)", desc: "pthread/thread, timer, atomics, memory ordering, CMake/MSVC/Clang, VS debug." },
    { id: "H", file: "H-iso26262.html",         title: "ISO 26262 / Functional Safety", prio: "core", group: "Vòng 3 — Chiều sâu", desc: "ASIL, safe state, FMEA/FTA, vì sao MC/DC." },
    { id: "J", file: "J-cicd-cloud.html",       title: "Automation / CI-CD / Cloud",  prio: "core",   group: "Vòng 3 — Chiều sâu", desc: "Azure Pipelines, Conan, Docker, K8s, Terraform." },
    { id: "I", file: "I-ai-llm.html",           title: "AI / LLM Engineering",        prio: "defend", group: "Vòng 4 — AI & tổng duyệt", desc: "RAG, agentic AI, prompt/context, governance." },
    { id: "LX0", file: "luxoft/LX0-jd-strategy.html",   title: "Luxoft JD — Gap map & Chiến lược", prio: "must", group: "Luxoft — TCU · CI & Integration", desc: "Đối chiếu JD ↔ CV, câu hỏi rủi ro, pitch riêng cho vị trí CI/Integration Lead." },
    { id: "LX1", file: "luxoft/LX1-review-gating.html", title: "Gerrit · Zuul · Jenkins · GitLab (optional)",  prio: "bg", group: "Luxoft — TCU · CI & Integration", desc: "Code review Gerrit, gating Zuul (check/gate, speculative merge), Jenkinsfile, .gitlab-ci.yml." },
    { id: "LX2", file: "luxoft/LX2-ci-infra-ops.html",  title: "CI Infra & Operations",            prio: "core", group: "Luxoft — TCU · CI & Integration", desc: "Ansible, Docker, Artifactory, AWS, Grafana/metrics, HIL bench trong CI, tối ưu tốc độ & ổn định." },
    { id: "LX3", file: "luxoft/LX3-telematics-at.html", title: "Telematics TCU · AT (optional)",   prio: "bg", group: "Luxoft — TCU · CI & Integration", desc: "Kiến trúc TCU, 2G→4G/5G, eCall/NG-eCall, AT command 3GPP 27.007, thiết kế AT parser." },
    { id: "LX4", file: "luxoft/LX4-osek-rtos.html",     title: "OSEK/VDX & RTOS (ôn lại)",        prio: "core", group: "Luxoft — TCU · CI & Integration", desc: "Task/conformance class, scheduling, PCP, alarm/event, OIL, ISR cat1/2, so sánh RTOS." },
    { id: "LX5", file: "luxoft/LX5-autosar-eb-integration.html", title: "AUTOSAR Integration · EB tresos", prio: "must", group: "Luxoft — TCU · CI & Integration", desc: "ARXML flow, AUTOSAR Builder → tresos → RTE, lỗi integration điển hình, tối ưu code theo target/compiler." },
    { id: "LX6", file: "luxoft/LX6-test-quality.html",  title: "Testing · VectorCAST · MISRA",     prio: "must", group: "Luxoft — TCU · CI & Integration", desc: "White/grey/black box, component & bench verification, VectorCAST, MISRA C, static analysis." },
    { id: "LX7", file: "luxoft/LX7-aspice-8d-cm.html",  title: "ASPICE · 8D · Config Management",  prio: "core", group: "Luxoft — TCU · CI & Integration", desc: "ASPICE 4.0 SWE/SUP/MAN, integration strategy, CM & baseline, 8D problem solving." },
    { id: "LX8", file: "luxoft/LX8-vector-tools-debug.html", title: "CANoe/CAPL/CANape · Debugger", prio: "core", group: "Luxoft — TCU · CI & Integration", desc: "CANalyzer/CANoe/CANape, CAPL, CAN FD/LIN/Ethernet, XCP/A2L, Lauterbach & iSystem." },
    { id: "LX9", file: "luxoft/LX9-linux-git-flashing.html", title: "Linux · Git · UDS Flashing & OTA", prio: "core", group: "Luxoft — TCU · CI & Integration", desc: "Linux/QNX troubleshooting, systemd/journalctl, Git cho integration lead (bisect, cherry-pick), bootloader & trình tự flash UDS, OTA." },
    { id: "LX10", file: "luxoft/LX10-project-deep-dive.html", title: "Project deep-dive (dự án của bạn)", prio: "must", group: "Luxoft — TCU · CI & Integration", desc: "Câu hỏi đào sâu theo từng dự án trong CV: CUBAS, MCAL, SENT debug, SENT automation, AI platform; bảng số liệu cần điền." },
    { id: "LX11", file: "luxoft/LX11-question-bank.html", title: "Question Bank (search nhanh)", prio: "must", group: "Luxoft — TCU · CI & Integration", desc: "Ngân hàng câu hỏi Theory/Practical/Behavioral theo CV, trả lời tiếng Anh, thanh search + lọc theo chủ đề để tra cứu khi phỏng vấn." }
  ];

  const PRIO_LABEL = {
    must:   { text: "Must-tell", cls: "badge--must" },
    core:   { text: "Core",      cls: "badge--core" },
    bg:     { text: "Background",cls: "badge--bg" },
    defend: { text: "Defend",    cls: "badge--defend" }
  };

  const ROOT = document.body.getAttribute("data-root") || "";
  const PAGE = document.body.getAttribute("data-page") || "index";
  const LESSONS_DIR = ROOT + "lessons/";

  /* ---------- Progress store (localStorage) ---------- */
  const STORE_KEY = "cvh-study-progress-v1";
  const Progress = {
    data: {},
    load() { try { this.data = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { this.data = {}; } },
    save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(this.data)); } catch (e) {} },
    lesson(id) { return this.data[id] || { done: false, sections: {} }; },
    setLessonDone(id, val) { const l = this.lesson(id); l.done = val; this.data[id] = l; this.save(); },
    toggleSection(id, sec) { const l = this.lesson(id); l.sections[sec] = !l.sections[sec]; this.data[id] = l; this.save(); return l.sections[sec]; },
    lessonState(id) {
      const l = this.lesson(id);
      const secs = Object.values(l.sections);
      const total = secs.length, done = secs.filter(Boolean).length;
      if (l.done) return { status: "done", pct: 100 };
      if (total && done === total) return { status: "done", pct: 100 };
      if (done > 0) return { status: "partial", pct: Math.round((done / total) * 100) };
      return { status: "none", pct: 0 };
    }
  };
  Progress.load();

  /* ---------- Theme ---------- */
  const THEME_KEY = "cvh-study-theme";
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = t === "dark" ? "☀️" : "🌙";
  }
  function initTheme() {
    let t = "light";
    try { t = localStorage.getItem(THEME_KEY) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); } catch (e) {}
    applyTheme(t);
  }

  /* ---------- Build sidebar ---------- */
  function buildSidebar() {
    const groups = [];
    const seen = {};
    LESSONS.forEach(l => { if (!seen[l.group]) { seen[l.group] = []; groups.push(l.group); } seen[l.group].push(l); });

    let html = `
      <div class="sidebar__brand">
        <div class="sidebar__logo">IV</div>
        <div class="sidebar__title">Interview Prep<small>Cao Viet Hoang · Embedded + AI</small></div>
      </div>
      <nav class="sidebar__nav">
        <a class="nav-link ${PAGE === "index" ? "active" : ""}" href="${ROOT}index.html">
          <span class="nav-link__code">🏠</span><span class="nav-link__text">Trang chủ</span>
        </a>`;
    groups.forEach(g => {
      html += `<div class="nav-group__label">${g}</div>`;
      seen[g].forEach(l => {
        const st = Progress.lessonState(l.id);
        const dotCls = st.status === "done" ? "done" : st.status === "partial" ? "partial" : "";
        html += `
          <a class="nav-link ${PAGE === l.id ? "active" : ""}" href="${LESSONS_DIR}${l.file}" data-lesson="${l.id}">
            <span class="nav-link__code">${l.id}</span>
            <span class="nav-link__text">${l.title}</span>
            <span class="nav-link__dot ${dotCls}" title="${st.status}"></span>
          </a>`;
      });
    });
    html += `</nav>`;
    const sb = document.getElementById("sidebar");
    if (sb) sb.innerHTML = html;
  }

  /* ---------- Build topbar ---------- */
  function buildTopbar() {
    const tb = document.getElementById("topbar");
    if (!tb) return;
    const current = LESSONS.find(l => l.id === PAGE);
    const title = tb.getAttribute("data-title") || (current ? `${current.id}. ${current.title}` : "Interview Preparation");
    tb.innerHTML = `
      <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Menu">☰</button>
      <span class="topbar__title">${title}</span>
      <span class="topbar__spacer"></span>
      <button class="icon-btn" id="searchBtn" title="Tìm kiếm (/)">🔎</button>
      <button class="icon-btn" id="themeToggle" title="Sáng / Tối">🌙</button>`;
  }

  /* ---------- Mobile menu ---------- */
  function initMobile() {
    const sb = document.getElementById("sidebar");
    const backdrop = document.createElement("div");
    backdrop.className = "sidebar__backdrop";
    document.body.appendChild(backdrop);
    document.addEventListener("click", e => {
      if (e.target.closest("#menuToggle")) { sb.classList.toggle("open"); backdrop.classList.toggle("show"); }
      else if (e.target === backdrop) { sb.classList.remove("open"); backdrop.classList.remove("show"); }
    });
  }

  /* ---------- Reading progress bar ---------- */
  function initReadingProgress() {
    const bar = document.querySelector(".reading-progress__bar");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.width = Math.min(100, Math.max(0, scrolled * 100)) + "%";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Code: copy buttons + light highlight ---------- */
  const C_KEYWORDS = new Set("if else for while do switch case default break continue return goto sizeof typedef struct union enum const static volatile extern register inline void signed unsigned class public private protected virtual override new delete template typename namespace using this nullptr true false try catch throw operator friend explicit constexpr import from def lambda yield async await with as pass raise elif in not and or None True False".split(" "));
  const C_TYPES = new Set("int char short long float double bool uint8_t uint16_t uint32_t uint64_t int8_t int16_t int32_t int64_t size_t FILE auto std string vector self".split(" "));

  // Single-pass tokenizer. One regex with ordered alternation keeps token
  // boundaries intact, so highlighting can never corrupt comments/strings the
  // way the old multi-pass placeholder scheme did (its number pass ate the
  // digits inside placeholders, leaving stray index numbers tangled in the
  // code). Anything not matched (operators, whitespace, box-drawing chars)
  // passes through untouched -> alignment of ASCII diagrams stays intact.
  const TOKEN_RE = /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(0x[0-9a-fA-F]+|\d+\.?\d*)\b|([A-Za-z_]\w*)/g;

  function highlight(text) {
    const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return esc.replace(TOKEN_RE, (m, com, str, num, word) => {
      if (com) return `<span class="tok-com">${com}</span>`;
      if (str) return `<span class="tok-str">${str}</span>`;
      if (num) return `<span class="tok-num">${num}</span>`;
      if (word) {
        if (C_KEYWORDS.has(word)) return `<span class="tok-key">${word}</span>`;
        if (C_TYPES.has(word)) return `<span class="tok-type">${word}</span>`;
      }
      return m;
    });
  }

  function enhanceCode() {
    document.querySelectorAll("pre > code").forEach(code => {
      const pre = code.parentElement;
      if (pre.dataset.enhanced) return;
      pre.dataset.enhanced = "1";
      const lang = code.className.replace("language-", "") || "code";
      const raw = code.textContent;
      const head = document.createElement("div");
      head.className = "code-head";
      head.innerHTML = `<span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
        <span class="lang">${lang}</span>
        <button class="copy-btn" type="button">Copy</button>`;
      if (/^(c|cpp|c\+\+|python|py|js|javascript)$/i.test(lang)) {
        code.innerHTML = highlight(raw);
      }
      head.querySelector(".copy-btn").addEventListener("click", () => {
        navigator.clipboard.writeText(raw).then(() => {
          const b = head.querySelector(".copy-btn"); b.textContent = "Copied!";
          setTimeout(() => (b.textContent = "Copy"), 1400);
        });
      });
      pre.insertBefore(head, code);
    });
  }

  /* ---------- Interactive widgets ---------- */
  function initWidgets() {
    // Q&A reveal
    document.querySelectorAll(".qa").forEach(qa => {
      const q = qa.querySelector(".qa__q");
      if (q) q.addEventListener("click", () => qa.classList.toggle("open"));
    });
    // Accordion
    document.querySelectorAll(".accordion__head").forEach(h => {
      h.addEventListener("click", () => h.closest(".accordion__item").classList.toggle("open"));
    });
    // Flashcards
    document.querySelectorAll(".flashcard").forEach(f => {
      f.addEventListener("click", () => f.classList.toggle("flipped"));
    });
  }

  /* ---------- Expand / collapse all drills ---------- */
  function initBulkControls() {
    document.querySelectorAll("[data-action='expand-qa']").forEach(btn => {
      btn.addEventListener("click", () => document.querySelectorAll(".qa").forEach(q => q.classList.add("open")));
    });
    document.querySelectorAll("[data-action='collapse-qa']").forEach(btn => {
      btn.addEventListener("click", () => document.querySelectorAll(".qa").forEach(q => q.classList.remove("open")));
    });
  }

  /* ---------- Build "On this page" TOC + scroll spy ---------- */
  function buildOnThisPage() {
    const host = document.getElementById("onThisPage");
    const content = document.querySelector(".content");
    if (!host || !content) return;
    const heads = content.querySelectorAll("h2, h3");
    if (!heads.length) { host.style.display = "none"; return; }
    let html = `<div class="onthispage__label">Trên trang này</div>`;
    heads.forEach((h, i) => {
      if (!h.id) h.id = "sec-" + i;
      // add anchor link
      if (!h.querySelector(".anchor-link")) {
        const a = document.createElement("a");
        a.className = "anchor-link"; a.href = "#" + h.id; a.textContent = "#";
        h.prepend(a);
      }
      const lvl = h.tagName === "H3" ? "lvl-3" : "";
      const txt = h.textContent.replace(/^#/, "");
      html += `<a href="#${h.id}" class="${lvl}" data-spy="${h.id}">${txt}</a>`;
    });
    host.innerHTML = html;

    const links = host.querySelectorAll("a");
    const spy = () => {
      let cur = heads[0] && heads[0].id;
      const top = (document.documentElement.scrollTop || document.body.scrollTop) + 120;
      heads.forEach(h => { if (h.offsetTop <= top) cur = h.id; });
      links.forEach(a => a.classList.toggle("active", a.getAttribute("data-spy") === cur));
    };
    document.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  /* ---------- Mark-as-learned (per lesson) ---------- */
  function initLearnBar() {
    const bar = document.getElementById("learnBar");
    if (!bar || PAGE === "index") return;
    const st = Progress.lessonState(PAGE);
    const btn = bar.querySelector("#learnToggle");
    const sync = () => {
      const done = Progress.lesson(PAGE).done;
      btn.textContent = done ? "✓ Đã học xong" : "Đánh dấu đã học xong";
      btn.classList.toggle("btn--primary", !done);
      bar.querySelector("#learnState").textContent = done ? "Hoàn thành" : "Chưa hoàn thành";
    };
    if (btn) {
      sync();
      btn.addEventListener("click", () => { Progress.setLessonDone(PAGE, !Progress.lesson(PAGE).done); sync(); buildSidebar(); });
    }
  }

  /* ---------- Build prev/next footer nav ---------- */
  function buildPageNav() {
    const host = document.getElementById("pageNav");
    if (!host || PAGE === "index") return;
    const idx = LESSONS.findIndex(l => l.id === PAGE);
    const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    let html = "";
    html += prev
      ? `<a class="prev" href="${LESSONS_DIR}${prev.file}"><div class="page-nav__dir">← Bài trước</div><div class="page-nav__title">${prev.id}. ${prev.title}</div></a>`
      : `<a class="prev" href="${ROOT}index.html"><div class="page-nav__dir">← Quay lại</div><div class="page-nav__title">Trang chủ</div></a>`;
    html += next
      ? `<a class="next" href="${LESSONS_DIR}${next.file}"><div class="page-nav__dir">Bài tiếp →</div><div class="page-nav__title">${next.id}. ${next.title}</div></a>`
      : `<a class="next" href="${ROOT}index.html"><div class="page-nav__dir">Hoàn thành →</div><div class="page-nav__title">Về trang chủ</div></a>`;
    host.innerHTML = html;
  }

  /* ---------- Hub (index) rendering ---------- */
  function buildHub() {
    const grid = document.getElementById("lessonGrid");
    if (grid) {
      let html = "";
      LESSONS.forEach(l => {
        const st = Progress.lessonState(l.id);
        const pl = PRIO_LABEL[l.prio];
        html += `
          <a class="lesson-card ${st.status === "done" ? "done" : ""}" href="${LESSONS_DIR}${l.file}">
            <span class="lesson-card__check">✓</span>
            <div class="lesson-card__top">
              <div class="lesson-card__code">${l.id}</div>
              <div class="lesson-card__title">${l.title}</div>
            </div>
            <div class="lesson-card__desc">${l.desc}</div>
            <div class="lesson-card__foot">
              <span class="badge ${pl.cls}">${pl.text}</span>
              <span class="chip">${st.pct}%</span>
            </div>
            <div class="lesson-card__progress"><i style="width:${st.pct}%"></i></div>
          </a>`;
      });
      grid.innerHTML = html;
    }
    // overall ring
    const ring = document.getElementById("overallRing");
    if (ring) {
      const total = LESSONS.length;
      const done = LESSONS.filter(l => Progress.lessonState(l.id).status === "done").length;
      const pct = Math.round((done / total) * 100);
      ring.style.setProperty("--p", pct);
      const hole = ring.querySelector(".ring__hole");
      if (hole) hole.textContent = pct + "%";
      const cnt = document.getElementById("doneCount");
      if (cnt) cnt.textContent = done;
    }
  }

  /* ---------- Simple search across lessons ---------- */
  function initSearch() {
    document.addEventListener("keydown", e => {
      // The question-bank page binds "/" to its own search box.
      if (e.key === "/" && PAGE !== "LX11" && !/input|textarea/i.test(document.activeElement.tagName)) {
        e.preventDefault(); openSearch();
      }
      if (e.key === "Escape") closeSearch();
    });
    document.addEventListener("click", e => { if (e.target.closest("#searchBtn")) openSearch(); });

    function openSearch() {
      let modal = document.getElementById("searchModal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "searchModal";
        modal.style.cssText = "position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.45);display:flex;align-items:flex-start;justify-content:center;padding-top:12vh;";
        modal.innerHTML = `
          <div style="background:var(--surface);width:min(560px,92vw);border-radius:14px;box-shadow:var(--shadow-lg);overflow:hidden;border:1px solid var(--border)">
            <input id="searchInput" placeholder="Tìm bài học… (vd: SENT, UDS, RAG, MC/DC)" autocomplete="off"
              style="width:100%;padding:16px 18px;border:none;border-bottom:1px solid var(--border);font-size:16px;background:transparent;color:var(--text);outline:none;font-family:var(--font-sans)">
            <div id="searchResults" style="max-height:50vh;overflow-y:auto"></div>
          </div>`;
        document.body.appendChild(modal);
        modal.addEventListener("click", e => { if (e.target === modal) closeSearch(); });
        modal.querySelector("#searchInput").addEventListener("input", e => renderResults(e.target.value));
      }
      modal.style.display = "flex";
      renderResults("");
      setTimeout(() => modal.querySelector("#searchInput").focus(), 30);
    }
    function renderResults(q) {
      const box = document.getElementById("searchResults");
      const ql = q.toLowerCase();
      const hits = LESSONS.filter(l => (l.id + l.title + l.desc).toLowerCase().includes(ql));
      box.innerHTML = hits.length ? hits.map(l => `
        <a href="${LESSONS_DIR}${l.file}" style="display:flex;gap:12px;align-items:center;padding:12px 18px;border-bottom:1px solid var(--border);color:var(--text)">
          <span class="lesson-card__code" style="width:34px;height:34px;font-size:15px">${l.id}</span>
          <span><b style="font-family:var(--font-head)">${l.title}</b><br><span class="small text-mute">${l.desc}</span></span>
        </a>`).join("") : `<div style="padding:18px;color:var(--text-mute)">Không tìm thấy.</div>`;
    }
    function closeSearch() { const m = document.getElementById("searchModal"); if (m) m.style.display = "none"; }
  }

  /* ---------- Theme toggle wiring ---------- */
  function initThemeToggle() {
    document.addEventListener("click", e => {
      if (e.target.closest("#themeToggle")) {
        const cur = document.documentElement.getAttribute("data-theme");
        applyTheme(cur === "dark" ? "light" : "dark");
      }
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    initTheme();
    buildSidebar();
    buildTopbar();
    initThemeToggle();
    initMobile();
    initReadingProgress();
    enhanceCode();
    initWidgets();
    initBulkControls();
    buildOnThisPage();
    initLearnBar();
    buildPageNav();
    buildHub();
    initSearch();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
