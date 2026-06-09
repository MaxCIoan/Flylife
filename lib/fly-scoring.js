export const ALLOWED_ROUNDS = [10, 15, 20, 50];

const MIN_MS_PER_ROUND = 2500;
const MAX_SCORE_PER_ROUND = 80000;

function numberFrom(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function fail(reason, elapsedMs = 0, tampered = false) {
  return {
    finalScore: 0,
    elapsedMs: Math.max(0, Math.round(elapsedMs)),
    tampered,
    tamperReason: reason
  };
}

export function computeFlyScore({ startedMs, finishedMs, session = {} }) {
  const elapsedMs = Math.max(0, numberFrom(finishedMs) - numberFrom(startedMs));
  if (!startedMs || !finishedMs) return fail("run timestamps are missing", elapsedMs, true);

  const rounds = Math.trunc(numberFrom(session.rounds ?? session.selectedRounds));
  const completedRounds = Math.trunc(numberFrom(session.completedRounds));
  const longestRun = Math.trunc(numberFrom(session.longestRun));
  const score = Math.round(numberFrom(session.score));

  if (!ALLOWED_ROUNDS.includes(rounds)) return fail(`round count ${rounds} is not allowed`, elapsedMs, true);
  if (completedRounds < 0 || completedRounds > rounds) return fail("completed round count is invalid", elapsedMs, true);
  if (longestRun < 0 || longestRun > rounds + 1) return fail("route log count is invalid", elapsedMs, true);
  if (score < 0) return fail("score is negative", elapsedMs, true);
  if (score > rounds * MAX_SCORE_PER_ROUND) return fail(`score ${score} exceeds plausible cap`, elapsedMs, true);

  const completed = completedRounds >= rounds;
  if (completed && elapsedMs < rounds * MIN_MS_PER_ROUND) {
    return fail(`run completed in ${elapsedMs}ms, under the time floor`, elapsedMs, true);
  }
  if (!completed) return fail("route was not completed", elapsedMs, false);

  return {
    finalScore: score,
    elapsedMs: Math.round(elapsedMs),
    tampered: false,
    tamperReason: null
  };
}
