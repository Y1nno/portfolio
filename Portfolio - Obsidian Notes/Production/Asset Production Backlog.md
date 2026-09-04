---
type: backlog
status: in-progress
portfolio_stage: production
last_reviewed: 2026-08-13
---

# Asset Production Backlog

This backlog tracks visual, code, and supporting assets needed for project case studies.

Asset rule from [[Portfolio Evaluation Framework]]: an asset is persuasive when it makes a specific technical claim easier to verify. It is decorative when it only makes the page look finished.

## Known Existing Asset Areas

| Project | Existing Assets | Status |
| --- | --- | --- |
| RootAccess | `Projects/RootAccess/` includes screenshots and a video file | needs-project-analysis |
| Demons and Dining Darling | Public Itch prototype and postmortem | available; gameplay GIF still needed |
| Spa Game / Alien Spa | Local project/evidence notes | needs flagship capture |
| Tides of Eternity | Local project/evidence notes | needs permission and status GIF |

## Backlog

| ID | Project | Asset | Type | Purpose | Current Status | Instructions | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AP-001 | The Boy Aflame Who Couldn't Fly | Recording/playback demo | short video or GIF | Demonstrate replay mechanic if confirmed | needed | NEEDS PROJECT ANALYSIS | high |
| AP-002 | False God | Architecture diagram | diagram | Explain claimed low-coupling / observer-driven architecture if confirmed | needed | NEEDS PROJECT ANALYSIS | high |
| AP-003 | RootAccess | Existing media review | screenshot/video audit | Determine whether assets support portfolio claims | existing | Review files in `Projects/RootAccess/` | medium |
| AP-004 | Spa Game / Alien Spa | Flagship systems proof | short video/GIF or annotated diagram | Show the strongest systems case: guest AI, resources, scheduling, and checkout cleanup working together | needed | Capture or diagram one coherent loop; avoid trying to show every system at once | highest |
| AP-005 | Tides of Eternity | Chill-to-Freeze status demo | short video/GIF | Show status stacking, slowdown, and Freeze conversion as visible combat behavior | needed; permission-gated | Capture after public-use permission is recorded | high |
| AP-006 | Demons and Dining Darling | Cooking/order loop demo | short video/GIF | Show public prototype loop: order -> ingredient handling -> processing -> plating -> serving feedback | needed | Capture from Itch/browser build or local Unity project | high |
| AP-007 | Spa Game / Alien Spa | Systems architecture diagram | diagram | Explain how needs, advertisements, items, containers, scheduling, checkout, and reports connect | needed | Build after selecting the flagship visual narrative | high |
| AP-008 | Tides of Eternity | Status architecture diagram | diagram | Explain status application -> runtime instance -> stacks/ticks -> modifier query -> combat result | needed; permission-gated | Use public-safe wording after permission boundaries are known | medium |

## Workflow

1. Identify asset need in a project [[Asset Manifest]].
2. Add production task here.
3. Capture/create the asset.
4. Link the finished asset back to the manifest.
5. Confirm the asset supports a specific claim in [[Evidence Ledger]].

## Asset Standards

- Screenshots should show project state, UI, editor setup, or visible result.
- GIFs and short videos should show behavior over time: responsiveness, timing, state changes, or before/after differences.
- Architecture diagrams should explain boundaries, data flow, ownership, or interactions.
- State-machine diagrams should support behavior, AI, controls, animation, or mode-switching claims.
- Tool/editor screenshots should show workflow improvements, validation, or content-authoring support.
- Profiler/debugger captures should support performance, debugging, memory, timing, or reliability claims.
- Code excerpts should make implementation and judgment inspectable.
