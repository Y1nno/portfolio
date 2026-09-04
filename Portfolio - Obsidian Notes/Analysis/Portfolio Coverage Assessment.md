---
type: analysis
status: in-progress
portfolio_stage: selection
last_reviewed: 2026-08-13
---

# Portfolio Coverage Assessment

This is a provisional coverage assessment based on the current Spa Game and Tides dossiers plus lightweight scans of other candidate projects. Do not treat the non-dossier projects as final selection decisions until ownership, working state, and evidence quality are confirmed.

## Current Core Structure

| Role | Project | Why |
| --- | --- | --- |
| Primary / Flagship Candidate | Spa Game / Alien Spa | Best aligned with Wesley's desired identity: gameplay/systems/simulation programmer. Strong owned systems include guest needs/AI, data-driven resources, scheduling, and simulation loops. |
| Strong Supporting Piece | Tides of Eternity | Strong combat-systems proof: status architecture, movement/dash, damage formula, and implementation from an external GDD. Useful contrast with Spa because it shows combat rather than management simulation. |

## What Spa + Tides Already Prove

| Competency | Current Evidence | Coverage |
| --- | --- | --- |
| Gameplay systems | Spa guest AI/resources/scheduling; Tides movement/dash/status/damage. | strong |
| C# | Both projects have meaningful Unity/C# systems. | strong |
| Unity | Both projects use Unity systems, scenes, ScriptableObjects/configs, MonoBehaviours, runtime systems. | strong |
| Architecture | Spa data-driven affordances/resources; Tides runtime status layer and damage pipeline. | strong |
| Technical design implementation | Spa translates sim goals into systems; Tides translates external GDD specs into prototype systems. | strong |
| AI / behavior | Spa need-based guest behavior; Tides early enemy states/status effects. | credible to strong |
| Collaboration | Spa two-person integration; Tides rev-share team with Wesley as sole repo programmer. | credible |
| Technical communication | Spa and Tides notes, dossiers, diagrams, GDD traceability, architecture explanations. | strong |
| Iteration / scope judgment | Tides prototype-scope honesty; Spa in-development caveats and future capture plan. | credible |

## Gaps Still Not Well Covered

| Gap | Why It Matters | Possible Project To Fill It |
| --- | --- | --- |
| Public playable proof / finished artifact | Recruiters need confidence that Wesley can finish and present work, not only build internal systems. | Demons and Dining Darling; possibly RootAccess if there is a playable/demo video. |
| Godot evidence | Current strongest pieces are Unity; homepage claims Godot experience. | Echoes of Us; WizardShooterProject if stronger after scan. |
| Python/tools evidence | Personal positioning says Python is comfortable, but Spa/Tides do not prove it. | Tabletop Generators / `llm npc`; professional Power Platform app if public-safe; portfolio automation only as supporting evidence. |
| Source control / collaboration process | Existing claims mention team work, but stronger proof would come from commits, PRs, task boards, or public repos. | False God; Demons; Tides if Plastic/rev-share workflow can be explained. |
| Testing / QA / debug harnesses | Gameplay-programmer roles value debugging and testability; current evidence is mostly architectural. | False God testing environment; Tides damage/status debug harness if expanded; Tabletop Generators tests. |
| Optimization / performance | No clear strong evidence yet. | Needs investigation; likely not a current portfolio pillar. |
| Completion/polish | Spa and Tides are both in development/prototype. | Demons and Dining Darling, RootAccess, or any project with a finished build/video. |
| Non-Unity breadth | Unity dominates. | Echoes of Us for Godot/C#; `llm npc` for Python tooling. |

## Other Project Relevance

### False God

Likely role: **supporting or brief mention**, pending dossier.

Most relevant coverage:

- architecture and observer-driven modular systems;
- turn-based/UI-driven combat and encounter systems;
- ScriptableObject item/equipment/content data;
- testing environment;
- documentation, GDD authorship, planning, onboarding, and project management;
- collaboration testimonial from lead designer.

Best reason to analyze: it may fill **process, documentation, team leadership, test environment, and data-driven content** evidence better than Spa/Tides.

Risks:

- Overlap with Tides on combat and with Spa on systems architecture.
- Existing public page has encoding/copy issues and old claims that require verification.
- Project-management signal must support the gameplay-programmer story, not distract from it.

### The Boy Aflame Who Couldn't Fly

Likely role: **supporting candidate**, pending dossier.

Most relevant coverage:

- recording/playback system;
- fixed-timestep capture and replay;
- object-owned snapshot serialization through `IReplayObject`;
- player/camera/input systems;
- narrative-game context distinct from combat/simulation projects.

Best reason to analyze: it may fill a unique **replay/state-capture systems** niche that neither Spa nor Tides cover.

Risks:

- Existing page says the project was only two weeks in and prototype-stage.
- Need to verify working state and ownership.
- Could be stronger as a technical mini-case-study than a full public project page.

### Echoes of Us

Likely role: **candidate / gap filler**, pending dossier.

Most relevant coverage:

- Godot/C# evidence;
- 2D movement/combat state machines;
- player and enemy state architecture;
- debug tools for movement/enemy metrics.

Best reason to analyze: it may support the homepage claim that Wesley uses **Godot**, not only Unity.

Risks:

- May overlap with Tides on movement/combat state machines.
- Needs evidence of polish, playability, and project distinctiveness.
- If Godot evidence is shallow, it should be brief mention rather than a major case study.

### Demons and Dining Darling

Likely role: **supporting / public proof candidate**, dossier started.

Most relevant coverage:

- public Itch.io prototype with browser and Windows builds;
- IGA Level 1 team jam recognition: public postmortem confirms tied 3rd overall; "Next Indie Hit" still needs source;
- kitchen/order/station systems;
- Ink dialogue integration;
- ScriptableObject-driven ingredients, recipes, stations, prompts, customers;
- actual player-facing loop and public artifact.

Best reason to include: it may fill the biggest gap: **public playable proof / completion / recognition**.

Risks:

- Jam code may be less architecturally clean than Spa/Tides.
- Team attribution needs careful public wording: Wesley owned the Unity implementation/integration, while teammates contributed art, writing, and game design inputs.
- Some implementation appears prototype/jam-style; likely better as a credibility/supporting project than a technical deep dive.

### RootAccess

Likely role: **asset-ready candidate**, pending path/code access and dossier.

Most relevant coverage:

- existing video and screenshots in the portfolio repo;
- possible level/design/tooling evidence from visible assets: dialogue configuration, grid/tile setup, moving platforms, turret configuration.

Best reason to analyze: it has immediate media assets, which helps visual portfolio presentation.

Risks:

- Source path needs correction or access review.
- Current evidence is mostly media, not code/ownership.
- Need to know whether it fills a unique competency or only adds screenshots.

### 3DCharacterController

Likely role: **brief mention or supporting technical reference**, pending dossier.

Most relevant coverage:

- reusable 3D character controller foundation;
- input reader;
- camera manager;
- animator manager;
- grounded/falling/jumping/crouching/walking state machine.

Best reason to analyze: it may explain foundation reused in Tides movement work.

Risks:

- Standalone controller projects can feel small unless the implementation is polished and demonstrably playable.
- Tides may already cover movement/controller work in a stronger real-project context.

### Tabletop Generators / `llm npc`

Likely role: **tools/Python supporting piece**, pending strategy decision.

Most relevant coverage:

- Python;
- config-driven generators;
- structured JSON output;
- CLI and desktop UI;
- validators, serializers, resolvers, rules, randomizers;
- unit tests.

Best reason to analyze: it fills **Python, tools, tests, data validation, and non-Unity systems** better than the current game projects.

Risks:

- Not a real-time game project, so it should support the gameplay-programmer story rather than replace it.
- Needs careful framing as game-adjacent tooling/worldbuilding support.

## Best Next Dossier Order

Recommended order:

1. **Demons and Dining Darling**
   - Highest strategic value because it may fill the public playable/completion/recognition gap.
2. **The Boy Aflame Who Couldn't Fly**
   - Strongest chance to add a unique technical system: recording/playback.
3. **False God**
   - Strong process/team/documentation candidate, but may overlap with Spa/Tides technically.
4. **Echoes of Us**
   - Useful if the portfolio needs visible Godot/C# breadth.
5. **Tabletop Generators**
   - Useful if applying to tools/generalist roles or if Python evidence becomes important.
6. **RootAccess**
   - Revisit after correcting source path or if immediate visuals are needed.

## Working Portfolio Shape

Recommended near-term public portfolio:

- **Primary case study:** Spa Game / Alien Spa.
- **Supporting technical case study:** Tides of Eternity.
- **Public proof / finished prototype slot:** Demons and Dining Darling if ownership/evidence checks out.
- **Optional technical mini-case-study:** Boy Aflame replay system.
- **Optional breadth slot:** Echoes of Us for Godot or Tabletop Generators for Python/tools, depending on target roles.

## Strategic Implication

The portfolio should not try to show every project. Spa and Tides already create enough technical depth. The remaining projects should earn inclusion by filling a gap:

- public playable proof;
- different engine;
- tools/Python;
- replay/state-capture;
- team/process proof;
- completion/polish.

If a project does not fill one of those gaps better than the others, it should become a brief mention or be omitted.
