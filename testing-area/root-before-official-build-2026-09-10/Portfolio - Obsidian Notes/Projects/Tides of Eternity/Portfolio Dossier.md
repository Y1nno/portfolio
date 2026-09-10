---
type: project-dossier
status: in-progress
project: Tides of Eternity
portfolio_stage: project-extraction
confidence: partial-evidence
last_reviewed: 2026-08-13
---

# Tides of Eternity - Portfolio Dossier

This is a first-pass internal dossier based on local project notes and source inspection. It is not final public copy.

## Project Summary

- Project: Tides of Eternity.
- Engine / language: Unity / C#.
- Current implementation state: movement and combat prototype.
- Current playable surface: likely `CombatPlayground`, with a player controller, camera, UI debug readouts, health display, short-sword weapon test, status-effect test helpers, and an early hostile enemy prototype.
- Public release constraint: Wesley will request permission before publicly showing the portfolio.
- Team context: rev-share team of roughly 14 people. Wesley joined in July 2026, about three months after the project began in April 2026.
- Current programming context: Wesley is currently the only developer/programmer who has touched the project repository; the rest of the team is made up of artists, project managers, narrative contributors, and similar non-programming roles.

## Role and Ownership

Wesley built the implementation in the Unity repository.

Ownership boundary:

- Wesley owns the code and implementation work present in the repo.
- The GDD was not written by Wesley.
- The GDD/game direction appears to come from Kayra, the game director; exact credit spelling and public attribution still need confirmation.
- Public case-study language should frame the work as implementing, aligning, and prototyping against an external GDD/design source, not as Wesley authoring the full game design.
- What can be named publicly still depends on permission before public showing.

## Technical Stack

- Unity.
- C#.
- Unity Input System generated actions are present.
- TextMesh Pro is present.
- Universal Render Pipeline project markers are present.
- Local source path: `C:\GameDev\Tides_of_Eternity\Tides_of_Eternity`.

## Major Systems

| System | Portfolio Relevance | Current Evidence |
| --- | --- | --- |
| Player movement state machine | Strong candidate; shows controller architecture and game-feel tuning. | `PlayerMovementController.cs`, movement states, `PlayerMovementStateMachine.cs`. |
| Dash system | Strong candidate; GDD-aligned values, dash charges, cooldown, backdash, invincibility, dash attack window. | `PlayerMovementController.cs`, `PlayerDashingState.cs`, `InvincibilityController.cs`. |
| Damage formula | Strong candidate; shows translation of GDD math into clamped runtime calculation. | `DamageInstance.cs`, `DamageCalculator.cs`, `DefenseManager.cs`, `HealthManager.cs`. |
| Status effects | Strong candidate; data-configured status definitions, runtime instances, stacking, ticking, transitions, modifiers. | `StatusManager.cs`, `StatusEffectConfig.cs`, status instance classes. |
| Player attacks | Supporting candidate; light combo and input buffering exist, but several attack types remain missing. | `PlayerAttackManager.cs`, `AttackState.cs`, `Weapon.cs`. |
| Enemy prototype | Supporting candidate; early movement/action state machines and detection. | `EnemyStateMachine.cs`, enemy states, `EnemyPlayerDetection.cs`, `EnemyMover.cs`. |
| GDD alignment / milestone planning | Strong process evidence; useful for showing disciplined scope control while implementing against a design source Wesley did not author. | Development audit, backlog, risk register, GDD coverage matrix. |

## Implementation Details

### Player Movement and Dash

The first implementation goal was the isometric player movement model. The team wanted a Hades-style isometric camera and player movement foundation early. Wesley had prior 3D character-controller experience, including animation-related controller work, so he was able to port/adapt some existing knowledge and get this foundation moving quickly.

The movement foundation appears to translate GDD movement targets into runtime controller fields and state-machine behavior. Implemented values include walk speed, run speed, walk-to-run threshold, acceleration, dash charge counts, dash distance, dash duration, dash cooldown, maximum charges, and backdash modifier.

The dash implementation is currently the strongest movement-system candidate. `PlayerDashingState` determines dash direction from movement input first, otherwise backdashes away from the closest detected enemy, otherwise falls back to forward movement. Dash distance is calculated against a normalized dash velocity curve and includes an auto-adjustment path to keep measured travel close to intended design distance.

Portfolio angle: this can show Wesley translating external designer-facing combat feel specs into code with measurable parameters and testable behavior.

Design source note: dash direction priority and clamp ranges were specified by the GDD rather than invented by Wesley. The portfolio value is in implementing those specs cleanly and making them testable in the prototype.

Current caveat: some script defaults and prefab overrides may differ. Public copy should avoid implying every GDD value is fully locked until the implementation is verified in the active scene.

### Combat Damage Formula

`DamageCalculator` implements a GDD-style damage pipeline:

- weapon base;
- aspect modifier;
- attack type modifier;
- boon flat value;
- boon multiplier;
- defense reduction;
- status multiplier;
- critical chance and critical multiplier.

The calculator clamps major inputs to intended design ranges so accidental tuning values do not break balance. It also checks invincibility before applying damage and routes final damage to `HealthManager`.

Portfolio angle: this is a clean "external design math to robust implementation" story, especially if paired with a small debug harness or test case.

Current caveat: many source values are still placeholders, and real boons, aspects, weapon tables, and attack-type data are not fully implemented. Wesley believes placeholder values are generally marked with TODOs in code, while GDD target values are drawn from the design document.

### Status Effects

Status effects are currently Wesley's strongest/proudest implemented system on this project, and also the hardest technical problem so far.

The status system has meaningful runtime behavior:

- active statuses are tracked in a dictionary by `StatusType`;
- statuses can be applied, stacked, queried, ticked, expired, and removed;
- specific status instance classes exist for Chill, Daze, Disoriented, Doom, Freeze, Stagger, Surge, and Weak;
- modifiers can affect movement, incoming damage, outgoing damage, critical chance, and critical damage;
- Chill can transition into Freeze, and Daze can transition into Disoriented;
- Doom has delayed damage behavior.

Portfolio angle: this is probably the strongest systems candidate after dash/combat math because statuses connect player-facing combat identity to reusable runtime rules.

Design problem: the GDD was evocative but not always implementation-complete. It could describe effects such as Doom interacting with chilled enemies in a way that conveyed fantasy, but not enough exact runtime logistics to implement the mechanic without follow-up questions. Wesley responded by asking clarifying questions early and designing the status system to stay flexible while answers were still evolving.

Architecture rationale: runtime status instances let statuses manage their own state and behavior instead of reducing each condition to a simple flag. This supports stacking, ticking, expiration, stronger effects from repeated applications, and conversion into other statuses, such as Chill becoming Freeze. The goal was to build a system flexible enough to absorb later design answers without rewriting each status as a one-off.

Best current example: Chill is the strongest demo candidate because it is visual and system-driven. A dummy can be slowed through Chill and eventually frozen for 1.5 seconds. Wesley likes this example because the behavior is expressed through the data/system architecture rather than requiring bespoke hardcoded showcase logic.

Current caveat: Surge and consumed-on-hit paths still need more complete event wiring, and status tuning is prototype-level.

### Enemy Prototype

The enemy architecture currently separates movement states from action states. `EnemyStateMachine` holds one state machine for movement and one for actions, wires detected movement/action state components, and reacts to player detection/loss events.

Portfolio angle: this may be useful as supporting evidence for extensible enemy AI architecture, but it should not be over-presented until the enemy can damage the player, die/reset, and demonstrate a full combat loop.

Current `CombatPlayground` behavior: the player can move around, use a sword, hit a dummy, see the dummy register/react to hits, and observe statuses such as Chill, Daze, and Disoriented being inflicted. The scene is partly a test playground and partly a demonstration space for status behavior.

Current presentation caveat: animation integration is serviceable but rough. Player animations are acceptable for prototype use, but attack animations do not fully line up with player movement, and dummy reactions do not yet move in ideal timing with received hits. This should be framed as placeholder/template animation work rather than finished polish.

## Difficult Problems To Investigate

- How to translate a large GDD into a controlled prototype milestone without letting scope explode.
- How to make movement and dash feel match numeric design targets.
- How to keep combat math bounded as boons, statuses, aspects, and weapon modifiers stack.
- How to design status effects that support both moment-to-moment combat and later roguelite build synergies.
- How to separate current prototype implementation from future GDD ambition in public writing.
- How to implement from a design document that communicates fantasy and intent but sometimes lacks exact technical/logistical behavior.
- How to build flexible systems when design answers are still evolving.

## Architecture

Candidate architecture stories:

1. **Movement Feel as State + Tuned Parameters**
   - Input -> movement state machine -> speed/acceleration rules -> Rigidbody velocity.
   - Dash -> direction priority -> velocity curve/distance calculation -> invincibility/post-dash windows.

2. **Combat Resolution Pipeline**
   - Attack data -> `DamageInstance` -> clamp ranges -> defense/status/crit modifiers -> `HealthManager`.

3. **Status Runtime Layer**
   - `StatusType` -> configured status definition -> runtime status instance -> stack/tick/expire/modify combat.

4. **Prototype-to-GDD Traceability**
   - GDD combat targets -> development audit -> implementation fields/scripts -> backlog gaps.

## Debugging

Candidate debugging story: aligning prefab overrides with script defaults and preventing future resets from reintroducing old movement/dash tuning.

## Optimization

NEEDS USER INPUT.

No optimization-specific evidence has been reviewed yet.

## Iteration

The project notes show a mature iteration frame: current work is organized around "Milestone 0: Combat Prototype Stabilization" before roguelite systems are built. This is valuable because the GDD scope is much larger than the current implementation.

## Collaboration

The project is a rev-share team effort with roughly 14 contributors. Wesley joined after seeing a gameplay-programmer call on a messaging board, and he is currently the only programmer/developer who has touched the repository. The current confirmed collaboration boundary is design/source ownership: Wesley built the repo implementation, but did not write the GDD. Because this project has a permission requirement, public wording must stay precise about that distinction.

## Failures and Abandoned Approaches

NEEDS USER INPUT.

Candidate topic: preventing GDD ambition from becoming uncontrolled implementation scope.

## Lessons

Candidate lesson:

> A large design only becomes buildable when its systems are reduced into testable prototype milestones. For Tides, the current useful portfolio story is not "I built the whole roguelite"; it is "I built and stabilized the combat foundation the larger roguelite would need."

Additional lesson:

> A GDD needs both subjective intent and implementation-ready clarity. Evocative lines help communicate fantasy, but gameplay programmers also need concrete logistics: what triggers an effect, what values change, what owns the behavior, and how edge cases resolve.

## Evidence Summary

| Claim | Current Status | Notes |
| --- | --- | --- |
| Tides of Eternity is Unity/C#. | CONFIRMED | Unity project and C# scripts exist. |
| Current implementation is a movement/combat prototype. | CONFIRMED | Development audit and source structure support this. |
| GDD exists and is mapped into notes. | CONFIRMED | GDD PDF and wiki-style notes exist; GDD was not authored by Wesley. |
| Dash system is implemented. | LIKELY / NEEDS VERIFICATION | Source supports it; scene behavior should be verified. |
| Damage formula exists. | CONFIRMED | `DamageCalculator.cs` implements clamped calculation. |
| Runtime status system exists. | CONFIRMED | `StatusManager.cs` and status instance classes exist. |
| Wesley personally built the repo implementation. | CONFIRMED | User confirmation 2026-08-13: everything in the repo is built by Wesley; the GDD was not built by Wesley. |
| Wesley joined a rev-share team in July 2026 and is currently the only programmer on the repo. | CONFIRMED | User explanation 2026-08-13. |
| Status effects are Wesley's strongest current Tides system. | CONFIRMED | User explanation 2026-08-13. |
| Chill is the best current visual status-effect demo. | CONFIRMED | User explanation 2026-08-13: Chill slows a dummy and then freezes it for 1.5 seconds. |

## Candidate Code Samples

| Candidate | Why It Matters | Status |
| --- | --- | --- |
| `PlayerMovementController.cs` | Movement and dash tuning parameters, charge/cooldown handling, input validation. | strong candidate |
| `PlayerDashingState.cs` | Direction priority, backdash behavior, dash velocity curve/distance calculation. | strong candidate |
| `DamageCalculator.cs` | Clamped combat damage formula and health/status/defense integration. | strong candidate |
| `StatusManager.cs` | Runtime status application, stacking, ticking, consumption, and modifier aggregation. | lead excerpt selected; see [[Code Excerpts]] |
| `ChillStatusInstance.cs` plus `StatusEffectConfig.cs` / `StatusManager.cs` | Best focused excerpt for showing data/system-driven status behavior that can slow and then freeze a target. | lead status demo selected; see [[Code Excerpts]] |
| Status instance classes | Specific status behavior such as Doom, Chill/Freeze, Daze/Disoriented. | strong candidate |
| `EnemyStateMachine.cs` | Separate movement/action state machines for early enemy prototype. | supporting candidate |
| `PlayerAttackManager.cs` / `AttackState.cs` | Light combo and input buffering. | supporting candidate |

Status-system excerpt package: [[Code Excerpts]].

Current case-study draft: [[Case Study]].
Public-facing draft: [[Case Study Public Draft]].
Short copy: [[Short Copy]].

## Candidate Visual Assets

- Clip of movement state changes and speed/debug readouts.
- Clip of dash charges/cooldown/backdash behavior.
- Clip or debug capture showing invincibility during dash.
- Damage formula diagram.
- Status-effect diagram: apply -> stack/tick -> modifier -> damage/movement result.
- Combat playground clip showing player attack, enemy/punching bag damage, and status behavior.
- Chill demo clip: dummy slows under Chill and freezes for 1.5 seconds.
- GDD-to-implementation trace table for movement/dash/damage/status systems.

Current assumption: Wesley can provide or already has the needed visual/demo pieces. Do not block code excerpt development on asset capture.

## Interview Hooks

- How did you translate a large GDD into the first implementable prototype milestone?
- Why did you build movement as a state machine?
- How does the dash direction priority work?
- How did you keep dash distance consistent while allowing a velocity curve?
- Why clamp damage formula inputs?
- How do status effects affect damage, movement, and critical values?
- What parts of the status system are data-configured versus hardcoded behavior?
- What is intentionally not implemented yet, and why?
- What would need to happen before this becomes a vertical slice?

## Competency Mapping

| Competency | Evidence Candidate | Strength Hypothesis |
| --- | --- | --- |
| Gameplay programming | Movement, dash, attacks, combat loop | strong |
| C# | Multiple runtime systems | strong if code samples are clean |
| Unity | Scenes, prefabs, MonoBehaviours, input, physics | credible |
| Systems architecture | State machines, damage pipeline, status runtime | strong candidate |
| Technical design implementation | External GDD values translated into runtime systems | strong candidate |
| Scope control | Development audit, backlog, risk register | strong supporting evidence |
| AI/enemy behavior | Early enemy state machines | supporting; not yet flagship |
| Completion/polish | Prototype only | weak currently |

## Uncertainties

- Permission boundaries for public naming, screenshots, code excerpts, and GDD details.
- Whether current scenes can produce clean capture footage.
- Whether script defaults and prefab overrides have been fully aligned.
- Whether build still succeeds after the latest work.

## Unsupported Claims Requiring Verification

- Any claim that Tides is a full roguelite vertical slice.
- Any claim that boons, room generation, hub progression, weapon roster, bosses, or narrative systems are implemented.
- Any claim that all status effects are fully wired into final combat events.
- Any claim that Wesley authored the GDD.

## Next Dossier Work

1. Confirm permission categories: public name, screenshots, code excerpts, video, and GDD-derived diagrams.
2. Run or verify build health if useful.
3. Choose final public excerpt length from [[Code Excerpts]].
4. Revise [[Case Study]] after permission and public attribution details are confirmed.
5. Decide whether Tides should be flagship, supporting, or future candidate after evidence and permission.
