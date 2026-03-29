# HexPicker

A random color palette generator built with vanilla JavaScript, HTML, and CSS.

## Features
- Generates 5 random colors on each click
- Lock individual colors to keep them while regenerating others
- Click any hex code to copy it to clipboard
- Dynamic background gradient updates with each palette
- Palette persists across page refreshes via localStorage
- Automatic text contrast — hex labels are always readable regardless of background

## How it works
Each color is generated using `Math.random()` converted to a hex string:
```js
'#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
```

Text contrast is calculated using the relative luminance formula (WCAG standard) — if the background is light, text is dark, and vice versa.

Locked colors are tracked via a CSS class on each lock button. When regenerating, locked slots are skipped entirely.

## Built with
- HTML5
- CSS3 — CSS Grid for layout
- Vanilla JavaScript — no libraries

## What I learned
- Relative luminance and color contrast calculations
- Dynamic DOM manipulation
- localStorage for state persistence
- CSS Grid for responsive layouts
