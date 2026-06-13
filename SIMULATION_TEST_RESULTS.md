# Fly Agent Simulation Test Results

Date: 2026-06-13

## What Was Tested

I added and ran a local Fly simulation test using three separate agent players. The runs were generated one after another, not simultaneously.

The simulation URL used was:

```text
http://127.0.0.1:4173/index.html?simulateAgents=1#runs
```

The app saved the generated runs into the normal browser profile storage under `profile.rocketRuns`. Existing non-agent Fly runs are preserved; only previous runs marked `source: "agent-simulation"` are replaced when the simulation is run again.

## Save Verification

Result: succeeded.

Evidence found in Chrome local storage for `http://127.0.0.1:4173`:

- `source: "agent-simulation"`
- `Agent New Pilot`
- `Agent Conservative`
- `Agent Pro Pilot`
- `agentSimulationReport`

Because the leaderboard is built from the same Fly run list, these agent runs should appear beside the player's local Fly scores in Runs and Leaderboard. They are local simulated entries, not official server-submitted leaderboard runs.

## Results

| Agent | Status | Score | Plane Class | Reached | Fuel Left | Notes |
|---|---:|---:|---|---:|---:|---|
| Agent New Pilot | Partial | 4,773 | WW2 Warbird | 4/10 | 7.5% | Wandered, forgot/failed destinations, poor upgrade use. |
| Agent Conservative | Partial | 36,138 | Advanced Airliner | 7/10 | 35.4% | Safer route style, slower, missed harder destinations. |
| Agent Pro Pilot | Succeeded | 91,196 | Military Fighter Jet | 10/10 | 73.2% | Upgraded aggressively, used speed and depot strategy well. |

## Failures Or Limitations

- The in-app browser automation tool was unavailable in this session, so I triggered the simulation by opening the local URL in the installed Chrome profile.
- This is a deterministic route simulation, not full physics gameplay with real-time canvas control.
- The generated entries are intentionally marked as `agent-simulation` so they can be replaced cleanly on the next test run.
- Official deployed leaderboard submission is not used for these agents; only local Runs and local Leaderboard are populated.

## 2026-06-13 Retest

The first simulation run exposed two issues:

- Agent runs affected the top profile star score even though they were not the human player's runs.
- The fallback target selection repeated one country per agent, creating clustered route maps and inflated scores.

Fixes applied:

- Profile/rank star score now ignores runs with `source: "agent-simulation"`.
- Best plane progress also ignores simulated runs.
- The simulator now uses varied target indices, far-away starts, wider route waypoints, and lower score ranges.
- Reran the simulation; previous agent simulation rows were replaced, while the human `20,612` Fly run remained in storage.

## Code Added

- `window.FlagAgentSim.run()` creates and saves the three agent Fly runs.
- `?simulateAgents=1` runs the simulation once, saves the profile, and opens the Runs page.
- Generated runs include display name, score, plane class, tech, telemetry, fuel, route logs, score events, depot stops, and route traces for the interactive route map.
