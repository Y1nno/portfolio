---
type: project-dossier
status: intake-draft
project: Snowmageddon
portfolio_stage: project-extraction
confidence: partial-evidence
last_reviewed: 2026-09-27
---

# Snowmageddon - Portfolio Dossier

This dossier is the working source for a possible Snowmageddon portfolio page. It is not finished public copy.

## Project Summary

- Project purpose: small-team Unity arcade/action game built around snowball combat, waves, upgrades, pickups, and an in-world shop.
- Genre / format: third-person arcade snowball combat.
- Engine / language: Unity / C#.
- Studio / team label: Tiny Cowboy.
- Current status: in development.
- Public availability: Itch page exists; Steam page planned.
- Public title: Snowmageddon.
- Internal/repo title: Snowball Fight.
- Local repo: `C:\GameDev\SnowballFight`.
- Local project notes: `C:\GameDev\SnowballFight\Snowmageddon Notes`.

## Team Context

Snowmageddon began as a game jam project by two collaborators under the Tiny Cowboy studio/team label. They continued working on it after the jam and later received strong external feedback. After that, they invited Wesley to join the team.

For public copy, refer to the original collaborators as the lead developer and lead artist rather than using personal names. The lead developer is the principal in-engine developer and has done most of the original Unity implementation. The lead artist has done much of the art work. Wesley joined later as a trusted co-developer because of his existing rapport with the lead developer, prior collaboration, creative input, technical input, and the strength of his Spa Game work.

## Role and Ownership

- Wesley's role: Gameplay Programmer / Co-Developer.
- Role shape: broad co-developer, with most contributions focused on scripting, Unity implementation, bug fixes, polish, and gameplay systems improvements.
- Collaboration note: Wesley was not pigeonholed into a narrow role. Aiden trusted both his creative and technical input.
- Attribution risk: public writing should not imply Wesley built the whole game. The lead developer and lead artist created the project before Wesley joined.
- Public attribution preference: avoid collaborator names in public project copy unless later approved. Use "lead developer" and "lead artist" if collaborators must be referenced.

## Confirmed Systems / Tasks

The following are confirmed Wesley work because they are represented in the Snowmageddon local task notes:

| System / Task | Ownership | Evidence Source | Portfolio Signal |
| --- | --- | --- | --- |
| Super Roll / bowling-ball snowball | Wesley | `Task Notes - Super Bowling Ball.md`, `PlayerController.cs`, `GiantSnowball.cs` | Refactoring, input architecture, object ownership, tunable projectile behavior |
| Variable shop spawning | Wesley | `Task Notes - Variable Shop Spawning.md`, `NewShopManager.cs` | Scope control, spawn validation, NavMesh/reachability, designer-friendly implementation |
| Pickup and economy collection | Wesley | `Task Notes - Pickup And Economy Collection.md`, `PickupManager.cs` | Event-driven pickup lifecycle, collection behavior, mutation-safe dictionary iteration |
| Floating damage numbers | Wesley | `Task Notes - Floating Damage Numbers.md` | Technical investigation, render/UI tradeoff analysis, communication with co-developer |

## Super Roll / Bowling-Ball Snowball

### Problem

The old Super Roll was playable and had already been shown publicly, but the visual presentation did not feel right. The snowball grew near/around the snowman during the charge-up, which looked awkward and immersion-breaking, especially because it appeared to freely rotate around the player.

The team chose a bowling-style snowball because it kept the core "big snowball" fantasy while making the growth more visually coherent: a rolling snowball naturally gets bigger over time.

Wesley's framing of the old implementation should stay respectful and context-aware. The old code was written quickly for a shorter jam-style timeline, so the point is not "the old code was bad." The point is that it solved an earlier production problem, and the later visual redesign created an opportunity to make the implementation more elegant for a longer-term version of the project.

### Design Goal

The goal was not primarily balance. The old version was already playable. The goal was to give the ability a clearer visual identity and remove the awkward charging period.

For portfolio purposes, the case study should emphasize coding architecture and implementation process. Game feel explains why the change mattered, but the main signal is how Wesley reasoned about responsibility boundaries and refactored the feature inside an existing codebase.

### Implementation Direction

Wesley changed Super Roll from a held charge beside the player into a bowling-ball-style snowball that rolls across the ground and grows over time while moving.

The architectural direction was:

- Remove the old player-owned charge/growth function.
- Keep input and aiming in `PlayerController`.
- Move rolling/growth/lifetime behavior into `GiantSnowball`.
- Use input callbacks instead of constantly polling Super Roll in `Update()`.
- Keep the aim arrow's per-frame work scoped to the active aiming period.
- Make snowball growth tunable with an `AnimationCurve`.

The visual redesign came first. The architecture work followed from implementing that redesign in code. While changing how the ability looked and behaved, Wesley saw a chance to avoid adding more weight to `PlayerController` and move ownership into `GiantSnowball` where that was practical and recognizable to the rest of the team.

### Technical Details

In the old implementation, `PlayerController` owned much of the Super Roll behavior: charge state, giant snowball instantiation, growth timing, charge amount, and per-frame checks.

Wesley's refactor moved the feature toward cleaner object ownership:

- `PlayerController` starts aiming on valid input.
- `PlayerController` handles the aim arrow and resolves the throw direction.
- `PlayerController` instantiates `GiantSnowball` and calls `Roll()`.
- `GiantSnowball` controls its own Rigidbody, roll velocity, scale-over-time, impact, destruction, and collision damage.

This matters because `PlayerController` is already a large script with many responsibilities. The task did not require fully splitting that class apart, but while touching the feature Wesley avoided making the class heavier and moved ability-specific behavior into the object that actually performs the behavior.

Mental rule for the boundary:

- Keep the player-facing input boundary in `PlayerController`.
- Keep aiming, direction calculation, spawning, and resource cost where they remain consistent with the project's other abilities.
- Move behavior that belongs to the spawned snowball into `GiantSnowball`: roll motion, growth, collision, impact, and destruction.
- Avoid over-engineering the feature so other developers can still recognize the pattern when returning to the code.

### Trade-Offs And Design Decisions

#### Controlled Arcade Motion vs Natural Physics

Wesley chose controlled arcade motion over fully natural physics. Super Roll is a player-fired ability: the player aims, releases, and expects the snowball to travel in a readable direction with dependable force. Because of that, consistency matters more than pure simulation.

In implementation, the snowball maintains its rolling velocity during its lifetime. This makes the ability easier to tune and more reliable in moment-to-moment play. The player can trust that the snowball will behave like an intentional attack rather than being overly disrupted by small bumps, friction, slopes, or incidental physics interactions.

Trade-off: the snowball is less physically natural. The world has less influence over it; terrain, friction, and collisions may not slow or redirect it as much as a simulation-heavy system would. In this context, that is acceptable because the snowball is primarily an ability, not a physics toy.

Opposite choice: if the mechanic were about terrain-driven snowball physics, such as gathering speed downhill, bouncing through terrain, losing momentum in deep snow, or knocking into objects unpredictably, Wesley would let the Rigidbody behave more naturally. In that version, gravity, friction, ramps, and collision response would be the gameplay, and overriding velocity every frame would fight the mechanic.

Portfolio framing:

> I prioritized reliable game feel over fully emergent physics. Super Roll is meant to feel like a dependable player ability, so I kept its motion controlled and tunable. If the mechanic were about terrain-driven snowball physics, I would make the opposite choice and let the world drive the snowball's behavior.

#### Coroutine-Owned Roll Sequence vs Persistent State Logic

Wesley used a coroutine because the giant snowball has a short, linear lifecycle: launch, roll for a limited time, grow while rolling, spawn an impact effect, and destroy itself. That is a timed sequence with a clear beginning, middle, and end.

A coroutine keeps duration, scaling over time, movement, impact, and destruction close together. The code reads like the snowball's life story: start rolling, continue while time remains, then end. This avoids adding more general-purpose update logic or spreading temporary behavior across unrelated methods.

Trade-off: coroutines are best for simple, contained lifecycles. If more behavior gets added, a coroutine can become too much and hide complex state transitions inside one routine.

Opposite choice: if the snowball became a persistent object with targeting, steering, interruptions, long-lived decision-making, or phases such as seeking, rolling, stuck, chasing, recoiling, growing, returning, and despawning, Wesley would move the logic into a state machine or dedicated behavior system.

Portfolio framing:

> I used a coroutine because the snowball's behavior is a short, linear sequence. If the snowball became a persistent AI-driven object with targeting, steering, interruption, or multiple behavior states, I would move that logic into a state machine or dedicated behavior system.

#### Paying Resource Cost On Release vs On Aim Start

Wesley chose to spend the snowball cost on release rather than when aiming begins. From a game design standpoint, this treats aiming as preparation and release as commitment. The player is not actually using the ability until the giant snowball launches.

This supports the feel of the mechanic. The player can hold the input to aim, line up the shot, and then commit by releasing. The cost is tied to the moment the ability produces its main gameplay effect, which feels fair because the player only pays when the snowball enters the world.

Trade-off: free aiming creates a special state that needs rules. The implementation has to prevent cases where the player starts aiming without enough resources, reloads while holding, and then releases to fire. It also raises design questions about indefinite aiming, stalling, threatening enemies, or avoiding normal combat pressure.

Opposite choice: Wesley would choose pay-on-aim-start if the aiming phase itself granted power, such as blocking incoming snowballs, slowing time, auto-aiming, scaring nearby enemies, creating area pressure, or otherwise giving the player meaningful value before release.

Portfolio framing:

> I chose to spend snowballs on release because aiming is preparation and launching is commitment. If the aim state itself granted defense, control, or offensive pressure, I would charge on aim start because the ability would already be active.

### Input Refactor

The notes show an evolution from a polling-oriented `CheckForSuperRoll()` model toward input-event callbacks:

- `superRoll.action.performed += StartAimingSuperRoll`
- `superRoll.action.canceled += StopAimingSuperRoll`

This reduces permanent per-frame feature checks and makes the code respond only when the relevant input action fires. The aim arrow still needs per-frame rotation while aiming, so Wesley scoped that work to an `AimArrow()` coroutine that runs only during an active aim session.

The final notes also capture an important input-system learning: `started` was not the right callback for this button behavior. `performed` better matched the committed press and prevented invalid start/release edge cases.

Wesley identifies this as the hardest part of the refactor: learning the practical difference between the input callback phases and choosing the one that matched the button behavior.

### Lifecycle and Safety

Several small decisions show production-minded coding:

- `StopAimingSuperRoll()` guards against resolving if no valid aim session exists.
- `GiantSnowball` initializes its Rigidbody in `Awake()` because `PlayerController` instantiates it and immediately calls `Roll()`.
- `[RequireComponent(typeof(Rigidbody))]` makes the component dependency explicit.
- The rolling snowball owns its own destruction after its roll lifetime.
- Growth is defined as `minSize` to `maxSize` over `rollTime`, shaped by `scaleOverRollTime`.

### Portfolio Thesis

Wesley refactored an existing playable ability by separating input/control responsibility from projectile behavior. The result is a cleaner gameplay architecture where the player controller initiates the action and the spawned snowball owns its own movement, scaling, collision, and lifetime.

Super Roll should lead the page. It is a simple change, but it is emblematic of Wesley's coding process: inspect the existing system, understand why it feels wrong, avoid adding more weight to an already overloaded `PlayerController`, move responsibility into the correct object, and expose tuning through Unity-friendly serialized fields.

Updated timeline thesis:

Super Roll should be presented as a respectful, process-driven refactor. The old implementation fit a shorter jam timeline. The new work started with a visual/player-facing redesign, then used that implementation work as an opportunity to improve architecture: reduce update-loop polling, use event-driven input, keep the controller familiar but lighter, and let the spawned snowball own its own lifecycle. This should communicate all target takeaways: Wesley can refactor gameplay code, improve feel and architecture together, work inside an existing team codebase, and make practical tradeoffs.

### Candidate Short Copy

Refactored Super Roll from controller-owned charge logic into an event-driven bowling snowball ability with cleaner object ownership, tunable growth behavior, and a more maintainable gameplay loop.

## Variable Shop Spawning

### Source Summary

Task note: `C:\GameDev\SnowballFight\Snowmageddon Notes\Tasks\Task Notes - Variable Shop Spawning.md`

Wesley improved the in-world shop's spawn flow. The shop originally spawned at a single static center-level location. On a fairly large map, this meant the player spent too much time traveling back toward the center after combat rounds just to reach the shop.

The assigned task was effectively: "shop spawns with one of six spots depending on where Rick is." Wesley recalls the broader discussion including random spawning, but the assigned implementation direction was random/preset spawning through authored locations.

Wesley created the fixed shop-location setup and the selection behavior around those locations. The goal was to make the shop appear at one of several controlled locations so it would be relatively close to the player after a round without relying on a fully unconstrained random spawn.

### Engineering Judgment

Fixed authored locations made more sense than fully random spawning because the map has enough terrain and environment constraints that a random point would need substantial validation to avoid awkward, unreachable, or visually strange placements. Authored transforms let the team control shop placement, guarantee usable spots, and plan coverage so the shop was never too far away.

Wesley considered more advanced lookup or search approaches but backed off because the current design uses a small number of meaningful spawn points. Optimization was not the priority: with only a handful of possible locations, the important decision was choosing a reliable, readable placement approach for the time available.

The task notes describe this as a shift from making search faster to making the chosen spawn trustworthy. In practice, this means the valuable work was not finding a clever algorithm for six choices; it was validating or authoring locations so the shop appears somewhere that works in the real level.

### Portfolio Signal

This is best framed as a **production-minded gameplay polish / level integration example**. It shows scope control: choosing authored transforms and simple selection over fully random placement because that was faster to make reliable, easier for the team to reason about, and better matched the project's current scale.

Current status: mostly complete. The random selection path would need more validation if the team pursued it, but the team is not currently planning to go forward with that direction.

## Pickup And Economy Collection

[[Data-Driven Pickups - Code Evidence]] contains the before-and-current source excerpts, revision references, and scene configuration.

### Source Summary

Task note: `C:\GameDev\SnowballFight\Snowmageddon Notes\Tasks\Task Notes - Pickup And Economy Collection.md`

The starting problem was that coins could be left scattered across a large map after combat. Manually sweeping the level for dropped currency after a round was tedious for the player, especially when the game wanted to transition into the between-wave shop phase.

Coins already dropped and were collectible before Wesley's work. The existing behavior made pickups lerp smoothly toward the snowman/player when the player entered a pickup radius. Wesley did not build that original local pickup behavior.

Wesley implemented data-driven pickup behavior and reward handling. The work adapted `CoinManager` into `PickupManager` as the central manager for all pickups, moved pickup configuration into `PickupSO` ScriptableObjects, added explicit collection behavior modes, and updated dependent systems such as kid drops, coin UI, health rewards, and shop economy to use `PickupManager`.

Wesley also implemented pickup-specific behavior that triggers when the round ends and the shop opens. Depending on configuration, active pickups can either begin collection behavior from anywhere on the map or be collected instantly by the player.

This was also an intentional flexibility point: Wesley wanted to give Aiden and Hannah options so the team could choose the version that felt best without rewriting the system. Instant collection is cleaner and faster; gradual/magnetized collection preserves visible feedback and game feel.

Wesley examined the existing pickup pipeline and chose a generic pickup component backed by pickup data, with a manager responsible for tracking active pickups, applying rewards, and responding to shop opening.

The rename from `CoinManager` to `PickupManager` was intentional. The old manager name no longer matched the responsibility once health pickups and broader pickup reward handling were involved. The same architectural concern also applied to `PlayerController`: as with the Super Roll work, Wesley saw that the player controller was already too large and should not keep absorbing unrelated responsibilities. Health reward handling might eventually belong even closer to the pickup itself, but moving it into `PickupManager` was a better boundary than leaving it in `PlayerController`.

### Scope Of Changes

PR overview supplied by Wesley:

- Added data-driven pickup behavior and reward handling.
- Adapted `CoinManager` into `PickupManager` as the central manager for all pickups.
- Added `PickupSO` for collection behavior, pickup distance, pickup speed, rotation speed, reward type, and reward value.
- Configured penny, nickel, and health pickups through ScriptableObjects, replacing component configuration.
- Changed pickup completion from signaling `EventManager` to signaling `PickupManager`.
- Moved health reward application from `PlayerController` into `PickupManager`.
- Added functionality to set collection behavior for tracked pickups.
- Added configuration to set collection behavior in response to shop opening.
- Updated kid drops, coin UI, and shop economy to use `PickupManager`.
- Added `Assets/ScriptableObjects/Pickups` and moved upgrade ScriptableObjects into `ScriptableObjects/Upgrades`.

### Behavior Modes

`PickupSO` defines the collection and reward behavior for pickups. Current collection behavior modes are:

- `Normal`: pickup lerps toward the player at pickup speed when the player is within pickup distance.
- `AlwaysAttract`: pickup always lerps toward the player at pickup speed.
- `Instant`: pickup completes collection immediately.

This makes the shop-open behavior configurable by reward type through `PickupManager.rewardTypesToApplyBehavior`, rather than locking the team into a single end-of-round solution.

`PickupSO` was mainly an extensibility and flexibility decision. Because the team did not have a locked release target or finalized content list, Wesley wanted pickup behavior and reward tuning to stay open-ended. If the game later needed more pickup content, the team could configure new pickup definitions instead of hardcoding every pickup as a special case.

Preserving `Normal` was also intentional. The goal was not to replace the old behavior everywhere; it was to keep the preexisting local-attraction behavior available for pickups that should still require proximity, while allowing other pickups or shop-open situations to use `AlwaysAttract` or `Instant`. This gave designers more control and avoided discarding working behavior that might still be useful.

### Validation

Wesley manually validated:

- Preexisting `Normal` pickup behavior.
- `Instant` and `AlwaysAttract` behavior when configured directly on pickup ScriptableObjects.
- `Instant` and `AlwaysAttract` behavior when forced by shop opening.

### Key Technical Lesson

The most portfolio-worthy detail is the active pickup mutation issue. Applying shop-open collection behavior could mutate the active pickup dictionary while it was being iterated. Wesley adjusted the implementation to snapshot valid pickups, clean stale entries, and then apply the new collection behavior after enumeration was complete.

### Portfolio Signal

This is still a scoped quality-of-life and architecture improvement rather than the flagship project system, but it is stronger than a simple bug fix. Its value is that it shows Wesley converting a coin-specific manager into a pickup-wide manager, making pickup behavior data-driven, preserving existing behavior, reducing unrelated responsibility in `PlayerController`, and adding flexible shop-open collection policies.

It also shows lifecycle-aware programming in Unity: understanding that event-driven object behavior can produce side effects outside the method currently being edited.

### Candidate Code Samples

| Code Sample | Location | What It Shows |
| --- | --- | --- |
| Pickup behavior modes | `Assets/ScriptableObjects/Pickups/PickupSO.cs` | Data-configurable pickup behavior and reward values. |
| Active pickup tracking | `Assets/Scripts/Managers/PickupManager.cs` | Registering/unregistering live pickups by reward type so batch behavior can be applied later. |
| Shop-open behavior pass | `Assets/Scripts/Managers/PickupManager.cs` | Applying configured collection behavior when the shop opens. |
| Mutation-safe update loop | `Assets/Scripts/Managers/PickupManager.cs` | Snapshotting valid pickup references before applying behavior that may unregister/destroy pickups. |

### Candidate Label

Best portfolio label: **Data-driven pickup system refactor**.

Why: this captures both the architecture migration and the player-facing result without overselling the feature as a flagship system.

## Floating Damage Numbers

### Source Summary

Task note: `C:\GameDev\SnowballFight\Snowmageddon Notes\Tasks\Task Notes - Floating Damage Numbers.md`

This task began with a request to show damage numbers when kids get hit. The interesting technical context is the project's rendering path: the game renders the camera to a render material that gets scaled down, so in-world UI can become blurry. A 2D UI overlay may remain cleaner because it renders on top of the downscaled world image.

### Portfolio Signal

This is a good process artifact even if it is not the strongest implementation case study. It shows Wesley gathering co-developer context, tracing the existing damage pipeline, identifying rendering risks, comparing 3D/world UI against screen-space UI, and choosing a prototype path based on risk.

## Evidence

Detailed evidence entries should live in [[Evidence Ledger]].

## Interview Hooks

- Why move behavior out of `PlayerController` instead of just making the old charge look better?
- How did Unity Input System callback choice affect the ability's edge cases?
- Why use `AnimationCurve` for snowball growth instead of hardcoded scale steps?
- How did you decide where per-frame work should live?
- What did the pickup dictionary mutation bug teach you about event-driven object lifecycles?
- Why was simple shop-location scanning the right choice for the current game scale?

## Uncertainties

- Exact showcase date and public-facing showcase name.
- Whether collaborator names should appear in public copy.
- Which project Snowmageddon may replace on the portfolio.
- Whether old Super Roll footage exists for before/after comparison.
- Current state of floating damage numbers implementation.
