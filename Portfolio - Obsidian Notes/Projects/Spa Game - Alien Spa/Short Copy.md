---
type: short-copy
status: draft
project: Spa Game / Alien Spa
portfolio_stage: narrative-drafting
last_reviewed: 2026-08-13
---

# Spa Game / Alien Spa - Short Copy

## One-Line Blurbs

Default:

Built interconnected Unity/C# gameplay systems for an in-development first-person spa management sim, including need-driven guest behavior, data-driven resource workflows, appointment scheduling, and checkout cleanup.

More gameplay-focused:

Built need-driven guest AI and simulation systems for a first-person spa management game where player planning, guest needs, and resource loops shape the flow of each spa day.

More technical:

Designed modular Unity/C# systems for guest AI, item containers, processing recipes, scheduling, timed events, and checkout cleanup in an in-development spa management simulation.

## Portfolio Card Summary

Spa Game / Alien Spa is an in-development Unity/C# first-person spa management sim built by a two-person team. I owned several gameplay and simulation systems, including need-based guest action selection, data-driven item/container/processing workflows, appointment scheduling, timed guest spawning, and checkout cleanup.

My work focused on turning design goals into modular systems: guests evaluate advertised world affordances against their needs, items move through reusable resource pipelines, and planning-phase appointment choices become runtime spa-day events.

## Compact Case Study Preview

In Spa Game / Alien Spa, I built gameplay systems that connect player planning to live simulation. Guests track needs such as Environment, Refreshment, Care, Comfort, and Peace, then evaluate advertised activities based on how those activities would improve their current state. This gives guests behavior that is explainable without being fully scripted.

I also built data-driven resource systems using ScriptableObject item definitions, filters, containers, reservations, processing recipes, and item processors. Those systems support loops like clean robe -> guest use -> dirty robe -> hamper -> laundry -> clean robe.

The project is still in development, so I frame it as an in-progress systems case study rather than a shipped-game postmortem.

## Resume Bullet Options

### Gameplay / AI Emphasis

- Built need-based guest action selection in Unity/C#, enabling guests to evaluate advertised world activities against internal needs and choose explainable, dynamic behaviors.
- Implemented a five-need guest satisfaction model with weighted relaxation scoring, supporting AI decisions, player feedback, and end-of-day report metrics.
- Extended an existing guest state/activity/subgoal architecture with container-focused behaviors for item pickup, storage, waiting, checkout cleanup, and dirty robe routing.

### Systems Architecture Emphasis

- Designed data-driven item/resource systems using ScriptableObject definitions, filters, containers, reservations, processing recipes, and timed processors.
- Built reusable container and reservation logic to prevent autonomous guests from targeting the same item while supporting player and guest resource management.
- Implemented a dirty robe lifecycle connecting guest checkout, item containers, laundry processing, and clean robe restocking.

### Scheduling / Management Loop Emphasis

- Built appointment scheduling and time systems that convert planning-phase UI placements into timed runtime events and scheduled guest spawns.
- Implemented drag-and-drop scheduling UI with time-slot snapping, duration-based appointment sizing, overlap prevention, and configurable concurrent appointment lanes.
- Created closing report and economy feedback structure to summarize appointments, relaxation, and revenue at the end of a spa day.

### Collaboration / Integration Emphasis

- Integrated owned gameplay systems into a collaborative codebase, extending a teammate's guest activity/subgoal architecture while preserving clear ownership boundaries.
- Connected guest AI, item containers, processing recipes, scheduling, checkout, and reporting into a cohesive management-sim loop.
- Added defensive fallback behavior to checkout cleanup so guests continue checkout even when expected containers are unavailable.

## Recommended Resume Bullet Set

Use this version when space allows three bullets:

- Built need-based guest action selection in Unity/C#, enabling guests to evaluate advertised world activities against internal needs and choose explainable, dynamic behaviors.
- Designed data-driven item/resource systems using ScriptableObject definitions, filters, containers, reservations, processing recipes, and timed processors.
- Implemented appointment scheduling and checkout cleanup workflows that connect planning UI, timed guest spawning, dirty item management, laundry processing, and end-of-day feedback.

Use this shorter version when space allows two bullets:

- Built Unity/C# gameplay systems for an in-development spa management sim, including need-driven guest AI, data-driven item/resource workflows, and appointment scheduling.
- Connected guest behavior, item containers, processing recipes, checkout cleanup, and closing reports into a cohesive management-simulation loop.

## Caution Notes

- Do not imply the game is shipped.
- Do not imply there is a public playable build yet.
- Do not claim Aidan's primary guest state/activity architecture or FMOD integration as Wesley-owned.
- Keep economy formulas framed as placeholder/prototype if mentioned.

