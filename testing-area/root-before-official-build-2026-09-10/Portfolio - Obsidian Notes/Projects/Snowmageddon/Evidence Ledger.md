---
type: evidence-ledger
status: intake-draft
project: Snowmageddon
last_reviewed: 2026-09-27
---

# Snowmageddon - Evidence Ledger

Use this ledger to separate supported claims from things that still need proof, capture, or attribution review.

## Confirmed Claims

| Claim | Evidence Status | Source | Safe For Public Use? | Notes |
| --- | --- | --- | --- | --- |
| Public project name is Snowmageddon. | User-confirmed | Conversation, 2026-09-27 | yes | Internal repo/project folder uses Snowball Fight. |
| Studio/team label is Tiny Cowboy. | User-confirmed | Conversation, 2026-09-27 | yes | Use for studio/team listing. |
| Project began as a game jam project by the lead developer and lead artist. | User-confirmed | Conversation, 2026-09-27 | yes | Avoid collaborator personal names publicly unless later approved. |
| The lead artist handled much of the art. | User-confirmed | Conversation, 2026-09-27 | yes | Use role label publicly, not personal name. |
| The lead developer is the principal in-engine developer and built most original Unity implementation. | User-confirmed | Conversation, 2026-09-27 | yes | Important attribution boundary; use role label publicly. |
| Wesley joined later as a co-developer after a successful August showcase. | User-confirmed | Conversation, 2026-09-27 | yes | Showcase details need exact name/date if public. |
| Wesley's role can be framed as Gameplay Programmer. | User-confirmed | Conversation, 2026-09-27 | yes | He also joined as broad co-dev/trusted collaborator. |
| Snowmageddon is in development, has an Itch page, and is planned for Steam. | User-confirmed | Conversation, 2026-09-27 | yes | Add URLs when available. |
| Super Roll should lead the page because it is emblematic of Wesley's coding process. | User-confirmed | Conversation, 2026-09-27 | yes | Main page structure guidance. |
| The task notes in Snowmageddon's Obsidian vault represent Wesley's work. | User-confirmed | Conversation, 2026-09-27 | internal | Use task-specific claims publicly, not the existence of private notes. |
| Super Roll is done enough to show. | User-confirmed | Conversation, 2026-09-27 | yes | Waiting on animation polish. |
| Pickup/economy collection was built to reduce tedious coin cleanup across a large map after rounds. | User-confirmed | Conversation, 2026-09-27 | yes | Triggered when the round ends and the shop opens. |
| Pickup collection supports different shop-open behaviors, including gradual remote pickup behavior or instant player collection. | User-confirmed | Conversation, 2026-09-27; local task/code evidence | yes | Shows flexible implementation for team tuning. |
| Coins already dropped and were collectible before Wesley's work. | User-confirmed | Conversation, 2026-09-27 | yes | Avoid claiming Wesley built the original local pickup behavior. |
| Wesley likely created active pickup tracking to support applying behavior to all live pickups. | User-qualified | Conversation, 2026-09-27; `PickupManager.cs` | likely | User said "I think I did create the active pickups tracking." |
| Wesley added `PickupSO` and moved pickup configuration into ScriptableObjects. | User PR overview | Conversation, 2026-09-27; `PickupSO.cs`; pickup assets | yes | Includes behavior, pickup distance/speed, rotation speed, reward type/value. |
| Wesley adapted `CoinManager` into `PickupManager` as the central manager for all pickups. | User PR overview | Conversation, 2026-09-27; `PickupManager.cs` | yes | Includes health reward handling and pickup reward application. |
| Wesley updated kid drops, coin UI, and shop economy to use `PickupManager`. | User PR overview | Conversation, 2026-09-27 | yes after code spot-check | Spot-check specific dependent files before using as detailed public claim. |
| Wesley manually validated Normal, Instant, and AlwaysAttract behaviors directly and via shop opening. | User PR overview | Conversation, 2026-09-27 | yes | Validation was manual, not automated. |
| The `CoinManager` rename reflected the system broadening beyond coins, especially with health pickups and future pickup types. | User-confirmed | Conversation, 2026-09-27 | yes | Supports "data-driven pickup system refactor" framing. |
| Health reward handling was moved out of `PlayerController` because the controller was already too large and pickup rewards belonged closer to pickup management. | User-confirmed | Conversation, 2026-09-27 | yes | Aligns with Super Roll's responsibility-boundary theme. |
| `PickupSO` was primarily for extensibility and flexible content/design tuning. | User-confirmed | Conversation, 2026-09-27 | yes | User noted future pickup expansion may or may not happen, but this was the design reason. |
| Preserving `Normal` behavior kept preexisting proximity pickup behavior available instead of replacing it globally. | User-confirmed | Conversation, 2026-09-27 | yes | This is flexibility/design-control framing, not necessarily regression-risk language. |
| Static center shop spawn caused too much post-round travel on a large map. | User-confirmed | Conversation, 2026-09-27 | yes | Player-facing reason for variable shop spawning. |
| Assigned shop task was to spawn from one of six/preset spots depending on Rick/player location. | User-confirmed | Conversation, 2026-09-27 | yes | Exact task wording was approximate from task list. |
| Fixed authored shop locations were chosen because random spawning across terrain would need heavier validation to avoid awkward placements. | User-confirmed | Conversation, 2026-09-27 | yes | Supports production/scope judgment framing. |
| Variable shop spawning is mostly complete; unconstrained random path would need more validation but is not the planned direction. | User-confirmed | Conversation, 2026-09-27 | yes | Avoid overstating random spawn completeness. |

## Code / Note Evidence

| Evidence | Location | Supports | Status |
| --- | --- | --- | --- |
| Super Roll task process note | `C:\GameDev\SnowballFight\Snowmageddon Notes\Tasks\Task Notes - Super Bowling Ball.md` | Refactor process, input-event thinking, object ownership, curve-based growth | Read |
| Final Super Roll input code | `C:\GameDev\SnowballFight\Assets\Scripts\PlayerController.cs` | Event-driven input, aim coroutine, spawn/roll handoff | Read |
| Final `GiantSnowball` code | `C:\GameDev\SnowballFight\Assets\Scripts\GiantSnowball.cs` | Projectile owns roll, growth, collision, lifetime | Read |
| Variable shop spawning note | `C:\GameDev\SnowballFight\Snowmageddon Notes\Tasks\Task Notes - Variable Shop Spawning.md` | Scope-appropriate selection, validation emphasis | Read |
| Shop spawning code | `C:\GameDev\SnowballFight\Assets\Scripts\Managers\NewShopManager.cs` | Fixed/random spawn rules, NavMesh validation, reachability checks | Read |
| Pickup/economy note | `C:\GameDev\SnowballFight\Snowmageddon Notes\Tasks\Task Notes - Pickup And Economy Collection.md` | Pickup architecture, dictionary mutation issue | Read |
| Pickup manager code | `C:\GameDev\SnowballFight\Assets\Scripts\Managers\PickupManager.cs` | Active pickup tracking and safe behavior updates | Read |
| Pickup data/code | `C:\GameDev\SnowballFight\Assets\ScriptableObjects\Pickups\PickupSO.cs` | `Normal`, `AlwaysAttract`, and `Instant` collection modes; reward type/value data | Read |
| Floating damage numbers note | `C:\GameDev\SnowballFight\Snowmageddon Notes\Tasks\Task Notes - Floating Damage Numbers.md` | Rendering pipeline reasoning and prototype tradeoffs | Read |

## Candidate Visual Evidence

| Asset | Type | Purpose | Status |
| --- | --- | --- | --- |
| Super Roll clip | Gameplay video | Show current bowling snowball rolling, growing, hitting kids, and ending | Needed |
| Super Roll before clip | Gameplay video | Show why old charge version was visually awkward | Optional / may not exist |
| Shop spawning clip | Gameplay video | Show shop opening at variable fixed locations | Needed if used as supporting system |
| Pickup collection clip | Gameplay video | Show shop-open pickup/economy collection behavior | Needed if used as supporting system |
| Damage number prototype/clip | Gameplay video or screenshot | Show readable hit feedback if implemented | Unknown |

## Unsupported Or Needs Verification

| Claim | Why Unsupported | Needed Evidence | Follow-Up |
| --- | --- | --- | --- |
| Exact date/name of the August showcase | User recalled August but not exact public details | Ask Wesley or team | Before public copy |
| Super Roll before/after comparison | Old version described but footage not confirmed | Old branch/build/clip | Optional |
| Floating damage numbers final implementation state | Notes emphasize investigation and prototype direction | Inspect current scene/prefab or ask Wesley | Before claiming implemented |
| Whether collaborator names should appear publicly | Names are known internally but public preference unknown | Ask Wesley/team | Before publication |
| Which portfolio project Snowmageddon replaces | User has not decided | Compare against existing project slate | Before site edit |
