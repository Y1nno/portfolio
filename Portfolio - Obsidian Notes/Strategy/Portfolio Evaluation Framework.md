---
type: governance
status: approved
portfolio_stage: research
confidence: researched
last_reviewed: 2026-08-13
---

# Portfolio Evaluation Framework

Purpose: a durable governance framework for selecting, evaluating, documenting, reviewing, and presenting projects in a programming-oriented game development portfolio.

Source basis: incorporated from `C:\Users\wesle\Downloads\Portfolio Evaluation Framework.pdf`. See [[Research Source Register]].

Core rule: the portfolio is not a gallery. It is an evidence-backed argument that the candidate can solve relevant game-development problems in code, explain decisions, collaborate responsibly, and finish or meaningfully advance technical work.

## Executive Summary

A strong game-programming portfolio should make four claims progressively clearer:

1. In seconds: this person is targeting a specific kind of programming work, uses relevant technologies, and has a few projects as evidence.
2. In minutes: on those projects, this person personally implemented identifiable systems and can show working behavior, code, technical reasoning, and ownership.
3. In a case-study read: this person understands problems, constraints, architecture, tradeoffs, debugging, iteration, and consequences of technical choices.
4. In an interview: there are concrete decisions here that a technical reviewer can challenge, probe, and discuss.

Optimize for signal density, not content volume. A project is valuable because of what it proves, not because it exists, looks polished, took a long time, or used a fashionable engine.

## Portfolio Purpose

A programming portfolio serves a different evidentiary purpose than an art or design portfolio.

For a programmer, the rendered game is evidence of behavior, not automatically evidence of implementation. The portfolio must bridge the gap between "the game does this" and "I personally engineered this portion of it."

Every prominent project should answer:

| Question | Portfolio Obligation |
| --- | --- |
| What was built? | Identify the game, prototype, system, tool, or technical experiment precisely. |
| Why did it matter? | Establish the gameplay, workflow, performance, architectural, or production problem. |
| What did I personally do? | Name owned systems, contributed systems, and boundaries with others' work. |
| How was it built? | Provide enough architecture, code, algorithmic, engine, or tooling detail to establish competence. |
| How do we know? | Attach evidence appropriate to the claim. |
| What does it prove? | Connect the work to a target programming competency and role. |

Use this chain throughout the vault:

Project -> Contribution -> Evidence -> Competency

## Audience Model

| Audience | Primarily Needs To Establish | Builds Trust | Weakens Trust |
| --- | --- | --- | --- |
| Recruiter | Target role, relevant technologies, recognizable competencies, strongest projects, experience level, links, and evidence availability. | Immediate role alignment, concise descriptions, clear ownership, working links. | Ambiguous specialization, unclear roles, long unstructured pages, broken links, unsupported superlatives. |
| Technical hiring manager | Whether the candidate has done relevant programming work at sufficient depth and can discuss it technically. | Named systems, architecture, code, constraints, tradeoffs, debugging, iteration, credible scope. | Technology lists with no application, vague ownership, suspiciously broad claims, no technical artifacts. |
| Senior programmer / interviewer | How the candidate thinks about correctness, maintainability, algorithms, architecture, debugging, tradeoffs, iteration, and judgment. | Decisions that can be interrogated, understandable code, failure/iteration stories, precise limits of knowledge. | Inability to explain code, cargo-cult patterns, hidden mistakes, team work claimed as personal work. |
| Collaborator / indie team | Whether this person can make useful things, communicate, integrate with others, and finish. | Functional work, adaptable skills, source-control awareness, practical tradeoffs. | "Lone genius" framing, unclear ownership, unfinished work without scope discipline. |

## Recruiter Skim Criteria

ROLE-DEPENDENT: the 10-30 second skim is a design constraint, not a universal hiring measurement.

The first view or short skim should reveal:

| Signal | Required Clarity |
| --- | --- |
| Target role | Specific role such as gameplay programmer, tools programmer, AI programmer, systems programmer, or generalist programmer. Avoid only saying "game developer." |
| Strongest skills | Short, role-relevant competency summary backed by projects. |
| Engines and languages | Significant technologies relevant to the target role. |
| Strongest projects | Flagships visible before lower-value work. |
| Resume | One obvious link. |
| Contact | One obvious professional contact route. |
| Source/build links | Discoverable at project level where public release is appropriate. |
| Role and status | Solo/team, candidate role, and project status: shipped, finished, prototype, jam, student, ongoing, or cancelled. |

Ten-second test: after seeing the homepage and project cards only, can the reviewer state the desired programming role, primary technical stack, strongest one or two projects, and what the candidate personally did?

Thirty-second test: can the reviewer also identify project status, collaboration context, where technical evidence lives, and why each flagship is relevant to the stated role?

Technology labels must not become free-standing claims of competence. Languages and engines need mapped project evidence.

## Technical Review Criteria

ROLE-DEPENDENT: the 2-5 minute technical review window is a governance target, not an empirical universal rule.

For every flagship, the initial technical view should reveal:

| Technical Question | Minimum Evidence Expected |
| --- | --- |
| What did I implement? | Explicit list of candidate-owned systems/features. |
| What problem was solved? | Specific gameplay, architecture, workflow, AI, tooling, performance, or production need. |
| What constraints mattered? | Relevant time, engine, platform, integration, usability, performance, team, or scope constraints. |
| How is it structured? | Concise architecture, data-flow, or state explanation; diagram when useful. |
| Why this approach? | At least one meaningful design decision or alternative considered. |
| Does the code support the claim? | Selected readable code, source link where possible, or justified alternative. |
| Did I solve problems? | Bug, technical obstacle, failed approach, revision, or integration problem. |
| Was anything measured? | Profiler, test, build, or other evidence for performance, reliability, scale, or automation claims. |
| Did it survive iteration? | Evidence of tuning, feedback, refactoring, testing, or changing requirements. |
| Can the reviewer inspect more? | Repository, build, documentation, video, commits, or other deeper artifacts where appropriate. |

Technical case studies should contain interview handles: decisions that naturally invite useful questions.

## Role Specialization

| Role Family | Portfolio Should Especially Expose |
| --- | --- |
| Gameplay programming | Mechanics, controls, state, physics interaction, responsiveness, feature iteration, edge cases, tuning, designer collaboration, and movement from prototype toward finished behavior. |
| Systems / engine programming | C++ depth where applicable, engine architecture, data ownership/lifetimes, subsystem boundaries, performance, threading, memory/data considerations, integration, diagnostics, and custom systems. |
| Tools programming | User workflow problem, tool architecture, validation, error handling, editor/user experience, automation, pipeline/source-control integration, testing, documentation, and evidence that the tool made work easier or safer. |
| AI programming | Decision architecture, state/behavior representation, perception, navigation/pathfinding where relevant, data-driven configuration, debugging visualization, tuning, performance, and gameplay/networking interactions. |
| Generalist game programming | Breadth across domains while still showing one or more areas of unmistakable depth. |

Specialized senior job postings may reveal discipline characteristics, but their depth expectations must not be treated as entry-level requirements.

## Project Inclusion Criteria

No project earns inclusion because of effort alone. Evaluate portfolio contribution: what useful proposition does this project prove that the rest of the portfolio does not prove as well?

| Classification | Governance Standard |
| --- | --- |
| Flagship case study | Clear personal ownership, substantial role-relevant technical work, strong evidence, enough reasoning/iteration/problem solving for serious interview discussion, and distinct contribution to the portfolio argument. |
| Supporting project | Credible evidence for one important competency or a useful portfolio gap, but less depth, evidence, ownership, polish, or interview richness than a flagship. |
| Brief mention | Legitimate work worth recording, but redundant with stronger work, technically shallow, weakly evidenced, or not central to target role. |
| Omit | Does not strengthen the current portfolio, creates credibility risk, lacks usable evidence, or distracts from target positioning. |
| Future candidate | Promising technical core whose score is suppressed by unfinished work, insufficient evidence, unclear attribution, or unprepared presentation. |

## Evidence Standards

Claims are weaker than artifacts. Artifacts are strongest when multiple types corroborate one another.

Example evidence chain:

Claim -> gameplay clip -> architecture/state diagram -> readable code excerpt -> source history -> explanation of bug/tradeoff

| Evidence Strength | Standard |
| --- | --- |
| Strong | Direct artifact supports a specific claim and personal ownership is clear. Multiple artifacts corroborate the claim where useful. |
| Moderate | Evidence supports the claim, but context, depth, or ownership needs clarification. |
| Weak | Claim is plausible but too generic, indirect, or lacking detail. |
| Inferred | Reasonable conclusion from context, but not directly established. Not public-safe. |
| Unsupported | Should not be used publicly until verified. |

Use [[Evidence and Provenance Rules]] for claim status and attribution.

## Code Sample Standards

Code samples should be curated evidence, not dumps.

Good code samples:

- are role-relevant;
- are small enough to read in context;
- identify the problem the code solves;
- include surrounding explanation of constraints and tradeoffs;
- show candidate ownership;
- are clean enough to invite technical conversation;
- link to fuller context when public source is available;
- avoid presenting tutorial/template code as original work.

House rule: one to three screens, roughly 40-100 lines, is a useful starting range, but this is not an industry standard. Deviate when the sample needs more or less context.

When source cannot be public, provide an excerpt, pseudocode, diagram, or explanation only if disclosure rules allow it.

## Visual And Asset Standards

Assets must support claims. Decorative media is secondary.

| Asset Type | Best Use |
| --- | --- |
| Screenshot | Shows project state, UI, editor setup, or visible result. Weak alone for programming claims. |
| GIF / short video | Demonstrates dynamic behavior, timing, responsiveness, state changes, or before/after comparison. |
| Architecture diagram | Explains system boundaries, data flow, state, ownership, or interactions. |
| State-machine diagram | Supports behavior, AI, controls, animation, or mode-switching claims. |
| Flowchart | Shows process logic, pipelines, encounter flow, tools, or content generation. |
| Editor/tool screenshot | Demonstrates tooling, validation, designer workflow, or content-authoring support. |
| Profiler/debugger capture | Supports performance, debugging, memory, timing, or reliability claims. |
| Code excerpt | Makes implementation and judgment inspectable. |

An asset is persuasive when it makes a specific technical claim easier to verify. It is decorative when it only makes the page look finished.

## Collaboration And Attribution Standards

Team projects must state:

- team size;
- my role;
- systems I owned;
- systems I contributed to;
- shared decisions;
- systems built by others;
- testimonial/source context where relevant.

Accurate credit is a credibility issue, not just etiquette.

## Handling Unfinished Or Weak Projects

Unfinished work can be useful when the technical scope, status, and evidence are honest. A prototype may be compelling if it proves a specific programming capability.

Use unfinished projects when:

- the technical problem is clear;
- my contribution is confirmed;
- project status is explicit;
- evidence is available;
- the case study can explain constraints, iteration, and remaining limitations.

Omit or minimize unfinished projects when:

- ownership is unclear;
- evidence is weak;
- the project only repeats a stronger project's signal;
- it requires inflated prose to sound impressive;
- it distracts from the target role.

## Case Study Structure

Default progression:

Context -> Problem -> Constraints -> Approach -> Iteration -> Solution -> Evidence -> Reflection

Do not force every project into an identical story when a different structure better supports the evidence. Strong case studies explain decisions, not just outcomes.

## Common Portfolio Anti-Patterns

1. Generic technology lists without project evidence.
2. Vague adjectives replacing concrete implementation.
3. Excessive code dumps.
4. Hidden or blurred ownership.
5. Overstated competence.
6. Every project receiving equal weight.
7. Visual polish before content strength.
8. GitHub links used as a substitute for explaining important code.
9. Long narrative pages without technical evidence.
10. Tutorial/template foundations presented as original work.
11. Team accomplishments presented as individual accomplishments.
12. Weak projects promoted through prose rather than evidence.
13. Broken links or inaccessible evidence.
14. Hiding mistakes instead of showing informed reflection.

## Evaluation Rubric

Score projects and finished case studies separately. A project can have strong underlying work but a weak case-study score if that work is not explained or evidenced.

| Score | Definition |
| --- | --- |
| 0 | Absent, contradictory, or cannot be determined. |
| 1 | Very weak: mostly assertion, highly ambiguous, or seriously deficient. |
| 2 | Partial: some valid signal exists, but important context, evidence, ownership, relevance, or clarity is missing. |
| 3 | Credible: sufficient evidence and explanation exist to make the relevant claim responsibly. |
| 4 | Strong: clear, substantial, well-supported evidence with useful depth and little reviewer ambiguity. |
| 5 | Flagship: exceptional portfolio evidence, role-relevant, independently understandable, richly substantiated, and capable of sustaining serious technical interview discussion. |

Rubric dimensions:

| Criterion | Credible 3 | Flagship 5 |
| --- | --- | --- |
| Role clarity | Relevance to one or more target competencies is clear. | Project is an unmistakable anchor for the target role. |
| Technical credibility | Implementation and reasoning establish genuine ability. | Depth, judgment, constraints, and implementation are unusually compelling. |
| Evidence quality | Appropriate direct artifacts substantiate central claims. | Multiple complementary evidence types strongly corroborate claims. |
| Personal ownership clarity | Owned versus shared work is clear. | Ownership is precise and independently corroborated where possible. |
| Project distinctiveness | Provides meaningful competency/story not already better established elsewhere. | Demonstrates rare depth, unusual technical challenge, or uniquely strong evidence. |
| Interview value | Contains useful choices, obstacles, or lessons. | Provides several deep technical decisions, tradeoffs, failures, and follow-up questions. |
| Visual/code support | Assets make central technical claims easier to inspect. | Every major artifact is purposeful, readable, and reinforces a specific argument. |
| Recruiter skimmability | Key facts and role relevance are visible quickly. | Professional value is clear almost immediately without sacrificing depth. |
| Writing clarity | Concise and technically understandable. | High information density with precise terminology and smooth progressive disclosure. |
| Risk of overclaiming | Mostly appropriately scoped, with a few statements needing qualification. | Every material claim is appropriately scoped, attributed, and evidenced. |

Risk of overclaiming uses reversed semantics: 0 means severe risk; 5 means essentially no material risk.

Default classification gates:

| Category | Default Rubric Interpretation |
| --- | --- |
| Flagship case study | 40-50, with technical credibility, evidence quality, ownership clarity, and overclaiming risk each at least 4. |
| Supporting project | 32-39, ordinarily with no core credibility/evidence/ownership score below 3. |
| Brief mention | 24-31, or credible work made redundant by stronger projects. |
| Omit | Under 24, or any hard failure condition. |
| Future candidate | Promising core suppressed by unfinished work, evidence gaps, unclear attribution, or unprepared presentation. |

Hard failures override score. A project cannot be a flagship when:

- central ownership is materially uncertain;
- central public claims are unsupported;
- presentation violates NDA or disclosure restrictions;
- evidence is fabricated or substantially misrepresented;
- tutorial/template foundations are presented as original work;
- the core system cannot be established from available artifacts.

## Review Procedure

For each project, reason in this order:

Inventory -> Attribution -> Evidence -> Competencies -> Distinctiveness -> Classification -> Case-study readiness

Do not begin with promotional prose.

For every proposed factual claim, maintain:

Claim -> Evidence artifact -> Evidence strength -> Ownership -> Public-safe?

Publication gate:

Could a skeptical technical interviewer ask "How do you know?" or "Was that actually yours?" and receive a concrete answer from the portfolio evidence?

If not, revise or remove the claim.

## Open Questions And Limits

- ROLE-DEPENDENT: a portfolio complements technical tests and interviews; it does not replace them.
- ROLE-DEPENDENT: exact skim duration is a design target, not an industry rule.
- ROLE-DEPENDENT: ideal project count depends on target role and evidence quality.
- ROLE-DEPENDENT: specialization versus generalism depends on target studios and job postings.
- ROLE-DEPENDENT: language weighting changes by discipline and engine.
- NEEDS USER INPUT: target positioning.
- NEEDS USER INPUT: project truth set.
- NEEDS USER INPUT: evidence inventory.
- NEEDS USER INPUT: disclosure boundaries.
- NEEDS USER INPUT: geographic/studio targets.
- NEEDS RESEARCH: AI-assisted code disclosure expectations.
- NEEDS RESEARCH: studio-specific portfolio requirements immediately before applying.

## Framework Doctrine

Select projects for what they prove. State ownership before accomplishments can be misattributed. Match claims to direct evidence. Show enough implementation to make technical judgment inspectable. Explain problems and tradeoffs rather than decorating results with adjectives. Give the strongest, most role-relevant evidence disproportionate prominence. Preserve uncertainty rather than letting polished prose conceal it.

