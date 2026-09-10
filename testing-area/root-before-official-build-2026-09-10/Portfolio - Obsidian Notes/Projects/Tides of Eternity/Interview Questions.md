---
type: interview-questions
status: in-progress
project: Tides of Eternity
portfolio_stage: project-extraction
last_reviewed: 2026-08-13
---

# Tides of Eternity - Interview Questions

Use these to fill remaining public-safe case-study material. Questions already answered should be transferred to the dossier/evidence ledger.

## Permission and Ownership

- What exactly does the permission requirement allow after approval?
- Can the public portfolio name Tides of Eternity?
- Can it show screenshots, video, code excerpts, diagrams, and GDD-derived system descriptions?
- How should the GDD author/team be credited or referenced, if at all?
- Are there wording limits around saying Wesley implemented systems from the GDD?

Answered context:

- Wesley joined in July 2026, about three months after project start.
- The project is a roughly 14-person rev-share team.
- Wesley is currently the only programmer/developer who has touched the repo.
- The GDD was not authored by Wesley; likely credit belongs to Kayra / the game director, pending confirmation.

## Project Framing

- What is the most honest one-sentence description of the current prototype?
- Why is the current milestone focused on combat prototype stabilization?
- What would count as the first real vertical slice?
- Which GDD systems should be deliberately excluded from public claims because they are not implemented yet?
- How should public copy distinguish Wesley's implementation work from the non-Wesley-authored GDD?

## Movement and Dash

- Why use a movement state machine?
- What was hardest about making the movement feel match the GDD targets?
- How did dash direction priority evolve?
- Why support automatic backdash when no movement input is present?
- Why use a velocity curve for dash movement?
- How did you verify dash distance, duration, and invincibility timing?

## Combat and Damage

- Why implement the damage formula this early?
- Why clamp each damage factor?
- Which damage values are real versus placeholder?
- How should attack type data eventually feed into the formula?
- What would make the damage system ready for boons/aspects/weapons?

## Status Effects

- Which status effect was hardest to implement besides the overall status architecture?
- What should be data-driven versus handled in status-specific classes?
- How do statuses connect to the larger roguelite build design?
- What remains incomplete in Surge, consumed-on-hit, and event wiring?

Answered context:

- Status effects are the proudest and hardest current system.
- Runtime status instances were chosen because flags were too limited for stacking, ticking, expiration, status-specific behavior, and conversions such as Chill into Freeze.
- Chill is the strongest current demo because it visually slows a dummy and then freezes it.

## Enemy Prototype

- What is the purpose of separating enemy movement states from action states?
- What enemy behavior currently works in scene?
- What is missing before the enemy is a complete combatant?

## Reflection

- What system would you rewrite or harden before expanding content?
- How do you keep a large GDD from becoming scope debt?

Answered context:

- Implementing from this GDD taught Wesley that GDDs need both subjective intent and concrete technical/logistical clarity.
- Evocative descriptions were useful for fantasy but not enough to implement mechanics without questions about triggers, values, ownership, and edge cases.
