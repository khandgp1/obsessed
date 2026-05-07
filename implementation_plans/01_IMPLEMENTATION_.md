# Implementation Plan - Glassmorphism Lock Screen

Update the lock screen to be a semi-transparent popup that blurs the content behind it, rather than completely hiding it.

## Proposed Changes

### [Component Name] Pop-out Card Lock Screen

#### [MODIFY] [style.css](file:///Users/khandpv1/Desktop/.AntiGrav/obsessed/style.css)
- Update `#lock-screen` to be the full-screen overlay:
    - Keep `backdrop-filter: blur(25px)`.
    - Change background to a lighter semi-transparent overlay (e.g., `rgba(0, 0, 0, 0.4)`).
- Add `.lock-card` styles:
    - Background: `var(--card-bg)` or a distinct dark semi-transparent color.
    - Border: `1px solid var(--border)`.
    - Border-radius: `32px`.
    - Padding: `60px`.
    - Box-shadow: Deep glow and shadow for a "pop-out" effect.
    - Max-width: `600px`.
    - Animation: Scale up and fade in.

#### [MODIFY] [index.html](file:///Users/khandpv1/Desktop/.AntiGrav/obsessed/index.html)
- Wrap the quote inside a `<div class="lock-card">`.

## Checklist

- [x] Update `index.html` with `.lock-card` wrapper.
- [x] Update `style.css` with card styles and overlay adjustments.
- [x] Verify the lock screen looks like a distinct centered card.
- [x] Verify the background is blurred behind the card.
