# Implementation Plan - Transition to 'OBSESSED'

This plan outlines the steps to transform the current 'SELLING THE FUTURE' website into 'OBSESSED', an interactive slideshow dedicated to sharing thoughtful insights and memories about a partner.

## User Review Required

> [!IMPORTANT]
> This is a complete pivot from the current 'Outreach Engine' functionality. All existing 'Workout' and 'Outreach' logic will be replaced with a premium slideshow experience.

> [!NOTE]
> I will implement a sleek, romantic, and premium design using a dark mode aesthetic with soft glow effects (glassmorphism).

## Proposed Changes

### Core Structure & Title

#### [MODIFY] [index.html](file:///Users/khandpv1/Desktop/.AntiGrav/obsessed/index.html)
- Update `<title>` from `SELLING THE FUTURE` to `OBSESSED`.
- Update `<h1>` in the header to `OBSESSED`.
- Update subtitle to something more fitting, e.g., "A COLLECTION OF THINGS I KNOW".
- Simplify the layout to focus on the slideshow container.

### Design System (CSS)

#### [MODIFY] [style.css](file:///Users/khandpv1/Desktop/.AntiGrav/obsessed/style.css)
- Overhaul the `--root` variables for a "Romantic Premium" theme:
    - Primary background: Deep Charcoal/Black.
    - Accents: Soft Rose, Vibrant Crimson, or Gold.
- Implement glassmorphism for slide cards.
- Add smooth transitions for slide navigation (fade/slide).
- Add micro-animations (heartbeat pulses, soft glows).

### Logic & Content (JS/JSON)

#### [MODIFY] [script.js](file:///Users/khandpv1/Desktop/.AntiGrav/obsessed/script.js)
- Replace existing `renderContent`, `renderIntro`, etc., with a `renderSlideshow` function.
- Implement slide navigation logic (Next/Previous, keyboard shortcuts).
- Add support for different slide types (Text-only, Image + Text, Quote).

#### [MODIFY] [program.json](file:///Users/khandpv1/Desktop/.AntiGrav/obsessed/program.json)
- Replace 'Outreach' data with 'Things I Know' data.
- Structure:
    ```json
    {
      "slides": [
        { "title": "Your Favorite Morning Routine", "content": "The way you always need exactly two ice cubes in your coffee..." },
        { "title": "The First Time We Met", "content": "You were wearing that blue scarf, and I knew right then..." }
      ]
    }
    ```

## Verification Plan

### Automated Tests
- Use `npx serve .` to preview the site.
- Check title and header updates in the browser.
- Verify slide navigation (Next/Prev buttons and Arrow keys).

### Manual Verification
- Test responsiveness on mobile and desktop viewports.
- Ensure transitions are smooth and "premium" feeling.
- Verify the password protection still works (if desired).

## Checklist
- [x] Create Implementation Plan `02_IMPLEMENTATION_.md`
- [x] Update title and header in `index.html`
- [x] Define new "Obsessed" design system in `style.css`
- [x] Update `program.json` with initial slideshow content
- [x] Implement `renderSlideshow` and navigation logic in `script.js`
- [x] Add polish and micro-animations
