---
type: code-proof
status: draft
project: Demons and Dining Darling
portfolio_stage: evidence-selection
last_reviewed: 2026-08-13
---

# Demons and Dining Darling - Code Proof

## Recommended Excerpt

Use `OrderManager` as the primary code proof.

Reason: it tells the clearest portfolio story for this project. Demons and Dining Darling is strongest as proof that Wesley can ship a complete playable loop under jam constraints, and `OrderManager` is the script that connects orders, tickets, plating, customer feedback, and progression.

Supporting excerpt, if space allows: `ProcessingStation` + `ProcessingStationDef`.

Reason: this shows the cooking behavior underneath the loop: timed processing, ready/ruined states, recipe lookup, and data-driven station outputs.

## Public Caption

The order loop connected the prototype's main player action chain: customers request dishes, the player prepares and plates food, then the ticket system validates the result and applies feedback. I implemented this Unity/C# gameplay flow and integrated it with the plating station, customer/patience feedback, and tutorial signaling.

## Primary Code Snippet

Source: `C:\GameDev\DDD-Demo\Assets\Scripts\Orders&Dishes\OrderManager.cs`

```csharp
public void ResolveOrder(GameObject order)
{
    if (order != null && orders.Contains(order))
    {
        RemoveOrder(order);
        List<Ingredient> platedIngredients = platingStation.GetIngredients();
        platingStation.ClearIngredients();
        EvaluateOrder(order, platedIngredients);
    }
}

public void EvaluateOrder(GameObject order, List<Ingredient> platedIngredients)
{
    if (GetComponent<TutorialSignaler>())
    {
        GetComponent<TutorialSignaler>().Signal(LevelSignal.ResolvedFirstOrder);
    }
    if (platedIngredients.Count == 1 && platedIngredients[0].definition == order.GetComponent<Ticket>().order)
    {
        PatienceManager.Instance.IncreasePatience(orderApprovalReward);
    }
    else
    {
        AffectionManager.Instance.DecreaseAffection(orderPenalty);
        AddPrompt(servedWrongPrompt);
    }
}
```

## Why This Works

- It is short enough for a portfolio page.
- It shows a real gameplay consequence: correct orders reward patience, incorrect orders lower affection and trigger chef feedback.
- It connects multiple systems without needing a long explanation.
- It supports the visual proof plan: order appears -> player prepares dish -> plate is submitted -> result is evaluated.

## Optional Supporting Snippet

Source: `C:\GameDev\DDD-Demo\Assets\Scripts\Stations\ProcessingStation.cs`

```csharp
if (state == ProcessingStationState.Processing)
{
    progress += Time.deltaTime;
    if (progress >= definition.secondsForCooking)
    {
        ChangeState(ProcessingStationState.Ready);
        if (ingredients.Count > 1) ingredients.Sort();
        List<Ingredient> outputs = definition.GetOutputForIngredients(ingredients);
        ClearIngredients();
        foreach (var output in outputs)
        {
            AddIngredient(output);
        }
    }
}
```

Source: `C:\GameDev\DDD-Demo\Assets\Scripts\Stations\ProcessingStationDef.cs`

```csharp
public List<Ingredient> GetOutputForIngredients(List<Ingredient> ingredients)
{
    foreach (var recipe in recipes)
    {
        if (recipe.ingredients.Count == ingredients.Count)
        {
            if (recipe.ingredients.Count > 1) recipe.ingredients.Sort();
            bool match = true;
            for (int i = 0; i < ingredients.Count; i++)
            {
                if (recipe.ingredients[i] != ingredients[i].definition)
                {
                    match = false;
                    break;
                }
            }
            if (match)
            {
                return recipe.GetOutputs();
            }
        }
    }
    return GetRuinedOutput();
}
```

## Planned Visual Proof

Capture a short gameplay clip or GIF that mirrors the code proof:

1. A customer order/ticket appears.
2. The player picks up an ingredient.
3. The ingredient is processed at a station.
4. The player plates the result.
5. The dish is submitted to the ticket.
6. The UI or character feedback reflects whether the order was correct.

This should be the lead visual for Demons because it proves the prototype has a complete playable loop.

## Use On Portfolio

Recommended layout:

- project card: title, role, stack, 2-3 sentence summary, Itch link;
- visual proof: planned cooking/order loop GIF;
- code proof: `ResolveOrder` + `EvaluateOrder` snippet;
- brief note: team jam, tied 3rd place, implementation by Wesley, art/writing/design inputs by teammates.
