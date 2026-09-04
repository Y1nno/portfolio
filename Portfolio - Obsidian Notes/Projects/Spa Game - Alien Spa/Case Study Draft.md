---
type: case-study-draft
status: draft
project: Spa Game / Alien Spa
portfolio_stage: narrative-planning
last_reviewed: 2026-08-13
---

# Spa Game / Alien Spa - Case Study Draft

This is a narrative skeleton, not final public copy. It is written to establish structure and argument before asset capture.

## Working Title Options

- Building Need-Driven Guest Behavior for a Spa Management Sim
- Systems for a First-Person Spa Management Simulation
- Turning Spa Planning, Guest Needs, and Resource Loops into Gameplay

Recommended title:

**Building Need-Driven Guest Behavior for a Spa Management Sim**

## One-Sentence Summary

I built interconnected gameplay systems for a first-person spa management sim, including need-driven guest behavior, data-driven item/resource workflows, appointment scheduling, and guest checkout cleanup.

## Short Project Context

Spa Game / Alien Spa is an in-development Unity/C# first-person spa management simulation built as a two-person collaborative project. The game centers on running a spa day: planning appointments, serving guests, managing resources, and responding to guest needs as the day unfolds.

My role was co-developer, with ownership over several gameplay and simulation systems. My main contributions focused on turning design goals into modular systems that support emergent behavior, resource continuity, and player planning.

Attribution note for public copy: Aidan was the primary architect of the underlying guest state/activity/subgoal architecture and owned FMOD integration. My case study should focus on my owned systems and the extensions I built into that shared architecture.

## Case Study Thesis

The main technical challenge was not a single isolated feature. It was building a set of systems that could talk to each other: guest needs needed to drive behavior, world objects needed to advertise meaningful choices, items needed to move through reusable resource systems, and planning decisions needed to affect the actual spa day.

My work focused on making those systems modular, explainable, and extensible.

## Section 1 - Need-Based Guest AI

### Problem

Early guest behavior was primarily scripted. Guest states could queue consistent bundles of instructions, which worked for required behavior, but it made guests predictable. Once the player understood one guest's flow, future guests risked feeling repetitive.

The project needed guests who could respond to their current needs and the environment without becoming random or opaque.

### Approach

I built a need-based action selection system around five guest needs:

- Environment
- Refreshment
- Care
- Comfort
- Peace

These needs act as the atomized success/failure metrics for running the spa. The player should not be able to solve guest satisfaction by spamming one action; the spa needs to provide a full care experience.

World objects advertise what needs they can fulfill. Guests score those advertised activities against their current needs and predicted future need state. The scoring model prioritizes urgent deficits, so a small improvement to a badly depleted need can matter more than a large improvement to a need that is already healthy.

### Why This Matters

This creates behavior that is explainable without being fully predictable. A player can understand why a guest chose an activity, but still has to respond to changing needs and changing available affordances.

### Code To Feature Later

- `GuestNeedsController.cs`
- `ActionSelector.cs`
- `NeedFufillmentAdvertisement.cs`
- `AdvertisementManager.cs`

### Asset Placeholder

Later asset: guest needs -> advertisement scoring -> selected activity demo.

## Section 2 - Data-Driven Item, Container, and Processing Systems

### Problem

The project needed many spa resources to be recognized and routed by different systems: containers, processors, guests, and player interactions. A concrete class per item would not scale well as content grew.

Containers and processors needed to understand what an item was without requiring a bespoke script for every item in the game.

### Approach

I moved the item/resource layer toward reusable runtime items backed by ScriptableObject definitions.

Core pieces:

- `ItemDefinitionSO` stores item identity/category/prefab data.
- `Item` runtime objects carry those definitions.
- `ItemFilter` lets containers and processors accept or reject items by definition or category.
- `ItemContainer` stores items, handles capacity, supports reservations, and presents stored physical items.
- `ProcessingRecipeSO` defines inputs, outputs, and processing time.
- `ItemProcessor` consumes matching inputs and produces outputs.

The goal was to build a system for making the game, not just manually implement the first few content examples.

### Reservation Design

Reservations prevent autonomous guests from targeting the same item from a distance. If a guest decides to retrieve an item from a container, the item becomes unavailable to other guests before the first guest reaches it.

That avoids the case where a guest walks across the spa and arrives to find the target item already taken.

### Why This Matters

This system supports resource continuity, content expansion, and simulation logic. Items can move through meaningful lifecycle states, such as clean robe -> guest use -> dirty robe -> hamper -> laundry -> clean robe.

### Code To Feature Later

- `ItemDefinitionSO.cs`
- `Item.cs`
- `ItemFilter.cs`
- `ItemContainer.cs`
- `ProcessingRecipeSO.cs`
- `ItemProcessor.cs`

### Asset Placeholder

Later asset: dirty robe -> hamper -> laundry -> clean robe lifecycle.

## Section 3 - Checkout Cleanup as Integration Proof

### Problem

Checkout could have been simple: remove the guest, toggle the robe off, and move on. Instead, I wanted checkout to contribute to the spa simulation and demonstrate guests using containers.

This became the first implementation of guests utilizing containers.

### Approach

I built the checkout workflow so guests:

- move to a change room;
- change out of their robe;
- generate a dirty robe item;
- search for a valid hamper at runtime;
- place the dirty item into the container;
- continue to front-desk checkout;
- deactivate after checkout completes.

The hardest part was integrating runtime-dynamic behavior into the existing state/activity/subgoal architecture. Activities were generally queued when entering the state, but this workflow needed information that was unknown at state entry, such as the nearest relevant container.

I solved this by queueing follow-up behavior after runtime discovery through `GWaitForAvailableContainer` and `OnFoundHamper()`.

### Defensive Design

I also added a no-hamper fallback. If no valid container is found, the guest drops the item and continues checkout. This was intentional safeguarding: when I make assumptions in code, I try to identify them and protect against failure cases.

### Why This Matters

This is a compact proof that several systems work together: guest states, subgoals, item definitions, containers, dirty item management, and processing recipes.

### Code To Feature Later

- `CheckOutState` in `GuestState.cs`
- `GWaitForAvailableContainer`
- `GPutItemInContainer`
- `ItemContainer`

### Asset Placeholder

Later asset: checkout cleanup flow diagram or short lifecycle clip.

## Section 4 - Planning-to-Simulation Loop

### Problem

The Planning phase needed to matter. Since real spas often run on appointments, scheduling became a natural way to give the player agency over what the Spa Day would look like.

### Approach

I built the appointment/time loop as a set of modular handoffs instead of one large god object:

- `AppointmentRequest` stores raw request data.
- `AppointmentRequestView` presents a draggable UI object.
- `TimePanelView` validates placement, snaps to time ticks, scales appointment blocks by duration, and prevents same-lane overlap.
- `ScheduledAppointment` stores the result of player scheduling.
- `TimedEvent` queues runtime start/end behavior.
- `ScheduledAppointment.OnAppointmentStart()` spawns a guest at the scheduled time.
- `ClosingReport` summarizes the day.

### Hardest Part

The drag/drop scheduling UI was the hardest part. I had to translate visual pointer placement into logical schedule data, enforce valid placements, support appointment durations, and allow concurrent appointment lanes.

Concurrent lanes were important because one guest at a time would make the spa day less engaging. The player should be able to choose a more chaotic schedule.

### Why This Matters

This turns planning UI into runtime simulation. The player's decisions before the day starts affect guest flow, workload, and end-of-day feedback.

### Code To Feature Later

- `TimePanelView.cs`
- `AppointmentRequestView.cs`
- `ScheduledApptManager.cs`
- `TimeSystem.cs`
- `ScheduledAppointment.cs`

### Asset Placeholder

Later asset: scheduling flow diagram or short scheduling interaction clip.

## Section 5 - Closing Report and Feedback Loop

### Role In Case Study

This should be supporting context, not a headline system.

The closing report gives the player a calm feedback space after a chaotic spa day. It aggregates appointment outcomes, displays total appointments, average relaxation, and revenue, and updates the player's money.

Current caveat: revenue formulas and treatment icons are placeholder. The report structure and feedback loop exist, but economy balancing should not be presented as final.

## Collaboration and Attribution

This was a collaborative project. Aidan was the primary architect of the underlying guest state/activity/subgoal architecture, and I extended that architecture for several systems, including need-based action selection and container-focused guest behavior.

The important portfolio claim is not that I built the entire project alone. The claim is that I built substantial gameplay systems and integrated them into a shared codebase with clear ownership boundaries.

## What I Learned

Working on this project reinforced that good gameplay systems are not isolated. Guest AI, scheduling, items, containers, and reports all become stronger when they can pass meaningful state between each other.

The most satisfying work was designing systems that can support future content: needs that can drive many behaviors, item definitions that can represent many resources, containers and processors that can route items generically, and scheduling data that becomes runtime simulation.

## Current Limitations

- The project is still in development.
- There is no confirmed playable build yet.
- Treatment gameplay is still developing.
- Economy formulas are placeholder.
- Guest AI still needs testing with many guests and many advertised activities.
- Reservation behavior for advertised activities remains future work.

## Draft Closing

Spa Game / Alien Spa is the strongest current portfolio candidate because it shows the kind of work I want to do professionally: translating mechanics into code, building flexible systems, and creating simulations where multiple systems combine into emergent player-facing behavior.

