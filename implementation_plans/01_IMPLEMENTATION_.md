# 01_IMPLEMENTATION_: Adding Ashmita and Parth Tabs

Add two new navigation tabs for "Ashmita" and "Parth" by updating the data structure and tab generation logic.

## User Review Required

> [!IMPORTANT]
> The new tabs will default to the "Workout" rendering style unless specified otherwise. I will use placeholder content for the "Focus" and "Exercises" sections.

## Proposed Changes

### Data Layer

#### [MODIFY] [program.json](file:///Users/khandpv1/Desktop/.AntiGrav/obsessed/program.json)
- Add a new entry for "Ashmita" with placeholder focus and exercises.
- Add a new entry for "Parth" with placeholder focus and exercises.

### Logic Layer

#### [MODIFY] [script.js](file:///Users/khandpv1/Desktop/.AntiGrav/obsessed/script.js)
- Update the `init()` function to remove or adjust the `index > 1` restriction, allowing the new tabs to be rendered in the navigation bar.

## Checklist

- [x] Add "Ashmita" entry to `program.json`
- [x] Add "Parth" entry to `program.json`
- [x] Update `script.js` to render all tabs in the `days` array
- [x] Verify tabs appear and are clickable in the UI
