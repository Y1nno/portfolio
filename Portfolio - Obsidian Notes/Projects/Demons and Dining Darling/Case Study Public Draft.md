---
type: public-copy-draft
status: draft
project: Demons and Dining Darling
portfolio_stage: copywriting
last_reviewed: 2026-08-13
---

# Demons and Dining Darling - Public Draft

This is draft public-facing copy. It should be tightened once the final portfolio layout is known and once the best gameplay clip is selected.

## Recommended Placement

Use as a supporting project card or compact case study, not the flagship.

Primary purpose:

- prove public playable delivery;
- show Unity/C# implementation ownership;
- show collaboration on a mixed-discipline jam team;
- add a lighter, completed prototype alongside deeper technical projects like Spa Game and Tides of Eternity.

## Attribution Boundary

Safe public framing:

- Wesley's public role label should be Unity Developer / Gameplay Programmer.
- Wesley was the only programmer on the prototype.
- Wesley implemented and integrated the gameplay systems in the Unity project.
- Teammates contributed art, writing, and game design inputs.
- Public copy should frame the project as a team jam project, not a solo project.

Avoid:

- claiming authorship of art, writing, or game design;
- saying the game won "Next Indie Hit" unless sourced;
- implying production polish beyond jam-prototype quality.

## Project Card Draft

**Demons & Dining, Darling!**  
Unity / C# / Ink / ScriptableObjects  
Unity Developer / Gameplay Programmer

I built the Unity implementation for a public cooking/dating-sim prototype created during Indie Game Academy Level 1. The team tied for 3rd place, and the prototype was released on Itch with browser and Windows builds.

As the only programmer on the prototype, my work focused on turning team art, writing, and design inputs into a playable loop: timed customer orders, ingredient pickup/drop interactions, processing stations, plating, serving validation, and Ink-driven dialogue flow. The project is useful portfolio evidence because it shows a complete playable artifact, not just isolated systems.

## Technical Summary

The core gameplay loop runs through a set of connected Unity systems:

- `OrderManager` spawns timed customer orders, assigns requested dishes, checks served plates, and applies reward/penalty feedback.
- `Pointer` handles player-facing pickup, drop, click targeting, ticket submission, and input disabling during dialogue.
- `ProcessingStation` and `ProcessingStationDef` support timed ingredient transformation, ready/ruined states, progress feedback, and recipe outputs.
- `PlatingStation` assembles ingredients into completed dishes and prepares them for serving.
- `InkyDialogueManager` integrates Ink stories with speaker tags, portrait swaps, dialogue choices, action tags, and level callbacks.

The result is a compact prototype loop where narrative presentation, cooking interactions, and order validation all connect inside the same playable build.

## Process / Collaboration Summary

This was a mixed-discipline team jam project. I was the Unity Developer / Gameplay Programmer, responsible for the Unity implementation and integration while teammates contributed the art, writing, and game design direction/content. The public postmortem also credits me with recommending the team's 4 L retrospective format, which became part of how we reflected on scope, process, and what we would improve after the jam.

The main portfolio value is delivery under constraints: the team produced a public prototype, reflected openly on process, and still tied for 3rd place.

## Short Case Study Version

**Demons & Dining, Darling!** is a Unity/C# cooking and dating-sim prototype built for Indie Game Academy Level 1. I was the Unity Developer / Gameplay Programmer on a mixed-discipline team, implementing the playable systems and integrating teammate-created art, writing, and design inputs.

I built the core loop around timed customer orders, ingredient pickup/drop, processing stations, plating, serving validation, and Ink-driven dialogue flow. The project shipped publicly on Itch with browser and Windows builds, and the team tied for 3rd place.

## Resume Bullet Candidates

- Unity Developer / Gameplay Programmer for a public cooking/dating-sim jam prototype that tied for 3rd place in Indie Game Academy Level 1.
- Implemented the prototype's order, ingredient interaction, processing, plating, serving, and Ink dialogue integration systems in Unity/C#.
- Integrated teammate-created art, writing, and design inputs into a playable browser/Windows prototype released on Itch.

## Evidence Links

- Public Itch/devlog: `https://aliencowstudios.itch.io/demons-dining-darling-proto/devlog/1452742/jam-postmortem`
- Local Unity project: `C:\GameDev\DDD-Demo`
- Evidence ledger: [[Evidence Ledger]]
