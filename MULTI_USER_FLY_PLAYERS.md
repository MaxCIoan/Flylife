# Multi-User Fly Player Plan

## Goal

Add several simultaneous Fly players/runners so the game can show different play styles in progress instead of only the local human run.

## Player Personas

### 1. New Player

- Does not instinctively know which controls matter.
- Often forgets or ignores braking.
- Rarely upgrades, or upgrades late.
- May forget the destination country after takeoff.
- Uses destination scan only after getting lost or not at all.
- Route behavior:
  - Wanders more.
  - Misses fuel depots often.
  - Lands too fast, too high, or outside the destination more often.

### 2. Conservative Player

- Reads instructions and understands the assigned goal.
- Flies directly toward the destination at slower speed.
- Uses fuel depots when clearly nearby.
- Still struggles with harder or less familiar country locations.
- Upgrades cautiously, with some fuel/handling before speed.
- Route behavior:
  - Lower risk.
  - Lower peak score.
  - Better survival than the new player.
  - Misses mostly on hard geography or long routes.

### 3. Pro Player

- Upgrades aggressively as soon as tech points are available.
- Prioritizes speed first, then maneuverability, then fuel.
- Still buys one or two fuel upgrades during early slower runs to avoid fuel losses.
- Understands scoring:
  - High entry speed matters.
  - Descending into the destination matters.
  - Reaching low altitude near the destination matters.
  - Full stop is not always the goal; controlled low-speed transition matters.
  - Fuel depots are used strategically, not randomly.
- Route behavior:
  - Takes fast lines.
  - Uses depots to chain longer runs.
  - Uses scan only when the destination is hard or route confidence is low.
  - Higher score variance, but much higher ceiling.

## Implementation Notes

- Do not reuse the global `rocketState` for simulated players. Each simulated player needs its own state object so their run cannot interrupt the human run.
- Add a `simulatedFlyPlayers` store with one state per persona.
- Advance simulated players with lightweight route math instead of full canvas physics at first.
- Save each simulated run with the same visible fields as human Fly runs:
  - player name
  - score
  - plane class
  - selected rounds
  - completed rounds
  - missed rounds
  - destination details
  - fuel usage
  - upgrade path
- Add a run source field such as `source: "human"` or `source: "simulated"`.
- Show simulated players in Runs and Leaderboard, but visually label them so they do not look like online human submissions.
- Keep official deployed leaderboard submissions human-only unless the server explicitly supports simulated/demo entries.

## First Build Step

Create a local-only simulation button or dev function that generates one run for each persona and inserts them into the local Fly runs table. After that works, upgrade it into live simultaneous progress.
