# Lite Utilities – Real-Time Profit Analysis & Inventory Intelligence for RuneLite

**Lite Utilities** is a high-performance RuneLite plugin that delivers real-time inventory tracking, profit/loss analytics, and precision overlay enhancements for Old School RuneScape players. Built with an emphasis on minimal UI footprint and maximum informational clarity, this plugin embodies modern Java design principles, efficient rendering techniques, and stateful session management — making it a showcase of modular, scalable plugin architecture for the RuneLite ecosystem.

---

## Overview

Lite Utilities empowers players with real-time financial awareness by:
-  **Tracking Inventory & Equipment Value** using live Grand Exchange and High Alchemy prices.
-  **Calculating Profits & Losses** across skilling/PvM sessions through intelligent deltas.
-  **Highlighting Valuable Items** with configurable rarity tiers and visual overlays.
-  **Managing Session State** via automatic and manual run tracking (banking events, hotkeys).
-  **Displaying Unified Ledgers** showing all items gained, lost, and retained — directly in-game.

This plugin replaces guesswork with clarity, helping users understand the *value of their time* in-game — whether optimizing for GP per hour, managing inventory, or tracking high-value drops.

---

## Technical Architecture

Lite Utilities is architected around **decoupled, purpose-driven modules**, leveraging the full capabilities of RuneLite’s plugin API while maintaining strict separation of logic, rendering, and configuration:

### Core Modules

| Module | Purpose |
|--------|---------|
| `LiteUtilitiesPlugin` | Central plugin logic, lifecycle, event hooks, hotkey registration, and session control |
| `LiteUtilsOverlay` | Main overlay rendering system, includes value displays and hover-based tooltip ledger |
| `ItemHighlightOverlay` | Draws color-coded outlines around valuable items in inventory, bank, or equipment slots |
| `LiteUtilsTimerData` | Stores and restores session-specific data (quantities, prices, states) using GSON |
| `LiteUtilsConfig` | Declarative configuration interface with support for price types, thresholds, colors, and hotkeys |

### Supporting Structures

- `LiteUtilsModes`: Switches between TOTAL vs PROFIT_LOSS view modes.
- `LiteUtilsPriceTypes`: Allows toggling between GE and HA pricing logic.
- `LiteUtilsState`: Tracks whether the user is currently in a banking state or active run.
- `LiteUtilsTooltipItem`: Represents an individual item entry in the dynamic tooltip ledger.
- `ViewportModus`: Adjusts visual offsets for different client viewport layouts (Fixed, Resizable, Bank).

---

## Advanced Engineering Features

### Stateful Session Management
- Full tracking of item quantities and GP value **before and after a run**.
- Automatically resets or persists data across profile changes and plugin reloads.
- Supports **manual reset** or **auto-reset on bank visit**, configurable per user.

### Intelligent Value Analysis
- Real-time summation of GP value from **inventory**, **equipment**, and **runepouch**.
- Compares GE vs HA prices dynamically and caches results to reduce API calls.
- Categorizes items into rarity tiers: *Low, Medium, High, Insane*, each with custom color codes.

### Immersive In-Game UX
- Graphically rendered total wealth counter above inventory using **Graphics2D API**.
- Interactive tooltip when hovering the coin stack icon:
  - Shows **items in inventory**, **gains**, **losses**, and **net profit/loss**.
  - Uses item icons, dynamic text coloring, and intuitive sectioning for maximum clarity.

### Configurability & Developer Ergonomics
- Advanced config system:
  - Toggle profit/loss vs total mode with a single hotkey.
  - Customize highlight colors, price thresholds, overlay styles, and session behavior.
- Uses **dependency injection** via `@Inject` for overlay and manager services.
- Session data is safely serialized per user profile using RuneLite’s `ConfigManager`.

---

## Development Practices & Performance

-  **Lightweight & Non-Intrusive:** Minimal footprint with optimized render logic per frame.
-  **Hotkey Listener System:** Clean abstraction around toggling view modes and initiating runs.
-  **Efficient Caching:** Avoids redundant price lookups via in-memory maps.
-  **Visual Fidelity:** Uses accurate image resizing and anti-aliasing for smooth, native-looking icons.
-  **Testable & Extensible:** Easily extendable to track additional containers, or integrate external data sources (e.g., OSRS API).

---

##  Business Value & Real-World Impact

For employers or teams working in:
- **Game analytics tools**
- **Real-time overlay systems**
- **Financial or inventory tracking systems**
- **Performance-driven plugin ecosystems**

This project demonstrates:
-  Proficiency in **Java plugin architecture**, rendering optimization, and real-time data modeling.
-  Clean integration with **external APIs and client hooks** in a high-performance environment.
-  Understanding of **state management, visual clarity**, and **user experience in technical UIs**.
-  Engineering discipline in **data accuracy, memory efficiency**, and **fault-tolerant logic**.

Lite Utilities proves that powerful tools can remain intuitive, fast, and user-focused — a critical lesson in both consumer-grade software and scalable enterprise design.

---

##  Conclusion

**Lite Utilities** exemplifies scalable plugin development, system design under strict constraints (client render loop), and thoughtful UX for data-heavy overlays. It combines technical depth with real-world application value — ideal for roles involving client-side tools, financial analysis UIs, or live data tracking engines.

I’m available to discuss how this project (and its architecture) reflects my ability to deliver intelligent, performant, and scalable software — and how those same principles can bring value to your team or product.

---
