---
type: governance
status: approved
portfolio_stage: all
last_reviewed: 2026-08-13
---

# Status and Metadata Conventions

Metadata exists to help future AI instances and humans understand workflow state. Keep it sparse.

## Standard Status Values

- `not-started`
- `in-progress`
- `blocked`
- `needs-research`
- `needs-user-input`
- `needs-project-analysis`
- `needs-verification`
- `ready-for-review`
- `approved`
- `archived`

## Evidence Status Values

- `CONFIRMED`
- `LIKELY / INFERRED`
- `UNKNOWN`

Only CONFIRMED claims should automatically be treated as safe for public-facing portfolio copy.

## Useful Frontmatter Fields

```yaml
type:
status:
project:
portfolio_stage:
confidence:
last_reviewed:
```

Do not add metadata fields unless they make the note easier to use.

## Broad Tags

Use tags sparingly:

- `#research`
- `#evidence`
- `#strategy`
- `#asset`
- `#review`
- `#backlog`

