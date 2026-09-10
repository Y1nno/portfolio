---
type: review
status: in-progress
portfolio_stage: review
last_reviewed: 2026-08-13
---

# Recruiter Skim Review

This review tests whether a recruiter can understand the portfolio quickly.

## Skim Questions

- What role does Wesley want?
- What kind of developer is he?
- What languages and engines does he know?
- What has he actually built?
- What is the strongest project?
- Where is the resume?
- Where are source code/builds where appropriate?
- How can someone contact him?
- Is project status clear: shipped, finished, prototype, jam, student, ongoing, or cancelled?
- Is Wesley's role on team projects clear without opening a full case study?

## Ten-Second Test

After looking at only the homepage and project cards, can the reviewer accurately state the desired programming role, primary technical stack, strongest one or two projects, and what Wesley personally did?

## Thirty-Second Test

Can the reviewer also identify project status, collaboration context, where technical evidence lives, and why each flagship is relevant to the stated role?

## Findings

| Finding | Severity | Page | Required Change | Status |
| --- | --- | --- | --- | --- |
| Homepage headline was catchy but too generic to immediately communicate role fit. | high | `index.html` | Replace with direct gameplay/systems positioning. | fixed |
| Resume was not reachable from the main navigation. | high | `index.html`; project pages | Add resume link to nav/contact so a recruiter can find it quickly. | fixed |
| Featured project order needed to communicate strategy rather than chronology. | high | `index.html` | Lead with Spa, then Tides, then Demons. | fixed |
| Additional projects risked looking equal to featured projects. | medium | `index.html` | Separate older projects into an Additional Projects section and keep Echoes non-clickable until it has a page. | fixed |
| Project cards needed clearer role/status signal. | medium | `index.html` | Use copy that says flagship/supporting/public proof rather than only genre summaries. | fixed |
| Tides public use remains permission-gated. | high | `tides-of-eternity.html` | Do not publish/show publicly until permission boundaries are recorded. | open |
| Featured pages still lack captured visual evidence. | medium | Spa/Tides/Demons pages | Replace evidence-target blocks with actual clips/screenshots/diagrams before final QA. | open |

## Current Skim Result

Ten-second test: mostly passes. A recruiter can now see the target identity, strongest project, main technologies, and featured project order quickly.

Thirty-second test: partially passes. The pages communicate role, status, and contributions, but final confidence still depends on visual evidence and Tides permission.
