---
type: project-dossier
status: in-progress
project: Spa Game / Alien Spa
portfolio_stage: project-extraction
confidence: partial-evidence
last_reviewed: 2026-08-13
---

# Spa Game / Alien Spa - Portfolio Dossier

This is a first-pass dossier created from user input, local project notes, and repo inspection. It is not final public copy.

## Project Summary

- Project purpose: co-op development of a "friendslop" spa management simulator with complex guest interaction behaviors.
- Genre / format: first-person spa management simulation.
- Engine / language: Unity / C#.
- Current status: in development.
- Playable build: no current build confirmed.
- Public availability: not yet reviewed; screenshots/video can be captured.

## Role and Ownership

- Wesley's role: co-developer.
- Team: two-person co-op project with a friend.
- Code ownership: both collaborators contribute to code.

### Current Ownership Map

| System | Ownership / Attribution |
| --- | --- |
| Three-phase day structure | Wesley |
| Appointment request and scheduling system | Wesley |
| Time system and timed events | Wesley |
| Guest state flow | Aidan |
| Guest activity/subgoal queue | Aidan primary architect; Wesley extended this system |
| Need-based action selection | Wesley |
| Guest needs and relaxation model | Wesley |
| Item carry/drop/hand-off system | Aidan |
| Data-driven item definitions | Wesley |
| Containers and reservations | Wesley |
| Processing recipes and item processors | Wesley |
| Guest checkout / dirty robe cleanup | Wesley |
| Economy and closing report | Wesley |
| UI for scheduling, reports, guest/item info | Wesley |
| FMOD integration | Aidan |

Attribution note: public case-study language must preserve that this is collaborative code. Wesley can claim specific owned systems above, but not the entire codebase.

## Technical Stack

- Unity.
- C#.
- FMOD present in project, attributed to Aidan unless later evidence says otherwise.
- LeanTween present as third-party package/plugin.
- Local repo: `C:\GameDev\Spa Game\Alien-Spa`.
- Project notes: `C:\GameDev\Spa Game\Obsidian Notes`.

## Major Systems

| System | Portfolio Relevance | Current Evidence |
| --- | --- | --- |
| Need-based Guest AI | Strong; directly supports emergent behavior and simulation identity. | `ActionSelector.cs`, `NeedFufillmentAdvertisement.cs`, `AdvertisementManager.cs`, `GuestNeedsController.cs`. |
| Data-driven resource/items | Strong; supports data-driven design and extensible systems. | `ItemDefinitionSO.cs`, `ItemFilter.cs`, `ItemContainer.cs`, `ProcessingRecipeSO.cs`, `ItemProcessor.cs`, item/recipe assets. |
| Appointment/time/day loop | Strong supporting system; shows management sim architecture. | `GamePhaseManager.cs`, `TimeSystem`, `ScheduledApptManager.cs`, `AppointmentRequestManager.cs`. |
| Checkout/cleanup integration | Strong if working in-scene; shows guest flow plus item lifecycle integration. | `CheckOutState`, dirty robe/hamper flow, container APIs. |
| Economy/closing report | Supporting; shows player feedback loop, but formulas are still prototype. | `EconomyManager.cs`, `ClosingReport.cs`, `ClosingReportUI.cs`, `ClosingReportApptUI.cs`. |
| Guest activity/subgoal architecture | Important integration story, but Aidan is primary architect. | Wesley extended this system; exact extensions need evidence. |

## Implementation Details

### Need-Based Guest AI

The candidate system centers on guests evaluating advertised affordances in the environment. `NeedFufillmentAdvertisement` exposes one or more `AdvertisementValue` entries tied to guest needs. `AdvertisementManager` maintains the active advertisement list. `ActionSelector` scores advertisements against the guest's current need values and selects an action through highest-score, random, or weighted-random modes.

Important implementation detail: `ActionSelector.Appraise()` currently weights low need values more urgently using an inverse appraisal function, so improving a badly depleted need can score higher than topping off an already healthy need.

Ownership: Wesley built this system.

Problem: earlier guest behavior was primarily scripted. Guest states contained bundles of instructions that guests followed consistently. That worked for required behavior, but it made guests too predictable: once the player understood one guest's needs and flow, serving later guests risked feeling repetitive. The project needed dynamic behavior so guests could respond differently as their needs and the environment changed.

Design goal: guest behavior should be explainable but not fully predictable, and not merely random. A player should be able to understand why a guest chose an activity in hindsight, while still having to react to changing needs and available affordances during play.

Architectural challenge: the system needed to fit into Aidan's existing guest behavior architecture, including guest states, activities, and subgoals. Wesley's system therefore selects an advertised activity rather than replacing the lower-level movement/interaction flow. This lets need-based decisions feed into the existing activity/subgoal execution layer.

Why advertisements: environmental advertisements avoid writing bespoke decision rules for every guest/object combination. Objects advertise what needs they claim to fulfill, guests score those claims against their current needs, and the selected advertisement produces an activity. This also opens design space for "false advertisement," where an object can attract guests with one promised outcome but produce a different result.

Scoring model: guests compare their current need state against the predicted future state implied by an advertisement. Both current and predicted values are appraised/attenuated by urgency, so a small improvement to a badly depleted need can outrank a large improvement to an already-satisfied need. This mirrors intuitive behavior: someone who is extremely thirsty may prioritize a small refreshment gain over a large comfort gain.

Current rough edges: the system is newly implemented and has not yet evolved much. It still needs testing with many guests and many advertised activities in a scene. Reservation behavior also needs to be incorporated into advertised activities because many activities depend on limited-capacity resources or limited-quantity items.

### Guest Needs Model

`GuestNeedsController` tracks Environment, Refreshment, Care, Comfort, and Peace. It supports value changes, decay over in-game time, and a weighted relaxation calculation. This maps directly to the design goal that guests feel like small simulated people with needs and reactions rather than static customers.

Ownership: Wesley built the full `GuestNeedsController` and relaxation calculation.

Purpose: guest needs are the atomized success/failure metric for running the spa. The player's goal is not just to complete one action repeatedly, but to provide a full care experience across multiple dimensions of guest satisfaction. The needs model supports AI decision-making, guest variation/personality, performance scoring, and the closing report's relaxation metric.

Need selection: the five needs were chosen subjectively because they felt distinct and relevant to a spa experience:

- Environment: decor, music, lighting, and the feel of the space.
- Refreshment: food and drink.
- Care: treatment-related support.
- Comfort: furniture, robes, and physical comfort.
- Peace: quietness, wait time, meditation, and emotional calm.

Why five: five needs gives enough room to differentiate guest behavior and create activities with different focuses without ballooning into an unmanageable number of requirements.

Relaxation: relaxation is the guest's overall satisfaction, calculated as the weighted sum of their needs. It is the most visible success metric for the player and connects the needs model to end-of-day feedback.

Current implementation: needs can decay over in-game time, be modified by interactions, and contribute to weighted relaxation. Code-observed behavior includes robe comfort modifying Comfort while worn, general need decay, and additional Peace change after the guest's appointment has ended. Guests can already interact with items to improve needs, and the team plans to add more content so guest actions and gameplay become more dynamic.

Design challenge: the model itself was not difficult; the main design concern was making it flexible enough for future content without overcomplicating the current prototype.

### Data-Driven Items, Containers, and Processing

The item/resource system separates authored item identity from runtime objects:

- `ItemDefinitionSO` owns item identity/category/prefab data.
- `ItemFilter` controls accepted/rejected item definitions and categories.
- `ItemContainer` handles capacity, stored physical items, display anchors, guest reservations, insert/remove APIs, and player/guest interaction.
- `ProcessingRecipeSO` defines input/output item stacks and processing duration.
- `ItemProcessor` consumes matching inputs and creates outputs after timed processing.

This is a strong candidate for a case-study section because it demonstrates extensible architecture for spa resources without hardcoding every shelf, hamper, bookcase, or processor as a one-off.

Ownership: Wesley built the data-driven item definition, container, reservation, and processing layer on top of item classes that were already present in the project. The abstracted item class already existed, but Wesley moved the system toward generic runtime items driven by ScriptableObject definitions.

Problem: the project needed containers and processors to identify compatible items reliably at runtime. The old approach leaned toward concrete classes per item, which would not scale well if the game eventually had dozens of resource types. A robe, trash item, ingredient, or treatment object should not require a bespoke script just so another system can recognize it.

Design approach: Wesley used ScriptableObjects as item definitions, then let runtime item objects carry those definitions. Containers and processors can filter by item definition or category, which makes it easier to author new content through data instead of writing a new item class for every piece of content.

Implementation challenge: much of the earlier processing behavior was not data-driven, so the hard part was adapting systems to operate on generic definitions, filters, and fields rather than relying on specific known item values. This required a more general vocabulary for "what this item is," "where it can go," and "what it can become."

Why it matters: the architecture supports the team building a game system rather than only implementing the first batch of content. If the eventual spa has many items, containers, recipes, and guest interactions, new content can be created by configuring definitions, filters, and recipes instead of expanding a web of concrete item scripts.

Container gameplay: containers are used by both the player and guests to manage items. Guests can throw away trash or dirty robes. The player can store items near the place they are used, gather resources during prep, or route dirty robes through laundry. This gives the spa a continuity of resources, which is important for a management simulation.

Reservation design: reservations prevent two autonomous guests from targeting the same item from a distance. When a guest decides to retrieve an item from a container, the item is reserved and becomes unavailable to other guests. This prevents the bad case where one guest chooses an item, walks across the spa, and arrives after another guest has already taken it.

Processing loop: the dirty robe -> laundry -> clean robe flow is working and implemented. This is a useful portfolio example because it turns guest behavior, containers, item definitions, and processors into one visible resource-management loop.

Collaboration boundary: Aidan built the underlying guest subgoal/activity architecture. Wesley integrated the item/container system into that architecture by extending it with new subgoals and activities for container use, item placement, and cleanup behavior. Wesley wrote `GTakeItemFromContainer`, `GPutItemInContainer`, `GWaitForAvailableItem`, and `GWaitForAvailableContainer`, plus checkout/dirty-robe flow integration in `GuestState.cs`. This is a good collaboration story because it shows Wesley building a system that plugs into another developer's architecture rather than working only in isolated code.

### Guest Checkout and Dirty Robe Cleanup

Ownership: Wesley built the full `CheckOutState` workflow: changing, dirty robe creation, hamper search, dirty robe container insertion, no-hamper fallback, front-desk checkout, and guest deactivation.

Purpose: this was the first implementation of guests utilizing containers. It was less about solving a blocking problem and more about adding immersive behavior while demonstrating the systems working together.

Design goal: checkout should not simply toggle a robe off and remove the guest. It should create an actual dirty item, route that item into the spa's resource-management layer, and support dirty item management as part of the simulation.

Implementation flow:

- `CheckOutState` creates separate activities for changing, putting the dirty robe in a hamper, and checking out.
- If the guest is wearing a robe, checkout routes them to a change room and queues a changing activity.
- During changing, the guest uses their clothes item, waits for the change event, and then `FinishChanging()` creates a dirty robe/clothes item for the guest to hold.
- `CreateHamperActivity()` queues `GWaitForAvailableContainer` so the guest can find a container that accepts the dirty item.
- `OnFoundHamper()` clears the old queue, queues `GPutItemInContainer`, and then queues checkout after the dirty item is stored.
- If no hamper is found, `NoHamperFound()` drops the item and continues checkout after a short wait.
- The checkout activity sends the guest to the front desk, waits, calls `FinishCheckOut()`, and then deactivates the guest through `GuestSpawner`.

Portfolio angle: this is a strong integration example because it joins Aidan's guest state/activity architecture, Wesley's container subgoals, item definitions/filters, dirty robe resource lifecycle, and the end-of-appointment guest flow. It shows a game system behaving like a small workflow rather than a disconnected script.

Hardest part: integrating a dynamic container workflow into the existing state/activity/subgoal architecture. The activity system was generally designed around initializing and queuing activities when entering a state, but the checkout flow needed subgoals whose variables were not known at state entry, such as the location of the nearest relevant container. Wesley solved this by creating/queuing follow-up activity pieces after runtime discovery, including `GWaitForAvailableContainer` and `OnFoundHamper()`.

Safeguarding: the no-hamper path is intentional defensive design. Wesley tries to identify assumptions while coding and add safeguards around them; in this case, checkout should continue even if no valid hamper is available.

Working state: the full flow is user-confirmed working in-game: robe off -> dirty robe -> hamper -> laundry -> clean robe.

### Management Loop

`GamePhaseManager` owns planning, spa day, and closing transitions. Appointment managers generate appointment requests, collect scheduled appointments, queue timed start/end events, and generate a closing report.

This supports the larger management-sim loop, but the case study should be careful not to overclaim completion: the project is still in development and no playable build is currently confirmed.

Current code-observed flow:

- `AppointmentRequestManager` generates appointment requests during Planning and adds them to the request UI.
- `AppointmentRequestView` lets the player drag requests onto a schedule grid during Planning.
- `TimePanelView` converts pointer position into schedule ticks, positions appointments visually, scales appointment blocks by duration, supports configurable concurrent appointment columns, and rejects overlapping appointments in the same column.
- `ScheduledApptManager` collects scheduled appointments, validates that requests are no longer unscheduled, and converts scheduled UI views into `ScheduledAppointment` data.
- When Planning exits, `ScheduledApptManager` queues appointment start/end `TimedEvent`s into `TimeSystem`.
- `TimeSystem` advances in-game time during Spa Day, keeps timed events sorted chronologically, executes ready events, and signals end of day.
- `ScheduledAppointment.OnAppointmentStart()` spawns a guest and links that guest back to its scheduled appointment.
- On Closing, `ScheduledApptManager` generates `ClosingReport`, which is consumed by closing report UI and economy systems.

Portfolio angle: this system shows a full management-loop bridge from player planning UI into runtime simulation events. It is less flashy than Guest AI, but it demonstrates useful production instincts: validated scheduling, time-slot snapping, overlap prevention, event-driven appointment starts, and end-of-day reporting.

Ownership: Wesley built the full appointment scheduling/time loop, including `TimeSystem`, `AppointmentRequestManager`, `TimePanelView`, `AppointmentRequestView`, `ScheduledApptManager`, `ScheduledAppointment`, and `ClosingReport`.

Problem: the team wanted the Planning phase to give the player real agency over what the spa day would look like. Real spas often run on appointments, so appointment scheduling became a natural way to connect planning decisions to the flow and intensity of the Spa Day phase.

Design approach: Wesley intentionally avoided a single god object responsible for requests, UI manipulation, scheduled data, timed events, guest spawning, and reports. Instead, the system transforms data as context changes:

- an `AppointmentRequest` is a simple container of request data;
- an `AppointmentRequestView` presents that request and lets the player manipulate it;
- a scheduled placement becomes `ScheduledAppointment` data;
- scheduled appointment data becomes timed start/end events;
- timed events produce the intended runtime behavior: spawn guest X at time Y.

Hardest implementation challenge: the drag/drop scheduling UI. Wesley had to translate visual pointer placement into script-readable schedule data, snap it to logical time slots, resize appointments by duration, and enforce placement rules such as preventing overlapping appointments. This was the first time he had built this kind of UI-to-gameplay scheduling bridge.

Concurrent lanes: concurrent appointment lanes were included to preserve player choice and keep Spa Day from becoming one guest at a time. Without overlapping appointments, the player would only ever handle a single guest until the previous appointment ended, which would make the simulation less engaging.

Working state: aside from the code-observed placeholder values, the rest of the scheduling/time loop should be functional. Known placeholders are fixed difficulty-budget request generation and placeholder revenue calculations.

### Economy and Closing Report

Ownership: Wesley built `EconomyManager`, `ClosingReport`, `ClosingReportUI`, and `ClosingReportApptUI`.

Purpose: the closing report is meant to give the player a calm feedback space after the chaos of the Spa Day phase. The player should be able to review how they did, understand how much money they earned, and carry that subjective assessment into the next Planning phase.

Current implementation: `ClosingReport` aggregates scheduled appointment data into total appointments, average relaxation, and total revenue. `ClosingReportUI` displays the summary and creates per-appointment report entries. `ClosingReportApptUI` displays guest name, treatment indicator, treatment funds, relaxation, relaxation funds, and total revenue per appointment. `EconomyManager` listens for the closing report and adds the report's total revenue to current money.

Design direction: final revenue will likely be a combination of appointment type, guest relaxation, treatment completion, tips, penalties, and related performance factors. The exact formula has not been finalized.

Current priority: the report/economy layer is lower priority because its remaining work is relatively simple compared with foundational systems like guest behavior, scheduling, item/resource flow, and treatments.

Known placeholders: revenue calculation values are placeholder, and treatment icons currently use placeholder colors. The feedback/reporting structure is functional, but the economy formula should not be presented as final balancing.

### Three-Phase Day Structure

Ownership: Wesley built this system.

Design problem: the spa day was always intended to be divided into distinct phases, especially a customer-service portion and a planning/preparation portion for the next service phase.

Implementation reasoning: Wesley's main architectural concern was separating phase tracking from phase reactions. `GamePhaseManager` owns valid transitions between Planning, Spa Day, and Closing, while other systems subscribe to phase enter/exit events. This keeps systems such as scheduling, time display, advertisement cleanup, guest spawning, closing reports, and UI updates from needing to hardcode phase-transition logic.

Difficulty: not technically difficult relative to Wesley's prior experience with phase-based games. The value is architectural cleanliness rather than algorithmic complexity.

Evolution: the implementation has not significantly evolved yet.

Best code sample: a concise excerpt from `GamePhaseManager.cs` showing:

- phase-specific UnityEvents;
- guarded `ChangeGamePhase()` transitions;
- `progressToSpaDay()` queuing `BeforeClosingGuestWrapup`;
- `progressToClosing()` responding to spa-day time end.

Supporting evidence: a short callout list or diagram showing subscribers such as `AppointmentRequestManager`, `ScheduledApptManager`, `TimeSystem`, `TimeView`, `CurrentTimeBar`, `GuestSpawner`, `GuestStateMachine`, and `AdvertisementManager`.

## Difficult Problems To Investigate

- How to make guest behavior feel emergent without making a bespoke AI script for every object.
- How to represent spa success as multiple guest needs rather than a single satisfaction number.
- How to integrate Wesley's need-based action selection into Aidan's existing guest state/activity/subgoal architecture.
- How to keep behavior explainable without making it predictable or purely random.
- How to prevent advertisement-driven behavior from ballooning development requirements for each new object or guest behavior.
- How to incorporate reservations into advertised activities so multiple guests do not choose the same limited resource.
- How to design item containers and reservations so autonomous guests do not claim the same item.
- How to migrate from concrete item-specific behavior toward data-driven item definitions without breaking existing resource flows.
- How to integrate data-driven item containers into another developer's guest subgoal/activity system.
- How to turn guest checkout into a visible resource cleanup loop instead of simply despawning guests.
- How to handle failure cases, such as no available hamper, without blocking guest checkout.
- How to keep physical first-person item interaction while also supporting management-sim resource flows.
- How to turn a drag-and-drop planning UI into timed runtime simulation events.
- How to prevent overlapping schedule placements while still allowing configurable concurrent appointment lanes.
- How to keep end-of-day reporting connected to actual guest/appointment state without hardcoding a one-off report.
- How to create a calm feedback phase after a chaotic simulation phase.
- How to separate functional report structure from unfinished economy/balancing formulas.
- How to design systems for future expansion while the current prototype remains small.
- How to keep the needs model flexible for future activities without ballooning into too many stats.

## Architecture

Candidate architecture story:

> The project evolved toward a data-driven affordance model: guest needs define internal pressure, world objects advertise what needs they can fulfill, and the action selector chooses actions based on the gap between current and future need satisfaction. The same philosophy appears in the item/resource architecture, where item definitions, filters, containers, and recipes define behavior through data and reusable components.

Wesley's explanation strengthens this as a core case-study angle: advertisements turn object affordances into data the guest can reason about, while guest states/activities/subgoals remain responsible for execution. This creates a layered AI structure:

Need state -> advertised affordances -> scored decision -> generated activity -> subgoal execution

Remaining verification need: representative code excerpt, demonstration footage, and a concrete example of at least one advertised activity working in-scene.

Needs model foundation:

> Guest needs define what the spa is actually trying to satisfy. Each guest has configurable needs, those needs decay or change through time and interactions, AI uses them to select actions, and relaxation summarizes them into an overall performance signal.

Suggested flow:

GuestNeedData -> GuestNeedsController values/decay -> ActionSelector decisions -> interaction/item effects -> CalculateRelaxation -> ClosingReport

Second case-study architecture story:

> The item/resource layer replaces one-off item scripts with reusable runtime items backed by ScriptableObject definitions. Containers, reservations, and processors reason over item definitions and categories, which lets guest behavior and player resource management share the same item lifecycle.

Suggested flow:

ItemDefinitionSO -> Item -> ItemFilter -> ItemContainer reservation/storage -> ProcessingRecipeSO -> ItemProcessor output

Checkout/cleanup integration story:

> Checkout turns the end of a guest visit into a resource-management loop. A guest changes out of their robe, creates a dirty robe item, searches for a valid hamper through the container system, stores the dirty item, and only then proceeds to checkout and deactivation.

Suggested flow:

CheckOutState -> changing activity -> dirty robe item -> GWaitForAvailableContainer -> GPutItemInContainer -> checkout activity -> guest deactivation -> laundry processor later restores clean robe

Third case-study architecture story:

> The scheduling loop translates player planning into simulation events: generated appointment requests become draggable schedule blocks, valid placements become scheduled appointments, scheduled appointments become timed events, and timed events spawn guests and feed the closing report.

Suggested flow:

AppointmentRequest -> AppointmentRequestView drag placement -> TimePanelView validation/snapping -> ScheduledAppointment -> TimedEvent queue -> guest spawn/end-of-day report

Fourth supporting architecture story:

> The closing report turns the simulated spa day into player-facing feedback. Scheduled appointments produce guest and relaxation data, the report summarizes the day, the UI presents calm after-action information, and the economy manager applies earnings for the next planning cycle.

Suggested flow:

ScheduledAppointment outcomes -> ClosingReport metrics -> ClosingReportUI summary/details -> EconomyManager money update -> next Planning phase context

## Known Gaps / Do Not Overclaim

- No playable build currently confirmed.
- Treatment gameplay is incomplete or still developing.
- Scalable guest simulation tiers are design direction, not implemented capability.
- Guest needs and relaxation are functional, but future content will expand how guests act on and recover those needs.
- Checkout/dirty robe cleanup is confirmed working, but should be framed as an integration/system-demonstration thread rather than a standalone complex algorithm.
- Economy/closing report revenue formulas are placeholder; the feedback/report structure exists, but balancing is not final.
- Appointment request generation uses a fixed difficulty budget and should be described as prototype logic unless revised.
- Scheduling placement, timed-event queuing, and appointment-driven guest spawning are confirmed as Wesley-built systems.
- Item/container rough edges need another review after more in-scene testing.
- Container reservations are implemented for item claims; broader reservation behavior for advertised activities is still future work.
- Guest state flow and carry/drop/hand-off system should be attributed to Aidan unless discussing Wesley's integrations/extensions.
- FMOD integration should be attributed to Aidan unless new evidence says otherwise.

## Candidate Code Samples

| Candidate | Why It Matters | Status |
| --- | --- | --- |
| `ActionSelector.cs` | Shows need-based scoring and action selection. | strong candidate |
| `NeedFufillmentAdvertisement.cs` | Shows affordance/advertisement abstraction and how objects create advertised guest actions. | strong candidate |
| `GuestNeedsController.cs` | Shows configurable needs, time-based decay, need modification, robe comfort effect, post-appointment Peace behavior, and weighted relaxation calculation. | strong candidate |
| `ItemDefinitionSO.cs` + `Item.cs` | Shows the shift from concrete item scripts toward reusable runtime items driven by authored definitions. | strong candidate |
| `ItemFilter.cs` + `ItemContainer.cs` | Shows definition/category filtering, filtered storage, physical presentation, and reservation logic. Best excerpt: `AcceptsItem()`, `CountAvailable()`, `TryReserve()`, and `TryClaimReservation()`. | strong candidate |
| `ItemProcessor.cs` + `ProcessingRecipeSO.cs` | Shows data-driven timed resource transformation. Best excerpt: recipe inputs/outputs plus processor input consumption/output creation. | strong candidate |
| `GuestActivity.cs` container subgoals + `GuestState.cs` checkout flow | Shows Wesley extending Aidan's subgoal/activity architecture for item storage, pickup, and cleanup. Best excerpts: `GTakeItemFromContainer`, `GPutItemInContainer`, `GWaitForAvailableItem`, `GWaitForAvailableContainer`, and dirty robe checkout routing. | strong candidate |
| `CheckOutState` in `GuestState.cs` | Shows end-of-visit workflow: changing, dirty robe creation, hamper search, container insertion, fallback, checkout, and guest deactivation. | strong candidate |
| `GamePhaseManager.cs` | Shows guarded phase transitions, phase enter/exit events, and timed guest wrap-up integration. Best excerpt: UnityEvent declarations plus `ChangeGamePhase()`, `progressToSpaDay()`, and `progressToClosing()`. | supporting candidate |
| `TimeSystem.cs` + `TimedEvent.cs` | Shows sorted timed-event queue, in-game clock advancement, minute/hour events, and end-of-day signaling. | supporting candidate |
| `TimePanelView.cs` + `AppointmentRequestView.cs` | Shows drag scheduling, tick snapping, duration-based block sizing, concurrent lanes, and overlap validation. | strong candidate |
| `ScheduledApptManager.cs` + `ScheduledAppointment.cs` | Shows conversion from scheduled UI appointments into timed start/end events and guest spawning. | strong candidate |
| `AppointmentRequestManager.cs` | Shows planning-phase request generation, but current difficulty budget is placeholder. | supporting candidate |
| `ClosingReport.cs` + `ClosingReportUI.cs` + `EconomyManager.cs` | Shows end-of-day report aggregation, UI feedback, and money update; revenue formula is placeholder and should be framed carefully. | supporting candidate |

## Candidate Visual Assets

- Clip of guests choosing different actions based on need state.
- Debug/inspector view of a guest's five needs while actions are selected.
- Code/diagram pairing: five guest needs -> weighted relaxation -> closing report metric.
- Diagram: guest need -> advertisement scoring -> selected activity -> subgoal queue.
- Diagram: ItemDefinitionSO -> ItemFilter -> ItemContainer -> ProcessingRecipeSO -> ItemProcessor.
- Clip of player/guest robe lifecycle: guest uses robe, guest checks out, dirty robe goes to hamper, laundry processor creates clean robe, clean robe returns to storage/rack.
- Diagram: CheckOutState -> changing -> dirty robe item -> hamper search -> container insert -> checkout/deactivation.
- Diagram: guest reserves item from a distance -> item becomes unavailable to others -> guest reaches container -> claim succeeds.
- Screenshot of scheduling UI and closing report.
- Clip of dragging appointment requests into valid/invalid schedule slots, including overlap rejection if easy to capture.
- Diagram: appointment request -> schedule placement -> timed event -> guest spawn -> closing report.
- Screenshot of closing report UI as a calm after-action feedback screen.
- Diagram: appointment outcomes -> report metrics -> UI feedback -> money update -> next planning phase.
- Screenshot/video of containers displaying physical stored items.
- Diagram: Planning -> Spa Day -> Closing phase transitions, with outward event subscribers rather than direct dependencies.

## Interview Hooks

- Why use environmental advertisements instead of hardcoded guest behavior branches?
- How does the scoring function prioritize urgent needs?
- Why model guest satisfaction as five needs instead of one happiness number?
- How does relaxation summarize those needs into a player-facing success metric?
- How does the system keep behavior explainable without becoming predictable?
- What is the difference between a guest state, activity/subgoal execution, and need-based action selection?
- What does "false advertisement" enable as a design tool?
- How did you integrate your action selection into another developer's guest activity/subgoal architecture?
- Why did you move item behavior toward ScriptableObject definitions instead of concrete classes per item?
- How do item filters let containers and processors understand generic runtime items?
- How do reservations prevent two guests from targeting the same item?
- How did the robe/laundry loop prove the item, container, processor, and guest integration worked together?
- Why make checkout produce a dirty robe resource instead of simply removing the guest?
- What happens if no hamper is available during checkout?
- What would you change before scaling guest count or adding more treatments?
- Which current system is intentionally data-driven, and where did you stop short to avoid overengineering?
- For the phase system, why keep phase state classes thin and let external systems react through events?
- For the scheduling system, why turn placed appointments into timed events instead of having the UI directly control guests?
- How does the schedule prevent overlapping appointments?
- What parts of the closing report are real metrics versus placeholder economy balancing?
- Why does the game need a calm report phase after the active spa day?
- How should the report influence the next Planning phase once fully developed?

## Competency Mapping

| Competency | Evidence Candidate | Strength Hypothesis |
| --- | --- | --- |
| Gameplay systems | Day loop, appointments, guest behavior, item/resource loops | strong if ownership verified |
| C# | Multiple owned Unity systems | strong if code samples are clean |
| Unity | ScriptableObjects, managers, prefabs, scene systems | credible to strong |
| Systems architecture | Advertisement/action selection and item/container/processing layers | strong |
| AI systems | Need-based guest action selection | strong candidate |
| Tools/workflow/data-driven design | ScriptableObject item and recipe definitions | credible |
| UI/gameplay integration | Drag scheduling into timed appointment simulation | strong if ownership and behavior confirmed |
| Collaboration | Extension/integration with Aidan's guest architecture | strong if explained clearly |
| Technical communication | Existing project Obsidian notes and implementation assessment | credible |
| Completion/polish | In development, no build | weak currently |

## Case Study Selection

Recommended public role: **Flagship Candidate / Primary Case Study**, with proof capture required before final publication.

### Recommended Case Study Thesis

> I built interconnected gameplay systems for a first-person spa management sim, including need-driven guest behavior, data-driven item/resource workflows, appointment scheduling, and guest checkout cleanup. My work focused on turning design goals into modular systems that support emergent behavior, resource continuity, and player planning.

### Primary Case Study Spine

Use three main sections:

1. **Need-Based Guest AI**
   - Lead with this because it best matches Wesley's desired positioning: gameplay programmer, systems architecture, simulation, emergent behavior.
   - Includes `GuestNeedsController`, `ActionSelector`, `NeedFufillmentAdvertisement`, and `AdvertisementManager`.
   - Strongest proof: guest needs -> advertisement scoring -> selected activity.

2. **Data-Driven Item / Container / Processing System**
   - Use as the architecture backbone: definitions, filters, containers, reservations, recipes, processors.
   - Shows extensibility, data-driven design, and resource lifecycle thinking.
   - Strongest proof: item definitions/filters, container reservations, processor recipe, robe lifecycle.

3. **Planning-to-Simulation Loop**
   - Include appointment scheduling, timed events, and closing report as the management loop that frames the simulation.
   - Strongest proof: drag scheduling -> scheduled appointment -> timed event -> guest spawn -> closing report.

### Supporting Integration Callout

Use checkout/dirty robe cleanup as a focused integration callout inside the item/resource section:

> The first guest-container integration was checkout cleanup: guests changed out of robes, generated dirty robe items, found a valid hamper at runtime, inserted the item through container subgoals, and then continued checkout.

This is valuable, but it should not be the headline. It is best as proof that the architecture works across systems.

### De-emphasize

- Economy formulas: supporting only; values are placeholder.
- Three-phase day structure: supporting architecture context; clean but not as distinctive.
- FMOD/audio: attribute to Aidan; do not claim.
- Guest state flow/carry-drop handoff: discuss only where Wesley integrated with Aidan's architecture.

### Publication Conditions

Before making Spa Game the live flagship case study, capture:

- Guest AI demo clip with visible/debug needs and at least two advertised options.
- Robe lifecycle clip: robe off -> dirty robe -> hamper -> laundry -> clean robe.
- Scheduling clip: drag request, valid placement, overlap rejection, Spa Day guest spawn.
- Code excerpts for `ActionSelector`, `GuestNeedsController`, `NeedFufillmentAdvertisement`, `ItemContainer`, `ItemFilter`, `ItemProcessor`, `ProcessingRecipeSO`, `TimePanelView`, and `CheckOutState`.
- One architecture diagram combining needs, advertisements, activity/subgoals, items/containers, and scheduling.

### Selection Rationale

Spa Game is currently the strongest portfolio candidate because it has:

- clear alignment with gameplay/systems/simulation positioning;
- many CONFIRMED Wesley-owned systems;
- concrete Unity/C# code evidence;
- visible gameplay loops that can be captured;
- collaboration story with clear attribution boundaries;
- enough technical depth for interviews.

Primary risk: the project is still in development and has no playable build. The case study should therefore be framed as an in-development systems case study, not a shipped product.

## Next Dossier Work

1. Capture code excerpts from `ActionSelector.cs`, `NeedFufillmentAdvertisement.cs`, and `GuestNeedsController.cs`.
2. Capture code excerpts from `ItemDefinitionSO.cs`, `Item.cs`, `ItemFilter.cs`, `ItemContainer.cs`, `ProcessingRecipeSO.cs`, and `ItemProcessor.cs`.
3. Capture the exact guest subgoal/activity excerpts Wesley added for container integration: `GTakeItemFromContainer`, `GPutItemInContainer`, `GWaitForAvailableItem`, and `GWaitForAvailableContainer`.
4. Capture or create a short gameplay/debug clip showing guest AI decision-making.
5. Capture the approved robe lifecycle clip: robe use -> checkout -> dirty robe -> laundry -> clean robe -> storage.
6. Capture scheduling/time-system code excerpts for `TimePanelView`, `AppointmentRequestView`, `ScheduledApptManager`, `TimeSystem`, and `ScheduledAppointment`.
7. Capture scheduling UI footage: generated requests, drag placement, overlap rejection, Spa Day start, guest spawn, closing report.
8. Confirm how reservation behavior will be integrated into advertised activities.
9. Decide whether Spa Game should become the first full case study or remain a high-potential future candidate until it has a playable loop.
