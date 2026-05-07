# Implementation Plan - Increase Background Visibility

Adjust the lock screen overlay to make the blurred site content more visible while maintaining the "pop-out" card effect.

## Proposed Changes

### [Component Name] Background Visibility Adjustment

#### [MODIFY] [style.css](file:///Users/khandpv1/Desktop/.AntiGrav/obsessed/style.css)
- Update `#lock-screen` styles:
    - Reduce `backdrop-filter: blur(25px)` to `blur(10px)`.
    - Reduce `background-color: rgba(0, 0, 0, 0.4)` to `rgba(0, 0, 0, 0.2)`.
    - (Optional) Adjust `.lock-card` opacity if needed to ensure contrast against the clearer background.

## Checklist

- [x] Update `#lock-screen` blur and opacity in `style.css`.
- [x] Verify the background content is more visible.
- [x] Verify the centered card still has enough contrast and looks premium.
