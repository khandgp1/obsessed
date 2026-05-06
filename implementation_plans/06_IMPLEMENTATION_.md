# Auto-Advance Slideshow Implementation Plan

Update the slideshow to automatically transition to the next slide every 3 seconds. The timer should reset whenever the user manually interacts with the navigation (buttons or keyboard) to ensure they have enough time to read the current slide.

## Proposed Changes

### Core Logic Update

#### [MODIFY] [script.js](file:///Users/khandpv1/Desktop/.AntiGrav/obsessed/script.js)

- **Global Variable**: Add `let autoPlayTimer = null;` to track the active timer.
- **`startAutoPlay` function**: Create a function to initiate a `setInterval` that triggers the next slide every 3000ms.
- **`resetAutoPlay` function**: Create a function to clear the existing timer and start a new one.
- **`switchSlide` function**: Integrate `resetAutoPlay` into the `switchSlide` function so manual navigation resets the 3-second countdown.
- **`init` function**: Start the auto-play timer once the slides are initialized.

## Checklist

- [x] Add `autoPlayTimer` global variable in `script.js`.
- [x] Implement `startAutoPlay` function.
- [x] Implement `resetAutoPlay` function.
- [x] Update `switchSlide` (in both `setupNavigation` and keyboard listeners) to call `resetAutoPlay`.
- [x] Start auto-play in the `init` function.
- [ ] Verify that the slideshow auto-advances and manual navigation resets the timer.

## Verification Plan

### Automated Tests
- None.

### Manual Verification
- **Auto-Advance Test**: Stay on a slide without interacting. Verify it moves to the next slide after 3 seconds.
- **Timer Reset Test**: Wait 2 seconds, then click "Next". Verify it waits another full 3 seconds before auto-advancing again.
- **Looping Test**: Ensure auto-advance also loops from the last slide back to the first.
