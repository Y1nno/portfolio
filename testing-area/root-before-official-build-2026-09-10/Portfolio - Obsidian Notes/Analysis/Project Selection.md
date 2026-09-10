---
type: decision-framework
status: in-progress
portfolio_stage: selection
last_reviewed: 2026-08-13
---

# Project Selection

This framework decides which projects deserve inclusion and what role each project serves.

Selection is a portfolio optimization problem, not a simple ranking. A project can be good work and still be demoted if another project proves the same competency more clearly.

## Selection Categories

| Category | Meaning |
| --- | --- |
| Flagship | Deep case study; strongest technical evidence and interview value. |
| Supporting | Included but narrower; demonstrates a distinct competency or context. |
| Brief Mention | Appears in index/resume only; useful but not strong enough for a full case study. |
| Omit | Does not currently strengthen the portfolio. |
| Future Candidate | Could become valuable after more work or evidence capture. |

## Scoring Gate

Use the 0-5 rubric in [[Portfolio Evaluation Framework]] across these dimensions:

- role clarity;
- technical credibility;
- evidence quality;
- personal ownership clarity;
- project distinctiveness;
- interview value;
- visual/code support;
- recruiter skimmability;
- writing clarity;
- risk of overclaiming.

Default classification:

| Category | Default Interpretation |
| --- | --- |
| Flagship | 40-50 total, with technical credibility, evidence quality, ownership clarity, and overclaiming risk each at least 4. |
| Supporting | 32-39, usually with no core credibility/evidence/ownership score below 3. |
| Brief Mention | 24-31, or credible work made redundant by stronger projects. |
| Omit | Under 24 or any hard failure. |
| Future Candidate | Promising work suppressed mainly by evidence, attribution, completion, or presentation gaps. |

Hard failures override scores. A project cannot be flagship if central ownership is uncertain, public claims are unsupported, disclosure rules would be violated, evidence is fabricated or misrepresented, tutorial/template work is presented as original, or the core demonstrated system cannot be established from artifacts.

## Decision Questions

- What does this project demonstrate that the rest of the portfolio does not?
- Are the strongest claims CONFIRMED in the [[Evidence Ledger]]?
- Is personal ownership clear?
- Can this project support a technical conversation?
- Does it add distinct competency coverage in [[Competency Matrix]]?
- Does it create redundancy with a stronger project?
- Are there assets available or realistic to create?
- Would including this project improve or dilute the portfolio thesis?
- What does this project prove that the rest of the portfolio does not prove as well?
- Can a skeptical interviewer ask "How do you know?" or "Was that yours?" and get a concrete answer?

## Decision Table

| Project | Proposed Role | Rubric Score | Rationale | Evidence Strength | Asset Readiness | Risks | Decision Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Spa Game / Alien Spa | Flagship Candidate | 42 / 50 provisional | Best match for gameplay/systems/simulation positioning. Strong owned systems: need-based guest AI, data-driven item/container/processing, appointment scheduling/time loop, checkout cleanup integration. | strong; many CONFIRMED claims in Spa Game Evidence Ledger | needs capture; code exists, video/screenshots/diagrams still needed | in development; no playable build; economy formulas placeholder; collaboration attribution must remain clear | selected-provisional |
| Tides of Eternity | Strong Supporting Piece | supporting-provisional | Strong combat systems prototype: Wesley-built movement/dash, damage formula, status runtime, enemy state machines, and external-GDD-to-implementation traceability. Complements Spa rather than replacing it. | strong for status-system claims; repo implementation ownership confirmed by Wesley | assumed available from Wesley; public assets permission-gated | permission required before public showing; current implementation is a combat prototype, not full roguelite vertical slice; GDD was not authored by Wesley | selected-provisional |
| The Boy Aflame Who Couldn't Fly | Additional / Needs Reassessment | NEEDS ANALYSIS | Existing live-site project with potentially useful recording/playback systems, but it has not received the same ownership/evidence review as Spa, Tides, or Demons. | unknown beyond existing page | existing page; asset readiness unknown | may be redundant with stronger Unity systems unless replay mechanic proves distinct technical depth | demoted-pending-dossier |
| False God | Additional / Needs Reassessment | NEEDS ANALYSIS | Existing live-site project with gameplay systems and project-management framing, but it needs a fresh evidence/ownership review before being treated as a featured project. | unknown beyond existing page/testimonial | existing page; GitHub link present | may dilute focus if project-management framing competes with gameplay-programmer positioning | demoted-pending-dossier |
| Echoes of Us | Additional / Needs Reassessment | NEEDS ANALYSIS | Existing homepage card mentions Godot/C# breadth, but no project page or evidence dossier is available yet. | unknown | no page currently | weakest live-site proof until evidence and page exist | demoted-pending-dossier |
| RootAccess | UNKNOWN | NEEDS ANALYSIS | NEEDS PROJECT ANALYSIS | UNKNOWN | existing assets present | UNKNOWN | not-started |
| Demons and Dining Darling | Public Proof / Supporting Piece | supporting-provisional | Public Itch.io prototype fills completion/public-proof gap. Code scan shows order/station/dialogue systems and ScriptableObject-driven content. Public postmortem confirms tied for 3rd place and credits "Wes" with recommending the 4 L retrospective format. | engine/repo implementation ownership confirmed by Wesley; art/writing/design are team inputs | public prototype exists; browser and Windows builds listed; gameplay GIF still needed | jam/team project; code may be prototype-style; "Next Indie Hit" still needs source; avoid implying art/writing/design authorship | selected-first-pass |
| Tabletop Generators / llm npc | UNKNOWN / Tools Candidate | NEEDS ANALYSIS | Python tooling project may fill Python, tools, validation, structured data, CLI/desktop UI, and tests gaps. | partial; README and file structure reviewed | unknown | game-adjacent rather than gameplay; should support, not dilute, game-programming identity | needs-dossier-if-tools-target |

Record final choices in [[Decisions]].

## Current Selection Notes

Spa Game / Alien Spa is the current flagship, but final publication quality depends on asset capture. It should be positioned as an in-development systems case study rather than a shipped game.

Tides of Eternity is a strong supporting piece, not a replacement flagship. It should be used to show combat-system implementation, runtime status architecture, and external-GDD-to-code translation. It complements Spa by showing a different gameplay domain.

Demons and Dining Darling should stay as a public-proof supporting piece. It is not the deepest technical project, but it shows a shipped public prototype, a jam placement, and clear implementation ownership on a mixed-discipline team.

The Boy Aflame Who Couldn't Fly, False God, and Echoes of Us are currently additional projects rather than featured projects. They should not lead the homepage until each has a fresh dossier, confirmed ownership boundaries, and clearer evidence assets. Boy Aflame may regain value if the recording/playback mechanic proves technically strong. False God may be useful for process/project-management evidence, but should not compete with the gameplay-programming thesis. Echoes of Us mainly offers Godot breadth for now and needs the most evidence work.

See [[Portfolio Coverage Assessment]] for current skill-gap and project-feasibility analysis.

Recommended Spa Game case-study spine:

1. Need-Based Guest AI.
2. Data-Driven Item / Container / Processing System.
3. Planning-to-Simulation Loop.

Supporting callouts:

- Checkout / dirty robe cleanup as an integration proof.
- Economy / closing report as a player feedback loop with placeholder formulas.
- Three-phase day structure as architectural context.

Do not lead with:

- Economy balancing.
- Phase system alone.
- Audio/FMOD integration, attributed to Aidan.
- Broad claims about the entire guest state architecture.
