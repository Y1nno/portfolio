---
type: interview-prep
status: intake-draft
project: Snowmageddon
last_reviewed: 2026-09-27
---

# Snowmageddon - Interview Questions

## Project Context

- How did Snowmageddon start, and when did you join?
- What was your role compared with Aiden and Hannah?
- How did you onboard into an existing Unity project without disrupting working systems?
- What did you inspect before making changes?

## Super Roll / Bowling-Ball Snowball

- What was wrong with the old Super Roll implementation?
- Why did the team choose a bowling-ball snowball direction?
- Why frame this as an architecture refactor instead of just a visual/game-feel improvement?
- What responsibilities stayed in `PlayerController`?
- What responsibilities moved into `GiantSnowball`?
- Why was `AnimationCurve` useful for the growth behavior?
- Why did you move from per-frame polling toward input callbacks?
- What edge case did the input callback choice solve?
- Why initialize the Rigidbody in `Awake()`?
- Why add `[RequireComponent(typeof(Rigidbody))]`?
- What would you improve next if you had more time?

## Pickup And Economy Collection

- What was the original feature request?
- What existed in the pickup pipeline before you touched it?
- Why avoid inheritance or class-per-pickup architecture?
- Why support both `AlwaysAttract` and `Instant` instead of choosing one behavior immediately?
- How does `PickupSO` help keep pickup tuning configurable?
- Why track active pickups by reward type?
- Why was `PickupManager` a better home for health rewards than `PlayerController`?
- Why keep `Normal` pickup behavior instead of replacing it with the new shop-open behavior everywhere?
- What caused the active pickup dictionary mutation risk?
- How did you fix the mutation issue?
- What did that bug teach you about Unity object lifecycles?

## Variable Shop Spawning

- What problem did variable shop spawning solve?
- Why was a simple scan the right choice?
- Why did authored fixed locations make more sense than unconstrained random spawning?
- How did map size and post-round player travel affect the design?
- When would a more advanced spatial lookup become appropriate?
- Why validate spawn points with NavMesh/reachability?
- How did you balance designer-authored locations with runtime validation?

## Floating Damage Numbers

- What made damage numbers more complex than just spawning text?
- How did the render-to-texture/downscaling pipeline affect the implementation decision?
- Why compare world-space UI against screen-space UI?
- What was your prototype strategy?

## Portfolio Framing

- Which system best represents you as a gameplay programmer?
- Which system best demonstrates your process?
- What are you comfortable showing publicly?
- What should stay private or be framed more generally?
