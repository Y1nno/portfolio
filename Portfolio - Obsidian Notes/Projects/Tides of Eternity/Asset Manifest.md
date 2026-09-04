---
type: asset-manifest
status: in-progress
project: Tides of Eternity
portfolio_stage: project-extraction
last_reviewed: 2026-08-13
---

# Tides of Eternity - Asset Manifest

All public-facing captures and excerpts are permission-gated until Wesley requests and receives approval.

| ID | Asset | Type | Purpose | Competency Demonstrated | Current Status | Source / Location | Capture or Create Instructions | Target Case-Study Section | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TE-A-001 | Permission approval record | note/email summary | Establish allowed public usage. | professionalism; disclosure discipline | needed | Wesley/team owner | Record what is approved: project name, screenshots, video, code, diagrams, GDD-derived details. | Before publication | high |
| TE-A-002 | Movement/dash demo | short video/GIF | Show player movement states, dash charges, backdash, cooldown. | gameplay programming; game feel | needed | `CombatPlayground` or `MovementPlayground` | Capture movement, dash charge use/recovery, no-input backdash near enemy if working. | Evidence | high |
| TE-A-003 | Dash architecture diagram | diagram | Explain input -> dash direction -> velocity curve -> invincibility/post-dash windows. | systems architecture | needed | `PlayerMovementController.cs`; `PlayerDashingState.cs` | Create after permission boundaries are confirmed. | Approach | high |
| TE-A-004 | Dash code excerpt | code excerpt | Show direction priority, velocity curve scaling, charge handling. | C#; gameplay systems | candidate | `PlayerMovementController.cs`; `PlayerDashingState.cs` | Select concise excerpt around `DetermineDashDirection`, `DetermineDashVelocityScale`, charge use/recovery. | Evidence | high |
| TE-A-005 | Damage formula diagram | diagram | Explain attack data to final damage pipeline. | combat systems; technical communication | needed | `DamageCalculator.cs`; GDD Chapter 3 | Show formula stages and clamp boundaries. | Approach | high |
| TE-A-006 | Damage calculator code excerpt | code excerpt | Show GDD math translated into clamped runtime calculation. | C#; systems implementation | candidate | `DamageCalculator.cs` | Pair `CalculateDamage()` and `ClampDamageInstance()`. | Evidence | high |
| TE-A-007 | Status lifecycle diagram | diagram | Explain status apply -> stack -> tick -> expire/consume -> modifier. | systems architecture; combat design | needed | `StatusManager.cs`; status classes | Include data-configured definitions and runtime instances. | Approach | high |
| TE-A-008 | Status manager code excerpt | code excerpt | Show status application, stacking, ticking, and modifier aggregation. | C#; gameplay systems | candidate | `StatusManager.cs` | Pair `ApplyStatus`, `CalculateModifierFromStatuses`, and safe tick snapshot. | Evidence | high |
| TE-A-009 | Status behavior demo | short video/GIF | Show a status affecting movement, damage, or enemy behavior. | combat systems; simulation | assumed available from Wesley | `CombatPlayground` | Use one status clearly; avoid trying to show all statuses at once. | Evidence | high |
| TE-A-013 | Chill-to-Freeze demo | short video/GIF | Show the best current status system demo: dummy slows under Chill and freezes for 1.5 seconds. | status architecture; data-driven combat behavior | assumed available from Wesley | `CombatPlayground` | Use dummy movement slowing and stopping; if possible show debug/status UI or inspector to make stacks visible. | Evidence | high |
| TE-A-014 | Status code excerpt package | code excerpt | Provide the code proof for the status case-study section. | C#; systems architecture; data-driven combat behavior | selected | [[Code Excerpts]] | Use `StatusManager`, `StatusInstance`, `ChillStatusInstance`, and optional `StatusEffectConfig` snippets. | Evidence | high |
| TE-A-010 | GDD alignment table | table/diagram | Show how non-Wesley-authored design values became Wesley-built implementation checks. | technical design implementation; scope control | needed | GDD notes; development audit | Use movement/dash/damage/status rows only; clearly attribute the GDD as external design input. | Context | medium |
| TE-A-011 | Enemy state machine diagram | diagram | Show separate movement/action state machines. | AI architecture | needed | `EnemyStateMachine.cs` | Use only if enemy behavior is working enough to demonstrate. | Supporting Evidence | medium |
| TE-A-012 | Combat prototype clip | short video/GIF | Show current implemented loop honestly. | gameplay programming | needed | `CombatPlayground` | Capture player movement, attack, enemy/punching bag damage, and UI/debug readout. | Overview / Evidence | high |
