---
type: project-inventory
status: in-progress
portfolio_stage: project-extraction
last_reviewed: 2026-08-13
---

# Project Inventory

This is the internal project index built from user-provided project names plus folder scans of:

- `C:\GameDev\`
- `C:\Users\wesle\OneDrive\Documents\GitHub\`
- existing portfolio support assets in `C:\Users\wesle\OneDrive\Documents\GitHub\portfolio\Projects\`

Do not treat inclusion here as a portfolio selection decision. Use [[Project Selection]], [[Competency Matrix]], and project dossiers before deciding flagship/supporting/brief/omit status.

## Index Status

| Field | Meaning |
| --- | --- |
| user-listed | Project was named directly by Wesley. |
| discovered | Found in scanned folders but not explicitly named in the original project list. |
| support/non-game | Likely asset, utility, resume/site, or non-game folder. |
| duplicate/related | May overlap with another indexed project. |
| needs-triage | Needs user/project review before portfolio relevance is known. |

## Priority Candidates

These should likely receive the first lightweight project-index pass.

| Project | Why First | Known Path(s) | Detected Tech | Status |
| --- | --- | --- | --- | --- |
| Spa Game / Alien Spa | User identified it as most likely to become presentable and more technically impressive. | `C:\GameDev\Spa Game\Alien-Spa` | Unity / C# | first-pass dossier materials created; see [[Projects/Spa Game - Alien Spa/Project Index|Spa Game Project Index]] |
| False God | Existing portfolio page and testimonial already exist. | `C:\Users\wesle\OneDrive\Documents\GitHub\false-god` | Unity / C# | needs project indexing |
| A Boy Aflame / The Boy Aflame Who Couldn't Fly | Existing portfolio page already exists. | `C:\Users\wesle\OneDrive\Documents\GitHub\A Boy Aflame` | Unity / C# | needs project indexing |
| Root Access | IGA Level 2 solo project; existing media assets found in portfolio repo. | `C:\Users\wesle\OneDrive\Documents\GitHub\IGALevel2Proj`; `C:\Users\wesle\OneDrive\Documents\GitHub\portfolio\Projects\RootAccess` | Unity / C# | needs project indexing |
| Demons and Dining Darling | Public Itch/devlog link plus IGA Level 1 recognition. | `C:\GameDev\DDD-Demo` | Unity / C# | needs project indexing |
| Tides of Eternity | User selected this as the next analysis target; permission required before public showing, but internal analysis can proceed. | `C:\GameDev\Tides_of_Eternity\Tides_of_Eternity` | Unity / C# | first-pass dossier scaffold created; see [[Projects/Tides of Eternity/Project Index|Tides of Eternity Project Index]] |

## User-Listed Projects

| Canonical Project | Folder(s) Found | Detected Tech / Markers | Known Context | Index Status |
| --- | --- | --- | --- | --- |
| 3DCharacterController | `C:\Users\wesle\OneDrive\Documents\GitHub\3DCharacterController` | Unity; Git repo | User-listed | needs-triage |
| A Boy Aflame / The Boy Aflame Who Couldn't Fly | `C:\Users\wesle\OneDrive\Documents\GitHub\A Boy Aflame` | Unity; Git repo; productName appears as `A Boy Afame` | Existing portfolio page/project card | needs-triage |
| AIAgentWorld | `C:\Users\wesle\OneDrive\Documents\GitHub\AIAgentWorld` | Git repo; engine not detected at top level | User-listed | needs-triage |
| BGSIM | `C:\Users\wesle\OneDrive\Documents\GitHub\BGSIM` | Git repo; engine not detected at top level | User-listed | needs-triage |
| BirthrightSim | `C:\Users\wesle\OneDrive\Documents\GitHub\BirthrightSim` | Git repo; engine not detected at top level | User-listed | needs-triage |
| CubicalCrawl | `C:\Users\wesle\OneDrive\Documents\GitHub\Cubical-Crawl` | Git repo; engine not detected at top level | User-listed | needs-triage |
| Echoes of Us | `C:\Users\wesle\OneDrive\Documents\GitHub\EchoesOfUs` | Godot; Git repo; project name `Echoes of Us` | Existing homepage project card | needs-triage |
| False God | `C:\Users\wesle\OneDrive\Documents\GitHub\false-god` | Unity; Git repo; productName `FalseGodKima` | Existing portfolio page and testimonial | needs-triage |
| GenerativeWorld | `C:\Users\wesle\OneDrive\Documents\GitHub\GenerativeWorld`; `C:\Users\wesle\OneDrive\Documents\GitHub\GenerativeWorldRevamp` | Git repo for `GenerativeWorld`; revamp folder marker unknown | User-listed; possible related folders | needs-triage |
| WizardShooterProject | `C:\Users\wesle\OneDrive\Documents\GitHub\WizardShooterProject` | Godot; Git repo; project name `WizardShooterProject` | User-listed | needs-triage |
| Root Access | `C:\Users\wesle\OneDrive\Documents\GitHub\IGALevel2Proj`; `C:\Users\wesle\OneDrive\Documents\GitHub\portfolio\Projects\RootAccess` | Unity; Git repo; productName `Platformer`; media assets exist | IGA Level 2 solo project | needs-triage |
| Demons and Dining Darling | `C:\GameDev\DDD-Demo` | Unity; Git repo; productName `IGA-L1-26`; public browser/Windows builds on Itch | IGA Level 1 team jam; public postmortem confirms tied 3rd place; "Next Indie Hit" award still needs source; Itch link available | dossier-first-pass |
| Spa Game / Alien Spa | `C:\GameDev\Spa Game\Alien-Spa`; notes at `C:\GameDev\Spa Game\Obsidian Notes` | Unity; productName `Alien Spa` | Active project; co-op with friend; co-developed code; no playable build yet; repo exists; screenshots/video can be captured; user says likely most presentable and more technically impressive | dossier-first-pass |
| Tides of Eternity | `C:\GameDev\Tides_of_Eternity\Tides_of_Eternity`; notes and GDD in parent folder | Unity; productName `Tides_of_Eternity`; GDD PDF present | Active project; permission request required before public showing; internal analysis approved | dossier-first-pass |

## Additional GameDev Folder Discoveries

These were found in `C:\GameDev\` but were not in the original named list.

| Folder                        | Path                                               | Detected Tech / Markers                                                                | Triage Note                                                                          |
| ----------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 3D Unreal Platformer          | `C:\GameDev\3D Unreal Platformer\UnrealPlatformer` | Unreal; `.uproject` found                                                              | discovered; likely project                                                           |
| Top Down Clash                | `C:\GameDev\Top Down Clash`                        | Unity; Git repo; productName `Top Down Clash`                                          | discovered; likely project                                                           |
| TWWB                          | `C:\GameDev\TWWB`                                  | Unity; Git repo; productName `TWWB`                                                    | discovered; likely project                                                           |
| UnnamedRPGExtraction          | `C:\GameDev\UnnamedRPGExtraction`                  | Unity; Git repo; productName `UnnamedRPGExtraction`                                    | discovered; likely project or extraction prototype                                   |
| llm npc / Tabletop Generators | `C:\GameDev\llm npc`                               | Python; Git repo; README describes hex map editor, NPC generator, settlement generator | discovered; tool project, potentially relevant to systems/tools/AI-adjacent evidence |
| Assets                        | `C:\GameDev\Assets`                                | Asset pack/materials, not a game project                                               | support/non-game                                                                     |
| Core Scripts                  | `C:\GameDev\Core Scripts`                          | Standalone C# scripts: `IState.cs`, `Singleton.cs`, `StateMachine.cs`                  | support/code library; may be evidence if tied to projects                            |

## Additional GitHub Folder Discoveries

These were found in `C:\Users\wesle\OneDrive\Documents\GitHub\` but were not in the original named list.

| Folder | Detected Tech / Markers | Triage Note |
| --- | --- | --- |
| AndroidArena | Godot; Git repo; project name `Android Arena` | discovered; likely project |
| autobattlerProj | Unity | discovered; likely project/prototype |
| BGSimulator-master | No top-level engine/Git marker detected | duplicate/related candidate for BGSIM |
| fantasySim | Git repo; engine not detected at top level | discovered; likely sim/prototype |
| happyhalloween | Git repo; engine not detected at top level | discovered; needs triage |
| HollowKnightClone | Unity; Git repo; productName `HNC` | discovered; likely tutorial/clone risk; needs attribution/originality review |
| IntakeProj | Unity; Git repo; productName `IntakeProj` | discovered; needs triage |
| IntakeProj_clone_0 | Unity | duplicate/related candidate for IntakeProj |
| Prototype | No top-level engine/Git marker detected | discovered; vague folder name, needs triage |
| rematchDrills | No top-level engine/Git marker detected | likely non-portfolio unless game-related |
| SoloDnD | Git repo; engine not detected at top level | discovered; likely tool/sim/narrative project |
| TCGP | Git repo; engine not detected at top level | discovered; needs triage |
| Test | Git repo; engine not detected at top level | likely support/scratch unless proven otherwise |
| Marathon Run Log | Git repo; Python/web app structure observed | non-game software project; may support Python/full-stack/tooling if strategically useful |
| portfolio | Current portfolio repo | support/non-game |

## Per-Project Index Fields To Fill Next

For each candidate project:

- one-sentence description;
- engine/language;
- solo or team;
- current status;
- playable/build available;
- source code availability;
- public repo or local only;
- screenshots/video availability;
- personal role;
- what Wesley personally built;
- best potential competencies;
- disclosure or attribution constraints;
- likely portfolio role: flagship, supporting, brief mention, omit, future candidate, or unknown.

## Notes

- Engine detection is based on marker files such as `project.godot`, Unity `Assets` plus `ProjectSettings`, Unity `ProjectSettings.asset`, and Unreal `.uproject`.
- Git repo detection means a `.git` folder was found locally. It does not prove the repo is public or ready for reviewer inspection.
- Public repository readiness is intentionally deferred to per-project indexing.
- Tutorial/clone folders should be reviewed carefully before public use to avoid presenting template/tutorial foundations as original work.
