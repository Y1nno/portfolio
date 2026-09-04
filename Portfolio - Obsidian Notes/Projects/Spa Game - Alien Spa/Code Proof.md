---
type: code-proof
status: draft
project: Spa Game / Alien Spa
portfolio_stage: evidence-selection
last_reviewed: 2026-08-13
---

# Spa Game / Alien Spa - Code Proof

## Recommended Primary Excerpt

Use `ActionSelector.CalculateScore()` and `ActionSelector.Appraise()` as the flagship code proof.

Reason: Spa Game / Alien Spa is strongest as a systems/simulation case study, and this excerpt proves the core idea directly. Guests do not simply follow a fixed script; they evaluate advertised activities against their current needs and score the predicted improvement.

Source: `C:\GameDev\Spa Game\Alien-Spa\Assets\Scripts\Guests\ActionSelector.cs`

## Public Caption

The guest action selector scores available world advertisements by comparing a guest's current need values against the predicted future values those activities would create. The appraisal function weights low need values more urgently, so helping a badly depleted need can matter more than topping off a need that is already healthy.

## Primary Code Snippet

```csharp
private float CalculateScore(NeedFufillmentAdvertisement ad)
{
    float score = 0f;

    foreach (AdvertisementValue advertisementValue in ad.AdvertisementValues)
    {
        GuestNeedData guestNeed = guestNeedsController.GuestNeeds[advertisementValue.NeedType];
        float guestNeedValue = guestNeed.CurrentValue;
        float futureFulfillment = Mathf.Clamp(
            guestNeedValue + advertisementValue.CalculateFulfillmentAmount(),
            guestNeed.MinValue,
            guestNeed.MaxValue
        );

        score += Appraise(guestNeedValue) - Appraise(futureFulfillment);
    }

    return score;
}

private float Appraise(float value)
{
    float divisor = value;
    if (divisor <= 0.001f)
    {
        divisor = 0.001f;
    }

    return 1f / (divisor / 10f);
}
```

## Why This Works

- It is concise enough to read on a portfolio page.
- It proves the guest AI claim more directly than a broad architecture paragraph.
- It shows a real design choice: urgent low needs are weighted differently from already-satisfied needs.
- It gives an interviewer a natural path into tradeoffs: scoring functions, predictable vs. random behavior, tuning, and future reservation integration.

## Supporting Context

Pair this with `NeedFufillmentAdvertisement` only if the page has room. That class shows the other side of the system: world objects publish need-fulfillment values and assemble the activity that a selected guest should perform.

Source: `C:\GameDev\Spa Game\Alien-Spa\Assets\Scripts\Items\NeedFufillmentAdvertisement.cs`

```csharp
public GuestActivity CreateAdvertisedAction(Guest guest)
{
    advertisedActionActivity = null;
    AssembleAdvertisedAction(guest);
    return advertisedActionActivity;
}
```

## Supporting Excerpts To Keep In Reserve

- `ItemContainer.CountAvailable()` / `TryReserve()` / `TryClaimReservation()` for resource reservation proof.
- `TimePanelView.TryGetPlacementAtPointer()` / `FindAvailableColumn()` / `IntervalsOverlap()` for scheduling UI proof.
- `CheckOutState` dirty robe flow for integration proof.

## Recommendation

Use `ActionSelector` on the public Spa page now. Save container reservations and scheduling for a deeper case-study expansion after the page has visual evidence.
