# Snowmageddon Presentation Experiments

## Selected Direction

The timeline layout is the preferred direction for the Snowmageddon page.

Why it works:
- It tells a real process story instead of turning the page into a wall of text.
- It gives the Super Roll work a clear sequence: inherited feature, observed problem, first pass, event-driven refactor, object ownership, edge cases.
- It looks more restrained and less like a generic "liquid glass" AI-generated interface.
- It leaves room for code blocks without making the page feel like a technical dump.

Visual guidance:
- Keep surfaces flatter and quieter.
- Use timeline structure, spacing, and headings as the main visual rhythm.
- Avoid overusing translucent/glassy cards.
- Cards can still appear when they clarify grouped information, but they should not dominate the page.

## Patterns To Keep In Reserve

These patterns may be useful on other project pages, but should be used sparingly and with restrained styling.

### Before / After Comparison

Best for showing a concrete refactor or replacement:
- Old responsibility vs new responsibility.
- Previous player experience vs improved player experience.
- Runtime behavior before vs runtime behavior after.

Good fit:
- Super Roll refactor.
- Any project where the technical improvement is easiest to understand by direct contrast.

Risk:
- Can become too grid-heavy if every point becomes a boxed element.

### Code Proof Blocks

Best for technical reviewers:
- Code excerpt beside plain-English interpretation.
- Use when the code itself proves a claim about architecture, lifecycle, data flow, or runtime cost.

Good fit:
- Gameplay programmer project pages.
- A focused section inside a broader narrative page.

Risk:
- Too much code too early can make the page feel dense.

### Tradeoff Cards

Best for showing engineering judgment:
- "Chose X over Y because..."
- "This would change if..."
- Helps make production constraints visible.

Good fit:
- Systems with non-obvious implementation choices.
- Interview prep or expanded case-study sections.

Risk:
- Can look generic if every decision is boxed with the same visual weight.

### Runtime / Responsibility Diagrams

Best for explaining ownership boundaries:
- Controller starts ability.
- Temporary coroutine scopes active aiming.
- Spawned object owns its lifecycle.

Good fit:
- Complex systems where readers need a mental model before code.

Risk:
- Diagrams can become decorative if they do not answer a specific question.

### System Cards

Best for project overview pages:
- One card per contribution.
- Works when a project has several equally important systems.

Good fit:
- Index pages or summary sections.

Risk:
- If overdesigned, it starts to look like a product dashboard instead of a personal process story.
