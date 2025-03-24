# Lite Regen Meter – Real-Time Stat Overlays & Orb Enhancements for RuneLite

**Lite Regen Meter** is a performance-optimized RuneLite plugin designed to visualize hidden regeneration mechanics, enhance orb functionality, and provide fully modular, context-aware stat bar overlays for Old School RuneScape. Built with scalability, visual fidelity, and extensibility in mind, it exemplifies modern plugin architecture and deep integration with the RuneLite ecosystem.

---

## Overview

Lite Regen Meter enhances player awareness by offering:

- Health and special attack **regeneration tracking** with accurate countdown meters.
- Intelligent **prayer dose indicators** advising optimal potion timing.
- **Dynamic status bars** for any skill (combat, prayer, or utility), with real-time restore volume visualization.
- Configurable **orb icons** indicating poison, venom, disease, and more.
- Fully adaptive design across **all viewport layouts** (fixed, resizable, modern UI).
- Deep configurability with custom colors, icons, sizes, and visibility logic.

This plugin elevates the RuneScape UI experience, replacing vague game mechanics with precision, clarity, and control.

---

## Technical Architecture

Lite Regen Meter is structured around **loosely coupled, single-responsibility components**, maintaining clean separations between configuration, rendering, data computation, and event handling.

### Core Modules

| Module | Description |
|--------|-------------|
| `LiteRegenMeterPlugin` | Core logic and lifecycle controller; hooks into game ticks, state, events, and plugin settings |
| `LiteRegenMeterOverlay` | Renders horizontal health and spec regen bars beneath minimap orbs |
| `LiteStatBarsOverlay` | Manages dual-sided stat bar rendering; supports up to four contextual bars |
| `LiteStatBarsRenderer` | Low-level renderer for drawing bars, restore volumes, counters, and icons |
| `LitePrayerDoseOverlay` | Visually cues users when to drink a prayer potion using flashing overlays |
| `PoisonOverlay` | Adds tooltips when hovering the HP orb with poison/venom info |
| `PoisonInfobox` | Provides timer-based info boxes indicating upcoming poison/venom ticks |

### Supporting Constructs

- `LiteRegenMeterConfig`: Granular configuration for rendering, layout, colors, orb behavior, and stat bar logic
- `LiteStatBarsMode`: Enum-based configuration for selecting which skills to track
- `PrayerRestoreType`, `PrayerType`: Internal classification systems to calculate prayer restore efficiency and drain rates
- `LiteRegenSprites`: Custom sprite override system for venom/poison/disease indicators
- `Viewport`: Identifies current layout and offsets UI correctly for fixed/resizable/bank modes

---

## Engineering Features

### Stateful Regen Tracking

- Tracks **hitpoints regeneration cycles** with millisecond precision
- Calculates **special attack regeneration**, dynamically adjusting for Lightbearer ring
- Implements **prayer point drain estimation** based on active prayers and bonus stats

### Smart Overlays

- Dual-sided stat bars for **combat and skilling stats**
- Optionally displays **restoration overlays**, visually predicting the result of a potion
- Dynamically reacts to **poison, venom, disease, parasite**, and active buffs
- Auto-hides bars after configurable combat delays or inactivity

### Orb UI Enhancements

- Accurately tracks **time until next poison/venom hit**
- Displays **infoboxes and hover-tooltips** with expected damage and cure timing
- Swaps **orb sprites** to match poison state with configurable style (Vanilla or Lite mode)

### High Customizability

- Toggle bar positions: left, middle, right; attach or detach bars visually
- Fine-tune transparency, size, colors, icon presence, and restoration volume
- Full integration with RuneLite's **ConfigManager** for persistence and user profiles

---

## Development & Performance Considerations

- Efficient **frame-by-frame rendering** using Graphics2D with anti-aliasing and pre-cached sprites
- Clean **dependency injection** via `@Inject` with support for external services like `ItemStatPlugin`
- Compact, fast, and **modular drawing logic** using stateless helper methods
- Fully compatible with both **modern and legacy RuneLite UI modes**
- Uses RuneLite's event bus (`@Subscribe`) to remain low-latency and reactive

---

## Business & Technical Value

For teams developing:

- **Game HUD systems**
- **Real-time performance overlays**
- **Statistical tracking tools**
- **Plugin-based ecosystems with high modularity**

Lite Regen Meter showcases:

- Mastery of **Java UI rendering**, plugin lifecycle management, and modular design
- Expertise in **real-time data synchronization**, UI ergonomics, and overlay positioning across dynamic viewports
- Familiarity with **RuneLite’s plugin API**, external stat calculation systems, and client resource management
- Production-level attention to **memory efficiency**, **user experience**, and **extensibility**

---

## Conclusion

**Lite Regen Meter** demonstrates how to design fast, beautiful, and deeply integrated game overlays within tight rendering cycles. With its intelligent session handling, advanced UX features, and adaptable architecture, it is a testament to high-performance client-side engineering.

This project reflects my capacity to engineer scalable UI plugins under real-time constraints — a skillset transferable to technical roles involving data visualization, client instrumentation, or precision-driven UX design.

I’m open to opportunities where this kind of high-quality, maintainable, and performant engineering can drive user value at scale.

--- 