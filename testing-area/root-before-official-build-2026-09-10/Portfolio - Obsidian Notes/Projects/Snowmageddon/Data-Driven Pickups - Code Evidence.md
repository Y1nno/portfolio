# Snowmageddon Data-Driven Pickups

Internal source notes for the portfolio case study. The fenced blocks are source excerpts with their revision, file, and original line numbers.

## Comparison points

| Snapshot | Snowball Fight revision | Reason for using it |
| --- | --- | --- |
| Before | `468203f71e6e33dbaa30d572390f56770cd6740e` | First parent of the pickup merge. It contains the system the pickup work inherited. |
| Pickup merge | `08546ec14da4c2ad520ae0e667abd3e300ce0493` | Merge of PR #28 from the `CoinPickup` branch. The implementation commit was `f5bd56f`. |
| Current | `02b82e2fe234b65c1d86717249d085c0a656b326` | Local checkout. The current files and configuration excerpted below match this revision. |

Source repository `C:\GameDev\SnowballFight`. Development context comes from the local `Snowmageddon Notes/Tasks/Task Notes - Pickup And Economy Collection.md` and [[Portfolio Dossier#Pickup And Economy Collection]].

## What changed and why

The task was to collect leftover coins when the shop opened. Coins and health already dropped, moved toward the player at close range, and paid out on collection. The player could still have to sweep a large map for scattered coins after a wave. Wesley wanted a way to collect those drops remotely while keeping the visible magnet effect available.

| Responsibility | Before | Current |
| --- | --- | --- |
| Pickup settings | Values for reward type, amount, distance, attraction speed, and rotation lived on the prefab's `Pickup` component. | Each prefab references a `PickupSO`. Penny, nickel, and health use the same `Pickup` script with different data. |
| Proximity detection | `Pickup.Update()` measured distance to the player each frame. | `Normal` sets up a player-layer trigger. `OnTriggerEnter` starts attraction. The eased movement toward the player is carried over. |
| Collection modes | Collection began when the player was within range. | `Normal` keeps proximity collection, `AlwaysAttract` starts the attraction coroutine from the pickup's current position, and `Instant` completes collection immediately. |
| Reward handling | The pickup broadcast global coin or health events and destroyed itself. `CoinManager` updated the balance. `PlayerController` subscribed directly to the health-pickup event. | `Pickup` signals completion through its own `UnityEvent<Pickup>`. `PickupManager` routes the reward, unregisters the pickup, and destroys it. Health still goes through the player's existing `ChangeCurrentHealth` API. |
| Drop spawning and economy | `Kid` called separate coin and health methods on `CoinManager`. The HUD and shop read the manager's balance. | `Kid` calls one `DropPickup` method with a reward type. The HUD and shop use the same balance and change-notification interface on `PickupManager`. |
| Shop transition | A global shop-open event already existed. The pickup system had no shop-open collection policy. | The manager listens to shop open and applies Inspector-configured modes to tracked pickups by reward type. The first entry for each type wins. |

The ScriptableObject choice lets the team tune denominations and pickup behavior without maintaining a separate component class for each item. Each pickup instance starts with its asset's mode and can receive an override at runtime. The shop override changes the tracked instances it finds when the event fires. Their shared asset and the defaults of future drops are independent of that pass.

## Shop-open collection and the review finding

- At the pickup merge, `WaveManager.BetweenWaves()` published the global `EventManager.ShopOpened` event. `PickupManager` listened to it. The current subscription to `NewShopManager.OnShopOpened` first appears in `2d02dc7`.
- Currently, `WaveManager` requests the shop between waves. The shop raises its model, generates its inventory, marks itself open, and emits `OnShopOpened`. `PickupManager.OnShopOpened` applies the configured policy to the live pickups of each listed reward type.
- `RegisterPickup` stores the pickup by reward type and Unity instance ID and subscribes to its completion event. `Pickup.OnDestroy` also unregisters it, so cleanup covers external destruction.
- Applying `Instant` calls `CompletePickup` immediately. Its event runs `PickupManager.OnPickup`, which awards the reward and removes the pickup from the dictionary before calling `Destroy`. This is why applying behavior during dictionary traversal can mutate the collection being enumerated.
- The merged code already separates the operations. It collects stale IDs and valid pickup references, removes stale entries, and applies modes to the snapshot, rechecking each pickup for null first. The earlier mutation risk comes from the task notes' account of code review. The source blocks show the merged fix.
- The portfolio dossier records manual checks for the original proximity behavior and both remote modes, configured on assets and triggered through shop opening. This comparison is a source review.

## Serialized values

The original values are from the pickup components in `Assets/Prefabs/Pickups` at `468203f`. Current values are from the matching `PickupSO` assets in `Assets/ScriptableObjects/Pickups`. All three current assets start in `Normal`.

| Pickup | Reward value before → current | Distance | Attraction speed | Rotation speed |
| --- | --- | --- | --- | --- |
| Penny | 1 → 1 | 7 → 10 | 2 → 2 | 1 → 2 |
| Nickel | 5 → 5 | 7 → 10 | 2 → 2 | 1 → 2 |
| Health | 20 → 25 | 7 → 8 | 2 → 2 | 1 → 2 |

The enabled gameplay scene configures coin pickups to use `AlwaysAttract` when the shop opens. The workshop scene also configures health pickups to use `Instant`. These are scene policies layered on top of the assets' default mode.

## Before the pickup refactor

### Pickup component

The proximity check, interpolation, event routing, and destruction were all in this component.


`468203f` · `Assets/Scripts/Pickup.cs` · lines 1–92

```csharp
using UnityEngine;
using System.Collections;

public class Pickup : MonoBehaviour 
{
    public int value = 1;
    public float pickupDistance = 7f;
    public float pickupSpeedMult = 1.2f;
    public float rotateSpeed = 1f;

    [Header("Pickup Type")]
    public PickupType type;
    public enum PickupType
    {
        Coin,
        Health
    }

    [SerializeField] private Rigidbody rb;
    private SphereCollider sphereCollider;
    private bool isInMotion = false;
    private Coroutine collectCoroutine;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        //rb = GetComponent<Rigidbody>();
        sphereCollider = GetComponent<SphereCollider>();
    }

    // Update is called once per frame
    void Update()
    {
        float playerDistance = (PlayerManager.instance.player.transform.position - transform.position).magnitude;
        if (playerDistance <= pickupDistance && !isInMotion)
        {
            StartPickup();
        }
        else if (isInMotion)
        {

        }
    }

    private void FixedUpdate()
    {
        transform.Rotate(0f, rotateSpeed, 0f);
    }

    void StartPickup()
    {
        Debug.Log("In range to grab coin!");
        isInMotion = true;
        rb.isKinematic = false;
        sphereCollider.enabled = false;

        collectCoroutine = StartCoroutine(Collect(PlayerManager.instance.player.transform));
    }

    IEnumerator Collect(Transform player)
    {
        float progress = 0;
        Vector3 startPos = transform.position;
        while (progress < 1f)
        {
            transform.position = Vector3.Lerp(startPos, player.position + new Vector3(0f, 1f, 0f), progress * progress); // squaring progress makes it start slow and end faster
            progress += (Time.deltaTime * pickupSpeedMult);
            yield return null;
        }


        // broadcast that we picked up either a coin or health
        switch (type)
        {
            case PickupType.Coin:
                EventManager.OnPickupCoin(value);
                break;
            case PickupType.Health:
                EventManager.OnPickupHealth(value);
                break;
        }
        

        Destroy(gameObject);
    }

    public void Drop(Vector3 dropDir)
    {
        rb.AddForce(dropDir);
    }

}
```

### Coin manager

This already spawned both coin and health prefabs. The coin balance and coin-change event carry forward into `PickupManager`.


`468203f` · `Assets/Scripts/Managers/CoinManager.cs` · lines 1–130

```csharp
using UnityEngine;
using UnityEngine.Events;

public class CoinManager : MonoBehaviour
{
    #region Singleton

    public static CoinManager instance;

    private void Awake()
    {
        instance = this;
    }

    #endregion

    public Vector3 dropDir;
    public float dropForce;
    public int startingCoins = 0;
    public float nickelDropChance = 0.30f;

    private int coins;

    public event UnityAction coinValueChanged;

    [SerializeField] private GameObject pennyPrefab;
    [SerializeField] private GameObject nickelPrefab;
    [SerializeField] private GameObject healthPrefab;

    private void OnEnable()
    {
        EventManager.PickupCoin += OnCoinPickup;
        EventManager.PickupHealth += OnPickupHealth;
    }

    private void OnDisable()
    {
        EventManager.PickupCoin -= OnCoinPickup;
        EventManager.PickupHealth -= OnPickupHealth;
    }

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        coins = startingCoins;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void DropCoins(Vector3 spawnPos, int numCoins)
    {
        if(numCoins > 0)
        {
            //AudioManager.instance.PlaySFX(coinDrop);
        }
        

        for (int i = 0; i < numCoins; i++)
        {
            // check if penny or dime
            float randomVal = Random.Range(0f, 1f);

            GameObject newCoin;

            if (randomVal <= nickelDropChance)
            {
                newCoin = Instantiate(nickelPrefab, spawnPos, Quaternion.identity);
            } else
            {
                newCoin = Instantiate(pennyPrefab, spawnPos, Quaternion.identity);
            }

            Pickup coin = newCoin.GetComponent<Pickup>();

            // random drop direction
            Vector3 randomDropDir = new Vector3(Random.Range(-1f, 1f), dropDir.y, Random.Range(-1, 1f)).normalized;

            coin.Drop(randomDropDir * dropForce);
        }
    }

    public void DropHealth(Vector3 spawnPos, int numHealth)
    {
        for (int i = 0; i < numHealth; i++)
        {

            GameObject newHealthDrop;

            newHealthDrop = Instantiate(healthPrefab, spawnPos, Quaternion.identity);

            Pickup health = newHealthDrop.GetComponent<Pickup>();

            // random drop direction
            Vector3 randomDropDir = new Vector3(Random.Range(-1f, 1f), dropDir.y, Random.Range(-1, 1f)).normalized;

            health.Drop(randomDropDir * dropForce);
        }
    }

    void OnCoinPickup(int coinValue)
    {
        Debug.Log("We've picked up a coin!");
        coins += coinValue;

        //AudioManager.instance.PlaySFX(coinPickup);

        coinValueChanged?.Invoke();
    }

    void OnPickupHealth(int value)
    {
        // nothing
    }
    
    public int GetCurrentCoins()
    {
        return coins;
    }

    public void SpendCoins(int coinsSpent)
    {
        // called in the shop manager to decrease coin amt
        coins -= coinsSpent;
        coinValueChanged?.Invoke();
    }
}
```

### Global reward events and the player health subscription


`468203f` · `Assets/Scripts/Managers/EventManager.cs` · lines 33–40

```csharp
    public static event UnityAction<int> PickupCoin;
    public static void OnPickupCoin(int coinValue) => PickupCoin?.Invoke(coinValue);

    public static event UnityAction DropCoin;
    public static void OnDropCoin() => DropCoin?.Invoke();

    public static event UnityAction<int> PickupHealth;
    public static void OnPickupHealth(int healthValue) => PickupHealth?.Invoke(healthValue);
```

`468203f` · `Assets/Scripts/PlayerController.cs` · lines 187–187

```csharp
        EventManager.PickupHealth += ChangeCurrentHealth;
```

## Current pickup implementation

### Shared pickup data


`02b82e2` · `Assets/ScriptableObjects/Pickups/PickupSO.cs` · lines 1–33

```csharp
using UnityEngine;

[CreateAssetMenu(fileName = "PickupSO", menuName = "Scriptable Objects/PickupSO")]
public class PickupSO : ScriptableObject
{
    /// <summary>
    /// ScriptableObject that defines the collection and reward behavior of a pickup item in the game.
    /// </summary>

    [Header("Collection Behavior")]
    [Tooltip("Determines how the pickup behaves for collection purposes. Normal: Pickup will lerp towards player at pickup speed when within pickup distance. AlwaysAttract: Pickup will always lerp towards player at pickup speed. Instant: Pickup will teleport and be instantly collected by the player.")]
    public PickupCollectionBehavior CollectionBehavior;
    public float PickupDistance = 7f;
    public float PickupSpeed = 1f;
    public float RotateSpeed = 1f;

    [Header("Reward")]
    public PickupRewardType RewardType;
    public int RewardValue = 1;
}

public enum PickupRewardType
{
    Coin,
    Health
}

public enum PickupCollectionBehavior
{
    Normal,
    AlwaysAttract,
    Instant,
}
```

### Pickup component

For the collection comparison, look at `Start`, `OnTriggerEnter`, `Collect`, `CompletePickup`, and `SetCollectionBehavior`.


`02b82e2` · `Assets/Scripts/Pickup.cs` · lines 1–142

```csharp
using UnityEngine;
using System.Collections;
using UnityEngine.Events;

public class Pickup : MonoBehaviour
{
    /// <summary>
    /// Pickup component that enforces the collection behavior of a pickup item and signals for reward application.
    /// </summary>
    [SerializeField] private PickupSO pickupInfo;

    [SerializeField] private Rigidbody rb;
    private SphereCollider sphereCollider;
    private bool isInMotion = false;
    private Coroutine collectCoroutine;
    public UnityEvent<Pickup> onPickup = new UnityEvent<Pickup>();

    public PickupCollectionBehavior CollectionBehavior;
    public float RotateSpeed { get; private set; }
    public float PickupSpeed { get; private set; }
    public float PickupDistance { get; private set; }
    public PickupRewardType RewardType { get; private set; }
    public int RewardValue { get; private set; }
    
    #region Unity Methods

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        //rb = GetComponent<Rigidbody>();
        sphereCollider = GetComponent<SphereCollider>();
        SetupPickupInfo();
        PickupManager.instance.RegisterPickup(this);
        SetCollectionBehavior();
    }

    // Update is called once per frame
    void Update()
    {
    }

    private void FixedUpdate()
    {
        transform.Rotate(0f, pickupInfo.RotateSpeed, 0f);
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player") && !isInMotion)
        {
            StartPickup();
        }
    }

    private void OnDestroy()
    {
        if (PickupManager.instance != null)
        {
            PickupManager.instance.UnregisterPickup(this);
        }
    }

    #endregion

    void StartPickup()
    {
        Debug.Log("In range to grab coin!");
        isInMotion = true;
        rb.isKinematic = false;
        sphereCollider.enabled = false;

        collectCoroutine = StartCoroutine(Collect(PlayerManager.instance.player.transform));
    }

    IEnumerator Collect(Transform player)
    {
        float progress = 0;
        Vector3 startPos = transform.position;
        while (progress < 1f)
        {
            transform.position = Vector3.Lerp(startPos, player.position + new Vector3(0f, 1f, 0f), progress * progress); // squaring progress makes it start slow and end faster // I didn't know you could do that, cool
            progress += Time.deltaTime * pickupInfo.PickupSpeed;
            yield return null;
        }


        CompletePickup();
    }

    private void CompletePickup()
    {
        if (collectCoroutine != null)
        {
            StopCoroutine(collectCoroutine);
        }

        onPickup.Invoke(this);
    }

    public void Drop(Vector3 dropDir)
    {
        rb.AddForce(dropDir);
    }

    public void SetCollectionBehavior()
    {
        switch (CollectionBehavior)
        {
            case PickupCollectionBehavior.Instant:
                CompletePickup();
                break;
            case PickupCollectionBehavior.AlwaysAttract:
                collectCoroutine = StartCoroutine(Collect(PlayerManager.instance.player.transform));
                break;
            case PickupCollectionBehavior.Normal:
            default:
                SphereCollider detectionCollider = gameObject.AddComponent<SphereCollider>();
                detectionCollider.isTrigger = true;
                detectionCollider.radius = pickupInfo.PickupDistance;
                detectionCollider.center = Vector3.zero;
                detectionCollider.includeLayers = LayerMask.GetMask("Player");
                break;
        }
    }

    private void SetupPickupInfo()
    {
        if (pickupInfo == null)
        {
            Debug.LogError("PickupInfo is not assigned on " + gameObject.name);
            Destroy(gameObject);
            return;
        }

        CollectionBehavior = pickupInfo.CollectionBehavior;
        RotateSpeed = pickupInfo.RotateSpeed;
        PickupSpeed = pickupInfo.PickupSpeed;
        PickupDistance = pickupInfo.PickupDistance;
        RewardType = pickupInfo.RewardType;
        RewardValue = pickupInfo.RewardValue;
    }
}
```

### Pickup manager

For the lifecycle comparison, look at `RegisterPickup`, `UnregisterPickup`, `OnPickup`, and `ApplyPickupCollectionBehaviorModeToActive`. The manager retains the coin balance API and dispatches health rewards through the player health API.


`02b82e2` · `Assets/Scripts/Managers/PickupManager.cs` · lines 1–250

```csharp
using UnityEngine;
using Random = UnityEngine.Random; // Declaring an alias for UnityEngine.Random to avoid conflicts with System.Random
using UnityEngine.Events;
using System.Collections.Generic;
using System;

public class PickupManager : MonoBehaviour
{
    #region Singleton

    public static PickupManager instance;

    private void Awake()
    {
        instance = this;
    }

    #endregion

    public Vector3 dropDir;
    public float dropForce;
    public int startingCoins = 0;
    public float nickelDropChance = 0.30f;

    private int coins;
    private Dictionary<PickupRewardType, Dictionary<int, Pickup>> activePickups = new Dictionary<PickupRewardType, Dictionary<int, Pickup>>(); // Structure: activePickups[rewardType][pickupID] = Pickup component instance

    public event UnityAction coinValueChanged;

    [Header("Shop Opening Collection Behavior")]
    [Tooltip("Specifies the collection behavior to apply to each reward type when the shop is opened. If a reward type is not listed, no behavior will be applied to it. If it is listed multiple times, the first entry will take precedence.")]
    [SerializeField] private List<PickupCollectionBehaviorEntry> rewardTypesToApplyBehavior = new List<PickupCollectionBehaviorEntry>();

    [Header("Pickup Prefabs")]
    [SerializeField] private GameObject pennyPrefab;
    [SerializeField] private GameObject nickelPrefab;
    [SerializeField] private GameObject healthPrefab;

    private void OnEnable()
    {
        foreach (var pickupType in activePickups)
        {
            foreach (var pickup in pickupType.Value)
            {
                pickup.Value.onPickup.AddListener(OnPickup);
            }
        }
    }

    private void OnDisable()
    {
        foreach (var pickupType in activePickups)
        {
            foreach (var pickup in pickupType.Value)
            {
                pickup.Value.onPickup.RemoveListener(OnPickup);
            }
        }
    }

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        NewShopManager.instance.OnShopOpened.AddListener(OnShopOpened);
        coins = startingCoins;
    }

    private void OnDestroy()
    {
        NewShopManager.instance.OnShopOpened.RemoveListener(OnShopOpened);
    }

    public void DropPickup(Vector3 spawnPos, PickupRewardType rewardType, int amount)
    {
        for (int i = 0; i < amount; i++)
        {
            GameObject newPickup = null;

            switch (rewardType)
            {
                case PickupRewardType.Coin:
                    // check if penny or dime
                    newPickup = (Random.Range(0f, 1f) <= nickelDropChance) ? Instantiate(nickelPrefab, spawnPos, Quaternion.identity) : Instantiate(pennyPrefab, spawnPos, Quaternion.identity);
                    DropCoins(spawnPos, 1);
                    break;
                case PickupRewardType.Health:
                    newPickup = Instantiate(healthPrefab, spawnPos, Quaternion.identity);
                    break;
                default:
                    Debug.LogWarning("Unsupported pickup reward type: " + rewardType);
                    return; // exiting if we arent able to determine what to spawn
            }

            Pickup pickupComponent = newPickup.GetComponent<Pickup>();
            if (newPickup != null && pickupComponent != null)
            {
                pickupComponent.Drop(new Vector3(Random.Range(-1f, 1f), dropDir.y, Random.Range(-1f, 1f)).normalized * dropForce);
                continue;
            }

            // If we reach this point, it means the pickup failed to drop correctly
            Debug.LogWarning("Failed to drop pickup: " + rewardType + " at position: " + spawnPos + ". Deleteing new pickup...");
            if (newPickup != null)
            {
                Destroy(newPickup);
            }
        }
    }

    public void ApplyPickupCollectionBehaviorModeToActive(PickupCollectionBehavior mode, PickupRewardType reward)
    {
        if (!activePickups.TryGetValue(reward, out Dictionary<int, Pickup> pickupsById)) {return;} // Early exit if no pickups of this reward type are active

        List<int> pickupsToRemove = new List<int>();
        List<Pickup> pickupsToUpdate = new List<Pickup>();

        Debug.Log("Applying pickup collection behavior mode: " + mode + " to active pickups of reward type: " + reward);
        foreach (var pickup in pickupsById)
        {
            if (pickup.Value == null)
            {
                pickupsToRemove.Add(pickup.Key);
                continue;
            }

            pickupsToUpdate.Add(pickup.Value);
        }

        for (int i = 0; i < pickupsToRemove.Count; i++)
        {
            pickupsById.Remove(pickupsToRemove[i]);
        }

        for (int i = 0; i < pickupsToUpdate.Count; i++)
        {
            if (pickupsToUpdate[i] == null)
            {
                continue;
            }

            pickupsToUpdate[i].CollectionBehavior = mode;
            pickupsToUpdate[i].SetCollectionBehavior();
        }
    }

    public void RegisterPickup(Pickup pickup)
    {
        if (pickup == null)
        {
            return;
        }

        if (!activePickups.ContainsKey(pickup.RewardType))
        {
            activePickups[pickup.RewardType] = new Dictionary<int, Pickup>();
        }

        activePickups[pickup.RewardType][pickup.GetInstanceID()] = pickup;
        pickup.onPickup.AddListener(OnPickup);
    }

    public void UnregisterPickup(Pickup pickup)
    {
        if (pickup == null)
        {
            return;
        }

        pickup.onPickup.RemoveListener(OnPickup);

        if (activePickups.ContainsKey(pickup.RewardType))
        {
            activePickups[pickup.RewardType].Remove(pickup.GetInstanceID());
        }
    }

    private void DropCoins(Vector3 spawnPos, int numCoins)
    {
        if(numCoins > 0)
        {
            //AudioManager.instance.PlaySFX(coinDrop);
        } // This was commented out, but I'm not sure how this is used, preserving just in case. If this is unused, this can be removed.
    }


    private void OnPickup(Pickup pickup)
    {
        switch (pickup.RewardType)
        {
            case PickupRewardType.Coin:
                OnCoinPickup(pickup.RewardValue);
                break;
            case PickupRewardType.Health:
                PlayerManager.instance.player.ChangeCurrentHealth(pickup.RewardValue);
                break;
        }

        UnregisterPickup(pickup);

        Destroy(pickup.gameObject);
    }

    void OnCoinPickup(int coinValue)
    {
        Debug.Log("We've picked up a coin!");
        coins += coinValue;

        //AudioManager.instance.PlaySFX(coinPickup);

        coinValueChanged?.Invoke();
    }

    void OnPickupHealth(int value)
    {
        // nothing
    }

    private void OnShopOpened()
    {
        Debug.Log("Shop opened, applying pickup collection behavior to active pickups.");
        List<PickupRewardType> processedRewardTypes = new List<PickupRewardType>();
        foreach (var rewardTypeEntry in rewardTypesToApplyBehavior)
        {
            if (!processedRewardTypes.Contains(rewardTypeEntry.rewardType))
            {
                ApplyPickupCollectionBehaviorModeToActive(rewardTypeEntry.collectionBehavior, rewardTypeEntry.rewardType);
                processedRewardTypes.Add(rewardTypeEntry.rewardType);
            }
        }
    }

    public int GetCurrentCoins()
    {
        return coins;
    }

    public void SpendCoins(int coinsSpent)
    {
        // called in the shop manager to decrease coin amt
        coins -= coinsSpent;
        coinValueChanged?.Invoke();
    }
}

[Serializable]
public class PickupCollectionBehaviorEntry
{
    public PickupRewardType rewardType;
    public PickupCollectionBehavior collectionBehavior;
}
```

## Call sites and configuration

### Enemy drops before and current


`468203f` · `Assets/Scripts/Kid.cs` · lines 258–267

```csharp
        // drop coins
        int numCoins = UnityEngine.Random.Range(minCoinsDrop, maxCoinsDrop + 1);
        CoinManager.instance.DropCoins(transform.position + new Vector3(0f, 1f, 0f), numCoins);

        // drop health
        if(maxHealthDrop > 0)
        {
            int healthToDrop = UnityEngine.Random.Range(minHealthDrop, maxHealthDrop + 1);
            CoinManager.instance.DropHealth(transform.position + new Vector3(0f, 1f, 0f), healthToDrop);
        }
```

`02b82e2` · `Assets/Scripts/Kid.cs` · lines 295–304

```csharp
        // drop coins
        int numCoins = UnityEngine.Random.Range(minCoinsDrop, maxCoinsDrop + 1);
        PickupManager.instance.DropPickup(transform.position + new Vector3(0f, 1f, 0f), PickupRewardType.Coin, numCoins);

        // drop health
        if(maxHealthDrop > 0)
        {
            int healthToDrop = UnityEngine.Random.Range(minHealthDrop, maxHealthDrop + 1);
            PickupManager.instance.DropPickup(transform.position + new Vector3(0f, 1f, 0f), PickupRewardType.Health, healthToDrop);
        }
```

### HUD and purchase integration


`468203f` · `Assets/Scripts/Managers/UIManager.cs` · lines 101–101

```csharp
        CoinManager.instance.coinValueChanged += OnCoinPickup;
```

`468203f` · `Assets/Scripts/Managers/UIManager.cs` · lines 340–344

```csharp
    private void OnCoinPickup()
    {
        // Update Coin Numbers in UI & Shop
        coinCounter.text = CoinManager.instance.GetCurrentCoins().ToString();
    }
```

`468203f` · `Assets/Scripts/Store & Upgrades/StoreOption.cs` · lines 89–89

```csharp
        int playerCoins = CoinManager.instance.GetCurrentCoins();
```

`468203f` · `Assets/Scripts/Store & Upgrades/StoreOption.cs` · lines 107–107

```csharp
        CoinManager.instance.SpendCoins(upgradeCost);
```

`468203f` · `Assets/Scripts/menu/ShopController.cs` · lines 71–71

```csharp
        CoinManager.instance.coinValueChanged += OnCoinUpdate;
```

`02b82e2` · `Assets/Scripts/Managers/UIManager.cs` · lines 111–111

```csharp
        PickupManager.instance.coinValueChanged += OnCoinPickup;
```

`02b82e2` · `Assets/Scripts/Managers/UIManager.cs` · lines 344–348

```csharp
    private void OnCoinPickup()
    {
        // Update Coin Numbers in UI & Shop
        coinCounter.text = PickupManager.instance.GetCurrentCoins().ToString();
    }
```

`02b82e2` · `Assets/Scripts/Store & Upgrades/StoreOption.cs` · lines 95–95

```csharp
        int playerCoins = PickupManager.instance.GetCurrentCoins();
```

`02b82e2` · `Assets/Scripts/Store & Upgrades/StoreOption.cs` · lines 114–114

```csharp
        PickupManager.instance.SpendCoins(upgradeCost);
```

`02b82e2` · `Assets/Scripts/menu/ShopController.cs` · lines 71–71

```csharp
        PickupManager.instance.coinValueChanged += OnCoinUpdate;
```

### Shop-open event at the pickup merge and currently


`08546ec` · `Assets/Scripts/Managers/WaveManager.cs` · lines 235–236

```csharp
        EventManager.OnShopOpened();
        shopOpened?.Invoke();
```

`08546ec` · `Assets/Scripts/Managers/PickupManager.cs` · lines 64–64

```csharp
        EventManager.ShopOpened += OnShopOpened;
```

`02b82e2` · `Assets/Scripts/Managers/WaveManager.cs` · lines 258–260

```csharp
        NewShopManager.instance.OpenShop();

        yield return new WaitUntil(() => NewShopManager.instance.ShopIsOpen);
```

`02b82e2` · `Assets/Scripts/Managers/NewShopManager.cs` · lines 369–370

```csharp
        shopIsOpen = true;
        OnShopOpened?.Invoke();
```

### Current scene policies


`02b82e2` · `Assets/Scenes/aidan_scene.unity` · lines 5217–5219

```yaml
  rewardTypesToApplyBehavior:
  - rewardType: 0
    collectionBehavior: 1
```

`02b82e2` · `Assets/Scenes/Wesley_Workshop.unity` · lines 5008–5012

```yaml
  rewardTypesToApplyBehavior:
  - rewardType: 0
    collectionBehavior: 1
  - rewardType: 1
    collectionBehavior: 2
```

## Code pairs for the portfolio page

1. **From prefab settings to pickup data.** Pair the old component fields with `PickupSO` and `SetupPickupInfo`. Use the penny and nickel as an example of shared behavior and different reward values.
2. **Keep local collection and add remote modes.** Pair the old `Update` distance check with `SetCollectionBehavior` and the current trigger. The shared `Collect` coroutine shows the attraction behavior that carried through the refactor.
3. **Route completion through the manager.** Pair the old coin and health event switch in `Collect` with the current `CompletePickup` and `PickupManager.OnPickup`. This shows where reward decisions and cleanup moved.
4. **Apply a shop-open policy safely.** Pair `OnShopOpened` and the scene configuration with the snapshot in `ApplyPickupCollectionBehaviorModeToActive`. Trace `Instant` through completion to synchronous unregistering to explain the code-review finding.
