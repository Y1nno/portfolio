---
type: code-excerpts
status: in-progress
project: Tides of Eternity
portfolio_stage: project-extraction
last_reviewed: 2026-08-13
---

# Tides of Eternity - Code Excerpts

These are internal portfolio excerpt candidates. Public use remains permission-gated.

## Recommended Lead Excerpt

Use the status system as the lead code proof. It is the clearest match for Wesley's current Tides story:

> I built a flexible runtime status-effect architecture from an external GDD so combat behavior could evolve while the design was still being clarified.

## Excerpt 1 - Status Application and Runtime Instances

Source: `C:\GameDev\Tides_of_Eternity\Tides_of_Eternity\Assets\Scripts\Combat\Statuses\StatusManager.cs`

Purpose: shows that statuses are runtime objects, not simple bool flags. `StatusManager` chooses the correct status instance, stores it by type, tracks events, and adds stacks when the status already exists.

```csharp
public void ApplyStatus(StatusType statusType, GameObject source, int stacks = 1)
{
    if (statusType == StatusType.Daze && HasStatus(StatusType.Chill) && HasStatus(StatusType.Freeze))
    {
        return;
    }

    if (!activeStatuses.TryGetValue(statusType, out var status))
    {
        StatusDefinition definition = StatusEffectConfig.Instance.GetStatusDefinition(statusType);

        switch (statusType)
        {
            case StatusType.Chill:
                status = new ChillStatusInstance(definition, source, stacks, this);
                break;
            case StatusType.Daze:
                status = new DazeStatusInstance(definition, source, stacks, this);
                break;
            case StatusType.Disoriented:
                status = new DisorientedStatusInstance(definition, source, stacks, this);
                break;
            case StatusType.Doom:
                IDamageable target = GetComponent<IDamageable>();
                if (target == null)
                {
                    Debug.LogError("Attempting to apply Doom status, but cannot due to missing an IDamageable target.", this);
                    return;
                }
                status = new DoomStatusInstance(definition, source, stacks, this, target);
                break;
            case StatusType.Freeze:
                status = new FreezeStatusInstance(definition, source, stacks, this);
                break;
            default:
                status = new StatusInstance(definition, source, stacks, this);
                break;
        }

        activeStatuses.Add(statusType, status);
        status.StatusHasExpired.AddListener(OnStatusExpired);
        OnStatusApplied?.Invoke(status);
    }
    else
    {
        status.AddStacks(stacks);
        OnStatusChanged?.Invoke(status);
    }
}
```

Portfolio note: for publication, this may be shortened further by eliding some `switch` cases. Keep Chill, Doom, Freeze, and the default path because they show why the architecture supports both generic and special-case behavior.

## Excerpt 2 - Status Modifier Aggregation

Source: `C:\GameDev\Tides_of_Eternity\Tides_of_Eternity\Assets\Scripts\Combat\Statuses\StatusManager.cs`

Purpose: shows how active statuses modify gameplay values such as movement, incoming damage, outgoing damage, and crit modifiers without each combat system hardcoding every status.

```csharp
public float CalculateModifierFromStatuses(ModifierCalculationType calculationType, CalculationResultType resultType)
{
    float finalModifier = resultType == CalculationResultType.Additive ? 0f : 1f;

    foreach (var statusInstance in activeStatuses.Values)
    {
        StatusModifier statusModifier = StatusEffectConfig.Instance.GetStatusModifier(
            statusInstance.StatusInstanceType,
            calculationType
        );

        if (statusModifier == null)
        {
            continue;
        }

        float statusInstanceModifier = 1f;

        switch (statusModifier.StackingMode)
        {
            case ModStackingMode.Multiply:
                statusInstanceModifier = Mathf.Pow(statusModifier.ModifierValue, statusInstance.Stacks);
                break;
            case ModStackingMode.Add:
                statusInstanceModifier = resultType == CalculationResultType.Additive
                    ? statusModifier.ModifierValue * statusInstance.Stacks
                    : 1f + ((statusModifier.ModifierValue - 1f) * statusInstance.Stacks);
                break;
            case ModStackingMode.Single:
                statusInstanceModifier = statusModifier.ModifierValue;
                break;
        }

        switch (statusModifier.ModifierType)
        {
            case ModifierType.Multiply:
                finalModifier *= statusInstanceModifier;
                break;
            case ModifierType.Add:
                finalModifier += resultType == CalculationResultType.Additive
                    ? statusInstanceModifier
                    : statusInstanceModifier - 1f;
                break;
            case ModifierType.Override:
                return Mathf.Max(0f, statusInstanceModifier);
        }
    }

    return Mathf.Max(0f, finalModifier);
}
```

Portfolio note: this is the strongest "systems architecture" excerpt because it shows why status effects can be consumed by movement, damage, and crit calculations through one shared query interface.

## Excerpt 3 - Status Instance Lifecycle

Source: `C:\GameDev\Tides_of_Eternity\Tides_of_Eternity\Assets\Scripts\Combat\Statuses\StatusInstance\StatusInstance.cs`

Purpose: shows that each active status owns duration, ticking, stack expiration, and extension hooks for status-specific behavior.

```csharp
public void Update()
{
    tickTimer += Time.deltaTime;
    if (Definition.TickInterval > 0f && tickTimer >= Definition.TickInterval)
    {
        tickTimer -= Definition.TickInterval;
        Tick();
    }

    PopExpiredStacks();
    if (stackManager.IsExpired)
    {
        OnStatusExpire(Stacks);
    }
}

public StatusInstance(StatusDefinition definition, GameObject source, int stacks, StatusManager statusManager)
{
    if (definition == null)
    {
        throw new ArgumentNullException(nameof(definition), "Status definition cannot be null.");
    }

    Definition = definition;
    Source = source;
    this.statusManager = statusManager;
    stackManager = CreateStackManager(definition);
    OnStatusApply(stacks);
}

protected virtual void OnStackPop(int stackCount){}
protected virtual void OnStackAdd(int stackCount){}
public virtual void Tick(){}
```

Portfolio note: this excerpt pairs well with Chill because it explains where status-specific hooks come from.

## Excerpt 4 - Chill Converts Into Freeze

Source: `C:\GameDev\Tides_of_Eternity\Tides_of_Eternity\Assets\Scripts\Combat\Statuses\StatusInstance\ChillStatusInstance.cs`

Purpose: shows the most visual current demo: repeated Chill applications eventually apply Freeze.

```csharp
public sealed class ChillStatusInstance : StatusInstance
{
    public ChillStatusInstance(
        StatusDefinition definition,
        GameObject source,
        int stacks,
        StatusManager statusManager
    ) : base(definition, source, stacks, statusManager){}

    protected override void OnStackAdd(int stacks)
    {
        if (Stacks == ((ChillStatusDefinition)Definition).chillToFreezeThreshold)
        {
            statusManager.ApplyStatus(StatusType.Freeze, Source);
        }
    }
}
```

Portfolio note: this should be paired with a one-sentence explanation that Freeze's actual movement/damage behavior is handled by data/config and `StatusManager.CalculateModifierFromStatuses()`, not by custom movement code inside Chill.

## Excerpt 5 - Data-Configured Status Definitions

Source: `C:\GameDev\Tides_of_Eternity\Tides_of_Eternity\Assets\Scripts\Combat\Statuses\StatusEffectConfig.cs`

Purpose: shows the data-facing layer that lets status behavior be tuned without hardcoding every number into combat logic.

```csharp
[Serializable]
public class StatusDefinition
{
    [HideInInspector] public StatusType DefinitionType;

    [Header("Stacking and Refresh Behavior")]
    public StatusStackMode StackMode;
    public StatusRefreshMode RefreshMode;
    public int MaxStacks = 1;

    [Header("Timing")]
    public float Duration = 1f;
    public float TickInterval = 0f;

    [Header("Outgoing Damage Modifiers")]
    public StatusModifier OutgoingDamageMultiplier = new StatusModifier { ModifierValue = 1f, ModifierType = ModifierType.Multiply, StackingMode = ModStackingMode.Single};

    [Header("Incoming Damage Modifiers")]
    public StatusModifier IncomingDamageMultiplier = new StatusModifier { ModifierValue = 1f, ModifierType = ModifierType.Multiply, StackingMode = ModStackingMode.Single};

    [Header("Movement Modifier")]
    public StatusModifier MoveSpeedMultiplier = new StatusModifier { ModifierValue = 1f, ModifierType = ModifierType.Multiply, StackingMode = ModStackingMode.Add};
}

[Serializable]
public class ChillStatusDefinition : StatusDefinition
{
    [Header("Chill Specific Configuration")]
    [Min(0)]
    public int chillToFreezeThreshold = 0;
}
```

Portfolio note: use this only if the case study needs to prove data-driven tuning. The strongest public code sequence is probably Excerpts 1, 2, and 4.

## Recommended Public Sequence

1. Show the status architecture diagram.
2. Show Excerpt 1 or 2 as the primary code sample.
3. Show the Chill demo clip.
4. Use Excerpt 4 as the focused explanation of how Chill becomes Freeze.

