---
type: interview-prep
status: in-progress
project: Spa Game / Alien Spa
portfolio_stage: review
last_reviewed: 2026-08-13
---

# Spa Game / Alien Spa - Interview Questions

## Architecture Questions

- Why separate phase tracking from phase reactions?
- Why are the phase state classes currently thin?
- What would become harder if scheduling, time, UI, and guests each handled their own phase transitions?
- Why did you use an advertisement/affordance model for guest behavior instead of hardcoded behavior branches?
- How does the need appraisal function change guest priorities?
- How does the system avoid behavior that is either totally scripted or totally random?
- Why use five separate guest needs instead of a single satisfaction score?
- Why choose Environment, Refreshment, Care, Comfort, and Peace?
- How does relaxation summarize guest needs into a visible success metric?
- What happens when two advertisements satisfy the same need?
- What is an example of a "false advertisement," and how would it affect gameplay?
- How do the guest needs connect to the scheduling, economy, or closing-report systems?
- Where did data-driven design help, and where would hardcoded behavior have been simpler?
- Why did the item/resource system need to become data-driven?
- What was the limitation of concrete item classes as the game added more content?
- Why were ScriptableObjects a good fit for item identity and filtering?
- How do containers and processors recognize compatible generic items?
- What does the dirty robe -> laundry -> clean robe loop demonstrate about the game's simulation?
- Why did the scheduling system convert player placement into timed events?
- Why separate `AppointmentRequest`, `AppointmentRequestView`, `ScheduledAppointment`, and `TimedEvent` instead of using one object?
- How does the scheduling system fit into the Planning -> Spa Day -> Closing loop?
- What should happen when the player schedules overlapping appointments?
- What are concurrent appointment lanes meant to represent in design terms?
- What does the closing report tell the player, and which values are still placeholder?
- Why should the closing report feel calmer than the Spa Day itself?
- What should the player learn from the report before planning the next day?
- How do you think about prioritizing placeholder economy formulas versus more foundational systems?

## Collaboration Questions

- How did you integrate your systems with Aidan's guest state/activity/subgoal architecture?
- What was the boundary between Aidan's guest flow work and your action-selection/container/extensions work?
- How did Aidan's subgoal/activity architecture make your container and processing work easier to extend?
- How did you integrate checkout cleanup into an activity/subgoal system that normally queues work when entering a state?
- How did you coordinate code changes in a shared repo?
- Were there disagreements or design changes around guest behavior or item handling?

## Implementation Questions

- How do container reservations prevent multiple guests from targeting the same item?
- Why do guests need to reserve items before reaching the container?
- What happens when a reserved item is removed, destroyed, or expires?
- How does an item processor safely consume inputs and create outputs?
- Why are item definitions ScriptableObjects?
- What would need to change before adding many more item categories or recipes?
- Which container-related guest subgoals or activities did you add personally?
- What part of adapting the old processing logic to the data-driven model was hardest?
- How does drag placement become an appointment start/end event?
- How does `TimePanelView` translate pointer position into a valid appointment time?
- How does the system prevent same-lane overlap while allowing multiple appointment lanes?
- How does the guest spawned from an appointment stay linked to its appointment data?
- How do needs decay or change over in-game time?
- How does item interaction affect guest needs?
- How does the relaxation calculation work?
- Why create a dirty robe item during checkout instead of simply despawning or toggling state?
- How does checkout find the right hamper/container at runtime?
- What happens if no hamper is available?
- What made dynamic checkout cleanup difficult to integrate with queued activities?

## Scope / Honesty Questions

- What parts are still prototype or placeholder?
- What would you not claim publicly yet?
- What system would you refactor first?
- What is the biggest technical risk in the current architecture?
- How would the system scale from a small prototype to a larger spa with many guests?

## Current Prep Needed

| Topic | Can Wesley Answer Now? | Prep Needed |
| --- | --- | --- |
| Guest needs and relaxation | yes | Explain needs as atomized spa success metrics, five-need scope, weighted relaxation, decay/interactions, and future content expansion. |
| Need-based action selection | likely | Explain original problem, design alternatives, scoring choice, and current limitations. |
| Advertisement-based affordances | likely | Explain why objects advertise outcomes and how this reduces hardcoded guest decision logic. |
| Item/container/reservation architecture | yes | Explain content scaling, generic item definitions, filters, and the "guest chooses from afar" reservation problem. |
| Processor/recipe design | likely | Confirm code excerpts and current limitations; robe/laundry loop is user-confirmed working. |
| Checkout / dirty robe cleanup | yes | Explain first guest-container integration, immersion/dirty item management, runtime hamper discovery, no-hamper safeguard, and working robe lifecycle. |
| Integration with Aidan's systems | yes | Explain exact extension points and shared boundaries, especially container-related subgoals/activities and checkout runtime discovery. |
| Appointment scheduling/time loop | yes | Explain planning agency, real-spa appointment inspiration, modular data transformations, drag/drop UI challenge, concurrent lanes, and placeholder revenue/request budget caveats. |
| Economy and closing report | yes | Explain calm feedback space, performance reflection, money update, unfinished formula/balancing, and why this is lower priority than foundational systems. |
| Completion/build status | yes | Be direct: in development, no build yet. |

## Draft Answer Notes

### Appointment Scheduling / Time Loop

- Ownership: Wesley built the full loop: `TimeSystem`, `AppointmentRequestManager`, `TimePanelView`, `AppointmentRequestView`, `ScheduledApptManager`, `ScheduledAppointment`, and `ClosingReport`.
- Problem: planning needed to matter. Appointment scheduling gave the player agency over what the Spa Day would look like and connected Planning-phase choices directly to guest flow.
- Inspiration: real spas commonly operate through appointments, making this mechanic a natural fit for the game fantasy.
- Architecture: avoid a god object. Each object represents a different context:
  - `AppointmentRequest`: raw request data.
  - `AppointmentRequestView`: player-facing draggable UI.
  - `ScheduledAppointment`: result of player manipulation.
  - `TimedEvent`: runtime trigger for actual behavior.
  - Appointment start: spawn guest X at time Y.
- Hardest part: drag/drop UI. Wesley had to translate visual pointer placement into logical schedule data, resize appointment blocks by duration, snap them to time ticks, and enforce scheduling rules.
- Concurrent lanes: included so players can choose overlapping guest flow; otherwise the Spa Day would only ever have one active guest at a time, which would be less engaging.
- Caveats: fixed request difficulty budget and placeholder revenue values are prototype logic. Other scheduling/time systems should be functional.

### Economy / Closing Report

- Ownership: Wesley built `EconomyManager`, `ClosingReport`, `ClosingReportUI`, and `ClosingReportApptUI`.
- Purpose: after a chaotic Spa Day, the closing report gives the player a calm space to review how they did and how much money they earned.
- Player loop: the report should help the player form a subjective sense of what worked, what did not, and what to carry into the next Planning phase.
- Current implementation: the report aggregates total appointments, average relaxation, and total revenue; report UI displays summary and per-appointment details; the economy manager applies report revenue to current money.
- Formula direction: final earnings may consider appointment type, guest relaxation, treatment completion, tips, penalties, and other performance factors.
- Caveat: exact revenue formula and current values are placeholder. This is not the current priority because the team is focusing on more foundational, farther-reaching systems.

### Guest Needs / Relaxation

- Ownership: Wesley built the full `GuestNeedsController` and relaxation calculation.
- Purpose: guest needs are the atomized success/failure metric for running the spa. They support AI decision-making, guest variation, performance scoring, and closing report feedback.
- Player design: satisfying guests should require a full care experience rather than repeating one optimal action. Different needs encourage different activities and decisions.
- Five needs: Environment, Refreshment, Care, Comfort, and Peace were chosen because they feel distinct and relevant to a spa experience.
- Scope reasoning: five needs gives enough room for differentiated behavior and activity design without becoming an unmanageable list of stats.
- Relaxation: overall satisfaction, calculated as a weighted summary of the guest's needs. It is the most visible success metric for the player.
- Current behavior: needs decay over in-game time, can be changed by interactions/items, and include code-observed effects such as robe comfort and post-appointment Peace behavior.
- Future direction: more content will expand how guests act on and recover needs, making gameplay and guest behavior more dynamic.
- Caveat: the model itself was not difficult; the main design work was keeping it flexible for future needs without overcomplicating the prototype.

### Checkout / Dirty Robe Cleanup

- Ownership: Wesley built the full checkout workflow: changing, dirty robe creation, hamper search, dirty robe container insertion, no-hamper fallback, front-desk checkout, and guest deactivation.
- Purpose: this was the first implementation of guests utilizing containers. It adds immersive behavior and demonstrates several systems working together.
- Design reason: checkout creates a dirty robe item for immersion and dirty item management instead of simply toggling the robe off or despawning the guest.
- Working flow: robe off -> dirty robe -> hamper -> laundry -> clean robe is confirmed working.
- Hardest part: integrating a dynamic workflow into the existing state/activity/subgoal architecture. The system normally initializes and queues activities when entering a state, but checkout needed variables that were unknown at state entry, such as the nearest relevant container.
- Implementation approach: queue/discover dynamically using `GWaitForAvailableContainer`, then use `OnFoundHamper()` to queue the container insertion once the runtime target is known.
- Safeguard: if no hamper is found, checkout drops the item and continues. This was intentional defensive programming: identify assumptions and protect against them so a guest does not get stuck.
- Best proof: use both code and video. Code shows the dynamic integration and fallback; video shows the visible simulation payoff.
