---
type: project-index
status: intake-draft
project: Snowmageddon
portfolio_stage: project-extraction
confidence: partial-evidence
last_reviewed: 2026-09-27
---

# Snowmageddon - Project Index

This is the working portfolio context for Snowmageddon. It is not final public copy.

## Snapshot

| Field | Current Info |
| --- | --- |
| Public title | Snowmageddon |
| Studio / team label | Tiny Cowboy |
| Internal / repo name | Snowball Fight |
| One-sentence description | Wave-based Unity snowball combat game with upgrades, pickups, an in-world shop, and playful arcade combat. |
| Engine / language | Unity / C# |
| Major packages | Unity Input System, Cinemachine, URP, FMOD, LeanTween |
| Team context | Began as a game jam project by Hannah and Aiden; continued after strong feedback at an August game showcase. |
| Wesley's role | Gameplay Programmer / Co-Developer |
| Current status | In development |
| Public availability | Itch page exists; Steam page planned. |
| Public readiness | Safe to discuss; Super Roll is showable, though still waiting on animation polish. Gameplay clips can be provided. |
| Source availability | Local repo exists at `C:\GameDev\SnowballFight` |
| Local notes | `C:\GameDev\SnowballFight\Snowmageddon Notes` |

## Project Context

Snowmageddon started as a game jam project made by two collaborators under the Tiny Cowboy studio/team label. For public copy, refer to them as the lead developer and lead artist rather than using personal names. The lead artist owns much of the art direction and art production. The lead developer is the principal in-engine developer and built most of the original Unity implementation.

After the team received strong external feedback, they kept working on it and invited Wesley to join. Wesley had previously worked with the lead developer and was invited because of their existing rapport, the lead developer's trust in Wesley's technical and creative input, and the strength of Wesley's Spa Game work.

Wesley joined as a general co-developer, but the clearest portfolio framing is Gameplay Programmer because his contributions are focused on scripting, Unity implementation, bug fixes, polish, and gameplay systems improvements.

## Confirmed Wesley Contributions

Everything currently represented in Snowmageddon's local task notes is Wesley's work.

| System / Task | Status | Portfolio Signal |
| --- | --- | --- |
| Super Roll / bowling-ball snowball refactor | Showable; waiting on animation polish | Gameplay architecture refactor, input-event handling, object ownership, tunable projectile behavior |
| Variable shop spawning | Implemented in task notes | Scope-appropriate selection logic, spawn validation, NavMesh/reachability thinking |
| Pickup and economy collection | Implemented in task notes | Pickup lifecycle, event-driven collection, avoiding dictionary mutation during iteration |
| Floating damage numbers | Investigated / task note captured | Rendering/UI tradeoff analysis, technical scoping, collaboration with co-developer context |

## Primary Case Study Candidate

### Super Roll / Bowling-Ball Snowball

Portfolio thesis:

Wesley refactored Super Roll from a player-controller-managed charge ability into an event-driven bowling snowball system with clearer responsibility boundaries. The player controller now handles input and aiming, while `GiantSnowball` owns its own movement, growth curve, lifetime, and collision behavior.

This should be the first case-study section. It is a small change, but it is emblematic of how Wesley codes: inspect the existing feature, preserve what works, reduce `PlayerController` responsibility, move behavior to the object that owns it, and leave designers with tunable parameters.

Why this is strong:

- It starts from an existing playable feature rather than a blank slate.
- It shows Wesley inspecting and preserving working gameplay while improving architecture.
- It addresses a real player-facing issue: the old charge-up snowball looked awkward and immersion-breaking as it grew around the snowman.
- It demonstrates Unity-specific implementation judgment: input callbacks, coroutines, serialized tuning, `AnimationCurve`, and component requirements.
- It leaves the system easier for designers/developers to tune.

## Supporting Case Study Candidates

- [[Portfolio Dossier#Variable Shop Spawning]]
- [[Portfolio Dossier#Pickup And Economy Collection]]
- [[Portfolio Dossier#Floating Damage Numbers]]

## Evidence Needs

- Confirm final code locations and line references for Super Roll and `GiantSnowball`.
- Capture a clip of Super Roll before/after if an old build or branch is available.
- Capture a current clip of the bowling-ball snowball rolling, growing, hitting enemies, and ending.
- Confirm whether variable shop spawning and pickup/economy collection are showable in current build.
- Decide which existing portfolio project Snowmageddon may replace.

## Open Questions

- Which current portfolio project is Snowmageddon replacing?
- Should public copy mention the original jam/showcase context, or keep that in the dossier/interview layer only?
- Are any showcase details, team names, or collaborator names safe/preferred for public use?
- Which system should be the main page anchor if Snowmageddon becomes a featured project: Super Roll architecture, pickup lifecycle, or shop spawning?
