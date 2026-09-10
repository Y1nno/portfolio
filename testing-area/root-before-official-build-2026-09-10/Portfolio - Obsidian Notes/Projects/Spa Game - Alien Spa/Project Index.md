---
type: project-index
status: featured-first-pass
project: Spa Game / Alien Spa
portfolio_stage: implementation
confidence: partial-evidence
last_reviewed: 2026-08-13
---

# Spa Game / Alien Spa - Project Index

This project is currently implemented as the lead featured/flagship page in `spa-game.html`. First-pass project extraction continues in [[Portfolio Dossier]], [[Evidence Ledger]], [[Asset Manifest]], [[Interview Questions]], [[Case Study Draft]], [[Case Study Public Draft]], and [[Short Copy]].

## Snapshot

| Field | Current Info |
| --- | --- |
| Working title | Spa Game / Alien Spa |
| One-sentence description | Friendslop spa management simulator with complex guest interaction behaviors. |
| Engine / language | Unity / C# |
| Team | Co-op project with a friend |
| Wesley's role | Co-developer |
| Code ownership | Both collaborators contribute to code; exact system ownership needs evidence and attribution. |
| Current status | In development |
| Portfolio status | Featured flagship page implemented; evidence assets still needed |
| Playable build | No |
| Source availability | Repo exists locally at `C:\GameDev\Spa Game\Alien-Spa` |
| Public readiness | First-pass public page exists; final readiness depends on visual evidence and final review |
| Screenshots/video | Can be captured |
| Public restrictions | None identified by user |
| Desired portfolio proof | Collaborative and creative development; complex systems that integrate into a larger gameplay tapestry. |
| User-identified technical strengths | Data-driven design, Guest AI |

## Local Sources

- Unity project: `C:\GameDev\Spa Game\Alien-Spa`
- Project notes: `C:\GameDev\Spa Game\Obsidian Notes`
- Technical architecture note: `C:\GameDev\Spa Game\Obsidian Notes\01 Systems\Technical Architecture.md`
- Guest simulation note: `C:\GameDev\Spa Game\Obsidian Notes\01 Systems\Guest Simulation.md`
- Implementation assessment: `C:\GameDev\Spa Game\Obsidian Notes\02 Production\Implementation Assessment.md`

## Candidate Systems To Discuss

These are candidate systems identified from project notes and repo inspection. They are not yet ownership claims.

| System                                      | Evidence Found                                                                                   | Why It May Matter For Portfolio                                                                                                  | Ownership / Attribution Status                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Three-phase day structure                   | `GamePhaseManager.cs`; planning, spa day, closing states; architecture notes                     | Shows high-level game-loop architecture and phase-boundary thinking.                                                             | Wesley                                                 |
| Appointment request and scheduling system   | `AppointmentRequestManager.cs`, `ScheduledApptManager.cs`, scheduling UI prefabs                 | Shows management-sim structure, time slots, appointment generation, scheduling, and report flow.                                 | Wesley                                                 |
| Time system and timed events                | `TimeSystem` folder, `TimedEvent.cs`, appointment start/end events                               | Supports simulation pacing, day progression, and scheduled behavior.                                                             | Wesley                                                 |
| Guest state flow                            | `GuestState.cs`, `GuestStateMachine.cs`; CheckIn, Changing, Relaxing, Treatment, CheckOut states | Strong candidate for gameplay AI/state-machine discussion.                                                                       | Aidan                                                  |
| Guest activity/subgoal queue                | `GuestActivity.cs`, subgoal classes referenced in guest states                                   | Shows behavior decomposition into reusable steps like move, wait, interact, use item, wait for event/container.                  | Aidan - primary Architect, Wesley extended this system |
| Need-based action selection                 | `ActionSelector.cs`, `NeedFufillmentAdvertisement.cs`, `AdvertisementManager.cs`                 | Strong candidate for emergent behavior: guests score available affordances against needs and choose actions.                     | Wesley                                                 |
| Guest needs and relaxation model            | `GuestNeedsController.cs`; Environment, Refreshment, Care, Comfort, Peace                        | Connects simulation values to behavior, satisfaction, and future economy/tips.                                                   | Wesley                                                 |
| Item carry/drop/hand-off system             | `PlayerController.cs`, `Item.cs`, guest item methods                                             | Shows first-person physical interaction and one-item carry design.                                                               | Aidan                                                  |
| Data-driven item definitions                | `ItemDefinitionSO.cs`, item definition assets                                                    | Supports data-driven design claim for items and authored content.                                                                | Wesley                                                 |
| Containers and reservations                 | `ItemContainer.cs`, `ItemFilter.cs`, `ItemReservation`                                           | Strong systems candidate: storage rules, accepted filters, visual anchors, reservation to prevent guests claiming the same item. | Wesley                                                 |
| Processing recipes and item processors      | `ProcessingRecipeSO.cs`, `ItemProcessor.cs`, recipe assets                                       | Supports data-driven resource transformation, e.g. laundry dirty robe to clean robe.                                             | Wesley                                                 |
| Guest checkout / dirty robe cleanup         | `CheckOutState` in `GuestState.cs`, hamper/container flow                                        | Shows integration between guest state, item lifecycle, containers, and checkout.                                                 | Wesley                                                 |
| Economy and closing report                  | `EconomyManager.cs`, `ClosingReport.cs`, closing report UI                                       | Shows management feedback loop, though current implementation may still use placeholder values.                                  | Wesley                                                 |
| UI for scheduling, reports, guest/item info | UI scripts and prefabs                                                                           | Supports usability and management layer, but may be secondary to systems/AI evidence.                                            | Wesley                                                 |
| FMOD integration                            | FMOD project packages/banks present                                                              | Potential audio implementation evidence only if Wesley worked on it.                                                             | Aidan                                                  |

## Repo-Derived Implementation Notes

Observed from project notes and sampled scripts:

- The project has a three-phase loop: planning, spa day, closing.
- Guests move through state-driven behavior such as check-in, changing, relaxing, treatment, and checkout.
- Guest needs currently include Environment, Refreshment, Care, Comfort, and Peace.
- Action selection scores advertisements based on how much they improve a guest's needs.
- Item containers support accepted-item filters, capacity, visible anchors, and reservations.
- Item processors can consume recipe inputs and create outputs after timed processing.
- Project notes identify scalable guest simulation as a design direction, but full/standard/background simulation tiers are not yet implemented.
- Project notes identify treatment gameplay, tardiness penalties, formal relaxation scoring, and complete checkout/economy integration as important gaps.

## Candidate Portfolio Angles

Potential flagship/supporting arguments to test:

- **Emergent guest behavior through need-based affordance scoring:** guests decide what to do by comparing available advertised interactions against their internal needs.
- **Data-driven spa resource system:** item definitions, filters, containers, and recipes allow new objects/processes without bespoke logic for every station.
- **Integrated management loop:** planning appointments, timed spa day events, guest behavior, checkout, closing reports, and economy are designed as connected systems.
- **Collaborative systems development:** co-developed codebase where systems must integrate with another programmer's work.

## Draft Case Study Direction

Current public narrative spine:

1. Need-based guest AI.
2. Data-driven item/container/processing system.
3. Planning-to-simulation loop.

Supporting integration callout:

- Checkout / dirty robe cleanup as proof that guest behavior, containers, item lifecycle, and processing systems work together.

Draft notes:

- [[Case Study Draft]]
- [[Case Study Public Draft]]
- [[Short Copy]]
- [[Code Proof]]

## Evidence Needs

Before this can become final/publishable:

- Confirm implementation details and design rationale for the systems Wesley marked as owned.
- Identify exactly what Wesley extended in Aidan's guest activity/subgoal architecture.
- Identify representative code samples for owned work.
- Capture screenshots/video of the guest AI or item/container systems working.
- Determine whether the repo is public or should remain local/private.
- Confirm whether current scenes can run reliably enough for footage.
- Replace planned-evidence page block with captured flagship visual proof.

## Questions For Wesley

For each candidate system above:

- Did you build it, co-build it, refactor it, or mostly integrate with it?
- What problem was it solving?
- What was hard about it?
- What changed as the implementation evolved?
- What code sample would best demonstrate your work?
- What clip, screenshot, or diagram would make the system understandable?

## Initial Portfolio Potential

Current hypothesis: **high**, because Wesley owns meaningful parts of the guest AI, data-driven item/container/processing architecture, appointment/time loop, economy/reporting, UI, and checkout cleanup integration.

Confidence: ownership map user-confirmed; evidence and explanation still need dossier-level verification.
