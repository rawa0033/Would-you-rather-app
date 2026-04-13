const BASE_QUESTIONS = [
  {
    id: "q1",
    category: "Sci-Fi",
    a: "Travel to a distant planet",
    b: "See 10 minutes into the future",
  },
  {
    id: "q2",
    category: "Daily Life",
    a: "Never need sleep again",
    b: "Never need to eat again",
  },
  {
    id: "q3",
    category: "Money",
    a: "Get $10,000 today",
    b: "Get $1,000 every month forever",
  },
  {
    id: "q4",
    category: "Powers",
    a: "Teleport anywhere",
    b: "Read minds (only when you want)",
  },
  {
    id: "q5",
    category: "Fun",
    a: "Only talk in rhymes",
    b: "Only communicate with emojis",
  },
  {
    id: "q6",
    category: "Adventure",
    a: "Explore the deep ocean",
    b: "Explore deep space",
  },
];

const EXTENDED_QUESTIONS = [
  {
    id: "q13",
    category: "Nature",
    a: "Be able to talk to animals",
    b: "Be able to make plants grow instantly",
  },
  {
    id: "q14",
    category: "Food",
    a: "Only eat sweet foods for the rest of your life",
    b: "Only eat spicy foods for the rest of your life",
  },
  {
    id: "q15",
    category: "History",
    a: "Visit Ancient Rome at its peak",
    b: "Visit the year 2100 for one day",
  },
  {
    id: "q16",
    category: "Skills",
    a: "Speak every human language fluently",
    b: "Be able to play every musical instrument perfectly",
  },
  {
    id: "q17",
    category: "Superpowers",
    a: "The power of invisibility",
    b: "The power of flight (max 60 mph)",
  },
  {
    id: "q18",
    category: "Lifestyle",
    a: "Live in a high-tech tiny house on wheels",
    b: "Live in a massive, slightly haunted Victorian mansion",
  },
  {
    id: "q19",
    category: "Tech",
    a: "Have a photographic digital memory (record everything you see)",
    b: "Have a built-in GPS that works even underground",
  },
  {
    id: "q20",
    category: "Entertainment",
    a: "Be a world-famous movie star",
    b: "Be a world-famous behind-the-scenes director",
  },
  {
    id: "q21",
    category: "Senses",
    a: "Have perfect night vision",
    b: "Have a sense of smell as powerful as a bloodhound's",
  },
  {
    id: "q22",
    category: "Transportation",
    a: "A car that can fly but only goes 30 mph",
    b: "A car that can go 200 mph but only on water",
  },
  {
    id: "q23",
    category: "Weather",
    a: "It is always 75°F (24°C) and sunny",
    b: "It is always 60°F (15°C) and cozy/rainy",
  },
  {
    id: "q24",
    category: "Mind",
    a: "Master any new skill in exactly 24 hours",
    b: "Be able to perfectly recall every dream you've ever had",
  },
  {
    id: "q25",
    category: "Social",
    a: "Have 100 casual friends who always want to hang out",
    b: "Have 1 best friend who would literally hide a body for you",
  },
  {
    id: "q26",
    category: "Mythology",
    a: "Own a pet dragon the size of a cat",
    b: "Own a pet phoenix that regrows every time it dies",
  },
  {
    id: "q27",
    category: "Space",
    a: "Be the first person to walk on Mars",
    b: "Be the first person to discover an alien artifact on Earth",
  },
  {
    id: "q28",
    category: "Work",
    a: "Work 4 days a week, 12 hours a day",
    b: "Work 6 days a week, 4 hours a day",
  },
  {
    id: "q29",
    category: "Media",
    a: "Only be able to watch a movie once in your life",
    b: "Only be able to listen to a song once in your life",
  },
  {
    id: "q30",
    category: "Style",
    a: "Always have to wear a full tuxedo/ballgown everywhere",
    b: "Always have to wear silk pajamas everywhere",
  },
  {
    id: "q31",
    category: "Luck",
    a: "Win every coin toss you ever participate in",
    b: "Never lose your keys or wallet ever again",
  },
  {
    id: "q32",
    category: "Body",
    a: "Never feel physical pain again",
    b: "Never feel the sensation of being tired again",
  },
];

const QUESTIONS = [...BASE_QUESTIONS, ...EXTENDED_QUESTIONS];

const STORAGE_KEY = "wyr:bootstrap:v1";

function nowISO() {
  return new Date().toISOString();
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createInitialState() {
  return {
    answered: 0,
    pickedA: 0,
    pickedB: 0,
    history: [],
    seenQuestionIds: [],
    currentQuestionId: null,
  };
}

function getState() {
  return loadState() ?? createInitialState();
}

function setState(next) {
  saveState(next);
  return next;
}

function pickRandomQuestion(excludeIds = []) {
  const pool = QUESTIONS.filter((q) => !excludeIds.includes(q.id));
  const list = pool.length ? pool : QUESTIONS;
  return list[Math.floor(Math.random() * list.length)];
}

function formatChoiceLabel(choice) {
  return choice === "a" ? "A" : "B";
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.hidden = false;
  el.classList.add("toast-msg--show");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => {
    el.classList.remove("toast-msg--show");
    el.hidden = true;
  }, 1600);
}

function setNavActive(route) {
  document.querySelectorAll("[data-route]").forEach((link) => {
    const isActive = link.getAttribute("data-route") === route;
    link.classList.toggle("active", isActive);
    link.classList.toggle("text-dark", isActive);
    link.classList.toggle("fw-bold", isActive);
    link.classList.toggle("text-secondary", !isActive);
    link.classList.toggle("fw-semibold", !isActive);
  });
}

function showView(route) {
  const play = document.getElementById("view-play");
  const stats = document.getElementById("view-stats");
  play.hidden = route !== "play";
  stats.hidden = route !== "stats";
}

function renderQuestion(q, state) {
  document.getElementById("choice-a-text").textContent = q.a;
  document.getElementById("choice-b-text").textContent = q.b;
  document.getElementById("question-category").textContent =
    "Category: " + (q.category ?? "—");
  document.getElementById("question-counter").textContent =
    "Question " + (state.answered + 1);
}

function ensureCurrentQuestion(state) {
  let q = QUESTIONS.find((x) => x.id === state.currentQuestionId) ?? null;
  if (!q) {
    q = pickRandomQuestion(state.seenQuestionIds);
    state.currentQuestionId = q.id;
    state.seenQuestionIds = [...state.seenQuestionIds, q.id].slice(-200);
    setState(state);
  }
  return q;
}

function answer(choice) {
  const state = getState();
  const q = ensureCurrentQuestion(state);
  const picked = choice === "a" ? "a" : "b";

  const next = {
    ...state,
    answered: state.answered + 1,
    pickedA: state.pickedA + (picked === "a" ? 1 : 0),
    pickedB: state.pickedB + (picked === "b" ? 1 : 0),
    history: [
      {
        at: nowISO(),
        questionId: q.id,
        category: q.category ?? null,
        a: q.a,
        b: q.b,
        picked,
      },
      ...state.history,
    ].slice(0, 50),
    currentQuestionId: null,
  };

  setState(next);
  toast("Saved: Option " + formatChoiceLabel(picked));

  const nextQ = ensureCurrentQuestion(next);
  renderQuestion(nextQ, next);
}

function skip() {
  const state = getState();
  const next = { ...state, currentQuestionId: null };
  setState(next);
  const q = ensureCurrentQuestion(next);
  renderQuestion(q, next);
  toast("Skipped");
}

function randomize() {
  const state = getState();
  const q = pickRandomQuestion([]);
  const next = { ...state, currentQuestionId: q.id };
  setState(next);
  renderQuestion(q, next);
  toast("Random question");
}

function renderStats() {
  const state = getState();
  document.getElementById("stat-total").textContent = String(state.answered);
  document.getElementById("stat-a").textContent = String(state.pickedA);
  document.getElementById("stat-b").textContent = String(state.pickedB);

  const list = document.getElementById("history-list");
  list.innerHTML = "";

  const items = state.history ?? [];
  document.getElementById("history-sub").textContent =
    items.length + (items.length === 1 ? " item" : " items");

  for (const item of items) {
    const li = document.createElement("li");
    li.className = "list-group-item py-3";

    const title = document.createElement("div");
    title.className = "fw-bold";
    title.textContent =
      "Picked " +
      formatChoiceLabel(item.picked) +
      " — " +
      (item.picked === "a" ? item.a : item.b);

    const meta = document.createElement("div");
    meta.className = "small text-secondary mt-1";
    const when = new Date(item.at);
    meta.textContent =
      (item.category ? item.category + " · " : "") + when.toLocaleString();

    const full = document.createElement("div");
    full.className = "small text-muted mt-2";
    full.textContent = "A: " + item.a + "  |  B: " + item.b;

    li.appendChild(title);
    li.appendChild(meta);
    li.appendChild(full);
    list.appendChild(li);
  }
}

function resetStats() {
  setState(createInitialState());
  toast("Stats reset");
  const state = getState();
  const q = ensureCurrentQuestion(state);
  renderQuestion(q, state);
  renderStats();
}

function normalizeRoute(hash) {
  const raw = (hash || "").replace(/^#/, "");
  const route = raw.startsWith("/") ? raw.slice(1) : raw;
  if (route === "" || route === "play") return "play";
  if (route === "stats") return "stats";
  return "play";
}

function handleRoute() {
  const route = normalizeRoute(location.hash);
  setNavActive(route);
  showView(route);

  if (route === "play") {
    const state = getState();
    const q = ensureCurrentQuestion(state);
    renderQuestion(q, state);
  } else if (route === "stats") {
    renderStats();
  }
}

function init() {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  document.getElementById("choice-a").addEventListener("click", () => answer("a"));
  document.getElementById("choice-b").addEventListener("click", () => answer("b"));
  document.getElementById("btn-skip").addEventListener("click", skip);
  document.getElementById("btn-random").addEventListener("click", randomize);
  document.getElementById("btn-reset").addEventListener("click", resetStats);

  window.addEventListener("hashchange", handleRoute);

  if (!location.hash || location.hash === "#") {
    location.hash = "#/play";
  }
  handleRoute();
}

init();
