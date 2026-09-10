---
type: governance
status: approved
portfolio_stage: all
last_reviewed: 2026-08-13
---

# Evidence and Provenance Rules

This note governs how claims become public-facing portfolio copy.

## Evidence States

| State | Meaning | Public Use |
| --- | --- | --- |
| CONFIRMED | Directly supported by project notes, source code, version history, documentation, conversations, assets, or another reliable source. | Usually safe if attribution is clear. |
| LIKELY / INFERRED | Reasonable conclusion from available context, but not directly established. | Not safe without investigation. |
| UNKNOWN | Insufficient evidence. | Not safe. |

## Claim Rules

- Every important claim should be recorded in a project [[Evidence Ledger]].
- Only CONFIRMED claims should automatically be treated as suitable for public copy.
- Inferred claims may become research tasks, not finished copy.
- Claims are weaker than artifacts; artifacts are strongest when multiple evidence types corroborate one another.
- Do not turn "we considered implementing X" into "I implemented X."
- Do not turn "the team built X" into "I built X" unless ownership evidence supports it.
- Do not present tutorial/template foundations as original work.
- Do not use polished language to hide weak evidence.

## Ownership Rules

Every team-project case study should eventually identify:

- team size;
- my role;
- my responsibilities;
- systems I owned;
- systems I contributed to;
- systems built by others;
- shared decisions where relevant.

## Source Quality

Useful sources include:

- source code;
- commit history;
- project documentation;
- planning notes;
- design docs;
- task boards;
- screenshots or videos;
- builds;
- conversations with clear provenance;
- teammate testimonials;
- project pages, treated as claims to verify;
- commits and version history, treated as corroborating evidence rather than unquestionable proof.

Existing portfolio HTML pages are not automatically authoritative. They are sources of prior claims that still need verification.

## Public-Use Gate

Before a claim appears in public portfolio copy, ask:

- What artifact supports this?
- What exactly does the artifact establish?
- Does the artifact show my work, team work, or someone else's work?
- Would a technical interviewer get a concrete answer to "How do you know?" or "Was that yours?"
- Are there disclosure, privacy, teammate, asset-license, or repository-readiness concerns?
