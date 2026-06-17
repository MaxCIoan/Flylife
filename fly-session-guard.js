(function () {
  "use strict";

  const VERSION = "20260613b";
  const PROFILE_KEY = "flagHunterLocalProfile";
  const TRUST_KEY = "flagHunterTrustedProfileV1";
  const ROCKET_ROUNDS_KEY = "flagHunterRocketRounds";
  const SERVER_RUN_KEY = "flagHunterServerRunV1";
  const ALLOWED_ROUNDS = [10, 15, 20, 50];
  const LEGACY_HISTORY_ROUNDS = [1, 10, 15, 20, 25, 50, 100, 200];
  const ROUND_OPTIONS = [1, ...ALLOWED_ROUNDS];
  const MAX_SCORE_PER_ROUND = 80000;
  const MIN_MS_PER_ROUND = 2500;
  const SALT = "flag-hunter-fly-guard-20260609";
  const PRODUCTION_API_ORIGIN = "https://flylifeforlife.netlify.app";

  let tampered = false;
  let tamperReason = null;
  let runStartedAt = 0;
  let serverRun = readJsonSafe(sessionStorage.getItem(SERVER_RUN_KEY));
  let serverRunPromise = null;

  function getFlyApiBase() {
    const hostname = window.location.hostname || "";
    const itchContext = /(^|\.)itch\.io$/i.test(hostname)
      || /itch\.io/i.test(document.referrer || "")
      || new URLSearchParams(window.location.search).has("itchStatus");
    const localContext = ["", "localhost", "127.0.0.1", "::1"].includes(hostname);
    return (itchContext || localContext) && !/flylifeforlife\.netlify\.app$/i.test(hostname) ? PRODUCTION_API_ORIGIN : "";
  }

  function readJsonSafe(value) {
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  function stable(value) {
    if (Array.isArray(value)) return value.map(stable);
    if (value && typeof value === "object") {
      return Object.keys(value).sort().reduce((acc, key) => {
        acc[key] = stable(value[key]);
        return acc;
      }, {});
    }
    return value;
  }

  function hashString(input) {
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function protectedProfile(profile) {
    return {
      playerId: String(profile?.playerId || "").slice(0, 80),
      displayName: String(profile?.displayName || "Guest").slice(0, 32),
      displayNameLocked: Boolean(profile?.displayNameLocked),
      rankPoints: Math.max(0, Math.round(Number(profile?.rankPoints) || 0)),
      runs: Array.isArray(profile?.runs) ? profile.runs.map((run) => ({
        id: run.id,
        score: Number(run.score) || 0,
        rounds: Number(run.rounds) || 0,
        correct: Number(run.correct) || 0,
        mistakes: Number(run.mistakes) || 0,
        createdAt: run.createdAt
      })) : [],
      rocketRuns: Array.isArray(profile?.rocketRuns) ? profile.rocketRuns.map((run) => ({
        id: run.id,
        score: Number(run.score) || 0,
        rounds: Number(run.rounds ?? run.selectedRounds) || 0,
        completedRounds: Number(run.completedRounds) || 0,
        longestRun: Number(run.longestRun) || 0,
        createdAt: run.createdAt
      })) : []
    };
  }

  function signatureFor(profile) {
    return hashString(JSON.stringify(stable(protectedProfile(profile))) + SALT);
  }

  function writeTrust(profile) {
    localStorage.setItem(TRUST_KEY, JSON.stringify({
      version: VERSION,
      signature: signatureFor(profile),
      savedAt: Date.now()
    }));
  }

  function validateRocketSession(session) {
    const rounds = Math.trunc(Number(session?.rounds ?? session?.selectedRounds) || 0);
    const completedRounds = Math.trunc(Number(session?.completedRounds) || 0);
    const longestRun = Math.trunc(Number(session?.longestRun) || 0);
    const score = Math.round(Number(session?.score) || 0);
    if (!ALLOWED_ROUNDS.includes(rounds)) return `round count ${rounds} is not allowed`;
    if (completedRounds < 0 || completedRounds > rounds) return "completed round count is invalid";
    if (longestRun < 0 || longestRun > rounds + 1) return "route log count is invalid";
    if (score < 0) return "score is negative";
    if (score > rounds * MAX_SCORE_PER_ROUND) return "score exceeds plausible cap";
    if (completedRounds >= rounds && runStartedAt && Date.now() - runStartedAt < rounds * MIN_MS_PER_ROUND) {
      return "run completed below the time floor";
    }
    return null;
  }

  function validateProfile(profile) {
    const rocketRuns = Array.isArray(profile?.rocketRuns) ? profile.rocketRuns : [];
    for (const run of rocketRuns) {
      const rounds = Math.trunc(Number(run.rounds ?? run.selectedRounds) || 0);
      const score = Math.round(Number(run.score) || 0);
      const completedRounds = Math.trunc(Number(run.completedRounds) || 0);
      if (!LEGACY_HISTORY_ROUNDS.includes(rounds)) return `stored fly run has invalid round count ${rounds}`;
      if (score < 0 || score > Math.max(1, rounds) * MAX_SCORE_PER_ROUND) return "stored fly run score is impossible";
      if (completedRounds < 0 || completedRounds > Math.max(1, rounds)) return "stored fly run completion count is invalid";
    }
    const runs = Array.isArray(profile?.runs) ? profile.runs : [];
    const rankPoints = Math.round(Number(profile?.rankPoints) || 0);
    if (rankPoints < 0 || rankPoints > 1000000000) return "stored rank points are impossible";
    for (const run of runs) {
      const score = Math.round(Number(run.score) || 0);
      const rounds = Math.trunc(Number(run.rounds) || 0);
      if (score < 0 || score > 100000000) return "stored speed score is impossible";
      if (rounds < 0 || rounds > 10000) return "stored speed round count is invalid";
    }
    return null;
  }

  function sanitizeProfile(profile) {
    return {
      ...(profile && typeof profile === "object" ? profile : {}),
      runs: [],
      rocketRuns: [],
      tampered: true,
      tamperReason
    };
  }

  function renderLock(reason) {
    const paint = () => {
      document.documentElement.classList.add("flag-guard-locked");
      let style = document.querySelector("#flagGuardStyle");
      if (!style) {
        style = document.createElement("style");
        style.id = "flagGuardStyle";
        style.textContent = `
          html.flag-guard-locked body > :not(#flagGuardLock) { display: none !important; }
          #flagGuardLock {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: grid;
            place-items: center;
            padding: 2rem;
            background: #030303;
            color: #fff;
            font: 900 18px/1.45 system-ui, -apple-system, Segoe UI, sans-serif;
          }
          #flagGuardLock section {
            max-width: 48rem;
            border: 4px solid #ffdd00;
            background: #050505;
            padding: 2rem;
            box-shadow: 0 0 0 4px #c40000;
          }
          #flagGuardLock h1 { margin: 0 0 1rem; color: #ff3333; font-size: clamp(2rem, 7vw, 5rem); }
          #flagGuardLock p { margin: 0.75rem 0; }
          #flagGuardLock button {
            margin-top: 1rem;
            border: 3px solid #fff;
            background: #ffdd00;
            color: #000;
            padding: 0.85rem 1.2rem;
            font-weight: 950;
            cursor: pointer;
          }
        `;
        document.head.append(style);
      }
      let lock = document.querySelector("#flagGuardLock");
      if (!lock) {
        lock = document.createElement("div");
        lock.id = "flagGuardLock";
        document.body.append(lock);
      }
      lock.innerHTML = `
        <section>
          <h1>TAMPERING DETECTED</h1>
          <p>This browser session was locked because protected game data or developer-tool access was detected.</p>
          <p><strong>Reason:</strong> ${escapeHtml(reason || "protected data changed")}</p>
          <p>Start a clean run to submit an official score.</p>
          <button type="button" id="flagGuardReset">Reset Local Game Data</button>
        </section>
      `;
      document.querySelector("#flagGuardReset")?.addEventListener("click", () => {
        localStorage.removeItem(PROFILE_KEY);
        localStorage.removeItem(TRUST_KEY);
        localStorage.removeItem(ROCKET_ROUNDS_KEY);
        sessionStorage.removeItem(SERVER_RUN_KEY);
        location.href = "index.html#rocket";
        location.reload();
      });
    };

    if (document.body) paint();
    else document.addEventListener("DOMContentLoaded", paint, { once: true });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function markTampered(reason) {
    if (tampered) return;
    tampered = true;
    tamperReason = reason || "protected data changed";
    const profile = readJsonSafe(localStorage.getItem(PROFILE_KEY));
    localStorage.setItem(PROFILE_KEY, JSON.stringify(sanitizeProfile(profile)));
    writeTrust(sanitizeProfile(profile));
    console.warn("Official score submission disabled for this session", tamperReason);
  }

  function checkStoredProfile() {
    const roundsValue = localStorage.getItem(ROCKET_ROUNDS_KEY);
    if (roundsValue && !ROUND_OPTIONS.includes(Number(roundsValue))) {
      localStorage.removeItem(ROCKET_ROUNDS_KEY);
      console.warn("Stored fly round setting was invalid and has been reset");
      return true;
    }

    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return true;
    const profile = readJsonSafe(raw);
    if (!profile) {
      localStorage.removeItem(PROFILE_KEY);
      console.warn("Stored profile JSON was invalid and has been reset");
      return false;
    }

    const profileError = validateProfile(profile);
    if (profileError) {
      console.warn("Stored profile was not trusted for official validation", profileError);
      writeTrust(profile);
      return true;
    }

    const trust = readJsonSafe(localStorage.getItem(TRUST_KEY));
    if (!trust?.signature) {
      writeTrust(profile);
      return true;
    }
    if (trust.signature !== signatureFor(profile)) {
      console.warn("Stored profile signature was refreshed");
      writeTrust(profile);
      return true;
    }
    return true;
  }

  function syncProfile(profile) {
    if (tampered) return false;
    const profileError = validateProfile(profile);
    if (profileError) {
      console.warn("Profile sync skipped strict official validation", profileError);
      writeTrust(profile);
      return true;
    }
    writeTrust(profile);
    return true;
  }

  async function postJson(url, body) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    if (!response.ok) throw new Error(data.error || response.statusText);
    return data;
  }

  function startRun({ playerId, displayName, rounds }) {
    runStartedAt = Date.now();
    serverRun = null;
    serverRunPromise = null;
    sessionStorage.removeItem(SERVER_RUN_KEY);
    if (tampered || !ALLOWED_ROUNDS.includes(Number(rounds))) return;
    serverRunPromise = postJson(`${getFlyApiBase()}/api/fly/run/start`, { playerId, displayName, rounds })
      .then((run) => {
        serverRun = run;
        sessionStorage.setItem(SERVER_RUN_KEY, JSON.stringify(run));
        return run;
      })
      .catch((error) => {
        console.warn("Official fly run was not started", error);
        return null;
      });
  }

  async function finishRun(session) {
    const reason = validateRocketSession(session);
    if (reason) {
      console.warn("Official fly run was not submitted", reason);
      return null;
    }
    const credentials = serverRun
      || readJsonSafe(sessionStorage.getItem(SERVER_RUN_KEY))
      || await serverRunPromise;
    if (!credentials?.runId || !credentials?.token) return null;
    return postJson(`${getFlyApiBase()}/api/fly/run/finish`, {
      runId: credentials.runId,
      token: credentials.token,
      playerId: session.playerId,
      displayName: session.displayName,
      session
    })
      .then((result) => {
        sessionStorage.removeItem(SERVER_RUN_KEY);
        serverRun = null;
        return result;
      })
      .catch((error) => {
        console.warn("Official fly run was not finished", error);
        return null;
      });
  }

  function blockEvent(event, reason) {
    event.preventDefault();
    event.stopPropagation();
    markTampered(reason);
    return false;
  }

  function blockContextMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  document.addEventListener("keydown", (event) => {
    const key = String(event.key || "").toLowerCase();
    const chord = event.ctrlKey || event.metaKey;
    if (event.key === "F12") blockEvent(event, "developer tools shortcut was used");
    if (chord && event.shiftKey && ["i", "j", "c", "k"].includes(key)) blockEvent(event, "developer tools shortcut was used");
    if (chord && ["u", "s"].includes(key)) blockEvent(event, "protected source/storage shortcut was used");
  }, true);
  document.addEventListener("contextmenu", blockContextMenu, true);
  document.addEventListener("drop", (event) => blockEvent(event, "drop editing was attempted"), true);

  window.FlagGuard = Object.freeze({
    version: VERSION,
    allowedRounds: ALLOWED_ROUNDS.slice(),
    checkStoredProfile,
    syncProfile,
    startRun,
    finishRun,
    isTampered: () => tampered,
    getTamperReason: () => tamperReason,
    markTampered
  });

  checkStoredProfile();
}());
