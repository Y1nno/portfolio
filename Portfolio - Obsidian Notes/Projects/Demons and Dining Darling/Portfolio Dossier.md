---
type: project-dossier
status: in-progress
project: Demons and Dining Darling
portfolio_stage: project-extraction
confidence: partial-evidence
last_reviewed: 2026-08-13
---

# Demons and Dining Darling - Portfolio Dossier

This is a first-pass internal dossier based on the public Itch page and local repo inspection. It is not final public copy.

## Project Summary

- Project: Demons and Dining Darling.
- Public title: Demons & Dining, Darling! [Prototype ver.]
- Engine / language: Unity / C#.
- Genre / format: 2D cooking / dating sim / visual novel prototype.
- Public availability: public Itch page with browser and Windows builds.
- Known context: IGA Level 1 team jam; team tied for 3rd place; user previously reported "Next Indie Hit" recognition.
- Current portfolio role hypothesis: public proof / supporting project, not a primary technical deep dive.

## Role and Ownership

Confirmed by Wesley:

- Wesley built and owned the Unity repo implementation. Everything in-engine was created, placed, wired, or integrated by Wesley.
- The rest of the team did not have repo access.
- Teammates contributed art, writing, and game design inputs. Wesley incorporated those assets/content into the project, but should not claim authorship of the art, writing, or design.
- Public page represents the project as a team effort by Alien Cow.

Known from public page:

- Public postmortem credits "Wes" with recommending the 4 L retrospective format.

Questions still to answer:

- Public role label selected: Unity Developer / Gameplay Programmer.
- Who should be credited for design, art, writing, production, and audio if the case study includes credits?
- Is "Next Indie Hit" public and sourceable? Where should that be cited?

## Technical Stack

- Unity.
- C#.
- Ink.
- TextMesh Pro.
- Unity Input System.
- ScriptableObjects for content definitions.
- Local project path: `C:\GameDev\DDD-Demo`.

## Major Systems

| System | Portfolio Relevance | Current Evidence |
| --- | --- | --- |
| Order loop | Good public gameplay-loop evidence. | `OrderManager.cs`, `Ticket.cs`, customer/order assets. |
| Ingredient interaction | Shows player-facing interaction and item handling. | `Pointer.cs`, `Ingredient.cs`, `IngredientDef.cs`, station scripts. |
| Processing stations | Shows timed recipe transformation and state changes. | `ProcessingStation.cs`, `ProcessingStationDef.cs`, recipe assets. |
| Plating station | Shows recipe assembly, output creation, and serving flow. | `PlatingStation.cs`, `PlatingStationDef.cs`, dish/ingredient assets. |
| Dialogue system | Shows Ink integration and dialogue-driven level actions. | `InkyDialogueManager.cs`, `DialogueLibrary.cs`, speaker/prompt assets. |
| Level flow | Shows tutorial/level-specific signal handling. | `LevelManager.cs`, `TutorialLevel.cs`, `LoadScene.cs`. |
| Team/process | Shows public postmortem and retrospective contribution. | Itch postmortem. |

## Implementation Details

### Order and Serving Loop

`OrderManager` controls timed order spawning, customer selection, chef prompts, order resolution, and reward/penalty feedback. It spawns order tickets, assigns a requested dish and customer, checks plated ingredients against the ticket, increases patience for correct service, and decreases affection plus adds a chef prompt for wrong orders.

Portfolio angle: this is useful evidence that the prototype has an actual player-facing loop, not only isolated systems.

Attribution note: Wesley can claim implementation ownership of this system. Public copy should still frame the project as a team jam and avoid implying ownership of art, writing, or design.

### Ingredient Interaction and Stations

`Pointer` implements the mouse-driven interaction layer: it tracks overlapping clickables, selects the closest overlapped object, picks up items, drops them with mouse delta velocity, disables input during dialogue, and submits plated dishes to the active ticket.

`ProcessingStation` implements a timed station state flow:

- Empty / Full / Processing / Ready / Ruined;
- cooking progress;
- ready and ruined output generation;
- progress-bar color transition;
- ingredient pickup/retrieval;
- trigger-based ingredient insertion.

`ProcessingStationDef` and related definitions make the processing behavior data-driven through ScriptableObjects.

Portfolio angle: this can support a short systems explanation around kitchen interaction, recipe processing, and player-facing prototype loops.

Current caveat: code is jam-style and should be shown only if it supports the public playable/prototype story. It is probably not as polished as Spa or Tides.

### Plating and Recipe Assembly

`PlatingStation` manages ingredient spots, accepts valid ingredients based on its definition, generates recipe outputs, marks dishes ready to serve, and uses the dish sprite on the station when a completed dish is ready.

Portfolio angle: this is a compact example of connecting content definitions, player interaction, and order validation into a playable loop.

### Ink Dialogue Integration

`InkyDialogueManager` integrates Ink stories with Unity UI. It supports:

- starting dialogue from an Ink `Story`, TextAsset, or story key;
- speaker tags mapped to `SpeakerSO`;
- sprite tags for dialogue portraits;
- action tags that queue level actions;
- choice buttons;
- pointer/input disabling during dialogue;
- end-dialogue callbacks into `LevelManager`.

Portfolio angle: this may fill a useful narrative-tooling / dialogue-integration niche that Spa and Tides do not cover.

## Difficult Problems To Investigate

- What had to be finished during the jam deadline?
- How did the team scope the playable prototype?
- What broke or had to be cut?
- How did Ink dialogue connect to level progression and cooking gameplay?
- What did the postmortem reveal about team process and future improvements?

## Architecture

Candidate architecture stories:

1. **Order-to-Serving Loop**
   - Timed order spawn -> customer/order ticket -> player prepares dish -> plated dish submitted -> reward/penalty.

2. **Station Processing Loop**
   - Ingredient definition -> station recipe definition -> timed processing -> ready/ruined output -> player pickup.

3. **Dialogue-to-Level Actions**
   - Ink story -> speaker/sprite/action tags -> choices -> queued level actions -> level manager.

## Debugging

NEEDS USER INPUT.

Likely useful topics:

- Web build issues, since public Itch devlogs mention web build work.
- Jam-scope debugging under deadline.
- Order submission or station interaction bugs.

## Optimization

Likely not a portfolio focus.

## Iteration

Public postmortem notes mention scope creep, lack of early structure/workflow, desire for more check-ins, and lessons around clearer player-feel/player-action documentation.

This is valuable process evidence, especially because the team still produced a public prototype and tied for 3rd place.

## Collaboration

Public postmortem frames the project as a mixed-discipline team effort. The strongest collaboration evidence currently available is the team's retrospective and the public note that Wesley recommended the 4 L retrospective format.

Confirmed collaboration boundary: Wesley was the only person who touched the Unity repo. Teammates supplied art, writing, and game design direction/content; Wesley integrated those contributions into the engine.

## Failures and Abandoned Approaches

Public postmortem names poor early scoping, scope creep, short timeframe, mixed time zones, and lack of structure/workflow as challenges.

Portfolio angle: use this carefully. The story should not become "the team was chaotic"; it should become "we learned concrete process lessons while still delivering a public prototype."

## Lessons

Potential lesson:

> Demons and Dining Darling shows that a public prototype does not need the deepest architecture to be portfolio-useful. Its value is proof of delivery: a mixed-discipline team shipped a playable jam prototype, reflected on scope/process, and received external recognition.

## Evidence Summary

| Claim | Current Status | Notes |
| --- | --- | --- |
| Demons and Dining Darling is a Unity/C# project. | CONFIRMED | Unity project and C# scripts exist. |
| Public Itch prototype exists. | CONFIRMED | Public Itch page lists browser and Windows builds. |
| Project tied for 3rd place in jam. | CONFIRMED | Public postmortem says the team tied for 3rd place. |
| Wesley recommended the 4 L retrospective format. | CONFIRMED | Public postmortem credits "our programmer, Wes." |
| "Next Indie Hit" recognition exists. | USER-CLAIMED | Needs public source or user-provided proof. |
| Wesley's engine/repo implementation ownership. | CONFIRMED BY USER | Wesley stated he built/placed/integrated everything in the Unity repo; teammates did not have repo access. |

## Candidate Code Samples

| Candidate | Why It Matters | Status |
| --- | --- | --- |
| `OrderManager.cs` | Shows timed orders, customer selection, order resolution, reward/penalty feedback. | candidate |
| `Pointer.cs` | Shows click/drag/pickup/drop interaction foundation. | candidate |
| `ProcessingStation.cs` + `ProcessingStationDef.cs` | Shows timed processing, ready/ruined state, recipe outputs. | candidate |
| `PlatingStation.cs` + `PlatingStationDef.cs` | Shows ingredient assembly and dish output. | candidate |
| `InkyDialogueManager.cs` | Shows Ink dialogue, speaker/sprite/action tags, choices, level callbacks. | candidate |

## Candidate Visual Assets

- Public Itch page / project link.
- Browser playable build.
- Screenshot/GIF of cooking loop: order -> prepare -> plate -> serve.
- Screenshot/GIF of station processing/ruining.
- Screenshot/GIF of Ink dialogue with choice/action.
- Screenshot or quote from postmortem showing tied 3rd place and 4 L retrospective credit.

## Interview Hooks

- How did the team deliver a public prototype under jam constraints?
- What did Wesley personally build in the cooking/order loop?
- How did ScriptableObject definitions support ingredients, recipes, stations, prompts, and customers?
- How did Ink dialogue connect to gameplay or level actions?
- What would Wesley change about team structure/scoping in a future jam?
- What did the public postmortem teach about interdisciplinary game development?

## Competency Mapping

| Competency | Evidence Candidate | Strength Hypothesis |
| --- | --- | --- |
| Gameplay systems | Order loop, stations, serving, ingredient handling | credible |
| C# | Unity gameplay scripts | credible |
| Unity | 2D scenes, physics triggers, UI, ScriptableObjects, Ink integration | credible |
| Architecture | Data-driven recipe/station definitions | credible but likely jam-level |
| Tools/content pipeline | ScriptableObject content definitions; Ink dialogue | credible |
| Collaboration | Mixed-discipline jam team, postmortem, retrospective contribution | strong candidate |
| Technical communication | 4 L retrospective contribution; process lessons | credible |
| Completion/polish | Public browser/Windows prototype and jam recognition | strong relative to current portfolio |

## Uncertainties

- Exact public role label.
- Exact teammate credits for art, writing, design, production, and audio.
- Whether the public playable build is still working and representative.
- Whether "Next Indie Hit" recognition has a public citation.
- Which screenshots/videos are best.
- Whether this should be a project page, brief proof card, or resume-only mention.

## Unsupported Claims Requiring Verification

- Any claim that Wesley authored the art, writing, or game design.
- Any claim that the prototype is polished beyond jam quality.
- Any claim that the project was solo.
- Any unverified award wording beyond the public 3rd-place postmortem.

## Next Dossier Work

1. Confirm "Next Indie Hit" evidence.
2. Review [[Final Public Card]] for tone and layout fit.
3. Capture planned cooking/order loop GIF.
4. Decide whether to include only `OrderManager` or add the optional station excerpt from [[Code Proof]].
