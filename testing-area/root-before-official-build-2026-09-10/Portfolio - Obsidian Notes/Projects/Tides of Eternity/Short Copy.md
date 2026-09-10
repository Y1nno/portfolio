---
type: short-copy
status: draft
project: Tides of Eternity
portfolio_stage: narrative-drafting
last_reviewed: 2026-08-13
---

# Tides of Eternity - Short Copy

## One-Line Blurbs

Default:

Built Unity/C# combat prototype systems for a rev-share roguelite team, including movement, dash behavior, damage calculation, and a flexible runtime status-effect architecture.

Status-system focused:

Built a runtime status-effect system for a Unity roguelite combat prototype, supporting data-configured modifiers, stacking, ticking, expiration, and interactions such as Chill converting into Freeze.

GDD implementation focused:

Translated an external roguelite GDD into Unity/C# combat prototype systems, with a focus on flexible status effects, movement feel, dash behavior, and bounded damage calculations.

## Portfolio Card Summary

Tides of Eternity is an in-development Unity/C# roguelite project built by a rev-share team. I joined as the sole programmer currently working in the Unity repository and implemented the combat prototype foundation from an external GDD.

My strongest contribution is a runtime status-effect architecture that supports data-configured modifiers, stack behavior, duration/ticking, status-specific hooks, and interactions such as Chill converting into Freeze. The system lets movement and damage code query status results through shared modifier logic instead of hardcoding every status into each combat system.

## Compact Case Study Preview

I joined Tides of Eternity after the team already had a large GDD, then began turning its combat direction into a Unity prototype. The first work was isometric movement and dash behavior, but the most technically interesting system became status effects.

The status system needed to support mechanics that were still being clarified. Instead of making every effect a bool or a branch inside damage logic, I modeled statuses as runtime instances with stack managers, duration, ticking, expiration, modifier calculations, and status-specific hooks.

The clearest example is Chill. Repeated Chill applications can slow a dummy and eventually apply Freeze for 1.5 seconds. Chill owns the conversion trigger, while movement and damage effects are handled through shared status definitions and modifier queries.

## Resume Bullet Options

### Status / Combat Systems Emphasis

- Built a runtime status-effect architecture in Unity/C# supporting stack behavior, duration, ticking, expiration, modifier aggregation, and status-specific hooks.
- Implemented data-configured combat modifiers so movement, damage, and critical calculations can consume status effects without hardcoded checks for every status.
- Created status interactions such as Chill converting into Freeze, enabling visible prototype behavior while preserving a flexible foundation for future combat design.

### GDD Implementation Emphasis

- Translated an external roguelite GDD into Unity/C# combat prototype systems, including movement, dash behavior, status effects, and bounded damage calculation.
- Built flexible gameplay systems around evolving design requirements, using runtime status instances and data-configured definitions to reduce one-off combat logic.
- Identified missing implementation details in the GDD and designed systems that could absorb later answers without requiring major rewrites.

### Movement / Damage Emphasis

- Implemented isometric player movement and dash behavior for a Hades-style Unity combat prototype, including dash charges, cooldown, backdash fallback, and invincibility timing.
- Built a clamped damage calculation pipeline based on external GDD limits for weapon base damage, attack modifiers, boon values, defense, status multipliers, and crit values.
- Connected status modifiers into damage and movement calculations so combat effects can influence runtime behavior through shared systems.

## Recommended Resume Bullet Set

Use this version when space allows three bullets:

- Built a runtime status-effect architecture in Unity/C# supporting stack behavior, duration, ticking, expiration, modifier aggregation, and status-specific hooks.
- Translated an external roguelite GDD into combat prototype systems, including isometric movement, dash behavior, status effects, and bounded damage calculation.
- Implemented data-configured combat modifiers so movement and damage systems can consume status effects without hardcoded checks for every status.

Use this shorter version when space allows two bullets:

- Built Unity/C# combat prototype systems for a rev-share roguelite team, including isometric movement, dash behavior, damage calculation, and runtime status effects.
- Designed a flexible status-effect architecture with data-configured modifiers, stack behavior, ticking, expiration, and interactions such as Chill converting into Freeze.

## Project Index Blurb

Unity/C# roguelite combat prototype built from an external GDD for a rev-share team. My work focused on the combat foundation: isometric movement, dash behavior, bounded damage calculation, and a runtime status-effect system that supports data-configured modifiers and interactions like Chill converting into Freeze.

## Homepage Card Blurb

Built combat prototype systems for a Unity roguelite, including movement, dash behavior, damage calculation, and a flexible runtime status-effect architecture.

## Caution Notes

- Do not publish until permission is approved.
- Do not imply Wesley wrote the GDD.
- Do not imply the project is a complete roguelite or vertical slice.
- Do not imply boons, room generation, bosses, hub progression, full weapon roster, or narrative systems are implemented.
- Do not present animation polish as final.
- Do not call the overall project solo; the precise claim is that Wesley is currently the sole programmer/developer who has touched the Unity repo.

