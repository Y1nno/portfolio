---
type: case-study-public-draft
status: draft
project: Spa Game / Alien Spa
portfolio_stage: narrative-drafting
last_reviewed: 2026-08-13
---

# Building Simulation Systems for a Spa Management Game

> Draft public case study copy. Assets, final code excerpts, and publication wording still need review before this goes live.

## Summary

Spa Game / Alien Spa is an in-development Unity/C# first-person spa management sim built by a two-person team. The game centers on running a spa day: planning appointments, serving guests, managing resources, and responding to guest needs as the day unfolds.

My work focused on gameplay and simulation systems. I built need-driven guest behavior, data-driven resource workflows, appointment scheduling, timed guest spawning, and checkout cleanup systems that connect player planning to the live spa simulation.

The core challenge was making these systems work together. Guest needs had to drive behavior, world objects had to advertise meaningful choices, items had to move through reusable resource systems, and planning decisions had to affect the actual flow of the spa day.

## Technical Highlights

| Area | What I Built | Why It Matters |
| --- | --- | --- |
| Guest AI | Need-based action selection using advertised world affordances. | Guests can make explainable, dynamic choices instead of following only scripted behavior. |
| Resource Systems | Data-driven item definitions, filters, containers, reservations, recipes, and processors. | New spa resources can be authored and routed without bespoke scripts for every item. |
| Management Loop | Appointment scheduling, timed events, guest spawning, checkout cleanup, and closing reports. | Player planning turns into runtime simulation and end-of-day feedback. |

## My Role

I was a co-developer on the project. My primary owned systems include:

- Need-based guest action selection.
- Guest needs and relaxation scoring.
- Data-driven item definitions.
- Item containers, filters, and reservations.
- Processing recipes and item processors.
- Appointment scheduling, time, and timed events.
- Checkout cleanup and dirty robe flow.
- Economy and closing report structure.

This was collaborative work in a shared codebase. Aidan was the primary architect of the underlying guest state/activity/subgoal architecture, and I extended that architecture for several of my systems. That boundary matters: the case study is about the gameplay systems I owned and how I integrated them into a teammate's architecture.

## The Problem

The game needed guests who felt responsive without becoming random. Early guest behavior leaned on scripted bundles of instructions. That worked for consistent required behavior, but it became predictable over time. Once the player understood one guest, they risked understanding every guest.

At the same time, the spa needed to function as a management sim. Player planning, guest needs, items, containers, laundry, checkout, and reports all had to connect into one larger loop.

I approached the project as a systems problem: build modular pieces that could pass meaningful state between each other instead of solving every situation with one-off scripts.

## Need-Based Guest AI

I built the guest needs model around five needs:

- Environment
- Refreshment
- Care
- Comfort
- Peace

These needs are the atomized success metrics for running the spa. The goal is not for the player to repeat one optimal action. Guest satisfaction should require a more complete care experience, where different activities satisfy different dimensions of the guest's state.

World objects advertise what needs they can fulfill. Guests score those advertised activities against their current needs and the predicted future state created by the activity. The scoring model prioritizes urgent deficits, so a small improvement to a badly depleted need can outweigh a larger improvement to a need that is already mostly satisfied.

This creates behavior that is explainable without being fully predictable. A player should be able to understand why a guest made a choice, while still having to respond to changing needs and available options.

Representative systems:

- `GuestNeedsController.cs`
- `ActionSelector.cs`
- `NeedFufillmentAdvertisement.cs`
- `AdvertisementManager.cs`

## Data-Driven Items and Resource Flow

The spa also needed a flexible way to represent resources. Containers, processors, guests, and player interactions all needed to understand what an item was. Writing a separate concrete class for every item would not scale well as the amount of content grew.

I moved the item/resource layer toward reusable runtime items backed by ScriptableObject definitions.

Core pieces:

- `ItemDefinitionSO` stores item identity, category, and prefab data.
- `Item` runtime objects carry those definitions.
- `ItemFilter` lets containers and processors accept or reject items by definition or category.
- `ItemContainer` handles capacity, stored items, physical presentation, and reservations.
- `ProcessingRecipeSO` defines inputs, outputs, and processing time.
- `ItemProcessor` consumes matching inputs and creates outputs.

The goal was to build a system for making the game, not just manually implement the first few pieces of content.

One important piece was reservation logic. Autonomous guests can decide to retrieve an item while standing far away from the container. If multiple guests target the same object, one of them could arrive after the item is already gone. Reservations prevent that by making a claimed item unavailable to other guests before the first guest reaches it.

This architecture supports item lifecycle loops such as `clean robe -> guest use -> dirty robe -> hamper -> laundry -> clean robe`.

## Checkout Cleanup as an Integration Test

Checkout became the first implementation of guests using containers.

Instead of simply toggling off a robe and removing the guest, I built checkout as a resource-management workflow. A guest can:

- move to a change room;
- change out of their robe;
- generate a dirty robe item;
- search for a valid hamper at runtime;
- put the dirty item into the container;
- continue to front-desk checkout;
- deactivate after checkout completes.

This was a compact but meaningful integration test. It connected guest states, activity/subgoal execution, item definitions, containers, dirty item management, and processing recipes.

The hardest part was fitting a runtime-dynamic workflow into an activity system that usually queues work when entering a state. Checkout needed information that was not known at state entry, such as the nearest relevant container. I handled that by queueing follow-up behavior after runtime discovery through `GWaitForAvailableContainer` and `OnFoundHamper()`.

I also added a no-hamper fallback. If no valid container is found, the guest drops the item and continues checkout. That was intentional defensive programming: when I notice an assumption in my code, I try to protect the system from getting stuck if the assumption fails.

## Planning-to-Simulation Loop

The Planning phase needed to matter. Since real spas often run on appointments, scheduling became a natural way to give the player agency over what their spa day would look like.

I built the appointment/time loop as a series of modular handoffs:

- `AppointmentRequest` stores raw appointment request data.
- `AppointmentRequestView` presents a draggable UI object.
- `TimePanelView` validates placement, snaps appointments to time ticks, scales appointment blocks by duration, and prevents same-lane overlap.
- `ScheduledAppointment` stores the result of player scheduling.
- `TimedEvent` queues runtime start/end behavior.
- `ScheduledAppointment.OnAppointmentStart()` spawns a guest at the scheduled time.
- `ClosingReport` summarizes the day.

The drag-and-drop scheduling UI was the hardest part. I had to translate visual pointer placement into logical schedule data, enforce valid placement rules, support appointment durations, and allow concurrent appointment lanes.

Concurrent lanes matter because a spa day with only one active guest at a time is less engaging. Letting players schedule overlapping appointments gives them more control over pacing and chaos.

## Closing Report and Feedback

The closing report is supporting context rather than the headline system, but it completes the management loop.

After a chaotic spa day, the player needs a calm space to review how they did. The report aggregates appointment outcomes, displays total appointments, average relaxation, and revenue, and updates the player's money.

The report structure is functional, but the revenue formula and treatment icons are still placeholder. The final economy formula will likely account for factors like appointment type, guest relaxation, treatment completion, tips, and penalties.

## What I Learned

This project reinforced that strong gameplay systems are not isolated. Guest AI, scheduling, items, containers, and reports all become more interesting when they can pass meaningful state between each other.

The work I am proudest of is the architecture that supports future content:

- needs that can drive many guest behaviors;
- advertisements that let world objects expose choices;
- item definitions that can represent many resources;
- containers and processors that route items generically;
- scheduling data that becomes runtime simulation.

That kind of systems work feels closest to what I want to do professionally: translate mechanics into code, build flexible foundations, and create simulations where multiple systems combine into player-facing behavior.

## Current Status

Spa Game / Alien Spa is still in development and does not yet have a confirmed playable build. This case study should be presented as an in-development systems case study, not as a shipped-game postmortem.

Current limitations:

- Treatment gameplay is still developing.
- Economy formulas are placeholder.
- Guest AI still needs testing with many guests and many advertised activities.
- Reservation behavior for advertised activities remains future work.

## Evidence Plan

- Guest AI demo: needs -> advertisement scoring -> selected activity.
- Robe lifecycle demo: robe off -> dirty robe -> hamper -> laundry -> clean robe.
- Scheduling demo: drag request -> valid placement -> timed guest spawn.
- Architecture diagram tying needs, advertisements, subgoals, items, containers, scheduling, and reports together.
- Code excerpts from the strongest owned systems.
